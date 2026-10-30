# Product Requirements Document

## Layers of Nature · Jurong Lake Gardens GIS

| Field | Value |
| --- | --- |
| Document type | Product Requirements Document (PRD) |
| Product | Layers of Nature · Jurong Lake Gardens GIS |
| Repository | <https://github.com/X-GHai/layers-of-nature-jurong> |
| Version | 0.1 — design draft |
| Publication date | 12 September 2026 |
| Intended delivery | Static public website, initially on GitHub Pages |
| Status | Pre-development requirements; changes require review before implementation |

## 1. Document intent and decision context

This is the project brief to be used **before** implementation. It records the decisions the team needs to make before drawing the interface or writing the browser code. It is deliberately specific about what the product may show, what it must not imply, and what evidence must be kept with the data.

The project starts with an awkward but productive condition: Jurong Lake Gardens is well documented in fragments, not in one authoritative GIS package. Brochures name facilities that may not appear in OpenStreetMap; present-day official geometry cannot establish where a feature was in 1975; historical maps are visual evidence but not a licence to calculate exact area change. The atlas is being designed to make those distinctions legible instead of smoothing them away.

The team will work from these operating assumptions:

- the public site must be usable without an account, API key, backend, or paid map service;
- every user-facing point needs a recorded spatial basis, date status, and source path;
- an attractive pin is not sufficient evidence of a surveyed coordinate;
- a named place can be shown as unresolved when its identity or location cannot be established reliably;
- research articles are editorial objects, not automatic summaries generated from a feature type; and
- external pages, tiles, and open-data services may fail, so the first release needs local fallbacks for essential reference layers.

The requirement language below uses **must** for release gates, **should** for strong design expectations, and **may** for optional future work. It makes no claim that the product already exists or that every listed source will remain available.

## 2. Product summary

Layers of Nature is an interactive, time-enabled critical GIS about Jurong Lake Gardens in Singapore. It allows university students, instructors, and interested visitors to compare historical map evidence, inspect present-day spatial records, and read source-linked research about the landscape's ecological, cultural, infrastructural, and political transformation.

The product is neither a tourist map nor a conventional layer viewer. Its distinctive purpose is to make the **status of evidence** visible. Historical rasters, present-day reference data, official plan records, plan-derived navigation points, interpretive research objects, and unresolved locations are deliberately distinguished rather than merged into a single apparently authoritative map.

## 3. Problem statement

Jurong Lake Gardens is publicly presented as a coherent green and recreational landscape. Understanding how it came into being requires evidence distributed across historical maps, government planning records, NParks publications, heritage records, open GIS data, research publications, and site-specific documentation.

Existing public maps create four problems for this research task:

1. They emphasise present-day navigation and do not explain historical transformation.
2. Many named attractions in official brochures are absent from open point datasets.
3. Contemporary geometry can easily be mistaken for historical evidence.
4. Generic attraction descriptions do not explain the decisions, actors, materials, ecological processes, labour, and governance behind individual places.

The product must connect these sources without overstating what any one source proves.

## 4. Product vision

The product should function as a digital research atlas in which a reader can:

- see how the mapped landscape changes across selected historical and contemporary states;
- distinguish historical evidence from present-day orientation;
- locate named facilities that are missing from general-purpose open maps;
- understand why a feature is classified under a particular research lens;
- learn specific, verifiable information about significant places; and
- trace important claims back to their original sources.

The desired user reaction is not merely “I found the place,” but “I understand more clearly how this landscape was produced and how the project knows what it claims.”

## 5. Research framework

The product collectively addresses four broad dimensions derived from the instructor's political-ecology questions:

### A. Space, use, and representation

Location, facilities, amenities, intended and observed users, activities, purposes, access, and official promotion.

### B. Historical and spatial transformation

Previous land and water uses, industrialisation, lake formation, park establishment, redevelopment, and cultural heritage.

### C. Ecological authenticity and outcomes

Existing and constructed nature, restoration methods, engineered habitats, maintenance, and the difference between intended and demonstrated ecological outcomes.

### D. Silences, power, and interpretation

Planning and management decisions, participation, labour, rules, institutional narratives, omitted histories, and possible improvements to public interpretation.

These dimensions guide the project as a whole. They are not mandatory headings or fields for every information card.

## 6. Target users

### 5.1 Primary users

**University students** use the site to explore spatial evidence, develop arguments, and trace claims to sources for political ecology, urban geography, heritage, planning, or environmental studies.

