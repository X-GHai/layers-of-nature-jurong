# Software/System Design Document

## Layers of Nature · Jurong Lake Gardens GIS

| Field | Value |
| --- | --- |
| Document type | Software/System Design Document (SSD) |
| Repository | <https://github.com/X-GHai/layers-of-nature-jurong> |
| Version | 0.1 — proposed implementation design |
| Deployment model | Static client-side application on GitHub Pages |
| Implementation status | Not yet built; this document is the design and review baseline |

## 1. Purpose, boundaries, and architectural decisions

This document specifies the architecture that will be built for Layers of Nature. It covers browser runtime design, source modules, data flows, temporal and visibility state, spatial provenance, failure handling, verification, and release packaging. Implementation must be reviewed against this document rather than retrospectively described by it.

The first release excludes experimental local modules, a separate National Heritage Board trail interface, user accounts, and server-side authoring. Those are product choices, not technical omissions: each would introduce new provenance, moderation, privacy, or maintenance obligations.

### 1.1 Decisions made before implementation

| Decision | Rationale | Consequence accepted by the team |
| --- | --- | --- |
| Build a static site | The atlas is a research publication, not a transactional service. GitHub Pages keeps hosting, deployment, and handover simple. | No authenticated editing, server search, or private data store in release one. |
| Use Leaflet rather than a paid basemap SDK | The project needs conventional web mapping and overlay control without a billing account or browser key. | The map depends on third-party public tiles and attribution requirements. |
| Keep content in reviewable JavaScript/GeoJSON records | Editors need to trace an article, point, identifier, and source record together in version control. | Content editing is structured and must pass validation; it is not a free-form CMS. |
| Separate source types in the model | A brochure-derived navigation point, OSM geometry, and historical raster make different claims. | Some places will remain visibly approximate or unresolved. |
| Package fallback snapshots | Public APIs and Overpass requests are not dependable enough to be the only data path. | Snapshots need date, licence, source URL, and refresh review. |
| Publish versioned application assets | Browsers cache static JavaScript aggressively. | A release requires an explicit asset-copy/parity check. |

### 1.2 Rejected alternatives

- **A single undifferentiated “places” layer:** rejected because it would hide whether a marker comes from a survey, an official polygon, a community map, or a brochure diagram.
- **Coordinates inferred from search results as evidence:** rejected because a search pin does not prove a named feature is officially listed at that position.
- **A separate backend/CMS for the first release:** rejected because it would add credentials, operations, and permissions without solving the core research problem.
- **Quantitative change maps from loosely georeferenced sheets:** rejected until control-point evidence supports the required precision.

## 2. Scope

## 3. Design goals

The system is designed to satisfy the following priorities:

1. **Static deployability:** run entirely from GitHub Pages without a server or database.
2. **Evidence separation:** encode and display different spatial and temporal evidence types explicitly.
3. **Graceful degradation:** preserve core functionality when optional remote datasets fail.
4. **Traceability:** connect features and claims to source records and raw attributes.
5. **Stable identity:** preserve map codes and feature IDs across data, list, marker, and card representations.
6. **Editorial independence:** support long-form, concise, and raw-GIS cards without forcing one narrative template.
7. **Cache-safe publication:** use a content-addressed application asset.

## 4. System context

```text
                         ┌──────────────────────────┐
                         │       GitHub Pages       │
                         │ HTML, CSS, JS, snapshots │
                         └────────────┬─────────────┘
                                      │
                                      ▼
┌────────────────┐          ┌───────────────────────┐
│ User's browser │◀────────▶│ Leaflet application   │
└────────────────┘          └───────┬───────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
  ┌────────────────┐       ┌──────────────────┐      ┌──────────────────┐
  │ Map tile hosts │       │ GIS data services│      │ Evidence sources │
  │ OneMap and NUS │       │ data.gov / OSM   │      │ linked documents │
  └────────────────┘       └──────────────────┘      └──────────────────┘
```

The browser is the only execution environment. GitHub Pages serves immutable static assets. Third-party systems provide map tiles, current GIS data, and outbound source pages. No data is written back to the server.

## 5. Technology stack

| Layer | Technology |
| --- | --- |
| Document structure | HTML5 |
| Styling | Plain CSS |
| Application logic | Plain browser JavaScript |
| Mapping | Leaflet 1.9.4 |
| Geometry/data interchange | GeoJSON and JavaScript object literals |
| Historical/current raster display | Leaflet tile layers |
| Current open-data retrieval | Fetch API, Overpass API, data.gov.sg polling/download API |
| Fallback data | Checked-in GeoJSON plus generated `reference-snapshots.js` |
| Verification | Node.js assertions and Python/NumPy georeferencing audit |
| Hosting | GitHub Pages |

