# Jurong Heritage Trail map audit — 23 October 2026

The 25 numbered stops follow the [National Heritage Board trail](https://www.roots.gov.sg/places/places-landing/trails/jurong-heritage-trail). Every stop has a reachable individual Roots page (Science Centre uses its NHB museum page), and each page exposes a *Get Directions* latitude/longitude. Those coordinates have been transcribed to `heritage-trail.js` in latitude, longitude order. They are **NHB navigation anchors**, not reconstructed historic footprints or survey points. Public card text paraphrases the NHB account and links directly to its full page.

| # | Stop | Map representation | NHB latitude, longitude |
|---:|---|---|---|
| 1 | 60 Stalls / Market I | Current market address; former centres redeveloped | 1.3347211, 103.7215838 |
| 2 | Around the Jurong River | Reading point by present lake; not river alignment | 1.3362743, 103.7309668 |
| 3 | Former Drive-In Cinema | Roadside former-site marker; not screen footprint | 1.3313197, 103.7248967 |
| 4 | Science Centre | Current museum | 1.3330150, 103.7361990 |
| 5 | Jurong Town Hall | Standing former JTC headquarters | 1.3287218, 103.7419323 |
| 6 | Jurong Railway | One former-line access point; not 19.3 km alignment | 1.3232615, 103.7606476 |
| 7 | Pandan Reservoir | Access-side point; not shoreline | 1.3175587, 103.7486825 |
| 8 | Jurong Hill | Lookout | 1.3172861, 103.7080091 |
| 9 | Jurong Port and Shipyard | **Shares #8 lookout**; working premises inaccessible | 1.3172861, 103.7080091 |
| 10 | SAFTI | Institute compound; entry not asserted | 1.3327492, 103.6838963 |
| 11 | Peng Kang / Boon Lay origins | Present park reading point; not plantation boundary | 1.3380988, 103.7079089 |
| 12 | Hong Kah Village | Present school-area marker; not former village centre | 1.3520408, 103.7266579 |
| 13 | Nanyang University | Campus address; not whole historic campus | 1.3428220, 103.6848476 |
| 14 | Singapore Discovery Centre | Current centre | 1.3325935, 103.6789532 |
| 15 | Army Museum | Within SAFTI compound; access not asserted | 1.3319463, 103.6767913 |
| 16 | Arulmigu Murugan Temple | Current temple | 1.3414964, 103.7386828 |
| 17 | Chinese Garden | Existing GIS object retained; no second marker | 1.3389046, 103.7290602 (Roots reference) |
| 18 | Japanese Garden | Existing GIS object retained; no second marker | 1.3356557, 103.7313254 (Roots reference) |
| 19 | Church of St Francis of Assisi | Current church | 1.3481209, 103.7111628 |
| 20 | Jurong Bird Park | Former park; closed 3 January 2023 | 1.3186405, 103.7076887 |
| 21 | Brickworks and dragon kilns | Thow Kwang pottery-site anchor; not every kiln | 1.3535023, 103.6928954 |
| 22 | Masjid Hasanah | Current mosque | 1.3216954, 103.7382213 |
| 23 | Former Taman Jurong Camp | Present heritage-marker area; not camp perimeter | 1.3371603, 103.7185363 |
| 24 | Tong Whye Temple | Present temple; not original Jurong Road altar | 1.3458496, 103.7345731 |
| 25 | Tuas Tua Pek Kong Temple | Present Boon Lay temple; not original Tuas site | 1.3449349, 103.7132942 |

Result: 25 trail entries, 22 new map markers, two reused garden objects (#17–18) with an added Hidden Histories tag, and one shared viewpoint (#8–9). The 24 distinct map objects preserve the source's actual co-location rather than inventing a port-entrance marker.

Independent address check: OneMap postcode search returned a matching coordinate for #1 and #25 (both within a metre of the Roots directions point), and the Science Centre result was about 46 m from the Roots directions point. The service then returned HTTP 429 for additional lookups, so **independent address-coordinate verification remains incomplete**. The map represents all 25 as source-published orientation points and does not describe them as independently surveyed. Routes, former sites, school-area markers, the reservoir and the port viewpoint have explicit card-level location notes.

Temporal correction: the [NHB Jurong Bird Park entry](https://www.roots.gov.sg/places/places-landing/trails/landmarks/jurong-heritage-trail/jurong-bird-park) uses dated present-tense wording. [Mandai Wildlife Group confirms closure on 3 January 2023](https://www.mandai.com/en/about-mandai/media-centre/Visitors-bid-farewell-to-Jurong-Bird-Park.html); the map card labels #20 a former park. The 2024 map state is the present-day reading base for the trail; it does not imply all 25 historic sites were still functioning in 2024.