**Instructors and assessors** use it to evaluate whether the project distinguishes evidence from interpretation and whether its conclusions are traceable.

### 5.2 Secondary users

**Curious visitors and residents** use the atlas to understand the history and making of places they encounter in the Gardens.

**Future project maintainers** use the source register, research archive, and spatial-status system to revise the project without erasing provenance.

## 7. Product principles

1. **Evidence status must be visible.** A historical map, official polygon, OSM object, plan-derived point, and analytical orientation feature must not appear interchangeable.
2. **Uncertainty is a data state, not a failure to hide.** An unresolved place should remain unresolved rather than receive a fabricated pin.
3. **Research must be place-specific.** Substantive cases should teach distinctive knowledge about the selected location.
4. **Current data must not masquerade as historical data.** Event dates and map dates require different visual and textual treatment.
5. **Sources must remain reachable.** Important factual claims require direct source links and intelligible citations.
6. **The map and the reading experience must work together.** Lists, layers, map selection, and evidence cards must remain synchronised.
7. **The interface should remain useful without specialist GIS knowledge.** Technical qualifications must be available without overwhelming the main narrative.

## 8. Release-one scope

### 8.1 Included

- A Leaflet map centred on Jurong Lake Gardens.
- Present-day OneMap tiles for orientation.
- NUS Libraries historical rasters for 1953, 1971, and 1975.
- Dated event states for 2019 and 2024 displayed over the present-day base map with an explicit warning.
- Six thematic research lenses.
- Two named-record collections.
- Six current-reference GIS layers.
- Fifty-three numbered NParks brochure facilities.
- Fourteen named amenity and access records.
- Source-aware feature cards and raw GIS attributes.
- Place research, concise references, and selected long-form case studies.
- A period-image/reference section and a source register.
- Outbound Google Maps navigation governed by a verification policy.
- Local fallback snapshots for remote current-reference datasets.

### 8.2 Explicitly outside release one

- A separate National Heritage Board Jurong Heritage Trail layer or interface.
- A quantitative shoreline or land-area change calculator.
- Survey-grade facility coordinates.
- A reconstruction of every state between the five timeline stops.
- User accounts, editing, comments, or collaborative annotation.
- A server-side database, search engine, or content-management system.
- Real-time field observations, visitor counts, ecological monitoring, or analytics.
- Guaranteed availability of third-party map and source services.

## 9. Functional requirements

### FR-1: Timeline navigation

The product shall provide five stops: 1953, 1971, 1975, 2019, and 2024.

- 1953, 1971, and 1975 shall be identified as published historical map references.
- 2019 and 2024 shall be identified as documented event states displayed on present-day OneMap.
- The interface shall state that visual comparison does not measure change in area or shoreline.
- The product shall not silently replace an unavailable historical raster with the current base map.
- The removed 1963 state shall not reappear unless study-area coverage and service reliability are validated.

### FR-2: Animated comparison

The user shall be able to play or pause movement through the timeline. Historical rasters may cross-fade for visual comparison. The animation must preserve the distinction between map evidence, transitions, and present-day orientation.

### FR-3: Research-lens filtering

The product shall provide the following lenses:

- Ecology
- Engineered Nature
- Heritage & Memory
- Governance
- Public Use
- Hidden Histories

Enabling a lens shall display its research objects and named plan records assigned to that lens.

### FR-4: Named-record collections

The product shall provide separate controls for:

- Facilities & Attractions
- Amenities & Access

These controls shall reveal their complete collections regardless of thematic assignment. A named plan record shall be visible when either its collection or its primary research lens is selected.

### FR-5: Current-reference data

The product shall provide:

- Roads & paths
- Waterways
- Waterbodies
- NParks managed green
- Woodland / forest reference
- Amenity reference points

These layers shall be identified as current reference data and shall appear only in the present-day state. A loading or unavailable status shall be visible.

### FR-6: Select all and clear all

The user shall be able to enable or clear all layer controls. After clearing all layers, every checkbox and named-place link must remain functional. Selecting a place from a register must restore the layer needed to display it.

### FR-7: Map selection and highlighting

Selecting a feature shall:

- identify the same object in the evidence panel;
- preserve its stable code or feature ID;
- highlight the corresponding map symbol;
- display its spatial status and geometry type; and
- provide its primary and related sources.

### FR-8: Named-place registers