There is no framework, package manager, compilation step, application server, database, or private API key.

## 6. Planned deployment-unit structure

```text
layers-of-nature-jurong/
├── index.html
├── styles.css
├── app.js                       # canonical editable source
├── app-<content-hash>.js         # versioned release copy of app.js
├── case-research.js             # detailed evidence archive
├── public-research.js           # edited public findings/reference status
├── atlas-articles.js            # independently structured long-form cases
├── place-research.js            # object-specific research records
├── reference-snapshots.js       # generated fallback bundle
├── data/
│   ├── osm-jlg.geojson
│   ├── nparks-jlg.geojson
│   ├── ura-water-jlg.geojson
│   ├── brochure-georef-controls.json
│   ├── brochure-point-pixels.json
│   └── brochure-point-audit.json
└── scripts/
    ├── audit-brochure-georef.py
    └── verify-cases.cjs
```

`index.html` must load content modules and `reference-snapshots.js` before the versioned application asset. Those modules define data consumed during `app.js` initialisation.

## 7. Runtime initialisation

The application initialises in this order:

1. Browser loads document structure and CSS.
2. Leaflet 1.9.4 loads from unpkg.
3. Research modules populate global content constants.
4. The reference-snapshot bundle registers checked-in GeoJSON by local path.
5. The versioned application script creates source records, layers, features, and temporal metadata.
6. Leaflet initialises within a bounded Jurong Lake Gardens map window.
7. OneMap becomes the current base layer.
8. Eligible NUS historical tile layers are created with zero or initial opacity.
9. Layer controls, feature layers, facility registers, source ledger, timeline, and evidence panels render.
10. Current-reference layers begin remote loading as required and fall back to bundled snapshots when necessary.

If Leaflet fails to load, the map cannot initialise. Other remote-service failures are isolated and should not abort the entire application.

## 8. Core domain model

### 7.1 Source record

A source record represents a document, dataset, map service, image, or external object record.

Recommended fields:

```javascript
{
  institution,
  title,
  url,
  date,          // source-check date, not automatically publication date
  apa,
  inTextAuthor,
  evidenceScope,
  dataUrl,       // optional machine-readable endpoint
  serviceUrl     // optional tile service
}
```

Publication dates, event dates, dataset vintages, and retrieval dates must not be collapsed into the `date` field without explanation.

### 7.2 Layer definition

```javascript
{
  label,
  color,
  icon,
  description
}
```

The planned layer IDs are grouped as follows:

- thematic: `ecology`, `engineered`, `heritage`, `governance`, `public`, `hidden`;
- named records: `facilities`, `amenities`; and
- current references: `roads`, `waterways`, `waterbodies`, `greenery`, `woodland`, `amenities_ref`.

### 7.3 Research or named-place feature

A feature may contain:

```javascript
{
  id,                 // stable internal identity
  mapCode,            // C1, J4, L23, amenity code, or symbolic code
  name,
  group,
  type,
  layer,
  primaryLens,
  from,
  to,
  geometryType,
  geometry,
  spatialStatus,
  source,
  purpose,
  purposeSource,
  details,
  fact,
  periodEvidence,
  limitation,
  storySources,
  relatedSources,
  mapDisplay
}
```

`id` is the join key across marker, list, card, test, and research modules. It must remain stable when display text changes.

### 7.4 External GIS feature

Remote or fallback GeoJSON is converted into an internal record containing:

- generated frontend ID;
- source layer ID;
- display name derived conservatively from known attributes;
- original `properties` object;
- original geometry;
- current-reference status;
- source definition; and
- optional OSM object metadata when live Overpass provides it.

Original attributes must remain available in the raw-attributes panel.

### 7.5 Research records

Research content is separated into:

- **case dossier:** claim-level archive, interpretations, gaps, and related IDs;
- **public research:** edited evidence-led findings;
- **public reference:** concise entry for cases without sufficient depth;
- **atlas article:** long-form case with article-specific sections and paragraph citations; and
- **place research:** direct content bound to one mapped object.

This separation prevents frontend rendering from reconstructing missing evidence or using a neighbouring place's narrative.

## 9. Coordinate and geometry conventions

Leaflet point coordinates are stored in `[latitude, longitude]` order inside application feature objects. GeoJSON source geometries use standard `[longitude, latitude]` order and are converted when passed to Leaflet.

