/* Individually researched articles. A missing record means that the place keeps
 * its existing concise card; it does not inherit another place's narrative. */
const atlasArticles = {
  'living-lab-governance': {
    status: 'case-study',
    title: 'Living Lab: the technology behind a managed landscape',
    lead: 'Jurong Lake Gardens is operated through more than horticulture. Sensors, software, water-treatment systems and temporary technology trials connect environmental care to maintenance, mobility and the monitoring of public space.',
    sections: [
      { heading: 'A garden watched from a central system', paragraphs: [
        { text: 'The Integrated Garden Management System brings environmental and facilities information into one monitoring and control platform. This is not merely a proposal: the 2023 habitat-restoration handbook says the system was implemented, and NParks’ 2022/2023 annual report describes it as integrating operational sensors for situational awareness, faster response and visitor experience.', refs: ['habitatHandbook25', 'nparksAR2023'] },
        { text: 'NParks deputy director Ong Chong Ren gives the system physical specificity. He names smart bins with capacity sensors, lighting systems that report faults, and environmental instruments monitoring water quality and weather. His account also identifies the central engineering problem: devices supplied for different purposes had to communicate and transmit information reliably to one platform.', refs: ['ctrlShiftTech'] }
      ] },
      { heading: 'The 2019 brief reveals the work technology was meant to replace', paragraphs: [
        { text: 'An IMDA and NParks industry briefing makes the pre-trial labour process unusually visible. Bin clearance depended on contractor patrols, bagging waste and driving buggies to bin centres; water quality was checked through manual sampling; underwater inspection could require draining a pond; staff patrolled for smoking, wildlife feeding, damaged lights and vandalism; and service vehicles entering the garden required a security escort. “Smart” systems were proposed against these specific routines, not as an abstract digital layer.', refs: ['imdaSmartEstate2019'] },
        { text: 'The briefing listed a core maintenance team of fifteen cleaners and five security guards for the 2019 phase and proposed seven challenge areas: automated bin clearance, augmented-reality wayfinding, autonomous fault detection, visitor-service robots, vehicle escort, water-quality monitoring and a digital twin. Those were procurement problems and desired outcomes. They must be distinguished from the bin sensors and building-management data described as already present, and from technologies later documented as implemented or trialled.', refs: ['imdaSmartEstate2019'] },
        { text: 'The water-monitoring brief specified pH, temperature, turbidity, dissolved oxygen, conductivity, dissolved solids, salinity, ammonia, chloride, nitrate and chlorophyll-a, with threshold alerts and possible pump activation. This is evidence of the monitoring ambition and the parameters considered operationally useful. It does not prove that the complete mobile monitoring device was procured or that every parameter entered continuous operation.', refs: ['imdaSmartEstate2019'] }
      ] },
      { heading: 'What central monitoring changes in daily work', paragraphs: [
        { text: 'A dated Jurong Lake District account explains the operational chain. Weather monitoring can automatically reduce irrigation during wet conditions; electricity and water monitoring can flag abnormal use or leakage; some building equipment can be controlled remotely; and GPS can show the location of the transport fleet. The system therefore turns observations into maintenance decisions rather than simply displaying environmental data.', refs: ['jldSmart2022'] },
        { text: 'Ong reports that centralisation lets staff react faster and redirect attention to other work. This is evidence of an operator’s assessment, not a published labour study. None of the reviewed sources provides baseline staffing hours, water and electricity savings, false-alert rates, maintenance costs or a public performance dashboard, so those outcomes cannot yet be quantified.', refs: ['ctrlShiftTech', 'jldSmart2022'] }
      ] },
      { heading: 'A testbed for mobility and surveillance', paragraphs: [
        { text: 'The Living Lab also tested technologies concerned with people. In 2022, an 11-seat autonomous vehicle was trialled at Lakeside Garden by NParks with ST Engineering Solutions and Willers. The stated purpose was to test efficacy, sustainability and safety while exploring easier access for older visitors and families with young children. A trial demonstrates an experiment, not a permanent transport service or a successful outcome.', refs: ['jldSmart2022'] },
        { text: 'NParks also worked with Ngee Ann Polytechnic, IMDA and Xjera Labs on autonomous security and surveillance robots. Cameras and video analytics were described as detecting drones, fishing outside designated zones and faults in public facilities; the robots could also provide directions and connect visitors with security staff. NParks’ annual report later names the autonomous robot JuLee. These records show that “smart sustainability” included behaviour monitoring, security and visitor service, not only resource conservation.', refs: ['jldSmart2022', 'nparksAR2023'] }
      ] },
      { heading: 'Engineered water systems are not all the same', paragraphs: [
        { text: 'At Clusia Cove, water play, an ecological pond and a cleansing biotope form a closed circulation loop. Sand-bed cleansing cells remove particulate matter while water is reused within the attraction. In Japanese Garden, a different system combines pumps with vegetation and soil microorganisms to clean and restore water associated with Water Lily Garden and the wider garden. These are two distinct engineered ecologies and should not be collapsed into a single generic “natural filtration” claim.', refs: ['nparksWaterSystems'] },
        { text: 'NParks records that Micron Technology donated S$1 million through the Garden City Fund to support the Japanese Garden system. This establishes a route through which private finance entered public environmental infrastructure. It does not establish Micron’s control over design or operation, nor does the donation amount reveal total capital and lifetime costs.', refs: ['nparksWaterSystems', 'nparks2024Opening'] }
      ] },
      { heading: 'Why this is a novel landscape, not automated wilderness', paragraphs: [
        { text: 'The restoration handbook classifies Jurong Lake Gardens as a “novel” landscape: a designed and managed ecosystem in a place whose earlier ecological and hydrological conditions were substantially altered. The same chapter situates the Living Lab within eight focus areas spanning ecology, food, waste, energy and outdoor comfort, materials, water, social and mobility needs, and operations. The list is a programme framework; it is not proof that every proposed intervention was installed.', refs: ['habitatHandbook25'] },
        { text: 'This classification clarifies the relationship between technology and nature. Sensors were not added to an untouched ecosystem. They help operate landscapes already produced through damming, drainage, construction, planting and continuous maintenance. Ecological appearance and technical management are therefore interdependent rather than opposites.', refs: ['habitatHandbook25', 'nhbChinese', 'pmoOpening'] }
      ] },
      { heading: 'The political ecology of a smart public garden', paragraphs: [
        { text: 'The Integrated Management System concentrates knowledge about weather, water, facilities, security and movement in an operational platform. That can reduce waste and speed response, while also making managers—not visitors—the primary audience for much of the garden’s environmental data. The robot trials extend the same infrastructure from resource management into the regulation of conduct in public space.', refs: ['ctrlShiftTech', 'jldSmart2022'] },
        { text: 'A stronger public interpretation would identify which systems remain active, map what each one measures, publish dated resource and water-quality results, and distinguish continuing services from completed trials. The present evidence supports implementation and named capabilities. It does not yet demonstrate whole-life sustainability, measured ecological improvement or the long-term success of every experiment.', refs: ['habitatHandbook25', 'nparksAR2023', 'jldSmart2022'] }
      ] }
    ],
    audit: { beyondAttraction: ['imdaSmartEstate2019', 'habitatHandbook25', 'jldSmart2022', 'ctrlShiftTech', 'nparksAR2023'], findings: ['The 2019 briefing documents the manual labour and monitoring routines that proposed technologies were intended to alter.', 'Named sensors and their integration challenge are documented by the responsible NParks deputy director.', 'The Living Lab included dated autonomous-mobility and surveillance-robot trials, not only environmental monitoring.'], uncertainty: 'Installed sensor counts and locations, commissioning records, quantified savings, labour effects, trial outcomes, maintenance contracts, system costs and current 2026 operating status are not published in the reviewed sources.' }
  },
  'floral-community-plots': {
    title: 'Floral Garden: a student design enters a national garden',
    lead: 'One plot in the reopened Japanese Garden can be followed from a classroom brief to a planted landscape. That trail shows what “co-creation” involved—and where the available account stops.',
    sections: [
      { heading: 'A brief with named people and institutions', paragraphs: [
        { text: 'On 24 April 2024, NParks and JTC briefed first-year Diploma in Landscape Architecture students at Singapore Polytechnic. The project became part of their Landscape Architecture Foundation module. NParks staff Jason Wright and Dr Wilson Wong and JTC representative Tan Jian Hao joined the briefing; lecturer Idris Bidin guided the students. This was not an open-ended design of the entire Japanese Garden: the brief concerned a planting plot within Floral Garden.', refs: ['spFloral'] },
        { text: 'NParks places that plot within a wider collaboration involving ITE College East, Nanyang Academy of Fine Arts, Ngee Ann Polytechnic, Singapore Polytechnic and Friends of Jurong Lake Gardens. Its 2024 account describes five community plots, but it does not document the other teams’ design and construction processes in the same detail.', refs: ['nparks2024Opening'] }
      ] },
      { heading: 'Why the selected planting looks the way it does', paragraphs: [
        { text: 'Singapore Polytechnic reports that Team 3’s proposal was selected after review. A curving band represented meandering water; white flowers signalled purity and cleansing within the Japanese-garden theme. The collaborators also weighed whether the plants and materials could be obtained and maintained. Cultural imagery, horticultural supply and upkeep therefore shaped one actual planting decision together.', refs: ['spFloral'] }
      ] },
      { heading: 'From drawing to planting', paragraphs: [
        { text: 'The students returned on 21 July 2024 to install materials and plant the plot. Team member Tan Rui Ann recalled revisions to the design and the hard physical work of planting with a small changkol. The record thus supports student participation in both design and construction—not merely a consultation exercise. It does not establish that students controlled the garden-wide plan or its subsequent maintenance.', refs: ['spFloral'] },
        { text: 'Floral Garden sits inside an island garden that first opened in 1973 and reopened after rejuvenation on 8 September 2024. The student plot is a new, documented layer within that older designed landscape, rather than evidence of the 1973 planting scheme.', refs: ['nhbJapanese', 'nparks2024Opening'] }
      ] }
    ],
    audit: { beyondAttraction: ['spFloral'], findings: ['The 24 April 2024 brief named its institutional participants.', 'Team 3’s curving white-flower design was selected with maintenance in mind.', 'Students installed the plot on 21 July 2024.'], uncertainty: 'No comparable process record has yet been recovered for the other four plots; long-term plot maintenance is undocumented here.' }
  },
  'lone-tree-memory': {
    title: 'The Lone Tree: a sculpture made from the old park',
    lead: 'Its metal branches are not simply a symbol of Jurong industry. Contractor supervisor Lao Gao made them from steel recovered during the garden’s redevelopment.',
    sections: [
      { heading: 'Rebar from paths and a carpark', paragraphs: [
        { text: 'Landscape architect Cathy Hang describes reinforcement bars salvaged from old park paths and a demolished carpark. Reusing this material made an industrial-looking tree from material already present in the former landscape. The exact quantities, suppliers and fabrication drawings are not published in the sources consulted.', refs: ['cnaHang2026'] }
      ] },
      { heading: 'A maker who is usually absent from the landmark label', paragraphs: [
        { text: 'Hang names contractor supervisor Lao Gao as the person who translated the design into the built sculpture. That attribution matters: the object owes its form not only to a landscape concept but to construction expertise and labour. The available interview does not provide Lao Gao’s full name or a direct account from him.', refs: ['cnaHang2026'] }
      ] },
      { heading: 'Habitat intention, public use and memory', paragraphs: [
        { text: 'NParks presents the Lone Tree in the Grasslands as an industrial-memory landmark and potential raptor perch. Hang describes visitors using it for graduation, proposal and wedding photographs. These are documented uses beyond its intended symbolism. A possible perch, however, is not evidence that raptors regularly use the sculpture; the cited accounts provide no monitoring series.', refs: ['nparksGrasslands', 'cnaHang2026'] },
        { text: 'The sculpture and the planted Grasslands make two sorts of constructed landscape legible in one place: a habitat designed for birds and an object built from demolition waste. The recovered steel is a direct material continuity with redevelopment, while the bird function remains a stated design intention.', refs: ['nparksGrasslands', 'cnaHang2026'] }
      ] }
    ],
    audit: { beyondAttraction: ['cnaHang2026'], findings: ['Old paths and a demolished carpark supplied rebar.', 'Contractor supervisor Lao Gao made the sculpture from the design.', 'The site is used for milestone photography as well as interpreted as industrial memory.'], uncertainty: 'No fabrication drawings, labour interview or raptor-use monitoring were located in the cited sources.' }
  },
  'facilities-j4': {
    title: 'Guesthouse: replacing a 1973 landmark with an event hall',
    lead: 'The new Guesthouse addresses a garden first laid out by Kinsaku Nakane, but its programme and timber construction belong to the 2024 redevelopment.',
    sections: [
      { heading: 'A building beside an older pond', paragraphs: [
        { text: 'An interview with architect Mdm Wo of Liu & Wo Architects, published by lighting supplier ERCO, says the previous Guesthouse opened in February 1973 and overlooked a pond designed by Kinsaku Nakane. The replacement keeps a relationship with that pond while adding event space, back-of-house facilities, family toilets and a boardwalk. This is a designer’s account of continuity, not evidence that the 1973 building fabric survived.', refs: ['ercoGuesthouse'] }
      ] },
      { heading: 'Why the hall is made and lit this way', paragraphs: [
        { text: 'Wo describes a mass-engineered-timber structure that can be naturally ventilated or air-conditioned for different events. ERCO documents a sloping ceiling from 3.4 to 8.6 metres. Its lighting brief sought approximately 300 lux at floor level without suspended fittings or fan-cast flicker; integrated downlights and adjustable spotlights were selected to light both event activities and the exposed timber. These are documented design choices, not proof of actual energy use during events.', refs: ['ercoGuesthouse'] }
      ] },
      { heading: 'Public garden, bookable interior', paragraphs: [
        { text: 'NParks’ September 2024 opening release describes the Guesthouse as a multipurpose hall able to accommodate up to 1,000 people and names Tote Board funding. The capacity belongs to that opening account; booking configurations may differ. A large event venue is thus one of the new uses inserted into the historic island garden, alongside the retained ponds and newly accessible walks.', refs: ['nparks2024Opening', 'ercoGuesthouse'] }
      ] }
    ],
    audit: { beyondAttraction: ['ercoGuesthouse'], findings: ['Architect Mdm Wo describes the relation to a previous Guesthouse and Nakane pond.', 'Timber, ventilation and a demanding sloped-ceiling lighting brief shaped the new hall.', 'NParks records a 2024 multipurpose capacity and Tote Board funding.'], uncertainty: 'The ERCO account is a supplier case study based on a designer interview. Historic building plans, precise 1973 fabric and observed operating energy are not established by these sources.' }
  },
  'facilities-j6': {
    title: 'Sunken Garden: manufacturing a tropical microclimate',
    lead: 'The enclosure presents itself as a cool, cave-like retreat, but that atmosphere is produced through topography, water, stone, planting and continued maintenance.',
    sections: [
      { heading: 'Carved into existing mounds', paragraphs: [
        { text: 'Landscape architect Abby Ng’s project record describes the Sunken Garden as being carved into existing mounds. Lowering the visitor route and enclosing it with green walls creates a spatial separation from the surrounding island garden; the form is a designed intervention, not a natural sinkhole.', refs: ['natureAssemblyJapanese'] }
      ] },
      { heading: 'A cenote image adapted to rainwater infrastructure', paragraphs: [
        { text: 'NParks calls the central water feature “cenote-inspired” and identifies it as a rainwater-harvesting system. A cenote is a limestone collapse exposing groundwater, whereas this is a constructed water feature. The reference supplies an image and environmental function without claiming geological authenticity.', refs: ['nparksSunken', 'nparks2024Opening'] }
      ] },
      { heading: 'More than 200 epiphytes in a maintained wall', paragraphs: [
        { text: 'NParks reports more than 200 epiphyte species—including orchids, ferns and bromeliads—on moisture-laden Paras-stone walls. Its webpage describes bryophytes and pteridophytes thriving in lower temperatures and high humidity. These are collection and design claims; the reviewed sources do not publish temperature measurements, survival rates or the labour and water required to maintain the wall.', refs: ['nparksSunken'] },
        { text: 'The garden is therefore a useful example of constructed ecological experience: living plants respond to real moisture and shade, while the conditions supporting them are deliberately produced. Its ecological reality and its artificial formation are not opposites.', refs: ['nparksSunken', 'natureAssemblyJapanese'] }
      ] }
    ],
    audit: { beyondAttraction: ['natureAssemblyJapanese'], findings: ['The garden was carved into existing mounds.', 'The cenote-inspired feature also harvests rainwater.', 'NParks reports over 200 epiphyte species on Paras-stone walls.'], uncertainty: 'No microclimate measurements, species inventory, survival record, water balance or maintenance specification was located in the reviewed public sources.' }
  },
  'facilities-c2': {
    title: 'Edible Garden: turning food plants into a public curriculum',
    lead: 'This is not a miniature farm. Its beds, labels, crop rotation and outdoor kitchen reorganise cultivation as a designed lesson about tropical food plants and local production.',
    sections: [
      { heading: 'Different plant parts become different lessons', paragraphs: [
        { text: 'NParks divides the garden into themed zones rather than presenting one undifferentiated collection. The Root Garden explains tap roots, tubers, corms and rhizomes as edible storage organs; the Herb and Spice and Climber areas organise other plant forms and uses. The layout turns botanical distinctions into a visitor route.', refs: ['nparksEdible'] }
      ] },
      { heading: 'Cultivation is made visible', paragraphs: [
        { text: 'In the Kitchen Garden, raised beds improve visibility while periodic crop rotation is presented as a way to manage pests and vary the landscape. Edible flowering plants are selected partly for nectar that attracts pollinators. These are specific cultivation practices, although the webpage does not publish crop yields, pesticide use or pollinator monitoring.', refs: ['nparksEdible'] }
      ] },
      { heading: 'From display bed to public programme', paragraphs: [
        { text: 'An outdoor kitchen beside the beds is used for culinary workshops. The garden therefore links growing, interpretation and cooking, while official promotion connects those activities to food resilience. It demonstrates techniques and awareness; the reviewed evidence does not show how much food enters local supply or whether participation changes household practice.', refs: ['nparksEdible'] }
      ] }
    ],
    audit: { beyondAttraction: ['nparksEdible'], findings: ['The garden is divided by edible plant form and use.', 'Raised beds and crop rotation are part of the display method.', 'An outdoor kitchen links planting to workshops.'], uncertainty: 'No crop-yield, programme-participation, pollinator or behavioural-outcome dataset was located in the reviewed public material.' }
  },
  'facilities-c5': {
    status: 'case-study',
    title: 'Stoneboat: a state-built garden image enters Singapore’s marriage history',
    lead: 'Yao-Yueh Fang was built as a modern Singaporean interpretation of a northern Chinese garden pavilion. Its later use as a marriage registry made that imported architectural image part of local civic and family history.',
    sections: [
      { heading: 'A building designed to be read as a boat', paragraphs: [
        { text: 'Stoneboat is the English label for Yao-Yueh Fang (邀月舫), a two-storey pavilion set against Lotus Pond. The name evokes inviting the moon onto the water. NParks’ guide explains that a stone boat in a Chinese garden is a stationary waterside pavilion rather than a vessel; the illusion depends on its placement, elongated plan and relationship to the pond.', refs: ['nparksChineseGuide', 'nparksStoneboat'] },
        { text: 'The same guide records a 23.5-by-8.5-metre ground floor and an air-conditioned 17-by-8.5-metre upper floor. These dimensions matter because they reveal a usable building behind the picturesque façade. The structure could accommodate administration and ceremonies, rather than functioning only as scenery.', refs: ['nparksChineseGuide'] },
        { text: 'At the garden’s 1975 opening, Finance Minister Hon Sui Sen explicitly connected the Stoneboat, Tea House and Nine-Arch Bridge to forms at Beijing’s Summer Palace. NParks describes the result as Peking style adapted in design and materials. The building is therefore best understood as a deliberate modern quotation, not a transported antique or a remnant of the pre-development landscape.', refs: ['nas1975', 'nparksStoneboat'] }
      ] },
      { heading: 'Imperial scenery for an industrial new town', paragraphs: [
        { text: 'The setting was new even when the architecture looked old. National Heritage Board records fish and prawn ponds beside Jurong River before construction began in 1971; Chinese Garden was completed in April 1975 for about S$5 million as part of the Jurong Town Corporation’s industrial-estate programme. SG101 attributes the overall design to Taiwanese architect Professor Yu Yuen-Chen, who worked pro bono and drew on Song-dynasty and Summer Palace precedents.', refs: ['nhbChinese', 'sg101Chinese'] },
        { text: 'This juxtaposition was purposeful. Hon’s opening speech presented the garden as both a cultural landscape and a public amenity for workers and residents of Jurong. Stoneboat did not preserve a pre-existing Chinese enclave. It helped manufacture a legible Chinese landscape within a district being remade through state-led industrialisation.', refs: ['nas1975', 'nhbChinese'] },
        { text: 'The new landscape quickly became a mass public attraction. NHB records about 21,000 visitors during the opening weekend and 1,624,316 visitors in the first year. These figures do not isolate Stoneboat, but they place its image within a heavily visited public project rather than a secluded specialist garden.', refs: ['nhbChinese'] }
      ] },
      { heading: 'When the scenic pavilion became a marriage registry', paragraphs: [
        { text: 'The most consequential change was administrative rather than architectural. NParks records that the building once housed a branch of the Registrar of Marriages. A New Nation article published on 27 June 1982 describes a bridal car entering Chinese Garden and proceeding to the marriage registry inside the Stone Boat Building. This dated newspaper evidence confirms that couples were not merely using the pavilion as a photographic backdrop: civil registration itself took place there by 1982.', refs: ['nparksStoneboat', 'nlbStoneboat1982'] },
        { text: 'That use localised the imported form. A pavilion modelled on imperial-garden imagery became a place where Singaporeans entered legal marriages, connecting state administration, ceremony and family memory. The physical sequence—from garden entrance, through a staged landscape, to an air-conditioned upper interior—also shows how picturesque architecture could perform ordinary institutional work.', refs: ['nparksChineseGuide', 'nlbStoneboat1982'] }
      ] },
      { heading: 'Authenticity lies in adaptation, not antiquity', paragraphs: [
        { text: 'Calling Stoneboat “created” does not make it culturally empty. Its historical value comes from two different processes: the conscious adaptation of recognisable Chinese architectural precedents in the 1970s, and the social meanings accumulated through public use in Singapore. The first is documented by the opening speech and design descriptions; the second is demonstrated, at minimum, by the former marriage-registry function and the surviving 1982 press account.', refs: ['nas1975', 'nparksStoneboat', 'nlbStoneboat1982'] },
        { text: 'The distinction prevents two common errors. Stoneboat should not be presented as an ancient Chinese structure, but neither should it be dismissed as a decorative replica whose only meaning is visual. Its Singapore history is precisely the history of translation: an imported landscape vocabulary was redesigned, occupied and remembered in a new social setting.', refs: ['nas1975', 'nhbChinese', 'nparksStoneboat'] }
      ] },
      { heading: 'What the 2024 rejuvenation chose to keep', paragraphs: [
        { text: 'Chinese Garden had never been frozen in its 1975 form. NHB records a ten-metre Confucius statue added near Lotus Pond in 1985, the Bridge of Double Beauty linking the Chinese and Japanese Gardens in 1989, and a S$3.8 million Bonsai Garden built in 1992 with 55 Suzhou craftsmen. Stoneboat’s later conservation occurred inside a cultural landscape that had already accumulated new structures, routes and institutions over decades.', refs: ['nhbChinese'] },
        { text: 'NParks retained and spruced up Stoneboat during the Chinese and Japanese Gardens rejuvenation rather than replacing it with a new attraction. The agency says work began in 2019 after public consultation and involved specialists experienced with historical buildings. The public release does not isolate Stoneboat’s conservation specification, so “retained” should not be read as proof that every surface and component is original to 1975.', refs: ['nparks2024Opening'] },
        { text: 'Project records add detail about the contemporary layer. Lighting Planners Associates identifies NParks as client and Liu & Wo Architects, Salad Dressing and Landscape Design as project collaborators. Supplier Luxconex states that contour lights were used at Stoneboat and Tea Pavilion. Night-time visibility is therefore part of the renewed presentation of the landmark, although the available project pages do not provide an independent assessment of heritage impact or visitor response.', refs: ['lpaJLG', 'luxconexJLG'] }
      ] },
      { heading: 'What Stoneboat reveals about the garden', paragraphs: [
        { text: 'Stoneboat condenses three stages of landscape production. Productive ponds were replaced by a state-built cultural garden during Jurong’s industrialisation; a scenic architectural quotation became a working registry; and the landmark was conserved and relit for a twenty-first-century national garden. Political ecology here concerns more than vegetation. It concerns who reorganised land and water, which cultural images were selected to represent a new town, how public administration gave those images lived meaning, and which structures were judged worthy of preservation.', refs: ['nhbChinese', 'nas1975', 'nlbStoneboat1982', 'nparks2024Opening', 'lpaJLG'] },
        { text: 'Public interpretation could make this layered history visible. A concise display could distinguish the Summer Palace reference from the building’s modern Singapore construction, reproduce the verified 1982 evidence of the registry, and invite former couples to contribute dated memories or photographs. Such material would explain why the building matters without pretending that its architectural authenticity depends on age alone.', refs: ['nas1975', 'nlbStoneboat1982', 'nparksStoneboat'] }
      ] }
    ],
    audit: { beyondAttraction: ['nas1975', 'nhbChinese', 'nlbStoneboat1982', 'sg101Chinese', 'lpaJLG', 'luxconexJLG'], findings: ['The guide documents a usable two-storey interior, including floor dimensions and an air-conditioned upper floor.', 'A dated 1982 newspaper record confirms that the marriage registry operated inside the Stone Boat Building.', 'The 2024 project records identify contemporary design participants and contour lighting at Stoneboat and Tea Pavilion.'], uncertainty: 'The registry’s opening and closing dates, number of marriages, couples’ testimonies, detailed 1975 authorship, conservation specification and extent of surviving original fabric remain unresolved. The full NewspaperSG OCR was not accessible, so only claims visible in its indexed record are used.' }
  },
  'facilities-c8': {
    title: 'Bonsai Garden: a Suzhou project added seventeen years later',
    lead: 'The Bonsai Garden is often read as part of the original Chinese Garden, but its documented construction belongs to a separate 1992 investment and transnational craft project.',
    sections: [
      { heading: 'Not part of the 1975 opening', paragraphs: [
        { text: 'Chinese Garden was completed in April 1975, while NHB dates the Bonsai Garden to 1992. Treating both as one timeless heritage ensemble hides a seventeen-year interval and a new phase of development.', refs: ['nhbChinese'] }
      ] },
      { heading: 'Money, craftsmen and an imported collection', paragraphs: [
        { text: 'NHB records an estimated S$3.8 million construction cost, the involvement of 55 Suzhou craftsmen from China and a collection exceeding 2,000 pots imported from China and elsewhere. These details reveal that the garden’s Suzhou character was made through specialist labour, capital and assembled living material rather than inherited locally.', refs: ['nhbChinese'] }
      ] },
      { heading: 'A renewed display with a long maintenance horizon', paragraphs: [
        { text: 'NParks now presents the revitalised garden as a Suzhou-style retreat inspired by traditional Chinese landscape painting, with miniature landscapes from across Asia and marble lions at the entrance. Bonsai’s continued display depends on cultivation and replacement over time; the reviewed pages do not publish a current inventory, provenance for individual specimens or the labour required to maintain them.', refs: ['nparksBonsai'] }
      ] }
    ],
    audit: { beyondAttraction: ['nhbChinese'], findings: ['The Bonsai Garden was added in 1992, not 1975.', 'NHB records S$3.8 million and 55 Suzhou craftsmen.', 'The original collection exceeded 2,000 imported pots.'], uncertainty: 'A current specimen inventory, individual provenance, loss/replacement history and maintenance labour record remain unavailable in the reviewed sources.' }
  },
  'facilities-c12': {
    title: 'Cascading Creek: a river system rearranged for learning',
    lead: 'The attraction does not restore a single historical watercourse. It compresses five contrasting Southeast Asian river environments into a walkable educational sequence.',
    sections: [
      { heading: 'Five stages, one closed loop', paragraphs: [
        { text: 'NParks names Fern Cascades, Hill Streams, Kasai Creek, Paperbark Swamp and Nypa Grove along a closed-loop boardwalk. Their order moves conceptually from highland streams toward lowland swamp conditions, allowing visitors to compare environments without travelling along an actual river basin.', refs: ['nparksCreek'] }
      ] },
      { heading: 'Geology and microclimate are part of the exhibit', paragraphs: [
        { text: 'The attraction page says changing geological and microclimatic conditions shape each habitat and its flora and fauna. That makes landform, water and shade part of the interpretive content, not merely background scenery. It does not publish design sections, flow rates, species lists or a mapping between each exhibit and a specific natural reference site.', refs: ['nparksCreek'] }
      ] },
      { heading: 'A model ecosystem is still a managed construction', paragraphs: [
        { text: 'The value of the sequence is comparative: visitors can encounter a curated account of river change in one place. Its living plants and water are real, while the adjacency of five stages is designed. The reviewed evidence establishes the educational concept but not ecological equivalence, self-sustaining function or measured learning outcomes.', refs: ['nparksCreek'] }
      ] }
    ],
    audit: { beyondAttraction: ['nparksCreek'], findings: ['The visitor route contains five named river stages.', 'The boardwalk is a closed loop rather than a historical river trace.', 'Geology and microclimate are explicit parts of the exhibit concept.'], uncertainty: 'No design drawings, flow data, complete species inventories, ecological monitoring or visitor-learning evaluation was located in the reviewed public account.' }
  },
  'water-lily': {
    title: 'Water Lily Garden: a collection sustained by managed water',
    lead: 'The terraced ponds are a horticultural display, but the water moving through them is also part of a funded filtration system.',
    sections: [
      { heading: 'A deliberately assembled collection', paragraphs: [
        { text: 'NParks describes more than 150 water-lily varieties in terraced ponds, including day- and night-blooming forms and the giant water lily. The claim is about a cultivated collection, not a survey of naturally occurring lilies in Jurong Lake.', refs: ['nparksLily'] }
      ] },
      { heading: 'The infrastructure below the scenery', paragraphs: [
        { text: 'NParks’ sustainability account says the Japanese Garden system uses pumps, vegetation and soil microbes to filter and circulate water through the Water Lily Garden and the larger garden. Its 2024 opening release records a S$1 million Micron Technology donation through the Garden City Fund toward this smart water-management system. The gift is a documented contribution, not a stated total construction or operating cost.', refs: ['nparksWaterSystems', 'nparks2024Opening'] },
        { text: 'The public evidence establishes the system’s intended mechanism and its financing relationship. It does not provide measured pollutant-removal rates or long-term ecological outcomes. The garden’s water is therefore both a visible design medium and a maintained technical process.', refs: ['nparksWaterSystems'] }
      ] }
    ],
    audit: { beyondAttraction: ['nparksWaterSystems', 'nparks2024Opening'], findings: ['The collection exceeds 150 named varieties according to NParks.', 'A pump-and-biological-filtration system serves the garden.', 'Micron Technology donated S$1 million toward the system.'], uncertainty: 'No independently measured long-term water-quality series is cited.' }
  }
};