The facilities and amenities section shall retain the official numbering or internal code for every record. Clicking a mapped row shall reveal the correct layer, move to the appropriate timeline state, centre the map, highlight the marker, and open the matching evidence card.

Unresolved rows shall remain visible but shall not behave as if they have verified geometry.

### FR-9: Evidence cards

The interface shall support distinct card types:

- substantive place research;
- concise factual reference;
- ordinary GIS attribute record;
- source-only or unresolved record; and
- historical/event-state explanation.

Ordinary OSM or open-data objects shall not receive generic political-ecology essays. Substantive place research shall not be generated from a universal narrative template.

### FR-10: Sources and citations

The user shall be able to open the source supporting a spatial record or research claim. Public research paragraphs shall remain traceable to the internal source register. Publication dates, dataset vintages, event dates, and retrieval dates shall not be presented as equivalent.

### FR-11: Google Maps navigation

For outbound navigation, the product shall use the following priority:

1. verified Place ID;
2. verified canonical place-details URL;
3. clearly labelled official-name-and-address search;
4. unresolved status when a named listing cannot be matched reliably; or
5. coordinate fallback only for unnamed custom points.

The product shall not manufacture Place IDs, addresses, ratings, or listings.

### FR-12: Data fallback

When live Overpass or data.gov.sg requests fail, the application shall attempt to load checked-in GeoJSON snapshots. If both sources fail, the interface shall report the layer as unavailable rather than display an unexplained empty result.

## 10. Content and research requirements

### CR-1: Knowledge contribution

A substantive case must provide specific knowledge beyond a short attraction description. This may include named actors, dated decisions, materials, design processes, ecological mechanisms, former uses, participation, labour, observed use, documented outcomes, or contested trade-offs.

### CR-2: Individual investigation

Every substantive location must be treated as an individual research subject. Its public structure and length should follow the evidence available for that place.

### CR-3: Evidence and interpretation

Documented facts, interpretation, and unresolved questions must remain distinguishable. Critical claims about power, exclusion, ecological success, participation, or omission require supporting evidence.

### CR-4: Concise reference status

If meaningful additional evidence cannot be found after reasonable research, the location should remain a concise reference entry rather than being padded with generic analysis.

### CR-5: Research archive

The internal archive must preserve source records, claim-level evidence, uncertainty, spatial provenance, temporal validity, and unresolved questions even when only selected findings appear in the public card.

## 11. Spatial-data requirements

### SR-1: Provenance

Every ingested dataset must retain its original feature identifiers and relevant attributes. Missing provenance must not be reconstructed by frontend inference.

### SR-2: Spatial status

Each feature must carry an intelligible status such as official planning geometry, open reference geometry, plan-derived point, orientation point, approximate extent, quarantined, or source-only.

### SR-3: Brochure-derived points

The 53 brochure positions must retain their original codes. Their transformed coordinates must be described as orientation points, not surveyed locations. Points that fail spatial review must be quarantined or left source-only.

### SR-4: Historical integrity

Present-day OSM, NParks, URA, facility, and amenity geometry must not appear on historical map states in a way that implies historical presence.

## 12. User-experience requirements

- The primary map, layer controls, timeline, and selected evidence must be usable without reading a methodology document first.
- Evidence qualifications must use plain language.
- Research depth must not be hidden behind an unnecessary second “Read the case study” action.
- Long-form content must remain readable without losing the selected map location.
- Desktop layouts should use available horizontal space while preserving clear association among register rows, lenses, and map markers.
- Mobile layouts must preserve the complete functionality in a single-column reading order.
- Codes, labels, or symbols must supplement colour categories.
- Buttons, checkboxes, links, and expandable sections must remain keyboard operable and visibly focused.

## 13. Non-functional requirements

### NFR-1: Deployment

The product must remain deployable as static files on GitHub Pages under a repository subpath.

### NFR-2: Performance

The initial interface should become usable before optional current-reference layers finish loading. Large fallback data should be loaded only as needed or from the generated snapshot bundle.

### NFR-3: Resilience

A single failed third-party data request must not prevent the remainder of the application from operating.

### NFR-4: Security

Dataset and content strings inserted into HTML must be escaped. External links must use `noopener noreferrer`. No private API key or credential may be committed.

### NFR-5: Maintainability

Canonical application source, research content, fallback data, styling, and generated release assets must remain separate. A published versioned asset must match the canonical source byte for byte.

### NFR-6: Auditability

Raw attributes, source links, spatial status, and temporal qualification must remain accessible to users and maintainers.