The system supports points, lines, and polygons. A representative coordinate may be calculated for navigation or outbound links, but it must not be described as an official centroid unless the source establishes that meaning.

### 8.1 Spatial statuses

| Status | Meaning |
| --- | --- |
| `plan-derived` | Approximate point transformed from the NParks brochure plan or independently anchored while retaining plan identity |
| `orientation` | A point or line used to locate a park-wide process or narrative, not a surveyed object |
| `approximate` | Analytical extent without an official downloadable boundary |
| `indicative-official` | Official planning/management geometry with limits stated by the publisher or project |
| `open-reference` | Present-day community-maintained reference geometry |
| `quarantined` | Record retained without asserted public geometry pending spatial resolution |
| source-only | Narrative or named record presented without a map object |

Geometry status must travel with the feature into hover cards, evidence cards, registers, and tests.

## 10. Basemap and temporal-state design

### 9.1 Map extent

The map is constrained to a padded Jurong Lake Gardens navigation window around:

```text
south-west: 1.326, 103.716
north-east: 1.348, 103.744
initial view: 1.3375, 103.7285 at zoom 15.25
```

### 9.2 Basemap sources

- OneMap is always the present-day orientation base.
- NUS Libraries provides raster services for 1953, 1971, and 1975.
- Historical layers are created independently and controlled through opacity.

### 9.3 Timeline state

The public timeline uses numeric values `0–4`:

| Value | State |
| --- | --- |
| 0 | 1953 historical raster |
| 1 | 1971 historical raster |
| 2 | 1975 historical raster |
| 3 | 2019 documented event on present-day OneMap |
| 4 | 2024 documented event on present-day OneMap |

Intermediate slider values are visual transitions. `baseMapState(value)` calculates the opacity of historical rasters and the current base. Exact event stops trigger the explicit warning that OneMap is not a survey of that event year.

The initial public chronology intentionally omits 1963. A candidate source year is not promoted into the interface until the team has confirmed coverage of the study area, legible rendering, a stable registered source page, and reliable service behaviour. Feature `from` and `to` values must be maintained through an explicit timeline-index mapping, so later addition or removal of a state cannot silently alter their historical meaning.

### 9.4 Historical eligibility

`eligibleHistoricalMap(year)` requires:

- confirmed study-area coverage;
- matching publication-year metadata;
- a registered source page; and
- an available tile service.

The 1963 source remains in the general source register for provenance but is absent from `historicalYears` and `historicalTileServices`. Source registration alone must not make a year visible.

### 9.5 Current-only visibility

Named plan records and external current-reference datasets use the current-state start value. `spatialOpacity()` returns zero before the 2024 state. This prevents them from fading into historical states or the 2019 event state.

## 11. Layer-control and visibility design

Application state includes:

```javascript
enabledLayers       // Set of selected layer IDs
selectedFeatureId   // current selected object
timeValue           // timeline position
playing             // animation state
showResearchLeads   // research-anchor visibility
externalLayerState  // per-layer loading/error/count/layer state
```

### 10.1 Visibility decision

`isFeatureVisible(item)` is the single decision point for research and named-plan features.

```text
feature without primaryLens:
    visible when item.layer is enabled

feature with primaryLens:
    visible when item.layer OR item.primaryLens is enabled
```

Temporal opacity, quarantine status, source-only status, and research-lead settings are applied after this thematic decision.

### 10.2 Control rendering

`renderLayerControls()` renders three labelled groups. Each input is rebuilt after state change, then listeners are reattached. `renderLayerStatus()` explains no-selection, current-only, and thematic states.

`setAllLayers(false)` clears the set but does not disable controls. `enableFeatureVisibility(item)` adds the feature's `primaryLens` or base layer before a list-driven selection. This is the required recovery path after **Clear all**.

## 12. Brochure georeferencing design

### 11.1 Inputs

- NParks brochure page 2 at 2079 × 2892 pixels.
- Pixel centres for 53 numbered circles.
- Eight named control points visible in the brochure and current reference data.
- NParks managed-area polygons used as an independent plausibility check.

### 11.2 Transformation

The audit fits an affine transform:

```text
[pixel_x, pixel_y, 1] × matrix = [longitude, latitude]
```

The matrix is estimated with NumPy least squares. The script calculates:

- per-control fit residual;
- leave-one-control-out error;
- mean fit residual;
- mean leave-one-out error;
- transformed point coordinates; and
- whether each point falls inside its expected managed area.

