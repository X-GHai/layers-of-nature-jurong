/* Edited visitor narratives. The longer caseResearch dossiers remain the claim-level archive.
 * An omitted case is intentionally a concise reference entry, not an unfinished essay.
 * Each section is a finding with the source keys needed to verify it.
 */
const publicResearch = {
  'jurong-lake': [
    { title: 'A lake made by controlling a river', text: 'Sluice works at the mouth of Jurong River were completed in 1971, creating the lake in which Japanese Garden opened in 1973 and Chinese Garden in 1975. The recreational water landscape therefore followed an engineering decision; it was not an inherited natural lake.', refs: ['pmoOpening'] },
    { title: 'The later ecology is deliberately new', text: 'NParks’ habitat-restoration handbook calls Jurong Lake Gardens a novel landscape: industrial change had altered the earlier wetland and its hydrology too extensively for a complete return. Its restoration programme creates habitat within this changed setting, while PUB’s ABC Waters programme also treats the lake edge as water infrastructure.', refs: ['habitatHandbook25', 'nparksWetlands'] }
  ],
  'water-engineering': [
    { title: 'Two generations of water engineering', text: 'The 1971 sluice works formed Jurong Lake. Decades later, hydrological analysis of waterlogged Lakeside Garden ground led designers to introduce vegetated swales and reshape a concrete canal into Neram Streams. These are distinct interventions: one made the lake, while the later works manage water within the public garden.', refs: ['pmoOpening', 'habitatHandbook25'] },
    { title: 'Treatment can be more than planting', text: 'At Clusia Cove, NParks describes sand and planted cleansing cells alongside filter media, ultraviolet disinfection and recirculation pumps. The result is a managed play-water system, not simply a pond that cleans itself.', refs: ['nparksClusia'] }
  ],
  'lakeside-garden': [
    { title: 'A phased public landscape', text: 'The 60-hectare Lakeside Garden opened in phases in April 2019 and April 2023. Henning Larsen describes its design commission as 53 hectares; the figures refer to different project scopes rather than a documented loss of seven hectares. The rejuvenated Chinese and Japanese Gardens reopened separately in September 2024.', refs: ['habitatHandbook25', 'henningLarsenJLG', 'nparks2024Opening'] },
    { title: 'What reported popularity establishes', text: 'At the September 2024 opening, the government reported 25 million visits to Lakeside Garden since 2019, including repeat visits. This shows substantial reported use, but the total counts visits, not 25 million individual people.', refs: ['pmoOpening'] }
  ],
  'chinese-garden': [
    { title: 'Ponds, industry and a public garden', text: 'NHB records fish and prawn ponds on land developed for Chinese Garden. Construction began in 1971 and the garden was completed in April 1975 as part of JTC’s industrial-estate programme. At the opening, Finance Minister Hon Sui Sen explicitly contrasted an older elite garden tradition with a public amenity for Jurong.', refs: ['nhbChinese', 'nas1975'] },
    { title: 'A borrowed architectural vocabulary', text: 'The 1975 opening speech links the Nine-Arch Bridge, Stoneboat and Tea House to designs at Beijing’s Summer Palace. These structures were deliberate cultural choices in a newly made Singapore landscape, not survivals from the earlier ponds.', refs: ['nas1975', 'nhbChinese'] }
  ],
  'japanese-garden': [
    { title: 'A designed island with a precise chronology', text: 'Work began in May 1968 on a man-made island. Japanese landscape designer Kinsaku Nakane designed the 32-acre garden, which opened officially in February 1973. A 1970 cycad planting by Akihito and Michiko belongs to the construction period, not to the opening date.', refs: ['nhbJapanese', 'nparksJapanese'] },
    { title: 'A second design generation', text: 'The 2024 reopening introduced new gardens and community collaborations within this older landscape. Floral Garden’s student-led planting plots are therefore a recent layer, not part of Nakane’s original 1973 scheme.', refs: ['nparks2024Opening', 'spFloral'] }
  ],
  'former-fish-ponds': [
    { title: 'A productive waterside preceded the scenery', text: 'NHB identifies fish and prawn ponds beside Jurong River before Chinese Garden. Its account links their replacement to construction under JTC’s industrial-estate plan beginning in 1971. The evidence establishes a change from food-production landscape to public garden, but does not name individual pond operators.', refs: ['nhbChinese'] }
  ],
  'industrial-estate': [
    { title: 'Recreation was built alongside industry', text: 'By 1969 Jurong had 181 factories and a workforce of 20,000, according to NHB. Its history also records cinemas and free Sunday boating among amenities intended to help workers settle in the new town. The garden’s leisure role belongs to that wider industrial project.', refs: ['nhbIndustrial'] },
    { title: 'Workers have names, not just numbers', text: 'NHB’s Industrious Pioneers account includes Halijah binte Sulaiman, who polished cutlery at WMF, alongside a family’s experience establishing a Jurong hair salon. These lives give the regional industrial past a human scale; neither account places its subjects on the present garden site.', refs: ['nhbPioneers'] }
  ],
  'freshwater-swamp': [
    { title: 'Restoration without a claim of untouched nature', text: 'NParks’ technical handbook describes Jurong Lake Gardens as a novel landscape whose former swamp and mangrove hydrology cannot simply be reinstated. Its habitat plan retained mature shoreline Ficus, surveyed existing bird-rich vegetation and planted buffer woodlands and corridors. Garden-wide totals of more than 3,000 conserved and 200 transplanted trees are not swamp-specific counts.', refs: ['habitatHandbook25'] },
    { title: 'A public edge and a wildlife refuge', text: 'Rasau Walk brings visitors along 300 metres of restored swamp planting. Landscape architect Cathy Hang says the nearby Alstonia Island was kept off-limits to let wildlife occupy a less disturbed area, with flood-tolerant native trees planted to acclimatise there. The separation of access and refuge is an intentional design choice, not evidence that a historical swamp has returned intact.', refs: ['nparksRasau', 'cnaHang2026', 'habitatHandbook25'] }
  ],
  'grasslands': [
    { title: 'Grassland by design', text: 'The 2023 NParks handbook records six grass species planted across a 3.5-hectare open area selected through biodiversity planning. It reports Scaly-breasted Munia flocks and Zitting Cisticola sightings. These are observations of habitat use, not a standardised population trend.', refs: ['habitatHandbook25'] },
    { title: 'Bird habitat and industrial memory share the site', text: 'The planted area includes bird hides and the Lone Tree sculpture made from reclaimed reinforcement steel. Visitors encounter a constructed habitat and an industrial-history symbol in the same Grasslands, rather than a preserved fragment of pre-industrial vegetation.', refs: ['nparksGrasslands', 'cnaHang2026'] }
  ],
  'forest-ramble': [
    { title: 'Swamp wildlife became a play design', text: 'Forest Ramble is a 2.3-hectare playgarden with 13 adventure stations based on movements of freshwater-swamp animals. NParks’ restoration handbook places this animal-themed equipment within the garden’s naturalisation programme: habitat ideas were translated into climbing and movement, not merely placed on interpretive signs.', refs: ['nparksForest', 'habitatHandbook25'] },
    { title: 'What the design can and cannot show', text: 'The official page describes inclusive play elements. That establishes an intended provision for different children; neither it nor the handbook measures which children use the equipment or what they learn from it.', refs: ['nparksForest', 'habitatHandbook25'] }
  ],
  'lone-tree-memory': [
    { title: 'Who made the tree, and from what', text: 'Landscape architect Cathy Hang describes a Lone Tree built from rebar recovered from old park paths and a demolished carpark. She names contractor supervisor Lao Gao as the maker who translated the design into a physical sculpture. The material literally carries traces of earlier construction into a new landscape.', refs: ['cnaHang2026', 'nparksGrasslands'] },
    { title: 'A symbol that visitors use differently', text: 'NParks frames it as an industrial-memory landmark and potential raptor perch. Hang also reports graduation, proposal and wedding photographs there. Those examples document use beyond the official symbolism; the proposed perch is not itself evidence of measured bird use.', refs: ['nparksGrasslands', 'cnaHang2026'] }
  ],
  'community-engagement': [
    { title: 'What the 14,000 figure counts', text: 'NParks reports more than 14,000 suggestions and feedback submissions for Gardens Central and East collected between November 2016 and April 2017, with ideas incorporated where feasible. This is a count of submissions, not of unique people or accepted changes.', refs: ['nparks2024Opening'] },
    { title: 'Consultation followed the project decision', text: 'The official opening speech places the decision to refresh and combine the gardens before the consultation period. Henning Larsen reports more than 17,000 suggestions across a broader multi-year design process. The differently scoped figures should not be added together; they show public input within a redevelopment framework that had already been set.', refs: ['pmoOpening', 'henningLarsenJLG', 'nparks2024Opening'] }
  ],
  'living-lab-governance': [
    { title: 'Sensors moved from proposal to some operation', text: 'NParks’ Smart Technology page still describes central monitoring in future tense, but its 2023 restoration handbook says an Integrated Management System linked environmental and facility sensors to a central platform for day-to-day operations. Read together, the sources document at least some implementation without identifying every sensor or its coverage.', refs: ['nparksSmart', 'habitatHandbook25'] },
    { title: 'A named funding relationship', text: 'NParks also identifies a S$1 million Micron donation, through the Garden City Fund, for Japanese Garden’s pumped and vegetation-and-microbe water-filtration system. The gift documents one route by which engineered ecology was financed; it does not reveal the system’s total lifetime cost.', refs: ['nparksWaterSystems'] }
  ],
  'floral-community-plots': [
    { title: 'Students shaped a selected planting design', text: 'On 24 April 2024, NParks and JTC briefed Singapore Polytechnic’s first-year landscape-architecture students. Their planting proposals formed part of a foundation module; Team 3’s design was selected after reviews. Its curved white-flower band represented meandering water and purity, while plant availability and upkeep shaped the final choice.', refs: ['spFloral'] },
    { title: 'Participation included physical labour', text: 'Students returned on 21 July to install planting and materials. Team member Tan Rui Ann described repeated design changes and the tiring work of planting with a small changkol. This was more than a request for suggestions: students designed and built their plot, although the account does not establish that they controlled the whole garden or its later maintenance.', refs: ['spFloral'] },
    { title: 'A new layer within an older garden', text: 'The five plots belong to the 2024 rejuvenation of Japanese Garden, which first opened in 1973. NParks names JTC, four educational institutions and Friends of Jurong Lake Gardens as partners; the Singapore Polytechnic account substantiates the specific process of one student team, not the processes at the other institutions.', refs: ['nparks2024Opening', 'nhbJapanese', 'spFloral'] }
  ],
  'stoneboat': [
    { title: 'An imperial reference in a public garden', text: 'Hon Sui Sen’s 1975 opening speech explicitly connected the Stoneboat, Nine-Arch Bridge and Tea House to Beijing’s Summer Palace designs, then contrasted imperial gardens with Jurong’s new public amenity. This was a deliberate transfer of architectural imagery into an industrial town.', refs: ['nas1975'] },
    { title: 'A landmark used for civic life', text: 'Today NParks describes the two-storey Stoneboat beside Lotus Pond and records that it once housed a branch of the Registrar of Marriage. The building was not only scenery: at least for a period it accommodated a public institution. The page does not establish the years of that use.', refs: ['nparksStoneboat'] }
  ],
  'neram': [
    { title: 'A straight canal becomes braided streams', text: 'NParks’ technical chapter describes replacing a 300-metre concrete monsoon canal with vegetated braided channels after identifying wet, low-lying ground. Designer Henning Larsen reports 900 metres of resulting stream branches. The two lengths refer to different geometries—one former canal versus the aggregate new branches—not a measured threefold improvement in water quality.', refs: ['habitatHandbook25', 'henningLarsenJLG'] }
  ],
  'allotments': [
    { title: 'A garden allocated, not simply open', text: 'NParks describes 300 raised-bed plots measuring 2.5 by 1 metre under an allotment scheme. Its 2023 handbook reported all 300 subscribed at that time. The plots provide a documented form of resident cultivation, but allocation—not casual access—governs who can grow there.', refs: ['nparksAllotments', 'habitatHandbook25'] }
  ],
  'clusia': [
    { title: 'The play water travels through a treatment loop', text: 'Clusia Cove combines tidal-themed children’s water play with a cleansing biotope and eco-pond. NParks describes water passing through sand and planted cells, Active Filter Media and ultraviolet disinfection before returning to play and recirculating through the pond. Its apparently natural water experience depends on engineered filtration, pumps and maintenance.', refs: ['nparksClusia', 'nparksWaterSystems'] }
  ],
  'water-lily': [
    { title: 'A cultivated collection with an engineered water supply', text: 'NParks promotes more than 150 water-lily species here. Its sustainability account also describes pumped water filtered through vegetation and microorganisms in Japanese Garden, supported by a S$1 million Micron gift. The collection is horticultural richness maintained by designed water systems; its species total is not a census of native wetland biodiversity.', refs: ['nparksLily', 'nparksWaterSystems'] }
  ]
};