## 14. Success criteria

The first release will be considered successful when users can:

- distinguish the three historical rasters from the two event states;
- understand why OneMap is present-day orientation rather than historical evidence;
- find named brochure facilities that are absent from general-purpose maps;
- see how each named record relates to a research lens;
- move from the list to the correct highlighted map marker;
- learn specific, source-supported information from substantive cases;
- inspect ordinary GIS objects without receiving fabricated narratives;
- identify unresolved locations instead of being sent to misleading coordinates; and
- open the sources supporting the map and written claims.

## 15. Release acceptance criteria

A release is acceptable only when:

1. automated content and syntax verification passes;
2. the published versioned asset matches canonical `app.js`;
3. all five timeline states render with correct notices;
4. current-only layers remain hidden from historical states;
5. all controls still work after **Clear all**;
6. representative `C`, `J`, `L`, and amenity records link to the correct highlighted marker and card;
7. unresolved records remain unpinned;
8. representative long-form, concise, raw-GIS, and source-only cards render correctly;
9. verified Google Maps examples open the intended named listing;
10. citations open the expected source;
11. desktop and mobile layouts remain usable; and
12. the deployed GitHub Pages site is tested after cache propagation.

## 16. Product risks

| Risk | Product response |
| --- | --- |
| Historical raster service becomes unavailable | Show an unavailable state; do not substitute a current map silently. |
| Brochure point is spatially misleading | Quarantine it and retain the source-only record. |
| OSM or official data changes | Preserve snapshot date, IDs, raw attributes, and re-audit before updating. |
| Research cards become repetitive | Require place-specific discoveries and concise-reference classification. |
| Google listing changes or disappears | Reverify; downgrade to labelled search or unresolved status. |
| User mistakes event date for map date | Keep the event-state warning adjacent to the map. |
| External sources or images disappear | Retain full citation metadata and avoid unsupported replacement material. |

## 17. Future opportunities, not release-one commitments

- A carefully designed NHB Jurong Heritage Trail layer after spatial deduplication and scope review.
- Field-verified coordinates for currently plan-derived or unresolved facilities.
- A dedicated long-form reading mode with an article-specific table of contents.
- Improved source archiving and claim-level page references.
- Measured ecological or visitor-use outcomes when suitable datasets become available.
- A documented, reproducible refresh pipeline for all external datasets.

These opportunities require separate approval and must not be represented as functionality in release one.

## 18. Delivery sequence and editorial gates

The team will not begin by filling the map with every available point. The delivery sequence is designed to prevent visual completeness from being mistaken for research completeness.

### Phase 1 — evidence inventory

Create a source ledger before importing data. Each entry records the owner, title, stable URL, publication or creation date where known, retrieval date, licence or access condition, spatial relevance, and the claims it can support. A source link by itself is not enough: the ledger must say whether it supports a location, a date, a construction process, a factual claim, or only general context.

### Phase 2 — spatial assembly

Load official and open reference data without rewriting original identifiers. Add brochure features only after their circle codes, image coordinates, control points, transformation method, and review status have been stored. Features that fail review enter the register as source-only or quarantined; they are not moved by eye until they look plausible.

### Phase 3 — reading and case selection

Separate routine map records from substantive cases. For every proposed long-form case, the researcher must record: (a) its exact identity; (b) the three most promising source trails; (c) the factual discovery that justifies a full article; (d) what is known only from promotional copy; and (e) a reason to stop if no deeper evidence emerges. This prevents generic prose from becoming the default outcome.

### Phase 4 — interaction build

Implement map state, layer state, selection state, and panel state as separate but synchronised concerns. The primary regression scenario is deliberate: clear all layers, select a record from a register, and verify that the required layer, marker, focus, and card are restored without changing the historical/current distinction.

### Phase 5 — release review

Before public deployment, two reviewers should test the acceptance criteria independently: one follows source and factual claims; the other follows state changes, links, keyboard behaviour, responsive layout, and degraded external-data conditions. Disagreements are entered in the issue log rather than resolved by silently editing a description.

### Required case-review record

For each substantive article, retain a short internal record answering:

1. What three concrete things will the reader learn?
2. Which findings come from sources beyond a general attraction page?
3. Which claim is interpretive, and what documented facts support it?
4. What competing wording, date, name, or spatial identification was checked?
5. What remains uncertain, and does it belong in the public card or only in the research archive?

An article fails editorial review if its specific place name could be replaced with another attraction's name without changing the substance.