The output is a candidate register, not automatic public truth. It must record the fit and leave-one-out residual for every control point, the mean and median error, point-by-point managed-area checks, and the reviewer’s decision. A candidate must be shown as source-only or quarantined when controls are weak, when its transformed point falls outside the expected context without explanation, or when a second source contradicts the identification.

### 11.3 Independent anchors and co-location

Selected records use independent named anchors, including Grand Arch, The Lone Tree, and MRT stations. Co-located amenity codes may inherit the corresponding facility anchor. The inherited relation must be explicit; it must not be presented as a separately surveyed amenity point.

## 13. External-data adapters

### 12.1 OpenStreetMap

Overpass queries are bounded to the current map window:

- `highway` ways for roads and paths;
- `waterway` ways;
- `natural=wood` and `landuse=forest` polygons; and
- selected `amenity` values for current service points.

Live Overpass conversion retains object type, ID, version, timestamp, and tags when supplied. The checked-in snapshot may contain fewer metadata fields; the UI must not infer missing object type or edit history.

### 12.2 data.gov.sg

NParks and URA definitions point to polling/download endpoints. The loader obtains the generated dataset URL and fetches GeoJSON. Returned features are filtered to the study window for display.

Dataset catalogue dates, data periods, and raw update attributes are displayed separately when their meanings differ.

### 12.3 Fallback order

The intended load sequence is:

```text
generated in-browser snapshot for local path, if registered
    or checked-in local GeoJSON
    then remote request when appropriate
    else error state
```

The implementation may prefer a remote source or snapshot according to its loader branch, but it must return a valid `FeatureCollection` and expose failure rather than silently treating zero features as success.

## 14. Feature rendering

### 13.1 Research geometry

- Polygons render with Leaflet polygons.
- Lines render with Leaflet polylines.
- Research points render as circle markers.
- Plan-derived facilities and amenities render as numbered `divIcon` markers coloured by `primaryLens`.

Approximate extents use dashed styling. Selection increases visual weight or marker highlight without changing the underlying category.

### 13.2 Hover and selected states

Hover cards provide identity, category, purpose, spatial status, temporal scope, external navigation, and primary source. Selection writes the full card to the evidence panel and stores `selectedFeatureId`.

Marker/list/card identity is based on `id`, not display name. Duplicate or revised names therefore do not break selection if IDs remain stable.

### 13.3 Register navigation

`renderFacilityRegister()` groups official names into Chinese Garden, Japanese Garden, Lakeside Garden, and named amenities/access.

For a mapped item, a click handler:

1. resolves the feature by ID;
2. enables its assigned lens;
3. rebuilds controls;
4. moves the timeline to the feature's `from` value;
5. centres the map;
6. selects the feature; and
7. scrolls the map into view.

Unmapped records remain labelled in the register without a false navigation action.

## 15. Evidence-card design

### 14.1 Card routing

The renderer selects among:

- authored place case/article;
- edited public research;
- concise reference;
- ordinary GIS record;
- source-only plan record; or
- timeline-state evidence.

The presence of a research dossier does not authorise reuse for a different feature. Direct place identity is required.

### 14.2 Citation assembly

Related sources are assembled from:

- paragraph citations in dossiers and articles;
- feature source and purpose source;
- image source;
- spatial-audit sources;
- explicit related sources; and
- limited group-level contextual sources.

Duplicates are removed by source URL or key. Every factual public paragraph should resolve to at least one registered source with a stable URL and citation.

### 14.3 Raw GIS cards

External GIS objects render a concise explanation of what the object records, its current-reference status, source context, and all raw attributes. They must not receive a generic political-ecology interpretation.

## 16. Google Maps link resolver

`verifiedGoogleMapsPlaces` is a curated registry keyed by internal feature ID. A record may include:

```javascript
{
  name,
  address,
  placeId,      // only when independently verified
  mapsUrl,      // verified canonical place-details URL
  verification
}
```

`googleMapsLinkKind(item)` classifies the result as:

- `place-id`;
- `verified-place-url`;
- `name-search`;
- `unresolved`;
- `coordinate-fallback`; or
- no link.

Named features must not silently fall through to coordinate-only pages. GIS coordinates are preserved for mapping, but outbound named-place identity requires separate evidence.

## 17. Error handling

