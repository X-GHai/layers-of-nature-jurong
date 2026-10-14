"""Audit NParks brochure pixel centres against independent OSM bridge controls.

This is a reproducible orientation-point transformation, not a survey workflow.
The output remains a candidate register until map/managed-area checks pass.
"""

import json
from pathlib import Path

import numpy as np


ROOT = Path(__file__).parents[1]
CONTROLS = ROOT / "data" / "brochure-georef-controls.json"
PIXELS = ROOT / "data" / "brochure-point-pixels.json"
PARKS = ROOT / "data" / "nparks-jlg.geojson"
OUTPUT = ROOT / "data" / "brochure-point-audit.json"


def ring_contains(point, ring):
    x, y = point
    inside = False
    previous = ring[-1]
    for current in ring:
        x1, y1 = previous
        x2, y2 = current
        if (y1 > y) != (y2 > y):
            cross_x = x1 + (y - y1) * (x2 - x1) / (y2 - y1)
            if cross_x > x:
                inside = not inside
        previous = current
    return inside


def polygon_contains(point, rings):
    return ring_contains(point, rings[0]) and not any(
        ring_contains(point, hole) for hole in rings[1:]
    )


def geometry_contains(point, geometry):
    if geometry["type"] == "Polygon":
        return polygon_contains(point, geometry["coordinates"])
    if geometry["type"] == "MultiPolygon":
        return any(polygon_contains(point, rings) for rings in geometry["coordinates"])
    return False


def distance_to_geometry_metres(point, geometry):
    polygons = [geometry["coordinates"]] if geometry["type"] == "Polygon" else geometry["coordinates"]
    nearest = float("inf")
    for polygon in polygons:
        for ring in polygon:
            for start, end in zip(ring, ring[1:]):
                # At 1.33°N, both degree axes are approximately 111 km.
                segment = np.array(end) - np.array(start)
                length_squared = float(segment @ segment)
                if length_squared == 0:
                    continue
                fraction = max(0.0, min(1.0, float((np.array(point) - start) @ segment) / length_squared))
                projection = np.array(start) + fraction * segment
                nearest = min(nearest, float(np.linalg.norm(np.array(point) - projection)) * 111_000)
    return round(nearest, 1)


def model(control_subset):
    pixels = np.array([c["pixel"] for c in control_subset], dtype=float)
    # GeoJSON / OSM longitude, latitude order in model output.
    world = np.array([[c["coordinate"][1], c["coordinate"][0]] for c in control_subset])
    design = np.column_stack((pixels, np.ones(len(pixels))))
    return np.linalg.lstsq(design, world, rcond=None)[0]


def transform(transform_matrix, pixel):
    return np.array([*pixel, 1.0]) @ transform_matrix


def metres_between(a, b):
    delta = (a - b) * np.array([111_000, 111_000])
    return round(float(np.linalg.norm(delta)), 1)


def main():
    controls = json.loads(CONTROLS.read_text(encoding="utf-8"))["controls"]
    pixels = json.loads(PIXELS.read_text(encoding="utf-8"))["points"]
    parks = json.loads(PARKS.read_text(encoding="utf-8"))["features"]
    if len(pixels) != 53 or len(controls) < 8:
        raise ValueError("Expected all 53 brochure attractions and eight independent controls")

    fit = model(controls)
    control_audit = []
    for index, control in enumerate(controls):
        actual = np.array(control["coordinate"][::-1])
        predicted = transform(fit, control["pixel"])
        withheld = model(controls[:index] + controls[index + 1:])
        independent = transform(withheld, control["pixel"])
        control_audit.append({
            "name": control["name"],
            "fitResidualMetres": metres_between(predicted, actual),
            "leaveOneOutMetres": metres_between(independent, actual),
        })

    zone_names = {"C": "CHINESE GARDENS", "J": "JAPANESE GARDENS", "L": "JLG: LAKESIDE GARDEN"}
    park_by_name = {feature["properties"]["NAME"]: feature for feature in parks}
    candidates = []
    for code, pixel in pixels.items():
        longitude, latitude = transform(fit, pixel)
        zone = zone_names[code[0]]
        matches_zone = geometry_contains([longitude, latitude], park_by_name[zone]["geometry"])
        boundary_distance = 0 if matches_zone else distance_to_geometry_metres(
            [longitude, latitude], park_by_name[zone]["geometry"]
        )
        candidates.append({
            "code": code,
            "pixel": pixel,
            "coordinate": [round(float(latitude), 7), round(float(longitude), 7)],
            "managedArea": zone,
            "insideExpectedManagedArea": matches_zone,
            "distanceOutsideManagedAreaMetres": boundary_distance,
            "status": "candidate-only; not survey-grade",
        })

    result = {
        "method": "least-squares affine from six named OSM bridges, Grand Arch and Lone Tree to NParks brochure pixels",
        "source": "NParks Jurong Lake Gardens Brochure, page 2; bundled OpenStreetMap bridges; bundled NParks managed-area GeoJSON",
        "status": "independent audit candidates; not yet applied to GIS",
        "pixelToWorldLngLatMatrix": fit.tolist(),
        "controls": control_audit,
        "meanFitResidualMetres": round(sum(c["fitResidualMetres"] for c in control_audit) / len(control_audit), 1),
        "meanLeaveOneOutMetres": round(sum(c["leaveOneOutMetres"] for c in control_audit) / len(control_audit), 1),
        "outsideExpectedManagedArea": [c["code"] for c in candidates if not c["insideExpectedManagedArea"]],
        "points": candidates,
    }
    OUTPUT.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("controls:", control_audit)
    print("mean fit / leave-one-out (m):", result["meanFitResidualMetres"], result["meanLeaveOneOutMetres"])
    print("outside expected managed area:", result["outsideExpectedManagedArea"])
    print("candidate points:", len(candidates))


if __name__ == "__main__":
    main()