// Concise references are deliberately not presented as researched narratives.
const publicReference = {
  'jurong-river-trace': { title: 'Before the lake', text: 'Historical Jurong maps show the river landscape before and during lake formation. The 1971 sluice works are independently dated in the official opening account; this record does not map a precise former channel.', refs: ['nus1953', 'nus1971', 'pmoOpening'] },
  'floating-wetlands': { title: 'A constructed wetland', text: 'NParks describes a man-made floating wetland in the northern gardens, combining PUB’s ABC Waters water-quality purpose with wildlife habitat and a public boardwalk.', refs: ['nparksWetlands'] },
  'therapeutic-garden': { title: 'Designed for different needs', text: 'NParks describes separate adult and children’s sections with wheelchair access, sensory planting and raised beds, including provisions intended for seniors with dementia.', refs: ['nparksTherapeutic'] },
  'access-network': { title: 'Arriving and getting around', text: 'NParks lists MRT, bus and carpark approaches alongside information counters and wheelchair rental. These services form part of the garden’s access network.', refs: ['nparksGettingHere', 'nparksServices'] },
  'management': { title: 'Rules for shared space', text: 'NParks’ garden guidelines cover feeding wildlife, plant removal, dogs, litter, smoking and movement in shared areas, with stated accessibility exceptions.', refs: ['nparksVisitorGuidelines'] },
  'visitor-governance': { title: 'Where movement is regulated', text: 'NParks publishes visitor etiquette and a no-cycling-zone map, including rules and exceptions relevant to different visitors.', refs: ['nparksVisitorGuidelines'] },
  'jurong-lake-district-vision': { title: 'The wider planning district', text: 'URA traces the district to the 1991 decentralisation strategy and a 2008 blueprint linking commercial Jurong Gateway with leisure-oriented Lakeside within a 410-hectare plan.', refs: ['uraJurongLakeDistrict'] },
  'grand-arch': { title: 'An entrance with later additions', text: 'NParks identifies the Grand Arch as a landmark since 1975 and now locates the Gardens Gallery, Plant Factory and Canopy around it. Its inscription reads 乾坤清气.', refs: ['nparksGrandArch'] },
  'bonsai': { title: 'A later garden within Chinese Garden', text: 'NParks dates the Bonsai Garden’s horticultural history from 1992 and describes a Suzhou-style setting for miniature landscapes.', refs: ['nparksBonsai'] },
  'rasau': { title: 'A walk through planted swamp habitat', text: 'NParks describes a 300-metre boardwalk with more than 50 plant species, including Nibong, Sealing Wax Palm and Rasau.', refs: ['nparksRasau'] },
  'creek': { title: 'Five river stages in one display', text: 'NParks describes Cascading Creek as a designed visitor route through five representative river stages, from highland streams to lowland swamps.', refs: ['nparksCreek'] }
};