| Failure | Required behaviour |
| --- | --- |
| Historical tile error | Set the raster unavailable, opacity zero, and display “no current-map substitute.” |
| Current-reference remote error | Attempt fallback snapshot; otherwise mark the control unavailable. |
| Missing feature geometry | Retain record as source-only or quarantined; do not create a default point. |
| Missing citation key | Fail verification; do not publish `undefined` source content. |
| Unverified Google listing | Downgrade to labelled search or unresolved state. |
| No period photograph | Display an explicit no-photo card; do not substitute a modern image as if historically dated. |
| Empty layer selection | Display guidance and keep all controls active. |

## 18. Security and privacy

- All dynamic text must pass through HTML escaping before template insertion.
- External links must include `rel="noopener noreferrer"`.
- No credentials or paid-map API keys are required.
- The application collects no account, form, or location data from users.
- Third-party services may receive ordinary browser requests for tiles or linked pages; this should be understood as external-service behaviour, not project-side collection.
- Source images and text must respect copyright and licence conditions.

## 19. Accessibility and responsive design

- Inputs require accessible labels.
- Buttons and expandable panels must support keyboard operation.
- Focus states must remain visible.
- Layer category must be communicated through text/code as well as colour.
- Selected-state highlighting must maintain sufficient contrast.
- Desktop layout should keep controls, map, and evidence panel visually connected.
- Narrow layouts should reflow without removing functionality or content.
- Long-form articles should use readable line length and headings derived from their evidence.

## 20. Verification design

### 19.1 Automated checks

```powershell
node --check app.js
node scripts/verify-cases.cjs
```

The case verification script should test:

- published asset parity with `app.js`;
- script load order;
- source-key resolution and citation completeness;
- direct case-to-place identity;
- distinct long-form and concise states;
- representative research findings;
- layer-control grouping and visibility invariants;
- list-to-map interaction;
- brochure point status and unresolved records; and
- verified, search-based, and unresolved Google Maps behaviour.

### 19.2 Georeferencing audit

```powershell
py -m pip install numpy
py scripts/audit-brochure-georef.py
```

Any changed controls or pixel centres require review of residuals, leave-one-out errors, transformed coordinates, and managed-area flags.

### 19.3 Manual integration tests

The deployed staging or production site must be tested for:

- all five exact timeline states and transitions;
- unavailable historical tiles;
- all control groups after **Select all** and **Clear all**;
- one representative record from each garden code group;
- one named amenity;
- one remote and one fallback current-reference layer;
- one long-form article, concise reference, raw GIS card, and source-only record;
- selection highlighting and scrolling;
- verified and unverified Google Maps links;
- external source links;
- desktop and mobile layouts; and
- browser console/network errors.

## 21. Release design

`app.js` is canonical source. The release file name is derived from its SHA-256 content hash.

```powershell
$releaseHash = (Get-FileHash -Algorithm SHA256 app.js).Hash.Substring(0, 8).ToLower()
$releaseAsset = "app-$releaseHash.js"
Copy-Item -LiteralPath app.js -Destination $releaseAsset
```

`index.html` must then reference `$releaseAsset`. Verification must confirm byte equality between canonical and versioned files.

The release commit should contain all mutually dependent changes: canonical code, versioned asset, HTML reference, styles, content modules, tests, data, and documentation. The previous asset should remain available until the new GitHub Pages deployment has been verified.

## 22. Design constraints and technical debt

- Content and application data are large JavaScript literals rather than a formal database or schema-validated content format.
- Global constants create ordering dependencies among scripts.
- The generated fallback bundle is large and must not be edited manually.
- Remote source availability and cross-origin policy remain outside project control.
- Some fallback OSM metadata lacks object type, edit timestamp, and retrieval date.
- The static application has no automated end-to-end browser test suite.
- Long-form reading and map interaction share one page and may require further layout work.
- Plan-derived positions remain suitable for navigation and interpretation, not measurement.

These constraints are acceptable for the first research prototype but should be reconsidered before substantially increasing the study area, number of cases, or number of concurrent editors.

## 23. Architectural invariants

Future development must preserve the following invariants:

1. Current and historical evidence remain visually and textually distinct.
2. Source registration alone never creates historical-map eligibility.
3. Named records retain original codes and stable IDs.
4. Plan-derived coordinates never become survey claims through frontend wording.
5. An unresolved place never receives a fabricated fallback pin.
6. A feature can be revealed by its collection or its assigned research lens.
7. **Clear all** never disables subsequent interaction.
8. Public factual claims remain traceable to source records.
9. Ordinary GIS objects do not inherit generic research essays.
10. Published versioned JavaScript remains identical to canonical source.

These invariants are the core of the system's technical and research validity.
