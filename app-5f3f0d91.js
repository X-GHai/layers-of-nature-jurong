const checkedOn = '13 October 2026';

const layers = {
  ecology: { label: 'Ecology', color: '#1d684e', icon: '◒', description: 'Named habitats and ecological design' },
  engineered: { label: 'Engineered Nature', color: '#5c91c7', icon: '⌁', description: 'Water infrastructure and designed landscapes' },
  heritage: { label: 'Heritage & Memory', color: '#b85e73', icon: '✦', description: 'Cultural gardens and remembered places' },
  governance: { label: 'Governance', color: '#e8a14d', icon: '⌂', description: 'Planning, consultation, stewardship and rules that decide how the garden is made usable' },
  public: { label: 'Public Use', color: '#7d6ab0', icon: '◎', description: 'Access, play and designed users' },
  hidden: { label: 'Hidden Histories', color: '#795548', icon: '◈', description: 'Productive water, industrial transformation, labour and archival traces beneath the garden story' },
  nhb: { label: 'NHB Heritage Trail', color: '#795548', icon: '◌', description: 'National Heritage Board’s 25-stop Jurong trail; directions points and existing mapped places' },
  facilities: { label: 'Facilities & Attractions', color: '#e0522d', icon: '●', description: 'NParks brochure attractions digitised as plan-derived points' },
  amenities: { label: 'Amenities & Access', color: '#26312b', icon: '•', description: 'Named amenities and access nodes with cited locations' },
  roads: { label: 'Roads & paths', color: '#8a5d3b', icon: '━', description: 'Current OpenStreetMap reference ways; not a historical road layer' },
  waterways: { label: 'Waterways', color: '#2385ad', icon: '≈', description: 'Current OpenStreetMap waterway reference lines' },
  waterbodies: { label: 'Waterbodies', color: '#347db4', icon: '▰', description: 'URA Master Plan 2025 indicative waterbody polygons from data.gov.sg' },
  greenery: { label: 'NParks managed green', color: '#4c9155', icon: '▱', description: 'NParks managed park and nature-reserve polygons from data.gov.sg' },
  woodland: { label: 'Woodland / forest reference', color: '#2d6d42', icon: '▥', description: 'Current OpenStreetMap woodland and forest reference polygons' },
  amenities_ref: { label: 'Amenity reference points', color: '#9a6b32', icon: '+', description: 'Current OpenStreetMap reference points for drinking water, toilets, shelter, bicycle parking and related services' }
};

const years = [
  { year: 1953, context: 'pre-industrialisation map reference', description: 'The NUS 1953 map is used as a historical raster reference. It records mapped land and water, but does not reveal every lived use or provide a modern park boundary.' },
  { year: 1971, context: 'lake formation by water engineering', description: 'The official opening account dates the sluice-gate works and formation of Jurong Lake to 1971. The NUS 1971 georeferenced raster is used as the period base map; it remains map evidence, not a complete record of lived use.' },
  { year: 1975, context: 'Chinese Garden opens', description: 'NHB records that Chinese Garden was completed in 1975 on land formerly occupied by fish and prawn ponds beside Jurong River.' },
  { year: 2019, context: 'Lakeside Garden opens', description: 'NParks records Lakeside Garden as the first phase of Jurong Lake Gardens, centred on nature, play and community.' },
  { year: 2024, context: 'rejuvenated gardens completed', description: 'The rejuvenated Chinese and Japanese Gardens reopened in September 2024, completing the official Jurong Lake Gardens project.' }
];

const sources = {
  nparksAbout: { institution: 'National Parks Board', title: 'About Jurong Lake Gardens', url: 'https://juronglakegardens.nparks.gov.sg/discover/about-jurong-lake-gardens/' },
  nparksBrochure: { institution: 'National Parks Board', title: 'Jurong Lake Gardens brochure', url: 'https://isomer-user-content.by.gov.sg/318/42430a02-b4a6-4e74-889f-61a1ec732968/Jurong%20Lake%20Gardens%20Brochure.pdf' },
  nparksHome: { institution: 'National Parks Board', title: 'Jurong Lake Gardens · home and programmes', url: 'https://juronglakegardens.nparks.gov.sg/' },
  nparksChinese: { institution: 'National Parks Board', title: 'Chinese Garden · official attraction page', url: 'https://juronglakegardens.nparks.gov.sg/chinese-garden/' },
  nparksGrandArch: { institution: 'National Parks Board', title: 'Grand Arch · official attraction page', url: 'https://juronglakegardens.nparks.gov.sg/discover/chinese-garden/grand-arch/' },
  nparksJapanese: { institution: 'National Parks Board', title: 'Japanese Garden · official attraction page', url: 'https://juronglakegardens.nparks.gov.sg/japanese-garden/' },
  nparksLakeside: { institution: 'National Parks Board', title: 'Lakeside Garden · official attraction page', url: 'https://juronglakegardens.nparks.gov.sg/lakeside-garden/' },
  nparksServices: { institution: 'National Parks Board', title: 'Operating hours and services · Jurong Lake Gardens', url: 'https://juronglakegardens.nparks.gov.sg/plan-your-visit/operating-hours-and-services/' },
  nparksGettingHere: { institution: 'National Parks Board', title: 'Getting here · Jurong Lake Gardens', url: 'https://juronglakegardens.nparks.gov.sg/plan-your-visit/getting-here/' },
  nparksDining: { institution: 'National Parks Board', title: 'Dining · Jurong Lake Gardens', url: 'https://juronglakegardens.nparks.gov.sg/dining/' },
  nparksVenues: { institution: 'National Parks Board', title: 'Book a Venue · Jurong Lake Gardens', url: 'https://juronglakegardens.nparks.gov.sg/book-a-venue/' },
  nparksGrasslands: { institution: 'National Parks Board', title: 'Grasslands · Lakeside Garden', url: 'https://juronglakegardens.nparks.gov.sg/discover/lakeside-garden/grasslands/' },
  nparksWetlands: { institution: 'National Parks Board', title: 'Floating Wetlands · Lakeside Garden', url: 'https://juronglakegardens.nparks.gov.sg/discover/lakeside-garden/floating-wetlands/' },
  nhbChinese: { institution: 'National Heritage Board', title: 'Chinese Garden · Roots.sg online exhibition', url: 'https://www.roots.gov.sg/resources-landing/online-exhibitions/chinese-garden' },
  nhbJapanese: { institution: 'National Heritage Board · National Museum of Singapore', title: 'The Hashinkyo in the Seiwaen Japanese Garden at Jurong · collection record', url: 'https://www.roots.gov.sg/Collection-Landing/listing/1105803' },
  nas1975: { institution: 'National Archives of Singapore', title: 'I am happy to say that our Chinese Garden in Jurong · 18 April 1975', url: 'https://www.nas.gov.sg/archivesonline/data/pdfdoc/PressR19750418e.pdf' },
  nhbIndustrial: { institution: 'National Heritage Board', title: 'Jurong New Town and Jurong Industrial Estate · Roots.sg', url: 'https://www.roots.gov.sg/stories-landing/stories/jurong-industrial-estate/story' },
  nhbJurongTrail: { institution: 'National Heritage Board', title: 'Jurong Heritage Trail · official source page and booklet download', url: 'https://www.roots.gov.sg/places/places-landing/trails/jurong-heritage-trail' },
  nhbCollection1980s: { institution: 'National Heritage Board · National Museum of Singapore', title: 'The Garden of Greenery at the Chinese Garden · c. 1980s collection record', url: 'https://www.roots.gov.sg/Collection-Landing/listing/1156783' },
  pmoOpening: { institution: 'Prime Minister’s Office, Singapore', title: 'Opening of the rejuvenated Chinese and Japanese Gardens', url: 'https://www.pmo.gov.sg/newsroom/sm-lee-hsien-loong-at-the-opening-of-the-rejuvenated-chinese-and-japanese-gardens/' },
  pmoHighlights: { institution: 'Prime Minister’s Office, Singapore · official YouTube', title: 'Highlights of the opening of the rejuvenated Chinese and Japanese Gardens', url: 'https://www.youtube.com/watch?v=6H--a2LsBpY' },
  nparks2024Opening: { institution: 'National Parks Board', title: 'NParks completes Jurong Lake Gardens with opening of rejuvenated Chinese and Japanese Gardens', url: 'https://www.nparks.gov.sg/news/news-detail/nparks-completes-jurong-lake-gardens-with-opening-of-rejuvenated-chinese-and-japanese-gardens' },
  nparksVisitorGuidelines: { institution: 'National Parks Board', title: 'Visitor Guidelines · Jurong Lake Gardens', url: 'https://juronglakegardens.nparks.gov.sg/plan-your-visit/visitor-guidelines/' },
  nparksSustainability: { institution: 'National Parks Board', title: 'Building a Smart, Sustainable Garden District', url: 'https://juronglakegardens.nparks.gov.sg/discover/building-a-smart-sustainable-garden-district/' },
  nparks2017Annual: { institution: 'National Parks Board', title: 'Annual Report 2017/2018 · Community ideas for Jurong Lake Gardens', url: 'https://www.nparks.gov.sg/docs/default-source/resources/annual-report/ar-2017-2018/nparks-2017-2018-annual-report-lowres.pdf' },
  socialLemon8: { institution: 'Lemon8 community post', title: 'Explore the Stunning Newly Reopened Chinese Garden · community photo post', url: 'https://www.lemon8-app.com/@celleybub/7417808320616006161?region=sg' },
  socialFlickrLights: { institution: 'Flickr · BP Chua', title: 'Lights By The Lake · Mid-Autumn Festival at Jurong Lake Gardens', url: 'https://www.flickr.com/photos/bpchua/54011607925/' },
  socialFlickrAlbum: { institution: 'Flickr · chooyutshing', title: 'Jurong Lake Gardens · community photo album', url: 'https://www.flickr.com/photos/25802865@N08/albums/72157708452430424/' },
  socialYouTube2024: { institution: 'YouTube · Justflowwithjuhi', title: 'Chinese Garden Singapore 2024 · community video', url: 'https://www.youtube.com/watch?v=xhjzA5K7EvU' },
  socialTravelFeed: { institution: 'TravelFeed · Max @curamax', title: 'My Visit to the Bonsai Garden · October 2024 community photo essay', url: 'https://travelfeed.com/@curamax/my-visit-to-the-bonsai-garden-stepping-into-serenity' },
  cna2024Opening: { institution: 'Channel NewsAsia', title: 'Chinese and Japanese Gardens reopen with new attractions · 8 September 2024', url: 'https://www.channelnewsasia.com/singapore/chinese-japanese-gardens-reopen-jurong-lake-edible-garden-waterfall-water-lily-4590471' },
  straits2024Preview: { institution: 'The Straits Times', title: 'Water lilies, “sunken” garden to greet visitors · 21 July 2024', url: 'https://www.straitstimes.com/singapore/water-lilies-sunken-garden-to-greet-visitors-when-japanese-chinese-gardens-reopen-in-september' },
  cna2018Plan: { institution: 'Channel NewsAsia', title: 'Jurong Lake Gardens West and the largest water-lily collection · 24 March 2018', url: 'https://www.channelnewsasia.com/singapore/jurong-lake-gardens-west-open-early-2019-largest-water-lilies-collection-part-attraction-5736751' },
  mothership2019Opening: { institution: 'Mothership', title: 'Lakeside Garden opens · 27 April 2019', url: 'https://mothership.sg/2019/04/lakeside-garden/' },
  jld2019Opening: { institution: 'Jurong Lake District', title: 'Lakeside Garden, western section of Jurong Lake Gardens, opens · 27 April 2019', url: 'https://www.jld.gov.sg/events-resources/media-releases/lakesidegardens/' },
  pubJurongGuide: { institution: 'Public Utilities Board', title: 'Secondary Learning Trail at Jurong Lake · trainer’s guide', url: 'https://www.pub.gov.sg/-/media/PUB/Public/Key-Initiatives/Our-Water-SG60/Resources/Guides/Guides/Secondary-Learning-Trail-at-Jurong-Lake_Trainers-Guide.pdf' },
  pubJurongStudent: { institution: 'Public Utilities Board', title: 'Jurong Lake Student Trail · water and garden history', url: 'https://www.pub.gov.sg/-/media/PUB/Reservoirs/Jurong-Lake/JurongLakeStudentTrail.pdf' },
  uraJurongLakeDistrict: { institution: 'Urban Redevelopment Authority', title: 'Jurong Lake District · planning history and future district vision', url: 'https://www.ura.gov.sg/land-planning/shaping-our-city/jurong-lake-district/' },
  academicStokols: { institution: 'Singapore Journal of Tropical Geography', title: 'Landscapes of state capitalism: Jurong and green capital accumulation · 2025', url: 'https://doi.org/10.1111/sjtg.12574' },
  nparksAnnualReport: { institution: 'National Parks Board', title: 'Annual Report 2024/2025 · Jurong Lake Gardens', url: 'https://www.nparks.gov.sg/docs/default-source/resources/annual-report/ar-2024-25/nparks-ar-2025_6-oct_no-fs_pdf-a.pdf' },
  commons2024Twin: { institution: 'Wikimedia Commons · FN-082', title: 'Twin Pagodas, Jurong Lake Gardens, Singapore 202409 · CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Twin_Pagodas,_Jurong_Lake_Gardens,_Singapore_202409.jpg' },
  commons2024Entrance: { institution: 'Wikimedia Commons · FN-082', title: 'Chinese Garden Entrance – Yuan Ching Road 202409 · CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Chinese_Garden_Entrance_-_Yuan_Ching_Road_202409_2.jpg' },
  commons2024Chinese: { institution: 'Wikimedia Commons · FN-082', title: 'Chinese Garden Singapore, 202409 · CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Chinese_Garden_Singapore,_202409.jpg' },
  commons2023Map: { institution: 'Wikimedia Commons · LN9267', title: 'Jurong Lake Gardens map 10-11-2023 · CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Jurong_Lake_Gardens_map_10-11-2023.jpg' },
  flickr2019Grassland: { institution: 'Flickr · Choo Yut Shing', title: 'Grassland at Jurong Lake Gardens · photograph taken 1 May 2019', url: 'https://www.flickr.com/photos/25802865@N08/47815375251/' },
  flickr2022Garden: { institution: 'Flickr · cattan2011', title: 'Jurong Lake Gardens · photograph taken 15 February 2022', url: 'https://www.flickr.com/photos/68166820@N08/51909496294' },
  nlbJurong: { institution: 'National Library Board', title: 'Future Horizons · Jurong digital story', url: 'https://curiocity.nlb.gov.sg/digital-stories/jurong/jurong-new/' },
  nusAbout: { institution: 'National University of Singapore Libraries', title: 'Historical Maps of Singapore · About', url: 'https://libmaps.nus.edu.sg/about/' },
  nus1953: { institution: 'National University of Singapore Libraries', title: '1953 · Singapore Topographical Maps', url: 'https://libmaps.nus.edu.sg/maps/1953/', serviceUrl: 'https://libmaps.nus.edu.sg/services/png/1953/{z}/{y}/{x}' },
  nus1963: { institution: 'National University of Singapore Libraries', title: '1963 · Singapore Topographical Map', url: 'https://libmaps.nus.edu.sg/maps/1963/', serviceUrl: 'https://libmaps.nus.edu.sg/services/png/1963/{z}/{y}/{x}' },
  nus1971: { institution: 'National University of Singapore Libraries', title: '1971 · Singapore Topographical Map', url: 'https://libmaps.nus.edu.sg/maps/1971/', serviceUrl: 'https://libmaps.nus.edu.sg/services/png/1971/{z}/{y}/{x}' },
  nus1975: { institution: 'National University of Singapore Libraries', title: '1975 · Singapore Topographical Maps', url: 'https://libmaps.nus.edu.sg/maps/1975/', serviceUrl: 'https://libmaps.nus.edu.sg/services/png/1975/{z}/{y}/{x}' },
  nparksParksGeo: { institution: 'National Parks Board via data.gov.sg', title: 'NParks Parks and Nature Reserves (2026) · GeoJSON', url: 'https://data.gov.sg/datasets/d_77d7ec97be83d44f61b85454f844382f/view', dataUrl: 'https://api-open.data.gov.sg/v1/public/api/datasets/d_77d7ec97be83d44f61b85454f844382f/poll-download' },
  uraWaterGeo: { institution: 'Urban Redevelopment Authority via data.gov.sg', title: 'Master Plan 2025 SDCP Waterbody layer · GeoJSON', url: 'https://data.gov.sg/datasets/d_7e2ac2f82f751cea2402c1e3e775f702/view', dataUrl: 'https://api-open.data.gov.sg/v1/public/api/datasets/d_7e2ac2f82f751cea2402c1e3e775f702/poll-download' },
  osmReference: { institution: 'OpenStreetMap contributors', title: 'OpenStreetMap · open reference geometries for roads, paths, waterways and woodland', url: 'https://www.openstreetmap.org/copyright' },
  osmGrandArch: { institution: 'OpenStreetMap contributors', title: 'Grand Arch Building · named building footprint (way 1427416429)', url: 'https://www.openstreetmap.org/way/1427416429' },
  osmLoneTree: { institution: 'OpenStreetMap contributors', title: 'The Lone Tree · named artwork point (node 7236529989)', url: 'https://www.openstreetmap.org/node/7236529989' },
  wikidataLakesideMRT: { institution: 'Wikidata contributors', title: 'Lakeside MRT station (Q3272255) · coordinate reference', url: 'https://www.wikidata.org/wiki/Q3272255' },
  osmChineseMRT: { institution: 'OpenStreetMap contributors', title: 'Chinese Garden MRT station · named building footprint', url: 'https://www.openstreetmap.org/way/152338067' },
  osmJurongEastMRT: { institution: 'OpenStreetMap contributors', title: 'Jurong East MRT station · named reference point', url: 'https://www.openstreetmap.org/node/209451066' },
  onemap: { institution: 'Singapore Land Authority', title: 'OneMap map service', url: 'https://www.onemap.gov.sg/docs/maps/index.html' }
};
Object.assign(sources, {
  cnaHang2026: { institution: 'CNA Luxury', title: 'How landscape architect Cathy Hang is shaping Singapore’s most loved public spaces', url: 'https://cnaluxury.channelnewsasia.com/people/cathy-hang-landscape-architect-singapore-public-spaces-292471', date: '15 October 2026', inTextAuthor: 'Low', apa: 'Low, S. P. (2026, February 17). How landscape architect Cathy Hang is shaping Singapore’s most loved public spaces. CNA Luxury. https://cnaluxury.channelnewsasia.com/people/cathy-hang-landscape-architect-singapore-public-spaces-292471' },
  henningLarsenJLG: { institution: 'Henning Larsen', title: 'Jurong Lake Gardens project account', url: 'https://www.henninglarsen.com/projects/jurong-lake-gardens', date: '15 October 2026', inTextAuthor: 'Henning Larsen', apa: 'Henning Larsen. (n.d.). Jurong Lake Gardens. https://www.henninglarsen.com/projects/jurong-lake-gardens' },
  habitatHandbook25: { institution: 'National Parks Board', title: 'Naturalising our Parks Framework, chapter 25 of Handbook on Habitat Restoration', url: 'https://www.nparks.gov.sg/docs/default-source/resources/2023/handbook-habitat-restoration-chapter25.pdf', date: '15 October 2026', inTextAuthor: 'Ong et al.', apa: 'Ong, C. R., Wright, J., Fairuz, A., Omar, K., & Yu, K. W. (2023). Naturalising our parks framework. In L. Chan, D. Ng, & L. J. Lim (Eds.), Handbook on habitat restoration: General principles and case studies in Singapore (chap. 25, pp. 285–300). National Parks Board. https://www.nparks.gov.sg/docs/default-source/resources/2023/handbook-habitat-restoration-chapter25.pdf' }
});
Object.assign(sources.nas1975, { title: 'Hon Sui Sen’s speech at the opening of Chinese Garden, 18 April 1975', date: '15 October 2026', inTextAuthor: 'Hon', apa: 'Hon, S. S. (1975, April 18). Speech at the official opening of the Chinese Garden (Yu-Hwa Yuan) [Speech]. National Archives of Singapore. https://www.nas.gov.sg/archivesonline/data/pdfdoc/PressR19750418e.pdf' });
Object.values(sources).forEach((source) => { source.date ||= checkedOn; });

// Citation register. These are deliberately conservative APA 7 records: when a
// page does not expose a stable publication date in the public record, the UI uses
// n.d. rather than inferring a year from a URL or a last-updated stamp. The checked
// date remains separate from the publication date.
Object.assign(sources.nparks2017Annual, { apa: 'National Parks Board. (2018). Annual report 2017/2018. https://www.nparks.gov.sg/docs/default-source/resources/annual-report/ar-2017-2018/nparks-2017-2018-annual-report-lowres.pdf' });
Object.assign(sources.nparks2024Opening, { apa: 'National Parks Board. (2024, September 8). NParks completes Jurong Lake Gardens with opening of rejuvenated Chinese and Japanese Gardens. https://www.nparks.gov.sg/news/news-detail/nparks-completes-jurong-lake-gardens-with-opening-of-rejuvenated-chinese-and-japanese-gardens' });
Object.assign(sources.nparksAnnualReport, { apa: 'National Parks Board. (2025). Annual report 2024/2025. https://www.nparks.gov.sg/docs/default-source/resources/annual-report/ar-2024-25/nparks-ar-2025_6-oct_no-fs_pdf-a.pdf' });
Object.assign(sources.pmoOpening, { apa: 'Prime Minister’s Office, Singapore. (2024, September 8). Speech by Senior Minister Lee Hsien Loong at the opening of the rejuvenated Chinese and Japanese Gardens. https://www.pmo.gov.sg/newsroom/sm-lee-hsien-loong-at-the-opening-of-the-rejuvenated-chinese-and-japanese-gardens/' });
Object.assign(sources.nhbChinese, { apa: 'National Heritage Board. (n.d.). Chinese Garden. Roots.sg. https://www.roots.gov.sg/resources-landing/online-exhibitions/chinese-garden' });
Object.assign(sources.nhbJapanese, { apa: 'National Heritage Board. (2020, October 15). The Hashinkyo (Bridge to the Palace of the Dragon King) in the Seiwaen Japanese Garden at Jurong. Roots.sg. https://www.roots.gov.sg/Collection-Landing/listing/1105803', evidenceScope: 'Confirms construction beginning in May 1968, official opening in February 1973, designer Kinsaku Nakane, and the man-made-island setting; it does not publish a survey coordinate or boundary.' });
Object.assign(sources.nhbIndustrial, { title: 'Getting Jurong off the ground: From swamp to industrial powerhouse', apa: 'National Heritage Board. (n.d.). Getting Jurong off the ground: From swamp to industrial powerhouse. Roots.sg. https://www.roots.gov.sg/stories-landing/stories/jurong-industrial-estate/story' });
Object.assign(sources.pubJurongStudent, { apa: 'Public Utilities Board. (n.d.). Jurong Lake student trail: Water and garden history. https://www.pub.gov.sg/-/media/PUB/Reservoirs/Jurong-Lake/JurongLakeStudentTrail.pdf' });
Object.assign(sources.pubJurongGuide, { apa: 'Public Utilities Board. (n.d.). Secondary learning trail at Jurong Lake: Trainer’s guide. https://www.pub.gov.sg/-/media/PUB/Public/Key-Initiatives/Our-Water-SG60/Resources/Guides/Guides/Secondary-Learning-Trail-at-Jurong-Lake_Trainers-Guide.pdf' });
Object.assign(sources.uraJurongLakeDistrict, { apa: 'Urban Redevelopment Authority. (n.d.). Jurong Lake District. https://www.ura.gov.sg/land-planning/shaping-our-city/jurong-lake-district/' });
Object.assign(sources.academicStokols, { apa: 'Stokols, A. (2025). Landscapes of state capitalism: Reconciling the vernacular, national development imaginaries, and green capital accumulation. Singapore Journal of Tropical Geography, 46(1), 95–115. https://doi.org/10.1111/sjtg.12574' });
Object.assign(sources.nus1953, { apa: 'National University of Singapore Libraries. (1953). 1953 Singapore topographical maps [Georeferenced historical map]. https://libmaps.nus.edu.sg/maps/1953/' });
Object.assign(sources.nus1963, { apa: 'National University of Singapore Libraries. (1963). 1963 Singapore topographical map [Georeferenced historical map]. https://libmaps.nus.edu.sg/maps/1963/' });
Object.assign(sources.nus1971, { apa: 'National University of Singapore Libraries. (1971). 1971 Singapore topographical map [Georeferenced historical map]. https://libmaps.nus.edu.sg/maps/1971/' });
Object.assign(sources.nus1975, { apa: 'National University of Singapore Libraries. (1975). 1975 Singapore topographical maps [Georeferenced historical map]. https://libmaps.nus.edu.sg/maps/1975/' });
Object.assign(sources.cna2024Opening, { apa: 'Channel NewsAsia. (2024, September 8). Chinese and Japanese Gardens reopen with new attractions. https://www.channelnewsasia.com/singapore/chinese-japanese-gardens-reopen-jurong-lake-edible-garden-waterfall-water-lily-4590471' });
Object.assign(sources.straits2024Preview, { apa: 'The Straits Times. (2024, July 21). Water lilies, “sunken” garden to greet visitors when Japanese, Chinese Gardens reopen in September. https://www.straitstimes.com/singapore/water-lilies-sunken-garden-to-greet-visitors-when-japanese-chinese-gardens-reopen-in-september' });


// The case dossiers enrich the right evidence panel without adding map geometry.
Object.entries(caseResearch.newSources).forEach(([id, [title, path]]) => {
  sources[id] = { institution: 'National Parks Board', title, url: `https://juronglakegardens.nparks.gov.sg/discover/${path}`, date: checkedOn, evidenceScope: 'Current attraction description checked in 2026; not a dated 2024 observation.' };
});
sources.spFloral = { institution: 'Singapore Polytechnic', title: 'DLA planting ideas in Singapore’s third national gardens', url: 'https://www.sp.edu.sg/courses/schools/abe/happenings/detail/abe-happenings/dla--planting-ideas--in-singapore-s-third-national-gardens', date: checkedOn, inTextAuthor: 'Singapore Polytechnic', apa: 'Singapore Polytechnic. (n.d.). DLA planting ideas in Singapore’s third national gardens. https://www.sp.edu.sg/courses/schools/abe/happenings/detail/abe-happenings/dla--planting-ideas--in-singapore-s-third-national-gardens' };
sources.nparksSunken = { institution: 'National Parks Board', title: 'Sunken Garden', url: 'https://juronglakegardens.nparks.gov.sg/discover/japanese-garden/sunken-garden/', date: checkedOn, inTextAuthor: 'National Parks Board', apa: 'National Parks Board. (2026, September 10). Sunken Garden. https://juronglakegardens.nparks.gov.sg/discover/japanese-garden/sunken-garden/' };
sources.ercoGuesthouse = { institution: 'ERCO', title: 'The Guesthouse at Japanese Gardens of Jurong Lake Gardens, Singapore', url: 'https://www.erco.com/en/inspiration/projects/the-guesthouse-at-japanese-gardens-of-jurong-lake-gardens-singapore/', date: checkedOn, inTextAuthor: 'ERCO', apa: 'ERCO. (n.d.). The Guesthouse at Japanese Gardens of Jurong Lake Gardens, Singapore. https://www.erco.com/en/inspiration/projects/the-guesthouse-at-japanese-gardens-of-jurong-lake-gardens-singapore/' };
sources.nparksFloral = { institution: 'National Parks Board', title: 'Floral Garden', url: 'https://juronglakegardens.nparks.gov.sg/floral-garden/', date: '18 October 2026', inTextAuthor: 'National Parks Board', apa: 'National Parks Board. (n.d.). Floral Garden. https://juronglakegardens.nparks.gov.sg/floral-garden/' };
sources.nparksVenue = { institution: 'National Parks Board', title: 'Book a venue', url: 'https://juronglakegardens.nparks.gov.sg/book-now/book-a-venue/', date: '18 October 2026', inTextAuthor: 'National Parks Board', apa: 'National Parks Board. (2026, September 6). Book a venue. https://juronglakegardens.nparks.gov.sg/book-now/book-a-venue/' };
sources.nparksJapaneseGuide = { institution: 'National Parks Board', title: 'DIY Japanese Garden guide', url: 'https://lightsbythelake.nparks.gov.sg/files/DIY_JAPANESE_GARDEN_GUIDE.pdf', date: '18 October 2026', inTextAuthor: 'National Parks Board', apa: 'National Parks Board. (n.d.). DIY Japanese Garden guide [PDF]. https://lightsbythelake.nparks.gov.sg/files/DIY_JAPANESE_GARDEN_GUIDE.pdf' };
sources.natureAssemblyJapanese = { institution: 'Nature Assembly', title: 'Japanese Gardens, Jurong Lake Gardens', url: 'https://natureassembly.com/portfolio/japanese-gardens', date: '18 October 2026', inTextAuthor: 'Nature Assembly', apa: 'Nature Assembly. (n.d.). Japanese Gardens, Jurong Lake Gardens. https://natureassembly.com/portfolio/japanese-gardens' };
sources.nparksResthouse = { institution: 'National Parks Board', title: 'Resthouse', url: 'https://juronglakegardens.nparks.gov.sg/discover/japanese-garden/resthouse/', date: '18 October 2026', inTextAuthor: 'National Parks Board', apa: 'National Parks Board. (2026, September 10). Resthouse. https://juronglakegardens.nparks.gov.sg/discover/japanese-garden/resthouse/' };
sources.nparksFlautist = { institution: 'National Parks Board', title: 'Melodies in nature: A flautist’s musical escape in Japanese Garden', url: 'https://juronglakegardens.nparks.gov.sg/faces-of-jlg/example-titlemelodies-in-nature-a-flautist-s-musical-escape-in-japanese-garden/', date: '18 October 2026', inTextAuthor: 'National Parks Board', apa: 'National Parks Board. (2024, October). Melodies in nature: A flautist’s musical escape in Japanese Garden. https://juronglakegardens.nparks.gov.sg/faces-of-jlg/example-titlemelodies-in-nature-a-flautist-s-musical-escape-in-japanese-garden/' };
sources.nparksWaterLily = { institution: 'National Parks Board', title: 'Water Lily Garden', url: 'https://juronglakegardens.nparks.gov.sg/water-lily-garden/', date: '18 October 2026', inTextAuthor: 'National Parks Board', apa: 'National Parks Board. (n.d.). Water Lily Garden. https://juronglakegardens.nparks.gov.sg/water-lily-garden/' };
sources.nparksWaterLilyPavilion = { institution: 'National Parks Board', title: 'Water Lily Pavilion', url: 'https://juronglakegardens.nparks.gov.sg/venues/water-lily-pavilion/', date: '18 October 2026', inTextAuthor: 'National Parks Board', apa: 'National Parks Board. (2026, September 6). Water Lily Pavilion. https://juronglakegardens.nparks.gov.sg/venues/water-lily-pavilion/' };
sources.nparksBreathing = { institution: 'National Parks Board', title: 'Breathing Gallery', url: 'https://juronglakegardens.nparks.gov.sg/discover/japanese-garden/breathing-gallery/', date: '18 October 2026', inTextAuthor: 'National Parks Board', apa: 'National Parks Board. (2026, September 10). Breathing Gallery. https://juronglakegardens.nparks.gov.sg/discover/japanese-garden/breathing-gallery/' };
sources.nparksEdible = { institution: 'National Parks Board', title: 'Edible Garden', url: 'https://juronglakegardens.nparks.gov.sg/discover/chinese-garden/edible-garden/', date: '18 October 2026', inTextAuthor: 'National Parks Board', apa: 'National Parks Board. (2026, July 8). Edible Garden. https://juronglakegardens.nparks.gov.sg/discover/chinese-garden/edible-garden/' };
sources.nparksTwin = { institution: 'National Parks Board', title: 'Twin Pagoda', url: 'https://juronglakegardens.nparks.gov.sg/discover/chinese-garden/twin-pagoda/', date: '18 October 2026', inTextAuthor: 'National Parks Board', apa: 'National Parks Board. (2026, September 13). Twin Pagoda. https://juronglakegardens.nparks.gov.sg/discover/chinese-garden/twin-pagoda/' };
sources.nparksWaterWall = { institution: 'National Parks Board', title: 'Water Wall Court', url: 'https://juronglakegardens.nparks.gov.sg/water-wall-court/', date: '18 October 2026', inTextAuthor: 'National Parks Board', apa: 'National Parks Board. (n.d.). Water Wall Court. https://juronglakegardens.nparks.gov.sg/water-wall-court/' };
sources.nparksChineseGuide = { institution: 'National Parks Board', title: 'DIY Chinese Garden guide', url: 'https://juronglakegardens.nparks.gov.sg/files/Guided%20Tours/DIY_CHINESE_GARDEN_GUIDE.pdf', date: '18 October 2026', inTextAuthor: 'National Parks Board', apa: 'National Parks Board. (n.d.). DIY Chinese Garden guide [PDF]. https://juronglakegardens.nparks.gov.sg/files/Guided%20Tours/DIY_CHINESE_GARDEN_GUIDE.pdf' };
sources.nlbStoneboat1982 = { institution: 'New Nation via NewspaperSG', title: 'Red for double happiness', url: 'https://eresources.nlb.gov.sg/newspapers/digitised/article/newnation19820627-1.2.15', date: '18 October 2026', inTextAuthor: 'Teo', apa: 'Teo, L. H. (1982, June 27). Red for double happiness. New Nation, p. 6. https://eresources.nlb.gov.sg/newspapers/digitised/article/newnation19820627-1.2.15', evidenceScope: 'The NewspaperSG issue index identifies the article, author, date, page and Stoneboat marriage-registry setting. Only claims visible in the indexed record are used because the full OCR was not accessible during this review.' };
sources.sg101Chinese = { institution: 'SG101', title: 'Neighbourhood: Chinese Garden', url: 'https://www.sg101.gov.sg/resources/archives/neighbourhood-chinese-garden/', date: '18 October 2026', inTextAuthor: 'SG101', apa: 'SG101. (2026, September 25). Neighbourhood: Chinese Garden. https://www.sg101.gov.sg/resources/archives/neighbourhood-chinese-garden/', evidenceScope: 'Government educational account used for the attribution of the overall garden design to Professor Yu Yuen-Chen; it does not identify Stoneboat’s detailed-design author.' };
sources.lpaJLG = { institution: 'Lighting Planners Associates', title: 'Jurong Lake Gardens', url: 'https://www.lighting.co.jp/en/projects/jurong-lake-gardens/', date: '18 October 2026', inTextAuthor: 'Lighting Planners Associates', apa: 'Lighting Planners Associates. (n.d.). Jurong Lake Gardens. https://www.lighting.co.jp/en/projects/jurong-lake-gardens/', evidenceScope: 'Project record identifying the 2024 lighting designer, client and architectural and landscape collaborators.' };
sources.luxconexJLG = { institution: 'Luxconex', title: 'Jurong Lake Gardens', url: 'https://luxconex.com/project/jurong-lake-gardens/', date: '18 October 2026', inTextAuthor: 'Luxconex', apa: 'Luxconex. (n.d.). Jurong Lake Gardens. https://luxconex.com/project/jurong-lake-gardens/', evidenceScope: 'Project-supplier account used only for the specific claim that contour lighting was applied at Stoneboat and Tea Pavilion.' };
sources.jldSmart2022 = { institution: 'Jurong Lake District', title: 'A place to go: Behind the scenes! Smart operations in Jurong Lake Gardens', url: 'https://www.jld.gov.sg/events-and-resources/smartjlg/', date: '18 October 2026', inTextAuthor: 'Jurong Lake District', apa: 'Jurong Lake District. (2022, May 5). A place to go: Behind the scenes! Smart operations in Jurong Lake Gardens. https://www.jld.gov.sg/events-and-resources/smartjlg/', evidenceScope: 'Dated government account of systems and trials operating or being trialled in 2022; it does not establish that every trial continued after that year.' };
sources.ctrlShiftTech = { institution: 'CTRL Your Future, SHIFT Your Perspectives', title: 'Tech at play: Rolling out innovations at Jurong Lake Gardens', url: 'https://www.ctrlshift.gov.sg/stories/2021-stories/tech-innovations-jurong-lake-gardens/', date: '18 October 2026', inTextAuthor: 'CTRL Your Future, SHIFT Your Perspectives', apa: 'CTRL Your Future, SHIFT Your Perspectives. (2026, July 14). Tech at play: Rolling out innovations at Jurong Lake Gardens. https://www.ctrlshift.gov.sg/stories/2021-stories/tech-innovations-jurong-lake-gardens/', evidenceScope: 'Government interview with NParks deputy director Ong Chong Ren; used for the named sensor types, integration challenge and reported operational effects.' };
sources.nparksAR2023 = { institution: 'National Parks Board', title: 'Annual report 2022/2023', url: 'https://www.nparks.gov.sg/-/media/annual-report-2023/nparks_ar23_forweb_231016.pdf', date: '18 October 2026', inTextAuthor: 'National Parks Board', apa: 'National Parks Board. (2023). Annual report 2022/2023. https://www.nparks.gov.sg/-/media/annual-report-2023/nparks_ar23_forweb_231016.pdf', evidenceScope: 'Agency annual-report account of the Integrated Garden Management System and JuLee robot; not an independent performance evaluation.' };
sources.imdaSmartEstate2019 = { institution: 'Infocomm Media Development Authority', title: 'Call for innovative solutions for smart estates: NParks industry briefing', url: 'https://www.imda.gov.sg/-/media/Imda/Files/Industry-Development/Call-for-Proposals/Call-for-Innovative-Solutions-for-Smart-Estates-with-NParks/NParks-CFIS-Industry-Briefing-Slides.pdf', date: '18 October 2026', inTextAuthor: 'Infocomm Media Development Authority', apa: 'Infocomm Media Development Authority. (2019, July 29). Call for innovative solutions for smart estates: NParks industry briefing [PowerPoint slides]. https://www.imda.gov.sg/-/media/Imda/Files/Industry-Development/Call-for-Proposals/Call-for-Innovative-Solutions-for-Smart-Estates-with-NParks/NParks-CFIS-Industry-Briefing-Slides.pdf', evidenceScope: 'A 2019 problem-and-procurement briefing. Existing conditions are distinguished from desired technologies and later implementation.' };
sources.nparksShuttle = { institution: 'National Parks Board', title: 'Garden Shuttle Service Trial', url: 'https://juronglakegardens.nparks.gov.sg/garden-shuttle-service-trial/', date: '18 October 2026', inTextAuthor: 'National Parks Board', apa: 'National Parks Board. (2026, September 17). Garden Shuttle Service Trial. https://juronglakegardens.nparks.gov.sg/garden-shuttle-service-trial/' };
sources.nhbPioneers = { institution: 'National Heritage Board', title: 'Celebrating Jurong and its industrious pioneers', url: 'https://www.roots.gov.sg/stories-landing/stories/celebrating-jurong-and-its-industrious-pioneers/story', date: checkedOn };
sources.academicNg = { institution: 'International Journal of Environmental Research and Public Health', title: 'Effects of horticultural therapy on Asian older adults: A randomized controlled trial', url: 'https://doi.org/10.3390/ijerph15081705', date: checkedOn, inTextAuthor: 'Ng et al.', apa: 'Ng, K. S. T., Sia, A., Ng, M. K. W., Tan, C. T. Y., Chan, H. Y., Tan, C. H., Rawtaer, I., Feng, L., Mahendran, R., Larbi, A., Kua, E. H., & Ho, R. C. M. (2018). Effects of horticultural therapy on Asian older adults: A randomized controlled trial. International Journal of Environmental Research and Public Health, 15(8), Article 1705. https://doi.org/10.3390/ijerph15081705', evidenceScope: 'Contextual programme study; not an evaluation of the mapped Jurong Lake Gardens feature.' };
sources.academicStokols.inTextAuthor = 'Stokols';
sources.academicStokols.title = 'Landscapes of state capitalism: Reconciling the vernacular, national development imaginaries, and green capital accumulation';
sources.academicStokols.evidenceScope = 'Regional interpretive framework, not a local biodiversity or visitor-outcome study.';
Object.assign(sources.cna2024Opening, { title: "An edible garden, waterfall and 'breathing gallery': Chinese and Japanese gardens reopen with new attractions", inTextAuthor: 'Ganesan', apa: "Ganesan, N. (2024, September 8). An edible garden, waterfall and ‘breathing gallery’: Chinese and Japanese gardens reopen with new attractions. CNA. https://www.channelnewsasia.com/singapore/chinese-japanese-gardens-reopen-jurong-lake-edible-garden-waterfall-water-lily-4590471" });
Object.assign(sources.straits2024Preview, { title: 'Water lilies, ‘sunken’ garden to greet visitors when Japanese, Chinese Gardens reopen in Sept', inTextAuthor: 'Wong', apa: 'Wong, P. T. (2024, July 21). Water lilies, ‘sunken’ garden to greet visitors when Japanese, Chinese Gardens reopen in Sept. The Straits Times. https://www.straitstimes.com/singapore/water-lilies-sunken-garden-to-greet-visitors-when-japanese-chinese-gardens-reopen-in-september', evidenceScope: 'Preview reporting; not a post-opening outcome evaluation.' });
Object.assign(sources.cna2018Plan, { title: 'Jurong Lake Gardens West to open in early 2019; largest water lilies collection part of attraction', url: 'https://www.channelnewsasia.com/singapore/jurong-lake-gardens-west-open-in-early-2019-largest-water-lilies-collection-part-attraction-5736751', inTextAuthor: 'Kamil', apa: 'Kamil, A. (2018, March 24). Jurong Lake Gardens West to open in early 2019; largest water lilies collection part of attraction. CNA. https://www.channelnewsasia.com/singapore/jurong-lake-gardens-west-open-in-early-2019-largest-water-lilies-collection-part-attraction-5736751', evidenceScope: 'Contemporary reporting of the proposed plan; not proof that all planned attractions were later built.' });
Object.assign(sources.mothership2019Opening, { title: 'Lakeside Garden, a new ‘Botanic Gardens’ of the heartlands, opens on April 27, 2019', inTextAuthor: 'Lay', apa: 'Lay, B. (2019, April 27). Lakeside Garden, a new ‘Botanic Gardens’ of the heartlands, opens on April 27, 2019. Mothership. https://mothership.sg/2019/04/lakeside-garden/' });
sources.jld2019Opening.evidenceScope = 'Legacy link returned HTTP 404 on 13 October 2026; not used to substantiate the case narrative.';
// Clean display annotations out of the formal titles where the primary page is known.
[['nparksChinese', 'Chinese Garden'], ['nparksJapanese', 'Japanese Garden'], ['nparksLakeside', 'Lakeside Garden'], ['nparksGrandArch', 'Grand Arch'], ['nparksGrasslands', 'Grasslands'], ['nparksWetlands', 'Floating Wetlands'], ['nparksVisitorGuidelines', 'Visitor guidelines']].forEach(([id, title]) => {
  sources[id].title = title;
  sources[id].evidenceScope = 'Current description checked in 2026; historical claims are attributed to their dated sources separately.';
});
// Cite the digitised edition conservatively where the original creator is not yet
// verified. For 1963, the catalogue provides an explicit original-map citation.
[1953, 1971, 1975].forEach((year) => {
  const source = sources[`nus${year}`];
  source.apa = `National University of Singapore Libraries. (n.d.). ${year} Singapore topographical map [Digitised historical map catalogue]. ${source.url}`;
  source.evidenceScope = `Original map year: ${year}; NUS is the digitisation host, not asserted to be the original cartographer.`;
});
Object.assign(sources.nus1963, { inTextAuthor: 'Assistant Director of Survey, Far East Land Forces', apa: 'Assistant Director of Survey, Far East Land Forces. (1963). Singapore, 1:63,360 (Series GSGS 4923, Sheet Singapore, Edition 2-GSGS) [Map]. War Office & Air Ministry. https://libmaps.nus.edu.sg/maps/1963/', evidenceScope: 'Original map attribution follows the NUS catalogue; scanned and georeferenced later at NUS.' });
const originalMapCitations = {
  1953: ['Surveyor General, Malaya', 'Singapore topographical maps, 1:25,000'],
  1971: ['Mapping Unit, Ministry of Defence', 'Singapore topographical map, 1:63,360'],
  1975: ['Mapping Unit, Ministry of Defence', 'Singapore topographical maps, 1:25,000']
};
Object.entries(originalMapCitations).forEach(([year, [author, title]]) => {
  Object.assign(sources[`nus${year}`], { inTextAuthor: author, apa: `${author}. (${year}). ${title} [Map]. Digitised and served by National University of Singapore Libraries. ${sources[`nus${year}`].url}` });
});
Object.assign(sources.nparksParksGeo, { inTextAuthor: 'National Parks Board', apa: `National Parks Board. (2023). NParks Parks and Nature Reserves (2026) [Data set]. data.gov.sg. Retrieved 15 October 2026, from ${sources.nparksParksGeo.url}` });
Object.assign(sources.uraWaterGeo, { inTextAuthor: 'Urban Redevelopment Authority', apa: `Urban Redevelopment Authority. (2026). Master Plan 2025 SDCP Waterbody layer [Data set]. data.gov.sg. Retrieved 15 October 2026, from ${sources.uraWaterGeo.url}` });
jurongHeritageTrail.forEach((stop) => {
  sources[`nhbTrail${stop.number}`] = {
    institution: 'National Heritage Board', title: `${stop.name} · Jurong Heritage Trail`,
    url: `https://www.roots.gov.sg${stop.path}`, date: '23 October 2026',
    evidenceScope: `NHB directions point: ${stop.address}. ${stop.positionNote}`
  };
});
sources.mandaiBirdClosure = { institution: 'Mandai Wildlife Group', title: 'Visitors bid farewell to Jurong Bird Park · 3 January 2023', url: 'https://www.mandai.com/en/about-mandai/media-centre/Visitors-bid-farewell-to-Jurong-Bird-Park.html', date: '23 October 2026', apa: 'Mandai Wildlife Group. (2023, January 3). Visitors bid farewell to Jurong Bird Park. https://www.mandai.com/en/about-mandai/media-centre/Visitors-bid-farewell-to-Jurong-Bird-Park.html' };
// Matching author/date suffixes keep paragraph citations unambiguous, including
// the many undated NParks pages. Retrieval dates are never publication dates.
const citationGroups = new Map();
Object.entries(sources).forEach(([id, source]) => {
  source.key = id;
  source.apa ||= `${source.institution}. (n.d.). ${source.title}. ${source.url}`;
  const date = source.apa.match(/\. \((n\.d\.|\d{4})/);
  source.citeYear = date?.[1] || 'n.d.';
  source.inTextAuthor ||= source.institution;
  const groupKey = `${source.inTextAuthor}|${source.citeYear}`;
  if (!citationGroups.has(groupKey)) citationGroups.set(groupKey, []);
  citationGroups.get(groupKey).push(source);
});
citationGroups.forEach((group) => {
  if (group.length < 2) return;
  group.sort((a, b) => a.title.localeCompare(b.title)).forEach((source, index) => {
    const suffix = index < 26 ? String.fromCharCode(97 + index) : `a${String.fromCharCode(97 + index - 26)}`;
    const originalYear = source.citeYear;
    source.citeYear = `${originalYear}${originalYear === 'n.d.' ? '-' : ''}${suffix}`;
    source.apa = source.apa.replace(`. (${originalYear}`, `. (${source.citeYear}`);
  });
});

const photoRecords = [
  { displayYears: [1975], exact: false, title: 'Chinese Garden, 1980 · archive-identified photograph', note: 'This is the nearest dated archive reference available in the current register for the 1975 garden state. NHB identifies the photograph as “Chinese Garden, 1980”; it must not be read as a 1975 photograph. The official trail page provides the current booklet download.', source: sources.nhbJurongTrail, image: null, imageAlt: '', sourceOnlyLabel: 'SOURCE RECORD', sourceOnlyTitle: 'Open the Jurong Heritage Trail page ↗', imageLinkLabel: 'Open the official source page ↗' },
  { displayYears: [1975], exact: false, title: 'The Garden of Greenery at the Chinese Garden · c. 1980s', note: 'The National Museum of Singapore collection record dates this postcard to c. 1980s. It is shown as a nearest-period visual reference, not relabelled as an exact 1975 image. The current Roots media endpoint is not treated as a stable reusable image URL, so this remains a source-only archive record.', source: sources.nhbCollection1980s, image: null, imageAlt: '', sourceOnlyLabel: 'SOURCE ONLY', sourceOnlyTitle: 'Open the National Museum collection record ↗', imageLinkLabel: 'Open collection record ↗' },
  { displayYears: [2019], exact: false, title: 'Lakeside Garden · official NParks visual record', note: 'This is an official NParks page/video thumbnail associated with Lakeside Garden. It is the closest public visual reference for the 2019 first-phase state, not a claim that the image was taken exactly in 2019.', source: sources.nparksLakeside, image: 'https://i.ytimg.com/vi/wW2IUERkvzo/sddefault.jpg', imageAlt: 'Official NParks video thumbnail for Lakeside Garden', videoUrl: 'https://www.youtube.com/watch?v=wW2IUERkvzo', imageLinkLabel: 'Open the Lakeside Garden video ↗' },
  { displayYears: [2024], exact: true, evidenceLabel: 'official video · exactly dated', title: 'Rejuvenated Chinese and Japanese Gardens · 8 September 2024', note: 'The PMO source dates the reopening to 8 September 2024. The full-speech player embedded on the PMO page currently returns a playback error, so this card uses the separate official PMO highlights video as the playable fallback. The speech page remains the date and event source.', source: sources.pmoOpening, image: 'https://i.ytimg.com/vi/6H--a2LsBpY/sddefault.jpg', imageAlt: 'Official PMO highlights video thumbnail for the 2024 opening', videoUrl: 'https://www.youtube.com/watch?v=6H--a2LsBpY', videoLinkLabel: 'Open the official PMO highlights video ↗', videoSource: sources.pmoHighlights, imageLinkLabel: 'Open the official PMO highlights video ↗' },
  { displayYears: [2024], exact: true, evidenceLabel: 'community photograph · exactly dated', title: 'Lights By The Lake · photograph taken 20 September 2024', note: 'A community photograph by BP Chua records the Mid-Autumn Festival at Jurong Lake Gardens. Flickr gives both the upload date and the stated capture date; the image remains the photographer’s copyright.', source: sources.socialFlickrLights, image: 'https://live.staticflickr.com/65535/54011607925_91019f2236.jpg', imageAlt: 'Community photograph of Lights By The Lake at Jurong Lake Gardens on 20 September 2024', imageLinkLabel: 'Open photographer’s Flickr page ↗' },
  { displayYears: [2024], exact: false, evidenceLabel: 'community photo post · date of post stated', title: 'Newly reopened Chinese Garden · Lemon8 community post', note: 'The public post is dated 23 September 2024 and describes a visit after the reopening. The post date is known; the individual capture dates of its images are not stated. The original post contains the image gallery; preview is not reproduced here because its CDN image URL is not stable. Copyright remains with the creator.', source: sources.socialLemon8, image: null, imageAlt: '', sourceOnlyLabel: 'SOURCE ONLY', sourceOnlyTitle: 'Open the original post / photo gallery ↗', imageLinkLabel: 'Open the original Lemon8 post ↗' },
  { displayYears: [2024], exact: false, evidenceLabel: 'community photo essay · date of post stated', title: 'Bonsai Garden · TravelFeed photo essay, October 2024', note: 'A visitor photo essay published in October 2024 documents the Bonsai Garden within the Chinese Garden and supplies a location reference. The page date is known; individual capture dates are not stated. Preview is linked to the original author page and remains the creator’s copyright.', source: sources.socialTravelFeed, image: 'https://files.peakd.com/file/peakd-hive/curamax/EoPM2YaLJhaCiLmEKhsL1MDnDGSuSeXxWgsDVEtANPSU8DW7rRrq3qvZ3bkeC9rD1gr.jpg', imageAlt: 'Community photograph from a TravelFeed photo essay about the Bonsai Garden at Jurong Lake', imageLinkLabel: 'Open the original TravelFeed photo essay ↗' },
  { displayYears: [2024], exact: false, evidenceLabel: 'community video still · publication date stated', title: 'Chinese Garden Singapore 2024 · community video', note: 'A visitor video published on 9 September 2024 provides a community visual record immediately after reopening. It is a video thumbnail, not an independently dated still photograph.', source: sources.socialYouTube2024, image: 'https://i.ytimg.com/vi/xhjzA5K7EvU/sddefault.jpg', imageAlt: 'Community video thumbnail showing the Chinese Garden in 2024', videoUrl: 'https://www.youtube.com/watch?v=xhjzA5K7EvU', imageLinkLabel: 'Open the community video ↗' },
  { displayYears: [2024], exact: true, evidenceLabel: 'CC BY-SA photograph · exactly dated', title: 'Twin Pagodas · photograph taken 15 September 2024', note: 'This Wikimedia Commons photograph is explicitly dated 15 September 2024 and released under CC BY-SA 4.0 by FN-082. It records the reopened Chinese Garden from the top of the Twin Pagodas; attribution and the original file page are retained.', source: sources.commons2024Twin, image: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Twin_Pagodas%2C_Jurong_Lake_Gardens%2C_Singapore_202409.jpg', imageAlt: 'Twin Pagodas at Jurong Lake Gardens photographed on 15 September 2024 by FN-082', imageLinkLabel: 'Open the Wikimedia Commons file ↗' },
  { displayYears: [2024], exact: true, evidenceLabel: 'CC BY-SA photograph · exactly dated', title: 'Chinese Garden entrance · photograph taken 14 September 2024', note: 'This Wikimedia Commons photograph is explicitly dated 14 September 2024 and released under CC BY-SA 4.0 by FN-082. It documents the Grand Arch / Yuan Ching Road entrance shortly after reopening.', source: sources.commons2024Entrance, image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Chinese_Garden_Entrance_-_Yuan_Ching_Road_202409_2.jpg', imageAlt: 'Chinese Garden entrance photographed on 14 September 2024 by FN-082', imageLinkLabel: 'Open the Wikimedia Commons file ↗' },
  { displayYears: [2024], exact: false, evidenceLabel: 'CC BY-SA photograph · nearest dated reference', title: 'Jurong Lake Gardens map board · photograph taken 10 November 2023', note: 'This CC BY-SA 4.0 Wikimedia Commons photograph was taken on 10 November 2023. It is shown as the nearest dated visual reference for the 2024 state, not relabelled as an exact 2024 photograph; the file metadata includes a camera location near the Gardens.', source: sources.commons2023Map, image: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Jurong_Lake_Gardens_map_10-11-2023.jpg', imageAlt: 'Jurong Lake Gardens map board photographed on 10 November 2023 by LN9267', imageLinkLabel: 'Open the Wikimedia Commons file ↗' },
  { displayYears: [2019], exact: true, evidenceLabel: 'community photograph · exactly dated', title: 'Grassland · photograph taken 1 May 2019', note: 'Flickr records the capture date as 1 May 2019. The original photographer page remains the evidence and rights source; because the static Flickr image endpoint is not stable in this deployment, the card is retained as a source-only record rather than showing a broken preview.', source: sources.flickr2019Grassland, image: null, imageAlt: '', sourceOnlyLabel: 'SOURCE ONLY', sourceOnlyTitle: 'Open the photographer’s Flickr photo ↗', imageLinkLabel: 'Open the photographer’s Flickr page ↗' },
  { displayYears: [2024], exact: false, evidenceLabel: 'community photograph · nearest dated reference', title: 'Jurong Lake Gardens · photograph taken 15 February 2022', note: 'Flickr records a dated community photograph from 15 February 2022. It is a useful pre-reopening reference for landscape continuity, not evidence of the final 2024 garden state.', source: sources.flickr2022Garden, image: 'https://live.staticflickr.com/65535/51909496294_7a027c8e1f.jpg', imageAlt: 'Jurong Lake Gardens photographed on 15 February 2022 by cattan2011', imageLinkLabel: 'Open the photographer’s Flickr page ↗' }
];

const facilityNames = [
  ['Grand Arch', 'Chinese Garden', 'landmark'], ['Edible Garden', 'Chinese Garden', 'garden / learning'], ['Twin Pagoda', 'Chinese Garden', 'landmark'], ['Water Wall Court', 'Chinese Garden', 'water feature'], ['Stoneboat', 'Chinese Garden', 'landmark'], ['Tea Pavilion', 'Chinese Garden', 'pavilion'], ['Bamboo Grove and Waterfall', 'Chinese Garden', 'garden / water feature'], ['Bonsai Garden', 'Chinese Garden', 'garden'], ['Pagoda Plaza', 'Chinese Garden', 'public space'], ['Cloud Pagoda', 'Chinese Garden', 'landmark'], ['Harvest Moon Terrace', 'Chinese Garden', 'viewing terrace'], ['Cascading Creek', 'Chinese Garden', 'water feature'], ['Cascade Pavilion', 'Chinese Garden', 'pavilion'],
  ['Floral Garden', 'Japanese Garden', 'garden'], ['Teahouse', 'Japanese Garden', 'pavilion'], ['Silver Moon Terrace', 'Japanese Garden', 'viewing terrace'], ['Guesthouse', 'Japanese Garden', 'building'], ['Guest Pavilion', 'Japanese Garden', 'pavilion'], ['Sunken Garden', 'Japanese Garden', 'garden'], ['Resthouse', 'Japanese Garden', 'building'], ['Floral Ridge', 'Japanese Garden', 'garden'], ['Water Lily Garden', 'Japanese Garden', 'garden'], ['Water Lily Pavilion', 'Japanese Garden', 'pavilion'], ['Breathing Gallery', 'Japanese Garden', 'public space'],
  ['SkatePark @ Lakeside Garden', 'Lakeside Garden', 'sport'], ['Rainforest Pavilion', 'Lakeside Garden', 'pavilion'], ['Lakeside House', 'Lakeside Garden', 'building / F&B'], ['Ecopond', 'Lakeside Garden', 'water feature'], ['North Carpark', 'Lakeside Garden', 'transport'], ['Clusia Cove Pavilion', 'Lakeside Garden', 'pavilion'], ['Water Play at Clusia Cove', 'Lakeside Garden', 'play / water'], ['Cleansing Biotope', 'Lakeside Garden', 'water infrastructure'], ['The Canyon', 'Lakeside Garden', 'landscape feature'], ['Entrance Pavilion', 'Lakeside Garden', 'access / information'], ['PAssion WaVe @ Jurong Lake Gardens', 'Lakeside Garden', 'water recreation'], ['Forest Ramble (Children’s Playground)', 'Lakeside Garden', 'play'], ['Play Pavilion', 'Lakeside Garden', 'play / shelter'], ['Butterfly Maze', 'Lakeside Garden', 'play / learning'], ['Therapeutic Garden', 'Lakeside Garden', 'care / accessibility'], ['The Logs Trail', 'Lakeside Garden', 'trail'], ['Freshwater Swamp', 'Lakeside Garden', 'habitat'], ['Allotment Gardens', 'Lakeside Garden', 'community gardening'], ['Gardenhouse', 'Lakeside Garden', 'venue'], ['Alstonia Island', 'Lakeside Garden', 'habitat'], ['Dog Run', 'Lakeside Garden', 'recreation'], ['Bird Hides', 'Lakeside Garden', 'wildlife viewing'], ['The Lone Tree', 'Lakeside Garden', 'memory / sculpture'], ['Grasslands', 'Lakeside Garden', 'habitat'], ['Rasau Walk', 'Lakeside Garden', 'boardwalk'], ['South Carpark', 'Lakeside Garden', 'transport'], ['ActiveSG Park @ Jurong Lake Gardens', 'Lakeside Garden', 'sport / recreation'], ['Heron Island', 'Lakeside Garden', 'habitat'], ['Neram Streams', 'Lakeside Garden', 'naturalised waterway']
].map(([name, garden, type]) => ({ name, garden, type, source: sources.nparksBrochure }));

const amenityNames = [
  ['Information', 'visitor service'], ['Drop-off point', 'access'], ['F&B', 'food and beverage'], ['Vending Machine (Drinks/Hot Food/Retail)', 'service'], ['Drinking Fountain', 'service'], ['Shelter', 'comfort'], ['Toilet', 'service'], ['Nursing Room', 'care'], ['Fitness Corner', 'exercise'], ['BBQ Pits', 'recreation'], ['Gate', 'access control'], ['MRT', 'public transport'], ['Bicycle Parking', 'active transport'], ['Coach Parking', 'transport'], ['Public Bus Stop', 'public transport'], ['Carpark', 'transport'], ['Building / Facilities', 'building'], ['Park Connector Network', 'mobility'], ['Earth Trail', 'trail'], ['Boardwalk', 'trail'], ['Automated External Defibrillator', 'safety']
].map(([name, type]) => ({ name, type, source: sources.nparksBrochure }));

// Purpose text is deliberately limited to the named attraction descriptions in the
// official NParks garden pages. An absent key means that the public source names the
// place but does not state a specific use in the source register used here.
const attractionEvidence = {
  'Grand Arch': { purpose: 'NParks presents the Grand Arch as a landmark and an entry point for exploring, eating and discovering the Chinese Garden.', source: sources.nparksGrandArch, image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Chinese_Garden_Entrance_-_Yuan_Ching_Road_202409_2.jpg', imageSource: sources.commons2024Entrance, previewLabel: 'CC BY-SA 4.0 · Wikimedia Commons · 14 September 2024', story: 'The Grand Arch has been an iconic entrance feature since the Chinese Garden opened in 1975. NParks describes it as retained and enhanced during the rejuvenation, while the current Grand Arch page adds the Gallery, Plant Factory and Canopy restaurant to the area. This is a clear example of layered heritage: a preserved landmark becomes a platform for new education, sustainable horticulture, dining and visitor circulation.', storySources: [sources.nparksGrandArch, sources.osmGrandArch, sources.nparksAnnualReport, sources.academicStokols] },
  'Edible Garden': { purpose: 'NParks describes this as a themed garden of tropical edibles, herbs and spices, linking planting to food and learning.', source: sources.nparksChinese, image: 'https://isomer-user-content.by.gov.sg/318/b96c0ff4-7f25-4d4a-baef-015d4884d198/Edible%20Garden.webp', previewLabel: 'Official NParks facility image' },
  'Twin Pagoda': { purpose: 'NParks identifies the Twin Pagoda as one of the Chinese Garden’s recognisable architectural landmarks.', source: sources.nparksChinese, image: 'https://isomer-user-content.by.gov.sg/318/56c3f221-5e53-46f1-9ba4-48ef20268230/Twin%20Pagoda.jpg', previewLabel: 'Official NParks facility image' },
  'Bamboo Grove and Waterfall': { purpose: 'NParks describes the Bamboo Grove and Waterfall as a garden attraction combining planting and water movement.', source: sources.nparksChinese, image: 'https://isomer-user-content.by.gov.sg/318/97a85d26-59c1-4246-9d62-46fc3af55496/Bamboo%20Grove%20and%20Waterfall.webp', previewLabel: 'Official NParks facility image' },
  'Bonsai Garden': { purpose: 'NParks presents the Bonsai Garden as a Suzhou-style retreat displaying miniature Asian landscapes and bonsai within the Chinese Garden.', source: sources.nparksChinese },
  'Cloud Pagoda': { purpose: 'NParks identifies the Cloud Pagoda as a seven-storey Chinese Garden landmark with a 360-degree view and twelve Chinese Zodiac statues.', source: sources.nparksChinese },
  'Water Wall Court': { purpose: 'NParks describes Water Wall Court through its changing water wall, golden streams and views across the garden; it is both a designed water feature and a visual threshold.', source: sources.nparksChinese },
  'Stoneboat': { purpose: 'NParks describes this two-storey Lotus Pond landmark as a former branch of the Registrar of Marriage and a present garden attraction.', source: sources.nparksStoneboat },
  'Tea Pavilion': { purpose: 'NParks places the Tea Pavilion with the Stoneboat beside the Lotus Pond, linking a pavilion for pause and viewing to the Chinese Garden’s traditional landscape vocabulary.', source: sources.nparksChinese },
  'Floral Garden': { purpose: 'NParks describes the Floral Garden as a Japanese-inspired landscape designed by students, making planting and interpretation part of the rejuvenated Japanese Garden.', source: sources.nparksJapanese },
  'Teahouse': { purpose: 'NParks identifies the Teahouse as a sheltered event space adjacent to the Guesthouse; its 2024 opening account credits Tote Board funding for its development.', source: sources.nparks2024Opening },
  'Guesthouse': { purpose: 'The Guesthouse opened in 2024 as a mass-engineered-timber multipurpose hall with capacity for up to 1,000 people. NParks credits Tote Board funding toward the building.', source: sources.nparks2024Opening },
  'Guest Pavilion': { purpose: 'NParks describes the Guest Pavilion as a sheltered space beside the Guesthouse and Teahouse for smaller gatherings within the reopened Japanese Garden.', source: sources.nparks2024Opening },
  'Sunken Garden': { purpose: 'The cenote-inspired centrepiece harvests rainwater. NParks describes Paras-stone moss walls with more than 200 epiphyte species, including orchids, ferns and bromeliads; it presents the planted enclosure as a constructed microclimate.', source: sources.nparksSunken, image: 'https://isomer-user-content.by.gov.sg/318/6a0b7d10-76f7-48b6-9f9f-5bf2dd24f057/Sunken%20Garden.webp', previewLabel: 'Official NParks facility image' },
  'Floral Ridge': { purpose: 'NParks introduced Floral Ridge in the 2024 rejuvenation as a rustic trail lined with seasonally flowering trees.', source: sources.nparks2024Opening },
  'Water Lily Garden': { purpose: 'NParks describes the Water Lily Garden as a planted water landscape in the Japanese Garden.', source: sources.nparksJapanese, image: 'https://isomer-user-content.by.gov.sg/318/62624b32-0aaa-4fd6-80b3-c765aa8709c4/Water%20Lily%20Garden%202.webp', previewLabel: 'Official NParks facility image' },
  'Water Lily Pavilion': { purpose: 'NParks describes the Water Lily Pavilion as a viewing structure associated with water-lily terraces and the Water Lily Garden landscape.', source: sources.nparksJapanese },
  'Breathing Gallery': { purpose: 'At the 2024 reopening, NParks identified the Breathing Gallery as an indoor vivarium displaying terrestrial and aquatic species in terrariums, aquariums and paludariums.', source: sources.nparks2024Opening, image: 'https://isomer-user-content.by.gov.sg/318/438f8a15-f339-475b-95cf-8cef043e2a3b/Breathing%20Gallery%202.webp', previewLabel: 'Official NParks facility image' },
  'Resthouse': { purpose: 'NParks describes the Resthouse as a Japanese architectural structure providing a vantage point over cascading waters and the surrounding garden.', source: sources.nparksJapanese },
  'SkatePark @ Lakeside Garden': { purpose: 'NParks describes the Skatepark as five skill-level pods complemented by a parkour park and bouldering wall, making different forms of urban sport visible in the garden.', source: sources.nparksLakeside },
  'Rainforest Pavilion': { purpose: 'NParks presents the Rainforest Pavilion as a mass-engineered-timber building using sustainably sourced wood and storing carbon as part of the visitor landscape.', source: sources.nparksLakeside },
  'Lakeside House': { purpose: 'NParks names Lakeside House as a building and visitor venue within Lakeside Garden; the current attraction register associates it with food and beverage use.', source: sources.nparksLakeside },
  'Clusia Cove Pavilion': { purpose: 'NParks presents Clusia Cove as a water-play and learning landscape, with the pavilion serving that attraction.', source: sources.nparksLakeside },
  'Water Play at Clusia Cove': { purpose: 'NParks describes Clusia Cove as a water-play space where visitors can learn about water through play.', source: sources.nparksLakeside },
  'Cleansing Biotope': { purpose: 'NParks identifies the Cleansing Biotope as part of the water-sensitive landscape at Clusia Cove.', source: sources.nparksLakeside },
  'Forest Ramble (Children’s Playground)': { purpose: 'NParks describes Forest Ramble as a 2.3-hectare nature playgarden with 13 stations inspired by wildlife movements in a freshwater swamp forest, for children aged 5–12.', source: sources.nparksLakeside },
  'Butterfly Maze': { purpose: 'NParks lists the Butterfly Maze as a nature-play and learning attraction in Lakeside Garden.', source: sources.nparksLakeside },
  'Therapeutic Garden': { purpose: 'NParks identifies the Therapeutic Garden as serving children with special needs, seniors and people living with dementia, with sensory zones, wheelchair-accessible spaces and gardening areas.', source: sources.nparksLakeside },
  'The Logs Trail': { purpose: 'NParks presents the Logs Trail as an exploration route made from recycled tree parts, with fungi and other signs of decomposition becoming part of the learning landscape after rain.', source: sources.nparksLakeside },
  'Freshwater Swamp': { purpose: 'NParks names Freshwater Swamp as a habitat and learning landscape within Lakeside Garden.', source: sources.nparksLakeside },
  'Allotment Gardens': { purpose: 'NParks presents the Allotment Gardens as community gardening plots, making cultivation and participation part of the park’s public use.', source: sources.nparksLakeside },
  'Gardenhouse': { purpose: 'NParks describes Gardenhouse as a venue with halls and a function room for community and private events, bringing programmed gathering into the park landscape.', source: sources.nparksLakeside },
  'Alstonia Island': { purpose: 'NParks describes Alstonia Island as a freshwater-swamp landscape with plants adapted to periodic flooding, making hydrological conditions part of the habitat story.', source: sources.nparksLakeside },
  'Dog Run': { purpose: 'NParks lists the Dog Run as a 2,200-square-metre grass field with washing areas and natural obstacles for visitors with dogs.', source: sources.nparksLakeside },
  'Grasslands': { purpose: 'NParks describes the Grasslands as a tall-grass habitat with bird hides and the Lone Tree sculpture, whose form recalls Jurong’s industrial past and combines habitat viewing with interpretation.', source: sources.nparksLakeside },
  'Rasau Walk': { purpose: 'NParks presents Rasau Walk as a 300-metre boardwalk through a restored freshwater swamp with more than fifty plant species and shore birds.', source: sources.nparksLakeside },
  'ActiveSG Park @ Jurong Lake Gardens': { purpose: 'NParks lists ActiveSG Park as a sport and recreation facility within Lakeside Garden.', source: sources.nparksLakeside },
  'Heron Island': { purpose: 'NParks describes Heron Island as a protected haven where more than ten heron species nest, making wildlife protection part of the designed lake landscape.', source: sources.nparksLakeside },
  'Neram Streams': { purpose: 'NParks describes Neram Streams as a naturalised waterway that filters stormwater before it enters Jurong Lake and is also used for guided learning walks.', source: sources.nparksLakeside },
  'Entrance Pavilion': { purpose: 'NParks describes the Entrance Pavilion as an access and information point whose design references the Malayan Banyan; it also provides an information counter and wheelchair rental.', source: sources.nparksLakeside },
  'Forest Ramble (Children’s Playground)': { purpose: 'NParks describes Forest Ramble as a 2.3-hectare nature playgarden with 13 stations inspired by local wildlife movements in a freshwater swamp forest, for children aged 5–12.', source: sources.nparksLakeside },
  'PAssion WaVe @ Jurong Lake Gardens': { purpose: 'NParks identifies PAssion WaVe as a waterfront facility for kayaking and dragon boating, and the first such western Singapore facility designed for people of different ages and abilities.', source: sources.nparksLakeside }
};

const amenityEvidence = {
  'Fusion Spoon · Ecopond': { purpose: 'NParks identifies Fusion Spoon as a halal dining spot by the Eco Pond serving global flavours.', source: sources.nparksDining },
  'Starbucks · Lakeside House': { purpose: 'NParks identifies Starbucks as a dining point with an unblocked view of Jurong Lake.', source: sources.nparksDining },
  'Eden · Pagoda Plaza': { purpose: 'NParks identifies Eden as a halal dining point with garden views at Pagoda Plaza in the Chinese Garden.', source: sources.nparksDining },
  'Canopy · Grand Arch': { purpose: 'NParks identifies Canopy as a pet-friendly restaurant located at the historic Grand Arch in the Chinese Garden.', source: sources.nparksDining },
  'BingXue · Bonsai Garden': { purpose: 'NParks identifies BingXue as a dessert kiosk in the Bonsai Garden serving ice cream and tea creations.', source: sources.nparksDining },
  'Ice Cream Man and Friends · Sunken Garden': { purpose: 'NParks identifies Ice Cream Man and Friends as an artisanal ice-cream stop at the Sunken Garden.', source: sources.nparksDining },
  'Information · Pagoda Plaza': { purpose: 'NParks lists an information counter at Pagoda Plaza, open daily from 8.30am to 6.30pm.', source: sources.nparksServices },
  'Information · Water Lily Pavilion': { purpose: 'NParks lists an information counter at Water Lily Pavilion, open daily from 8.30am to 6.30pm, alongside complimentary first-come-first-served wheelchair rental.', source: sources.nparksServices },
  'Information · Entrance Pavilion': { purpose: 'NParks lists an information counter at Entrance Pavilion, open daily from 8.30am to 6.30pm, alongside complimentary first-come-first-served wheelchair rental.', source: sources.nparksServices },
  'North Carpark': { purpose: 'NParks lists North Carpark with 173 car lots, two handicap lots and 15 motorcycle lots, near Forest Ramble, Clusia Cove and Chinese Garden.', source: sources.nparksGettingHere },
  'South Carpark': { purpose: 'NParks lists South Carpark with 171 car lots, four handicap lots, 11 motorcycle lots and five bus bays, near ActiveSG, Grasslands and Japanese Garden.', source: sources.nparksGettingHere },
  'Lakeside MRT': { purpose: 'NParks identifies Lakeside MRT as a three-minute walk from Lakeside Plaza and a twelve-minute walk from the Entrance Pavilion information counter.', source: sources.nparksGettingHere },
  'Chinese Garden MRT': { purpose: 'NParks identifies Chinese Garden MRT as a five-minute walk from Chinese Garden Bridge and an eight-minute walk from the Pagoda Plaza information counter.', source: sources.nparksGettingHere },
  'Jurong East MRT': { purpose: 'NParks identifies Jurong East MRT as a twenty-minute walk to Japanese Garden Bridge and a twenty-three-minute walk to the Water Lily Pavilion information counter.', source: sources.nparksGettingHere }
};

// Named records from the NParks brochure (page 2). Coordinates are assigned
// separately after independent bridge-based georeferencing below.
const facilityPlanRows = [
  ['C1', 'Grand Arch', 'Chinese Garden', 'landmark'], ['C2', 'Edible Garden', 'Chinese Garden', 'garden / learning'], ['C3', 'Twin Pagoda', 'Chinese Garden', 'landmark'], ['C4', 'Water Wall Court', 'Chinese Garden', 'water feature'], ['C5', 'Stoneboat', 'Chinese Garden', 'landmark'], ['C6', 'Tea Pavilion', 'Chinese Garden', 'pavilion'], ['C7', 'Bamboo Grove and Waterfall', 'Chinese Garden', 'garden / water feature'], ['C8', 'Bonsai Garden', 'Chinese Garden', 'garden'], ['C9', 'Pagoda Plaza', 'Chinese Garden', 'public space'], ['C10', 'Cloud Pagoda', 'Chinese Garden', 'landmark'], ['C11', 'Harvest Moon Terrace', 'Chinese Garden', 'viewing terrace'], ['C12', 'Cascading Creek', 'Chinese Garden', 'water feature'], ['C13', 'Cascade Pavilion', 'Chinese Garden', 'pavilion'],
  ['J1', 'Floral Garden', 'Japanese Garden', 'garden'], ['J2', 'Teahouse', 'Japanese Garden', 'pavilion'], ['J3', 'Silver Moon Terrace', 'Japanese Garden', 'viewing terrace'], ['J4', 'Guesthouse', 'Japanese Garden', 'building'], ['J5', 'Guest Pavilion', 'Japanese Garden', 'pavilion'], ['J6', 'Sunken Garden', 'Japanese Garden', 'garden'], ['J7', 'Resthouse', 'Japanese Garden', 'building'], ['J8', 'Floral Ridge', 'Japanese Garden', 'garden'], ['J9', 'Water Lily Garden', 'Japanese Garden', 'garden'], ['J10', 'Water Lily Pavilion', 'Japanese Garden', 'pavilion'], ['J11', 'Breathing Gallery', 'Japanese Garden', 'public space'],
  ['L1', 'SkatePark @ Lakeside Garden', 'Lakeside Garden', 'sport'], ['L2', 'Rainforest Pavilion', 'Lakeside Garden', 'pavilion'], ['L3', 'Lakeside House', 'Lakeside Garden', 'building / F&B'], ['L4', 'Ecopond', 'Lakeside Garden', 'water feature'], ['L5', 'North Carpark', 'Lakeside Garden', 'transport'], ['L6', 'Clusia Cove Pavilion', 'Lakeside Garden', 'pavilion'], ['L7', 'Water Play at Clusia Cove', 'Lakeside Garden', 'play / water'], ['L8', 'Cleansing Biotope', 'Lakeside Garden', 'water infrastructure'], ['L9', 'The Canyon', 'Lakeside Garden', 'landscape feature'], ['L10', 'Entrance Pavilion', 'Lakeside Garden', 'access / information'], ['L11', 'PAssion WaVe @ Jurong Lake Gardens', 'Lakeside Garden', 'water recreation'], ['L12', 'Forest Ramble (Children’s Playground)', 'Lakeside Garden', 'play'], ['L13', 'Play Pavilion', 'Lakeside Garden', 'play / shelter'], ['L14', 'Butterfly Maze', 'Lakeside Garden', 'play / learning'], ['L15', 'Therapeutic Garden', 'Lakeside Garden', 'care / accessibility'], ['L16', 'The Logs Trail', 'Lakeside Garden', 'trail'], ['L17', 'Freshwater Swamp', 'Lakeside Garden', 'habitat'], ['L18', 'Allotment Gardens', 'Lakeside Garden', 'community gardening'], ['L19', 'Gardenhouse', 'Lakeside Garden', 'venue'], ['L20', 'Alstonia Island', 'Lakeside Garden', 'habitat'], ['L21', 'Dog Run', 'Lakeside Garden', 'recreation'], ['L22', 'Bird Hides', 'Lakeside Garden', 'wildlife viewing'], ['L23', 'The Lone Tree', 'Lakeside Garden', 'memory / sculpture'], ['L24', 'Grasslands', 'Lakeside Garden', 'habitat'], ['L25', 'Rasau Walk', 'Lakeside Garden', 'boardwalk'], ['L26', 'South Carpark', 'Lakeside Garden', 'transport'], ['L27', 'ActiveSG Park @ Jurong Lake Gardens', 'Lakeside Garden', 'sport / recreation'], ['L28', 'Heron Island', 'Lakeside Garden', 'habitat'], ['L29', 'Neram Streams', 'Lakeside Garden', 'naturalised waterway']
];

const amenityPlanRows = [
  ['I-CG', 'Information · Pagoda Plaza', 'Information', 'visitor service'], ['I-JG', 'Information · Water Lily Pavilion', 'Information', 'visitor service'], ['I-LG', 'Information · Entrance Pavilion', 'Information', 'visitor service'],
  ['F1', 'Fusion Spoon · Ecopond', 'F&B', 'food and beverage'], ['F2', 'Starbucks · Lakeside House', 'F&B', 'food and beverage'], ['F3', 'Eden · Pagoda Plaza', 'F&B', 'food and beverage'], ['F4', 'Canopy · Grand Arch', 'F&B', 'food and beverage'], ['F5', 'BingXue · Bonsai Garden', 'F&B', 'food and beverage'], ['F6', 'Ice Cream Man and Friends · Sunken Garden', 'F&B', 'food and beverage'],
  ['P-N', 'North Carpark', 'Carpark', 'transport'], ['P-S', 'South Carpark', 'Carpark', 'transport'], ['M-L', 'Lakeside MRT', 'MRT', 'public transport'], ['M-C', 'Chinese Garden MRT', 'MRT', 'public transport'], ['M-J', 'Jurong East MRT', 'MRT', 'public transport']
];

// Interpretive primary lenses for the brochure's numbered places. These do
// not replace NParks' facility types or alter the mapped coordinates.
const facilityLensByCode = {
  C1: 'heritage', C2: 'ecology', C3: 'heritage', C4: 'engineered', C5: 'heritage', C6: 'heritage', C7: 'engineered', C8: 'ecology', C9: 'public', C10: 'heritage', C11: 'heritage', C12: 'engineered', C13: 'public',
  J1: 'ecology', J2: 'heritage', J3: 'heritage', J4: 'heritage', J5: 'heritage', J6: 'ecology', J7: 'heritage', J8: 'ecology', J9: 'ecology', J10: 'heritage', J11: 'public',
  L1: 'public', L2: 'public', L3: 'public', L4: 'engineered', L5: 'governance', L6: 'public', L7: 'public', L8: 'engineered', L9: 'engineered', L10: 'governance', L11: 'public', L12: 'public', L13: 'public', L14: 'public', L15: 'public', L16: 'public', L17: 'ecology', L18: 'public', L19: 'public', L20: 'ecology', L21: 'public', L22: 'ecology', L23: 'hidden', L24: 'ecology', L25: 'public', L26: 'governance', L27: 'public', L28: 'ecology', L29: 'engineered'
};
const amenityLensByCode = {
  'I-CG': 'governance', 'I-JG': 'governance', 'I-LG': 'governance',
  F1: 'public', F2: 'public', F3: 'public', F4: 'public', F5: 'public', F6: 'public',
  'P-N': 'governance', 'P-S': 'governance', 'M-L': 'public', 'M-C': 'public', 'M-J': 'public'
};

// NParks brochure page-2 numbered circles georeferenced against six named
// OSM bridges plus Grand Arch and Lone Tree. Rebuild with the audit script.
// These are approximate plan anchors, not surveyed coordinates or Google POIs.
const brochurePlanCoordinates = Object.freeze({
  C1: [1.3381857, 103.7282639],
  C2: [1.3390126, 103.7284955],
  C3: [1.3396799, 103.7284389],
  C4: [1.3400326, 103.7291227],
  C5: [1.3392685, 103.7290638],
  C6: [1.3389725, 103.7295405],
  C7: [1.3382807, 103.7296906],
  C8: [1.3382377, 103.7301545],
  C9: [1.3398056, 103.7309705],
  C10: [1.3392319, 103.7314325],
  C11: [1.3377903, 103.7316308],
  C12: [1.3375569, 103.7325608],
  C13: [1.3373445, 103.7327632],
  J1: [1.3354321, 103.7296769],
  J2: [1.3363556, 103.7305097],
  J3: [1.3370328, 103.7311183],
  J4: [1.336556, 103.7312194],
  J5: [1.3361743, 103.7316648],
  J6: [1.3354862, 103.7309833],
  J7: [1.3349537, 103.7316008],
  J8: [1.3356068, 103.7328302],
  J9: [1.3344624, 103.733255],
  J10: [1.3344655, 103.7335555],
  J11: [1.3334226, 103.7339623],
  L1: [1.3439811, 103.727248],
  L2: [1.3440895, 103.7260226],
  L3: [1.3436336, 103.7220227],
  L4: [1.3408897, 103.7245876],
  L5: [1.3399651, 103.723847],
  L6: [1.3404647, 103.7241795],
  L7: [1.3401471, 103.7244392],
  L8: [1.3398036, 103.7248493],
  L9: [1.3393796, 103.724639],
  L10: [1.339065, 103.7245964],
  L11: [1.3391016, 103.7273669],
  L12: [1.3370927, 103.7267637],
  L13: [1.3362454, 103.7266217],
  L14: [1.3357463, 103.7273146],
  L15: [1.3352579, 103.727667],
  L16: [1.3350069, 103.7269818],
  L17: [1.3348364, 103.728593],
  L18: [1.3344371, 103.7274315],
  L19: [1.3339664, 103.7274302],
  L20: [1.334131, 103.729099],
  L21: [1.3333517, 103.7260837],
  L22: [1.3327357, 103.7269764],
  L23: [1.3325851, 103.7277512],
  L24: [1.3323914, 103.7269102],
  L25: [1.3318443, 103.7280834],
  L26: [1.3317942, 103.7252876],
  L27: [1.3302775, 103.7253917],
  L28: [1.3303498, 103.7275748],
  L29: [1.3297746, 103.7263123]
});

const planFeature = ([code, name, group, type], layer, legend = type) => {
  const evidence = attractionEvidence[name] || amenityEvidence[name];
  const isFacility = layer === 'facilities';
  const purpose = evidence?.purpose || (isFacility ? `NParks names this attraction as a ${type} in the ${group} plan; the cited public source does not state a more specific operational use.` : `The NParks brochure legend classifies this as ${type}. The brochure does not publish a dated usage survey for this node.`);
  return {
    id: `${layer}-${code.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    mapCode: code,
    name,
    group,
    type,
    legend,
    layer,
    primaryLens: (isFacility ? facilityLensByCode : amenityLensByCode)[code],
    // These are current brochure points. Earlier visibility is intentionally
    // withheld unless an independent source dates the same facility.
    from: 5,
    to: 5,
    geometryType: 'source-only facility record',
    geometry: null,
    spatialStatus: 'quarantined',
    source: sources.nparksBrochure,
    purpose,
    purposeSource: evidence?.source || sources.nparksBrochure,
    story: evidence?.story,
    storySources: evidence?.storySources,
    image: evidence?.image || null,
    imageSource: evidence?.imageSource || evidence?.source || sources.nparksBrochure,
    imageLabel: evidence?.previewLabel || 'No facility-specific reusable image found in the cited source register; use the Google Maps photo gallery link below.',
    details: [
      { label: 'Internal feature ID', value: code },
      ...(isFacility ? [{ label: 'Brochure legend number', value: code.slice(1) }] : []),
      { label: 'Garden / zone', value: group },
      { label: 'NParks plan type', value: type },
      { label: 'Coordinate status', value: 'Position undergoing georeferencing audit' }
    ],
    fact: `The current NParks brochure identifies ${name} in the ${group} plan.`,
    analysis: null,
    limitation: 'The public brochure supplies a numbered plan position, not surveyed coordinates. Any point digitised from it is for present-day orientation, not a legal or survey boundary. The brochure does not establish that this exact point or use existed in 1953, 1963, 1971, 1975 or 2019.',
    periodEvidence: 'Documented in the current NParks brochure / current public attraction page only; earlier presence and historical use are not verified here.',
    question: null
  };
};

const facilityFeatures = facilityPlanRows.map((row) => planFeature(row, 'facilities'));
const amenityFeatures = amenityPlanRows.map((row) => planFeature(row, 'amenities', row[2]));
const planFeatureByName = new Map([...facilityFeatures, ...amenityFeatures].map((item) => [item.name, item]));
const planFacilityByName = new Map(facilityFeatures.map((item) => [item.name, item]));

// Co-located services inherit their named facility's brochure anchor. Transit
// stations and the two named OSM landmarks have independent reference points.
const amenityAnchorCodes = {
  'I-CG': 'C9', 'I-JG': 'J10', 'I-LG': 'L10',
  F1: 'L4', F2: 'L3', F3: 'C9', F4: 'C1', F5: 'C8', F6: 'J6',
  'P-N': 'L5', 'P-S': 'L26'
};
const independentlyLocatedPlanPoints = {
  C1: { coordinate: [1.33812, 103.72815], label: 'Named OpenStreetMap Grand Arch building footprint · orientation point', source: sources.osmGrandArch },
  L23: { coordinate: [1.33256, 103.72764], label: 'Named OpenStreetMap Lone Tree artwork node', source: sources.osmLoneTree },
  'M-L': { coordinate: [1.34461, 103.72111], label: 'Wikidata Lakeside station coordinate reference', source: sources.wikidataLakesideMRT },
  'M-C': { coordinate: [1.34239, 103.73256], label: 'OpenStreetMap Chinese Garden station footprint', source: sources.osmChineseMRT },
  'M-J': { coordinate: [1.33311, 103.74229], label: 'OpenStreetMap Jurong East station reference', source: sources.osmJurongEastMRT }
};
// These two brochure circles still fall in open water on the current base,
// beyond the expected managed-area edge. Keep their narratives, not a false pin.
const unresolvedBrochureCodes = new Set(['J11', 'L20']);
[...facilityFeatures, ...amenityFeatures].forEach((item) => {
  item.documentedPeriod = 'current NParks plan / webpage; checked 2026';
  const anchorCode = item.layer === 'amenities' ? (amenityAnchorCodes[item.mapCode] || item.mapCode) : item.mapCode;
  if (unresolvedBrochureCodes.has(anchorCode)) {
    item.mapDisplay = 'source-only';
    item.details = item.details.map((detail) => detail.label === 'Coordinate status'
      ? { ...detail, value: 'The brochure identifies this place, but its transformed circle does not align with current land geometry; no map pin is asserted' }
      : detail);
    return;
  }
  const independentlyLocated = independentlyLocatedPlanPoints[anchorCode];
  const coordinate = independentlyLocated?.coordinate || brochurePlanCoordinates[anchorCode];
  if (!coordinate) return;
  item.geometry = { type: 'Point', coordinates: [...coordinate] };
  item.geometryType = 'Point';
  item.spatialStatus = 'plan-derived';
  item.relatedSources = [...(item.relatedSources || []), independentlyLocated?.source || sources.osmReference];
  item.details = item.details.map((detail) => detail.label === 'Coordinate status'
    ? { ...detail, value: independentlyLocated?.label || 'Approximate NParks brochure circle, transformed using eight named control points; not a surveyed coordinate' }
    : detail);
});

const feature = (data) => ({
  spatialStatus: 'approximate',
  geometryType: data.geometry?.type || 'source-only narrative',
  ...data
});

// Polygon and line geometries marked approximate are analytical extents read from cited maps and descriptions.
// They are intentionally styled with dashed outlines so they cannot be mistaken for official survey boundaries.
const features = [
  feature({ id: 'jurong-lake', name: 'Jurong Lake', layer: 'engineered', from: 2, to: 5, geometry: { type: 'Polygon', coordinates: [[[1.3420, 103.7238], [1.3414, 103.7287], [1.3380, 103.7338], [1.3336, 103.7342], [1.3308, 103.7300], [1.3317, 103.7251], [1.3355, 103.7224], [1.3420, 103.7238]]] }, source: sources.pmoOpening, fact: 'The official opening account states that sluice gates were built at the mouth of Jurong River and that the works were completed in 1971, forming Jurong Lake.', analysis: 'This water body is both habitat and infrastructure: an ecological setting produced through state water engineering.', limitation: 'The source confirms the engineering history but not this prototype’s drawn lake polygon. The outline is an analytical extent for reading change, not a surveyed boundary.', question: 'When a reservoir becomes a scenic lake, which history becomes visible — and which becomes background?' }),
  feature({ id: 'water-engineering', name: 'Jurong Lake water-engineering trace', layer: 'engineered', from: 2, to: 5, geometry: { type: 'LineString', coordinates: [[1.3375, 103.7229], [1.3389, 103.7270], [1.3402, 103.7310]] }, spatialStatus: 'orientation', source: sources.pmoOpening, fact: 'The official account links the 1971 sluice-gate works to the formation of Jurong Lake.', analysis: 'A line on the map turns “natural lake” into a visible infrastructure question.', limitation: 'The exact sluice-gate location is not supplied by the cited speech, so this is an orientation trace rather than a confirmed engineering alignment.', question: 'Where does the engineered lake begin and the river end?' }),
  feature({ id: 'lakeside-garden', name: 'Lakeside Garden', layer: 'public', from: 4, to: 5, geometry: { type: 'Polygon', coordinates: [[[1.3372, 103.7178], [1.3390, 103.7240], [1.3353, 103.7280], [1.3290, 103.7264], [1.3267, 103.7190], [1.3310, 103.7169], [1.3372, 103.7178]]] }, source: sources.nparksAbout, fact: 'NParks describes Lakeside Garden as the 60-hectare western section of Jurong Lake Gardens, centred on nature, play and community; its first phase opened in 2019.', analysis: 'The park translates ecological restoration and family recreation into a new public identity for Jurong.', limitation: 'The official page supplies the area and description but not a downloadable boundary used by this prototype. The dashed extent is analytical.', question: 'Who is the “community” imagined by the park — and whose work makes this experience possible?' }),
  feature({ id: 'chinese-garden', name: 'Chinese Garden', layer: 'heritage', from: 3, to: 5, geometry: { type: 'Polygon', coordinates: [[[1.3442, 103.7290], [1.3440, 103.7347], [1.3400, 103.7362], [1.3375, 103.7321], [1.3392, 103.7288], [1.3442, 103.7290]]] }, source: sources.nhbChinese, fact: 'NHB states that Chinese Garden was built on an area once occupied by fish and prawn ponds beside Jurong River, with construction beginning in 1971 and completion in April 1975.', analysis: 'A cultural garden was designed as a counterpoint to the industrial estate and as a destination for visitors — not as an untouched survival from the past.', limitation: 'The source describes the area historically but does not provide the precise garden polygon used here.', question: 'Is this heritage being preserved, or is it being re-authored for a new lake-district identity?' }),
  feature({ id: 'japanese-garden', name: 'Japanese Garden', layer: 'heritage', from: 2.5, to: 5, geometry: { type: 'Polygon', coordinates: [[[1.3405, 103.7344], [1.3419, 103.7379], [1.3388, 103.7400], [1.3368, 103.7360], [1.3405, 103.7344]]] }, source: sources.nhbJapanese, fact: 'NHB records that work began in May 1968 and that Seiwaen Japanese Garden officially opened in February 1973 on a 32-acre man-made island in Jurong Lake. PMO independently dates its completion to 1973.', analysis: 'Its “Japanese” identity is a designed tropical interpretation, now layered with new bridges, aquatic gardens and visitor infrastructure.', limitation: 'The historical and current sources establish the island and chronology but do not publish a survey-grade Japanese Garden boundary.', question: 'How does a transplanted garden tradition become local heritage?' }),
  feature({ id: 'former-fish-ponds', name: 'Former fish and prawn ponds', layer: 'hidden', from: 0, to: 2.8, geometry: { type: 'Polygon', coordinates: [[[1.3424, 103.7283], [1.3441, 103.7320], [1.3415, 103.7350], [1.3388, 103.7315], [1.3392, 103.7288], [1.3424, 103.7283]]] }, source: sources.nhbChinese, fact: 'NHB states that Chinese Garden was built from an area once occupied by fish and prawn ponds fronting Jurong River.', analysis: 'The pond reference interrupts the idea that this was simply empty swamp: it points to earlier productive uses that the garden landscape overlays.', limitation: 'The source does not identify the pond operators, ownership or exact extent. This is an approximate research area, not a recovered pond boundary.', question: 'Which forms of work disappear when productive water becomes scenic water?' }),
  feature({ id: 'jurong-river-trace', name: 'Jurong River / pre-lake water trace', layer: 'hidden', from: 0, to: 2, geometry: { type: 'LineString', coordinates: [[1.3351, 103.7231], [1.3386, 103.7275], [1.3416, 103.7302], [1.3441, 103.7333]] }, spatialStatus: 'orientation', source: sources.nhbChinese, fact: 'The Chinese Garden account refers to fish and prawn ponds beside Jurong River before the later garden and lake landscape.', analysis: 'The line is a prompt to read the present lake against a pre-park river system, not a claim that the former channel followed this exact path.', limitation: 'The historical narrative does not supply a precise river centreline for this location.', question: 'What does the present lake conceal about earlier water movement?' }),
  feature({ id: 'industrial-estate', name: 'Jurong Industrial Estate context', layer: 'hidden', from: 1, to: 5, geometry: { type: 'Polygon', coordinates: [[[1.3260, 103.7117], [1.3325, 103.7130], [1.3380, 103.7182], [1.3355, 103.7240], [1.3270, 103.7258], [1.3225, 103.7172], [1.3260, 103.7117]]] }, source: sources.nhbIndustrial, fact: 'NHB describes the early project as transforming swamp land through factories, roads and amenities; the first bulldozer entered Jurong in September 1961, and by 1969 the estate had 181 factories and a workforce of 20,000.', analysis: 'The “green oasis” is inseparable from a prior industrial transformation that changed land, labour and settlement patterns.', limitation: 'This record is regional and does not define a historical industrial-estate polygon. The extent is contextual and approximate.', question: 'What does the current park narrative inherit from the industrial story it seems to replace?' }),
  feature({ id: 'freshwater-swamp', name: 'Freshwater Swamp', layer: 'ecology', from: 4, to: 5, geometry: { type: 'Polygon', coordinates: [[[1.3303, 103.7190], [1.3341, 103.7189], [1.3361, 103.7224], [1.3320, 103.7244], [1.3294, 103.7222], [1.3303, 103.7190]]] }, source: sources.nparksBrochure, fact: 'The official brochure lists Freshwater Swamp as one of the named places within Lakeside Garden.', analysis: 'The site raises whether “restoration” means returning to a historical ecology, or creating a legible, safe and educational version of nature.', limitation: 'The brochure names the attraction but does not establish its ecological origin, species composition or self-sustaining function. The area is approximate.', question: 'What past ecosystem is being restored — and what is being designed for the visitor?' }),
  feature({ id: 'grasslands', name: 'Grasslands and bird hides', layer: 'ecology', from: 4, to: 5, geometry: { type: 'Polygon', coordinates: [[[1.3343, 103.7217], [1.3377, 103.7210], [1.3390, 103.7248], [1.3362, 103.7261], [1.3338, 103.7243], [1.3343, 103.7217]]] }, source: sources.nparksGrasslands, fact: 'NParks describes tall grasses, three bird hides and a Lone Tree sculpture whose form was inspired by Jurong’s industrial past.', analysis: 'The Grasslands make a managed habitat visible through controlled access and an interpretive object that reconnects “nature” to industry.', limitation: 'The source does not provide a long-term species census or a habitat polygon. The dashed area is approximate.', question: 'Does the bird hide reveal an ecosystem, or a carefully framed way of looking at one?' }),
  feature({ id: 'floating-wetlands', name: 'Floating Wetlands', layer: 'ecology', from: 4, to: 5, geometry: { type: 'Polygon', coordinates: [[[1.3342, 103.7240], [1.3350, 103.7260], [1.3338, 103.7270], [1.3328, 103.7252], [1.3342, 103.7240]]] }, source: sources.nparksWetlands, fact: 'NParks identifies the Floating Wetlands as Singapore’s largest man-made floating wetland.', analysis: 'The installation makes ecological function inseparable from construction, maintenance and the public story of “natural” water treatment.', limitation: 'The public description does not establish pollutant-removal performance, species change or maintenance labour at this location.', question: 'When a wetland floats on a lake, where should we draw the line between ecosystem and infrastructure?' }),
  feature({ id: 'forest-ramble', name: 'Forest Ramble', layer: 'public', from: 4, to: 5, geometry: { type: 'Polygon', coordinates: [[[1.3339, 103.7202], [1.3360, 103.7200], [1.3367, 103.7221], [1.3347, 103.7230], [1.3336, 103.7221], [1.3339, 103.7202]]] }, source: sources.nparksBrochure, fact: 'The brochure describes a 2.3-hectare nature playgarden with 13 stations inspired by wildlife movements in a freshwater swamp forest, for children aged 5–12.', analysis: 'Nature is translated into play infrastructure: a habitat becomes a script for movement, learning and supervised childhood experience.', limitation: 'The source documents design intention, not the actual demographic profile of users. The mapped area is approximate.', question: 'What happens when an ecosystem is encountered as a designed sequence of activities?' }),
  feature({ id: 'therapeutic-garden', name: 'Therapeutic Garden', layer: 'public', from: 4, to: 5, geometry: { type: 'Polygon', coordinates: [[[1.3318, 103.7185], [1.3340, 103.7180], [1.3345, 103.7202], [1.3323, 103.7210], [1.3318, 103.7185]]] }, source: sources.nparksBrochure, fact: 'NParks describes the Therapeutic Garden as serving children with special needs, seniors and people living with dementia, with wheelchair-accessible design features.', analysis: 'The park defines nature as a care infrastructure. Accessibility is part of the landscape’s political design, not a separate add-on.', limitation: 'The brochure records intended users and design, but not participation rates, sensory outcomes or barriers encountered in practice.', question: 'Which bodies are anticipated by the garden’s design, and which still require accommodation?' }),
  feature({ id: 'access-network', name: 'Lakeside MRT / access network', layer: 'public', from: 4, to: 5, geometry: { type: 'LineString', coordinates: [[1.3443, 103.7207], [1.3412, 103.7208], [1.3374, 103.7213], [1.3343, 103.7201]] }, spatialStatus: 'orientation', source: sources.nparksAbout, fact: 'NParks identifies Lakeside MRT as an access point and publishes walking connections, roads and bus routes into the Gardens.', analysis: 'Accessibility is not neutral: transport infrastructure decides which bodies, ages and abilities can reach the “natural” space with ease.', limitation: 'Published routes do not measure actual travel time, shade, accessibility barriers or different users’ experiences. This is an orientation line.', question: 'Does public access mean equal access?' }),
  feature({ id: 'management', name: 'Visitor rules and managed use', layer: 'governance', from: 4, to: 5, geometry: { type: 'Polygon', coordinates: [[[1.3356, 103.7250], [1.3379, 103.7290], [1.3352, 103.7317], [1.3326, 103.7280], [1.3356, 103.7250]]] }, source: sources.nparksHome, fact: 'NParks visitor guidance regulates activities such as littering, smoking, dogs, fishing, feeding, plant removal, barbecuing, cycling and PMD use in some attractions.', analysis: 'The park is public, but access is conditional on a management regime that protects greenery and maintains a particular visitor experience.', limitation: 'The guidance does not reveal enforcement frequency, disputed cases or how different users experience these restrictions. This is an analytical management extent, not a published regulated-zone polygon.', question: 'Which forms of nature use are permitted, and which are treated as threats?' }),
  feature({ id: 'lone-tree-memory', name: 'Lone Tree / industrial memory', layer: 'heritage', from: 4, to: 5, geometry: { type: 'Point', coordinates: [1.3364, 103.7228] }, spatialStatus: 'orientation', source: sources.nparksGrasslands, fact: 'NParks says the Lone Tree sculpture was inspired by Jurong’s industrial past and sits within the Grasslands narrative.', analysis: 'A single object can make a regional industrial history legible inside a recreational habitat, while also narrowing that history into a curated symbol.', limitation: 'The public page gives the narrative association but not a survey coordinate; this is an orientation point.', question: 'What kind of industrial history can be remembered through a landscape sculpture?' })
];

// Spatial audit, 13 October 2026. The public sources support the stories below,
// but most do not publish a feature boundary or historical centreline. The old
// polygons were therefore not defensible GIS geometry. We retain only an
// explicitly labelled point anchor where a current official/reference feature
// or the NParks plan provides a reasonable place to start reading; otherwise the
// story is source-only and is not drawn on the map.
const auditedResearchAnchors = {
  'jurong-lake': { coordinates: [1.3419207, 103.7265501], basis: 'Representative point calculated as the polygon centroid of URA waterbody feature OBJECTID 7509, the largest official waterbody polygon within the project map window. It is a current planning-layer anchor and does not reconstruct the 1971 shoreline or assert that one polygon is the entire lake.', sources: [sources.uraWaterGeo, sources.pmoOpening] },
  'lakeside-garden': { coordinates: [1.3349528, 103.7264515], basis: 'Representative point calculated as the area-weighted centroid of the official NParks “JLG: LAKESIDE GARDEN” managed-area feature (OBJECTID_1 170497). It is an orientation anchor, not a substitute for displaying the official polygon layer.', sources: [sources.nparksParksGeo] },
  'chinese-garden': { coordinates: [1.33812, 103.72815], basis: 'Point anchor checked against the NParks managed-area layer and the named Grand Arch Building footprint; it is an orientation point, not the Chinese Garden boundary.', sources: [sources.nparksParksGeo, sources.osmGrandArch] },
  'japanese-garden': { coordinates: [1.3352024, 103.7313538], basis: 'Representative point calculated as the polygon centroid of the official NParks “JAPANESE GARDENS” managed-area feature (OBJECTID_1 170509; 1,540 vertices), then cross-checked against the island labelled Japanese Garden on the NUS 1975 raster and the current NParks plan. It is an orientation anchor, not the garden boundary.', sources: [sources.nparksParksGeo, sources.nus1975, sources.nparksBrochure, sources.nhbJapanese] },
  'grasslands': { coordinates: [1.3298, 103.7257], basis: 'Point anchor checked against the NParks plan position for Grasslands; the public page does not publish a habitat polygon or biodiversity survey boundary.', sources: [sources.nparksBrochure, sources.nparksGrasslands] },
  'management': { coordinates: [1.3375, 103.7285], basis: 'Park-wide governance anchor checked against the Gardens map area; visitor guidelines do not define one regulated-zone polygon.', sources: [sources.nparksVisitorGuidelines] }
};

function applySpatialAudit(item) {
  if (item.spatialStatus !== 'approximate') return;
  const audit = auditedResearchAnchors[item.id];
  item.researchOnly = true;
  if (!audit) {
    item.mapDisplay = 'source-only';
    item.geometry = null;
    item.geometryType = 'source-only narrative';
    item.limitation = `${item.limitation} Spatial audit: no defensible public coordinate or boundary was found, so this story is not drawn as a map geometry.`;
    return;
  }
  item.mapDisplay = 'anchor';
  item.geometry = { type: 'Point', coordinates: audit.coordinates };
  item.geometryType = 'Point anchor';
  item.spatialStatus = 'orientation';
  item.spatialAudit = audit;
  item.details = [...(item.details || []), { label: 'Spatial audit', value: audit.basis }, { label: 'Audit sources', value: audit.sources.map((source) => source.title).join(' · ') }];
  item.limitation = `${item.limitation} The former polygon has been removed. This point is only a reading anchor; it does not claim a boundary, centreline or exact historical position.`;
}

features.forEach(applySpatialAudit);

// These lines represented historical relationships, not recovered survey
// alignments. Cross-checking the cited sources found no defensible centreline
// for them, so they are kept in the evidence register but removed from map
// rendering. The access network is reduced to the named MRT orientation point.
['water-engineering', 'jurong-river-trace', 'industrial-estate'].forEach((id) => {
  const item = features.find((featureItem) => featureItem.id === id);
  if (!item) return;
  item.mapDisplay = 'source-only';
  item.geometry = null;
  item.geometryType = 'source-only narrative';
  item.limitation = `${item.limitation} Spatial audit: the historical line / regional polygon has been removed because the cited sources do not publish a recoverable alignment or boundary.`;
});
const accessNetwork = features.find((item) => item.id === 'access-network');
if (accessNetwork) {
  accessNetwork.geometry = { type: 'Point', coordinates: [1.3429, 103.7197] };
  accessNetwork.geometryType = 'Point anchor';
  accessNetwork.details = [{ label: 'Spatial audit', value: 'Reduced to the named Lakeside MRT access point; published walking routes are not reconstructed as a line' }];
  accessNetwork.limitation = 'NParks identifies Lakeside MRT and publishes access guidance, but the cited page does not provide a survey-grade walking-route geometry. This point is an access anchor, not a route line.';
}

// The former brochure digitisation was materially displaced. The named OSM
// artwork node supplies a reproducible current point; the NParks page confirms
// that the sculpture is within Grasslands but does not publish a coordinate.
const loneTree = features.find((item) => item.id === 'lone-tree-memory');
if (loneTree) {
  loneTree.geometry.coordinates = [1.33256, 103.72764];
  loneTree.relatedSources = [...(loneTree.relatedSources || []), sources.osmLoneTree];
  loneTree.limitation = 'NParks confirms the sculpture within Grasslands but does not publish a coordinate. The point uses the named OpenStreetMap artwork node (7236529989; 1.33256, 103.72764), cross-checked against the NParks Grasslands description. It is a current reference point, not a survey or historical coordinate.';
  loneTree.details = [
    { label: 'Coordinate', value: '1.33256, 103.72764' },
    { label: 'Spatial record', value: 'OpenStreetMap named artwork node 7236529989' },
    { label: 'Official context', value: 'NParks places the Lone Tree within the Grasslands' }
  ];
}

// These evidence-led stories are deliberately attached to mapped objects. The source links
// are rendered beside the story so that interpretation does not float free of the record.
const featureStories = {
  'jurong-lake': {
    story: 'Jurong Lake is the result of a sequence of state projects rather than a timeless natural basin. The opening account dates the sluice-gate works and the formation of the lake to 1971. PUB’s learning trail then records a shift in responsibility: PUB took over operation and maintenance in 1983, the lake perimeter was landscaped as Jurong Lake Park in 2006, and ABC Waters rejuvenation began in 2009 and was completed in 2010. The present garden therefore sits on top of a changing water-management regime: reservoir, park edge, ecological demonstration site and national-garden setting.',
    storySources: [sources.pmoOpening, sources.pubJurongStudent, sources.academicStokols]
  },
  'chinese-garden': {
    story: 'The Chinese Garden was built during the same period as Jurong’s industrial transformation. NHB describes the site as formerly occupied by fish and prawn ponds beside Jurong River; construction began in 1971 and the garden was completed in 1975. PUB describes the design as a recreation of northern Chinese imperial garden traditions, including pagodas, a Suzhou-style bonsai garden and a monumental bridge. In 2024, NParks says original structures such as the Grand Arch, Twin Pagoda, Cloud Pagoda, Bonsai Garden, Stoneboat and Tea Pavilion were conserved or adapted. The result is not a simple survival of an old landscape: it is a state-built cultural landscape whose older symbols are repeatedly reworked for new public, environmental and district-making purposes.',
    storySources: [sources.nhbChinese, sources.pubJurongStudent, sources.nparksAnnualReport, sources.academicStokols]
  },
  'japanese-garden': {
    story: 'NHB records that work on Seiwaen Japanese Garden began in May 1968, that Professor Kinsaku Nakane designed the 32-acre garden on a man-made island, and that it officially opened in February 1973. PUB’s trail identifies the Muromachi and Momoyama periods as design references. Its later history is not only architectural conservation. NParks’ 2024 completion account describes new community plots in the Floral Garden, developed with JTC, students from four institutions and Friends of Jurong Lake Gardens. The garden therefore links inherited cultural form with present-day co-creation: “heritage” is being maintained, but also governed through new partnerships, planting practices and visitor programmes.',
    storySources: [sources.nhbJapanese, sources.pubJurongStudent, sources.nparks2024Opening, sources.nparksAnnualReport]
  },
  'former-fish-ponds': {
    story: 'The fish-and-prawn-pond reference is one of the most important absences in the contemporary garden image. NHB does not describe an empty site waiting for beautification; it describes productive ponds beside Jurong River. URA’s broader Jurong history also names mangrove swamps, plantation farms and fish ponds before industrialisation. When the ponds become a cultural garden and then an engineered lake district, productive water is not erased physically alone: it is also translated into a quieter heritage narrative. The surviving evidence does not tell us who operated the ponds, how work was organised or exactly where each pond lay, so this map keeps only an orientation anchor and does not draw a pond boundary.',
    storySources: [sources.nhbChinese, sources.uraJurongLakeDistrict, sources.academicStokols]
  },
  'jurong-river-trace': {
    story: 'The pre-lake water trace is a historical question, not a reconstructed river survey. The dated NUS rasters show water and drainage patterns before the current lake; NHB places the earlier fish and prawn ponds beside Jurong River; and the official 1971 account describes sluice-gate works at the river mouth. Read together, these sources let the map tell a transformation story: water was redirected, contained and made scenic. Because the sources do not provide a recoverable river centreline, the former line has been removed from the map and retained as a source-only historical narrative.',
    storySources: [sources.nus1953, sources.nus1963, sources.nus1971, sources.nhbChinese, sources.pmoOpening]
  },
  'industrial-estate': {
    story: 'Jurong’s industrial history is not background scenery to the Gardens. NHB records the first bulldozer entering in September 1961 and describes an estate that had reached 181 factories and a workforce of 20,000 by 1969. URA now narrates the longer transition from industrial backbone to a 410-hectare mixed-use Jurong Lake District. The park’s green identity is thus part of a regional redevelopment sequence: the landscape does not replace industrialisation so much as reorganise its land, labour and investment legacy into a “green” district image.',
    storySources: [sources.nhbIndustrial, sources.uraJurongLakeDistrict, sources.academicStokols]
  },
  'freshwater-swamp': {
    story: 'Freshwater Swamp is presented as habitat, but the ecological story is also infrastructural. NParks places the attraction within Lakeside Garden’s nature-and-learning system, while the official Lakeside material describes Rasau Walk as a 300-metre boardwalk through a restored freshwater swamp with more than fifty plant species and shore birds. That language matters politically: “restoration” here is not a return to an untouched past. It is a managed encounter built through planting, water control, access design, maintenance and interpretation. The available public pages establish the intended habitat and visitor experience, but do not provide a long-term species census or a test of ecological self-sufficiency.',
    storySources: [sources.nparksLakeside, sources.nparksBrochure, sources.nparksSustainability]
  },
  'grasslands': {
    story: 'The Grasslands turn a tall-grass habitat into a carefully framed way of seeing. NParks identifies bird hides and the Lone Tree sculpture within the same landscape, so wildlife observation and industrial memory are designed to coexist. Visitors encounter “nature” through a path, a hide, an interpretive object and a maintenance regime rather than through an unmediated wilderness. This is a strong political-ecology site because it shows how habitat value is produced together with visitor conduct and a narrative about Jurong’s past. The public source does not, however, publish a long-term biodiversity dataset for the grassland.',
    storySources: [sources.nparksGrasslands, sources.nparksLakeside, sources.nhbIndustrial]
  },
  'floating-wetlands': {
    story: 'The Floating Wetlands make the boundary between ecosystem and engineering visible. NParks identifies the installation as Singapore’s largest man-made floating wetland; PUB’s Jurong Lake trail places the Gardens within the longer ABC Waters programme, which began lake rejuvenation in 2009 and recorded completion in 2010. The floating habitat is therefore not evidence of untouched nature. It is an ecological device that depends on design, materials, monitoring and maintenance while being presented as a visitor experience. The cited public pages establish the installation and programme history, but do not prove a particular pollutant-removal rate or ecological outcome at this exact point.',
    storySources: [sources.nparksWetlands, sources.pubJurongStudent, sources.nparksSustainability]
  },
  'management': {
    story: 'Governance becomes visible when we read the garden’s rules as a spatial regime. NParks asks visitors to control activities including littering, smoking, feeding, fishing, plant removal, barbecuing, cycling and personal mobility device use in specified situations. At the same time, NParks describes Jurong Lake Gardens as a smart and sustainable living laboratory with integrated management systems, sensors and water-sensitive design. The garden is public, but its publicness is actively produced: agencies define acceptable uses, technologies monitor operations, and infrastructure channels bodies through a particular version of “nature”.',
    storySources: [sources.nparksVisitorGuidelines, sources.nparksSustainability, sources.nparksAbout]
  },
  'lone-tree-memory': {
    story: 'The Lone Tree is a small object carrying a large regional history. NParks explicitly connects its form to Jurong’s industrial past and places it within the Grasslands narrative. NHB’s industrial account supplies the wider context of factories, workers and large-scale land transformation. The sculpture condenses that history into a memorable object inside a recreational habitat: it keeps industry present, but in a form that is safe, contemplative and compatible with the park’s ecological branding. That is a selective form of remembrance, not a complete history of industrial labour.',
    storySources: [sources.nparksGrasslands, sources.nhbIndustrial, sources.academicStokols]
  }
};
features.forEach((item) => {
  if (featureStories[item.id]) Object.assign(item, featureStories[item.id]);
});

features.push(
  feature({ id: 'community-engagement', name: '2016–18 community engagement and the 14,000-suggestion plan', layer: 'governance', from: 3.55, to: 5, geometry: { type: 'Point', coordinates: [1.3395, 103.7357] }, spatialStatus: 'orientation', source: sources.nparks2017Annual, fact: 'NParks records more than 14,000 suggestions and feedback from townhalls and roving exhibitions held between November 2016 and April 2017; further public engagement continued into 2018.', analysis: 'Participation is part of the production of the garden, but the map anchor is not a townhall location. It makes a planning process visible without claiming that all suggestions became built form.', limitation: 'The source documents the engagement process and its scale, not the spatial location of every meeting, the full suggestion dataset or which proposals were accepted or rejected.', periodEvidence: 'This is a governance process dated 2016–2018, shown at the Gardens as an orientation anchor rather than as a physical facility.', story: 'The 14,000-suggestion figure changes how the rejuvenated gardens should be read. The landscape was not designed only by architects and agencies: NParks records townhalls, roving exhibitions and continuing public engagement, with ideas incorporated where feasible. The phrase “where feasible” is important for a political ecology reading because it points to negotiation, institutional filtering and unequal power rather than a simple story of community ownership.', storySources: [sources.nparks2017Annual, sources.nparks2024Opening, sources.cna2018Plan] }),
  feature({ id: 'floral-community-plots', name: 'Floral Garden community plots', layer: 'governance', from: 5, to: 5, geometry: { type: 'Point', coordinates: [1.3368, 103.7361] }, spatialStatus: 'orientation', source: sources.nparks2024Opening, fact: 'NParks states that the Floral Garden was developed with JTC and that students from ITE College East, Nanyang Academy of Fine Arts, Ngee Ann Polytechnic and Singapore Polytechnic, together with Friends of Jurong Lake Gardens, co-created five community plots.', analysis: 'Co-creation is recorded as a governance arrangement linking a state agency, a statutory board, educational institutions, volunteers and planting design.', limitation: 'The public source identifies the Floral Garden and five plots but does not publish a separate coordinate layer for each plot. The former point reused the rejected Japanese Garden / Floral Garden coordinate and has been removed.', periodEvidence: 'The co-creation is documented for the 2024 rejuvenated garden phase and is not projected backward.', story: 'The Floral Garden is not only a planted attraction. It is also an institutional network: NParks, JTC, four educational institutions and Friends of Jurong Lake Gardens appear in the official account of the five community plots. The garden’s “community” is therefore materially organised through partnerships, expertise and permission to plant. This makes participation visible, while also prompting the question of who is invited, whose knowledge counts and how co-created work is maintained after opening.', storySources: [sources.nparks2024Opening, sources.nparksAnnualReport], mapDisplay: 'source-only', geometryType: 'source-only narrative', geometry: null, documentedPeriod: '2024 co-creation; source-only until plot coordinates are verified' }),
  feature({ id: 'living-lab-governance', name: 'Living Lab: smart and sustainable management', layer: 'governance', from: 4, to: 5, geometry: { type: 'Point', coordinates: [1.3359, 103.7207] }, spatialStatus: 'orientation', source: sources.nparksSustainability, fact: 'NParks describes Jurong Lake Gardens as a smart and sustainable garden district using an Integrated Management System, interactive kiosks, water-sensitive design and low-energy construction.', analysis: 'The garden is governed not only through visible rules and boundaries but also through sensors, maintenance systems, materials and data infrastructures that make “sustainability” operational.', limitation: 'NParks describes the systems at Gardens level and does not publish their individual sensor locations or a complete performance dataset for this point.', periodEvidence: 'This governance and technology story belongs to the current development phase and is not evidence of the same systems in earlier years.', story: 'The Living Lab story shifts attention from scenery to operations. NParks describes integrated management, interactive wayfinding, water-sensitive design, low-energy buildings and carbon-conscious materials. In political-ecology terms, sustainability is not only an ecological condition; it is an administrative and technical practice. It requires sensors, maintenance labour, procurement choices and institutional targets, even when visitors experience the result as a quiet green landscape.', storySources: [sources.nparksSustainability, sources.nparksAbout, sources.nparksAnnualReport] }),
  feature({ id: 'visitor-governance', name: 'Visitor guidelines and permitted nature use', layer: 'governance', from: 4, to: 5, geometry: { type: 'Point', coordinates: [1.3375, 103.7285] }, spatialStatus: 'orientation', source: sources.nparksVisitorGuidelines, fact: 'NParks publishes garden etiquette and visitor guidelines governing activities such as feeding, fishing, smoking, littering, plant removal, cycling and other uses.', analysis: 'The public garden is produced through a boundary between legitimate enjoyment and prohibited or managed activity. Governance determines not only who enters, but what counts as an acceptable encounter with nature.', limitation: 'The guideline page states rules but does not provide enforcement statistics, contested cases or a spatial layer for every rule; this point is a park-wide orientation anchor.', periodEvidence: 'The current rules describe present management and cannot be projected backward onto the historical map states.', story: 'A political-ecology map should show rules as infrastructure. Visitor guidelines decide whether water can be fished, plants touched, animals fed, bikes ridden and events held. These decisions protect some ecological and experiential goals while limiting other relationships with the landscape. The map anchor is intentionally not a legal boundary: it represents the governance regime documented by NParks across the Gardens.', storySources: [sources.nparksVisitorGuidelines, sources.nparksHome, sources.nparksSustainability] }),
  feature({ id: 'jurong-lake-district-vision', name: 'Jurong Lake District: from industrial backbone to “district of gardens and water”', layer: 'governance', from: 3.7, to: 5, geometry: { type: 'Point', coordinates: [1.3375, 103.7285] }, spatialStatus: 'orientation', source: sources.uraJurongLakeDistrict, fact: 'URA describes the 2008 Jurong Lake District blueprint as bringing together Jurong Gateway and the leisure-focused Lakeside area within a 410-hectare district; current planning presents it as a people-centric, car-lite district anchored by Jurong Lake Gardens.', analysis: 'The garden is not isolated parkland. It is a planning instrument within a regional strategy that connects green space, housing, jobs, transport and investment.', limitation: 'This point is a regional planning anchor, not the boundary of the 410-hectare district or a claim about land ownership at this location.', periodEvidence: 'The planning vision is later than the historical map states; it is shown only from the late planning/redevelopment phase onward.', story: 'The “nature” of Jurong Lake Gardens is also a regional-development story. URA places the Gardens inside a 410-hectare district that grew from Jurong’s industrial backbone toward a mixed-use, car-lite regional centre. The park therefore performs more than recreation: it helps make a future district legible as sustainable, connected and desirable. This is why governance belongs on the GIS itself, not in a footnote.', storySources: [sources.uraJurongLakeDistrict, sources.nparksAbout, sources.academicStokols] })
);

features.push(...facilityFeatures, ...amenityFeatures);
// The public timeline omits the non-covering 1963 sheet. Compress the previous
// six-state feature chronology onto the five displayed states without changing
// any feature's documented historical meaning.
const compressTimelineValue = (value) => value <= 2 ? value / 2 : value - 1;
features.forEach((item) => {
  item.from = compressTimelineValue(item.from);
  item.to = compressTimelineValue(item.to);
});
// The trail is a 2024 map-state reading layer. Each Roots directions point is
// an orientation anchor; former sites and regional histories are not recast as
// present-day buildings or exact historic footprints.
jurongHeritageTrail.forEach((stop) => {
  const target = stop.existingId
    ? features.find((item) => item.id === stop.existingId)
    : stop.sharedWith
      ? features.find((item) => item.id === `nhb-trail-${stop.sharedWith}`)
      : null;
  if (target) {
    target.heritageTrailStops ||= [];
    target.heritageTrailStops.push(stop);
    target.additionalLenses = [...new Set([...(target.additionalLenses || []), 'nhb'])];
    return;
  }
  features.push(feature({
    id: `nhb-trail-${stop.number}`, name: stop.name, layer: 'nhb', from: 4, to: 4,
    geometry: { type: 'Point', coordinates: stop.coordinates }, spatialStatus: 'orientation',
    mapCode: `H${stop.number}`, source: sources[`nhbTrail${stop.number}`],
    fact: stop.summary, heritageTrailStops: [stop],
    documentedPeriod: 'NHB heritage trail record, shown on the present-day reference map',
    details: [{ label: 'NHB directions address', value: stop.address }, { label: 'Coordinate meaning', value: stop.positionNote }]
  }));
});
// Narrative and spatial dates are separate. A current rule page is not proof
// that the same rule applied throughout 2019–2024.
const engagementCase = features.find((item) => item.id === 'community-engagement');
Object.assign(engagementCase, { name: '2016–17 consultation and the 14,000-suggestion plan', source: sources.nparks2024Opening, documentedPeriod: 'consultation: November 2016–April 2017; retrospective account: 2024', periodEvidence: 'Consultation is dated November 2016–April 2017 in the 2024 completion release; the map anchor is not a meeting location.', fact: 'NParks’ 2024 completion release reports over 14,000 suggestions collected from November 2016 to April 2017 for Gardens Central and East, incorporated into the design where feasible.', storySources: [sources.nparks2024Opening, sources.cna2018Plan] });
['management', 'visitor-governance', 'living-lab-governance'].forEach((id) => {
  const item = features.find((entry) => entry.id === id);
  item.documentedPeriod = 'current description checked 2026; orientation shown on the modern map';
});
const livingLabCase = features.find((item) => item.id === 'living-lab-governance');
Object.assign(livingLabCase, { source: sources.nparksSmart, fact: 'NParks describes an Integrated Management System for centralised monitoring and control. The current Smart Technology page retains future-tense wording, so it does not by itself establish commissioning or measured performance.' });
features.filter((item) => item.spatialAudit).forEach((item) => {
  item.limitation = `${item.spatialAudit.basis} No individual historical boundary or ecological outcome is established by this anchor.`;
});

const historicalYears = [1953, 1971, 1975];
const historicalRasterLayers = {};
const historicalRasterState = {};
const historicalTileServices = {
  1953: 'https://libmaps.nus.edu.sg/services/png/1953/{z}/{y}/{x}',
  1971: 'https://libmaps.nus.edu.sg/services/png/1971/{z}/{y}/{x}',
  1975: 'https://libmaps.nus.edu.sg/services/png/1975/{z}/{y}/{x}'
};
// A published year alone is not enough to qualify a raster for this study area.
const historicalMapEligibility = {
  1953: { coverage: 'confirmed', publicationYear: 1953, surveyYear: null, scale: '1:25,000', maker: 'Surveyor General, Malaya' },
  1971: { coverage: 'confirmed', publicationYear: 1971, surveyYear: null, scale: '1:63,360', maker: 'Mapping Unit, Ministry of Defence' },
  1975: { coverage: 'confirmed', publicationYear: 1975, surveyYear: null, scale: '1:25,000', maker: 'Mapping Unit, Ministry of Defence' }
};
const eligibleHistoricalMap = (year) => Boolean(historicalMapEligibility[year]?.coverage === 'confirmed' && historicalMapEligibility[year]?.publicationYear === year && sources[`nus${year}`]?.url && historicalTileServices[year]);
const navigationBounds = L.latLngBounds([1.309, 103.670], [1.358, 103.766]);
const map = L.map('map', { zoomControl: false, minZoom: 11, maxZoom: 19, maxBounds: navigationBounds.pad(.16), maxBoundsViscosity: .86, preferCanvas: true }).setView([1.3375, 103.7285], 15.25);
L.control.zoom({ position: 'bottomright' }).addTo(map);

const currentBaseLayer = L.tileLayer('https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png', {
  detectRetina: true,
  maxZoom: 19,
  minZoom: 11,
  attribution: '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;vertical-align:middle" alt="OneMap" /> <a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a> &copy; contributors | <a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
}).addTo(map);

const currentDataBounds = { minLat: 1.326, maxLat: 1.348, minLng: 103.716, maxLng: 103.744 };
const overpassBounds = `${currentDataBounds.minLat},${currentDataBounds.minLng},${currentDataBounds.maxLat},${currentDataBounds.maxLng}`;
const overpassUrl = (query) => `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
const externalLayerIds = ['roads', 'waterways', 'waterbodies', 'greenery', 'woodland', 'amenities_ref'];
const thematicLayerIds = ['ecology', 'engineered', 'heritage', 'governance', 'public', 'hidden'];
const heritageTrailLayerIds = ['nhb'];
const namedRecordLayerIds = ['facilities', 'amenities'];
const currentOnlyLayerIds = [...namedRecordLayerIds, ...externalLayerIds];
const externalLayerDefinitions = {
  roads: { mode: 'overpass', url: overpassUrl(`[out:json][timeout:25];way["highway"](${overpassBounds});out geom;`), localUrl: 'data/osm-jlg.geojson', source: sources.osmReference, title: 'OpenStreetMap road and path reference', description: 'OpenStreetMap ways tagged as highways, including roads, paths and cycleways. Current reference geometry only; not a historical road layer.' },
  waterways: { mode: 'overpass', url: overpassUrl(`[out:json][timeout:25];way["waterway"](${overpassBounds});out geom;`), localUrl: 'data/osm-jlg.geojson', source: sources.osmReference, title: 'OpenStreetMap waterway reference', description: 'OpenStreetMap ways tagged as waterways. Current reference geometry only; not a reconstructed pre-lake river centreline.' },
  woodland: { mode: 'overpass', url: overpassUrl(`[out:json][timeout:25];(way["natural"="wood"](${overpassBounds});way["landuse"="forest"](${overpassBounds}););out geom;`), localUrl: 'data/osm-jlg.geojson', source: sources.osmReference, title: 'OpenStreetMap woodland / forest reference', description: 'OpenStreetMap woodland and forest polygons. These are mapped land-cover references, not a botanical survey or proof of ecological authenticity.' },
  amenities_ref: { mode: 'overpass-points', url: overpassUrl(`[out:json][timeout:25];nwr["amenity"~"^(drinking_water|toilets|shelter|bench|bbq|bicycle_parking|parking)$"](${overpassBounds});out center;`), localUrl: 'data/osm-jlg.geojson', source: sources.osmReference, title: 'OpenStreetMap amenity reference points', description: 'OpenStreetMap points for amenities such as drinking water, toilets, shelter and bicycle parking. These are reference points, not an official NParks inventory.' },
  waterbodies: { mode: 'datagov', url: sources.uraWaterGeo.dataUrl, localUrl: 'data/ura-water-jlg.geojson', source: sources.uraWaterGeo, title: 'URA Master Plan 2025 indicative waterbodies', description: 'URA’s indicative Parks and Waterbodies Plan layer, filtered to the Jurong Lake Gardens map window.' },
  greenery: { mode: 'datagov', url: sources.nparksParksGeo.dataUrl, localUrl: 'data/nparks-jlg.geojson', source: sources.nparksParksGeo, title: 'NParks managed parks and nature reserves', description: 'NParks managed-area polygons, filtered to the Jurong Lake Gardens map window. Managed green is not synonymous with forest.' }
};
const datasetInformation = {
  osm: { title: 'OpenStreetMap reference', date: 'Snapshot date not recorded in the local file', summary: 'Community-mapped present-day roads, paths, waterways, woodland and amenities. Not an official garden inventory or a historical map.', method: 'The local GeoJSON retains OSM IDs and tags, but not object type, version, edit time or download time. Real-time Overpass results retain those fields when supplied.' },
  greenery: { title: 'NParks managed areas', date: 'Data period: November 2025; portal record created July 2023; local download date not recorded', summary: 'Indicative areas managed by NParks, not necessarily legal park boundaries or habitat surveys.', method: 'The data.gov.sg catalogue update date is separate from its data period. FMEL_UPD_D remains a raw attribute because the portal does not define it.' },
  waterbodies: { title: 'URA planning waterbodies', date: 'Master Plan designation: 2025; portal dataset created September 2026; local download date not recorded', summary: 'Indicative planning polygons, not a surveyed historic shoreline or a water-quality record.', method: 'The plan year, portal update and object attributes describe different things. FMEL_UPD_D and PRP_STATUS are shown raw because their meanings are not documented here.' }
};
const externalLayerState = Object.fromEntries(externalLayerIds.map((id) => [id, { loading: false, loaded: false, count: 0, layer: null, error: null }]));

const enabledLayers = new Set(Object.keys(layers));
const featureGroup = L.layerGroup().addTo(map);
let selectedFeatureId = null;
let focusedHeritageStop = null;
let provisionalLocator = null;
let timeValue = 2;
let playing = false;
let playTimer = null;
let showResearchLeads = true;

const escapeHtml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
const sourceLink = (source, label = source.title) => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} ↗</a>`;
const apaCitation = (source) => source.apa || `${source.institution}. (n.d.). ${source.title}. ${source.url}`;
const periodLabel = (item) => item.documentedPeriod || `${years[Math.floor(item.from)]?.year ?? 'before'}–${years[Math.round(item.to)]?.year ?? 'present'}`;
function representativeCoordinate(item) {
  if (!item.geometry && Array.isArray(item.navigationCoordinate) && item.navigationCoordinate.length === 2 && item.navigationCoordinate.every(Number.isFinite)) {
    return item.navigationCoordinate;
  }
  if (!item.geometry) return null;
  if (item.geometry.type === 'Point') return item.geometry.coordinates;
  const points = [];
  const collect = (value) => {
    if (Array.isArray(value) && value.length === 2 && value.every(Number.isFinite)) points.push(value);
    else if (Array.isArray(value)) value.forEach(collect);
  };
  collect(item.geometry.coordinates);
  if (!points.length) return null;
  return [
    points.reduce((sum, point) => sum + point[0], 0) / points.length,
    points.reduce((sum, point) => sum + point[1], 0) / points.length
  ];
}

// Only records with evidence from a Google Maps place-details page belong here.
// A Google Maps feature URL is not silently recast as a Places API `ChIJ…` ID.
// `placeId` is supported when one is independently verified; none is guessed.
const verifiedGoogleMapsPlaces = {
  'facilities-j4': {
    name: 'Guesthouse',
    address: '60A Yuan Ching Rd, Singapore 619673',
    mapsUrl: 'https://www.google.com/maps/place/Guesthouse/@1.3375,103.7285,17z/data=!4m12!1m5!3m4!2zMcKwMjAnMTUuMCJOIDEwM8KwNDMnNDIuNiJF!8m2!3d1.3375!4d103.7285!3m5!1s0x31da11000d8cffaf:0x52d646052a649939!8m2!3d1.3363171!4d103.7308584!16s%2Fg%2F11w4gq5dfj?entry=ttu',
    verification: 'Google Maps Place Details URL checked 13 October 2026'
  },
  'facilities-j1': {
    name: 'Floral Garden',
    address: '60 Yuan Ching Rd, Singapore 619672',
    mapsUrl: 'https://www.google.com/maps/place/Floral+Garden/@1.3350755,103.72955,17z/data=!3m1!4b1!4m6!3m5!1s0x31da110032ea438b:0x6e7daba880e236a1!8m2!3d1.3350755!4d103.72955!16s%2Fg%2F11y5z747m6?entry=ttu',
    verification: 'Google Maps Place Details search checked 13 October 2026'
  },
  'amenities-m-l': {
    name: 'Lakeside MRT Station',
    address: '201 Boon Lay Way, Singapore 649845',
    placeId: 'ChIJRbJiD-cP2jERkXkR2OZh8hI',
    verification: 'Google Maps Place Details page and Place ID checked 13 October 2026'
  },
  'access-network': {
    name: 'Lakeside MRT Station',
    address: '201 Boon Lay Way, Singapore 649845',
    placeId: 'ChIJRbJiD-cP2jERkXkR2OZh8hI',
    verification: 'Google Maps Place Details page and Place ID checked 13 October 2026'
  }
};

const googleMapsPlaceRecord = (item) => verifiedGoogleMapsPlaces[item.id] || null;
const googleMapsNamedPlaceIds = new Set([
  'jurong-lake',
  'lakeside-garden',
  'chinese-garden',
  'japanese-garden',
  'grasslands',
  'lone-tree-memory',
  'freshwater-swamp',
  'floating-wetlands',
  'forest-ramble',
  'therapeutic-garden'
]);

const googleMapsPlaceQuery = (item) => {
  const record = googleMapsPlaceRecord(item);
  if (record?.name && record?.address) return `${record.name}, ${record.address}`;
  if (['facilities', 'amenities'].includes(item.layer) || googleMapsNamedPlaceIds.has(item.id)) {
    const context = item.group ? `${item.group}, Jurong Lake Gardens` : 'Jurong Lake Gardens';
    return `${item.name}, ${context}, Singapore`;
  }
  if (item.id === 'access-network') return 'Lakeside MRT Station, 201 Boon Lay Way, Singapore 649845';
  return null;
};

const googleMapsLinkKind = (item) => {
  const record = googleMapsPlaceRecord(item);
  if (record?.placeId) return 'place-id';
  if (record?.mapsUrl) return 'verified-place-url';
  if (googleMapsPlaceQuery(item)) return 'name-search';
  if (['facilities', 'amenities'].includes(item.layer) || item.id === 'access-network') return 'unresolved';
  return !item.name && representativeCoordinate(item) ? 'coordinate-fallback' : null;
};

const googleMapsLink = (item) => {
  const record = googleMapsPlaceRecord(item);
  if (record?.placeId) {
    const placeName = record.name || item.name;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}&query_place_id=${encodeURIComponent(record.placeId)}`;
  }
  if (record?.mapsUrl) return record.mapsUrl;
  const placeQuery = googleMapsPlaceQuery(item);
  if (placeQuery) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeQuery)}`;
  // A named feature without a verified place record must not silently become a coordinate page.
  // Coordinates remain available to the GIS itself, but not as a misleading outbound POI link.
  if (!item.name) {
    const coordinate = representativeCoordinate(item);
    if (!coordinate) return null;
    const [lat, lng] = coordinate;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat.toFixed(7)},${lng.toFixed(7)}`)}`;
  }
  return null;
};

const googleMapsAction = (item, className = '') => {
  const url = googleMapsLink(item);
  const kind = googleMapsLinkKind(item);
  const label = kind === 'place-id' || kind === 'verified-place-url'
    ? 'Open verified Google Maps place ↗'
    : kind === 'name-search'
      ? 'Search this place in Google Maps ↗'
      : 'Open mapped location in Google Maps ↗';
  if (url) return `<a${className ? ` class="${className}"` : ''} href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  return kind === 'unresolved' ? `<span class="${className ? `${className} feature-map-unresolved` : 'feature-map-unresolved'}">Google Maps listing unresolved</span>` : '';
};

function buildHoverCard(item) {
  const layer = layers[item.layer];
  const preview = item.image
    ? `<div class="map-hover-media"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy" /><span>${escapeHtml(item.imageLabel)}</span></div>`
    : `<div class="map-hover-media map-hover-media-empty"><span>${googleMapsLink(item) ? 'Open Google Maps below<br>for its live place photos.' : 'OpenStreetMap reference point<br>No verified place photos.'}</span></div>`;
  return `<div class="map-hover-card" style="--feature-color:${layer.color}">
    ${preview}
    <div class="map-hover-body"><span class="map-hover-kicker">${escapeHtml(item.mapCode || layer.icon)} · ${escapeHtml(layer.label)}</span>
    <b>${escapeHtml(item.displayTitle || item.name)}</b>
    ${item.displaySubtitle ? `<span class="map-hover-name">${escapeHtml(item.displaySubtitle)}</span>` : ''}
    <span class="map-hover-purpose">${escapeHtml(item.purpose || item.fact)}</span>
    <span class="map-hover-status">${escapeHtml(item.spatialStatus)} · ${escapeHtml(item.heritageTrailStops ? 'NHB directions point' : item.from === 4 ? 'current reference only' : periodLabel(item))}</span>
    <span class="map-hover-links">${item.id.startsWith('nhb-trail-') ? sourceLink(item.source, 'Read NHB account ↗') : `${googleMapsAction(item)}${googleMapsLink(item) ? ' · ' : ''}${sourceLink(item.purposeSource || item.source, item.spatialStatus === 'open-reference' ? 'OpenStreetMap source' : 'official source')}`}</span>
    <button class="map-hover-pin" type="button">Pin this evidence card ↗</button></div>
  </div>`;
}

function bindInteractiveHoverCard(layer, item) {
  layer.bindPopup(buildHoverCard(item), {
    closeButton: false,
    autoClose: false,
    closeOnClick: false,
    autoPan: false,
    keepInView: false,
    maxWidth: 270,
    minWidth: 230,
    offset: [0, -8],
    className: 'map-hover-popup'
  });
  let closeTimer = null;
  const cancelClose = () => {
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer = window.setTimeout(() => {
      const popupElement = layer.getPopup()?.getElement();
      if (!popupElement?.matches(':hover')) layer.closePopup();
    }, 220);
  };
  layer.on('mouseover', () => {
    cancelClose();
    layer.openPopup();
  });
  layer.on('mouseout', (event) => {
    const popupElement = layer.getPopup()?.getElement();
    const relatedTarget = event.originalEvent?.relatedTarget;
    if (popupElement && relatedTarget instanceof Node && popupElement.contains(relatedTarget)) return;
    scheduleClose();
  });
  layer.on('popupopen', (event) => {
    const popupElement = event.popup.getElement();
    if (!popupElement || popupElement.dataset.bound === 'true') return;
    popupElement.dataset.bound = 'true';
    popupElement.addEventListener('mouseenter', () => {
      cancelClose();
    });
    popupElement.addEventListener('mouseleave', () => {
      scheduleClose();
    });
    popupElement.addEventListener('click', (clickEvent) => {
      if (clickEvent.target.closest('a')) return;
      clickEvent.preventDefault();
      clickEvent.stopPropagation();
      selectFeature(item);
      layer.closePopup();
    });
  });
  layer.on('click', () => {
    clearProvisionalLocator();
    selectFeature(item);
  });
}

function clearProvisionalLocator() {
  if (!provisionalLocator) return;
  map.removeLayer(provisionalLocator);
  provisionalLocator = null;
}

map.on('click', clearProvisionalLocator);

function updateMapStatus(message) {
  document.getElementById('map-status').textContent = message;
}

function historicalLayerFor(year) {
  if (!eligibleHistoricalMap(year)) return null;
  if (historicalRasterLayers[year]) return historicalRasterLayers[year];
  const layer = L.tileLayer(historicalTileServices[year], {
    opacity: 0,
    minZoom: 11,
    maxZoom: 19,
    tileSize: 256,
    updateWhenIdle: true,
    keepBuffer: 4,
    attribution: `<a href="${sources[`nus${year}`].url}" target="_blank" rel="noopener noreferrer">NUS Libraries · ${year} historical raster</a>`
  }).addTo(map);
  historicalRasterLayers[year] = layer;
  historicalRasterState[year] = { status: 'loading', service: historicalTileServices[year] };
  layer.on('tileload', () => { historicalRasterState[year].status = 'available'; updateRasterLayers(); });
  layer.on('tileerror', () => { if (historicalRasterState[year].status !== 'available') { historicalRasterState[year].status = 'unavailable'; updateRasterLayers(); } });
  return layer;
}
historicalYears.forEach((year) => historicalLayerFor(year));

function spatialOpacity(item, value) {
  const start = item.from;
  const end = item.to;
  // Current-only brochure and reference points never fade into an earlier state.
  if (start === 4 && value < 4) return 0;
  if (value < start - .55 || value > end + .55) return 0;
  if (value < start) return Math.max(0, (value - (start - .55)) / .55);
  if (value > end) return Math.max(0, ((end + .55) - value) / .55);
  return 1;
}

function featureStyle(item, opacity) {
  const color = layers[item.layer].color;
  const approximate = item.spatialStatus === 'approximate';
  return { className: 'research-feature', color, weight: selectedFeatureId === item.id ? 5 : approximate ? 2 : 3, opacity: Math.min(1, opacity + .2), fillColor: color, fillOpacity: selectedFeatureId === item.id ? .34 : Math.min(.25, opacity * .22), dashArray: approximate ? '8 6' : undefined, lineCap: 'round', lineJoin: 'round' };
}

function makeFeatureLayer(item, opacity) {
  const style = featureStyle(item, opacity);
  let layer;
  if (item.geometry.type === 'Polygon') layer = L.polygon(item.geometry.coordinates[0], style);
  else if (item.geometry.type === 'LineString') layer = L.polyline(item.geometry.coordinates, style);
  else if (item.spatialStatus === 'plan-derived') layer = L.marker(item.geometry.coordinates, { zIndexOffset: selectedFeatureId === item.id ? 1000 : 0, icon: L.divIcon({ className: 'plan-marker-wrap', html: `<span class="plan-marker ${item.layer === 'amenities' ? 'amenity' : ''} ${selectedFeatureId === item.id ? 'selected' : ''}" style="--marker-color:${layers[item.primaryLens].color}">${escapeHtml(item.mapCode || layers[item.layer].icon)}</span>`, iconSize: [25, 25], iconAnchor: [12, 12] }) });
  else if (item.id.startsWith('nhb-trail-')) layer = L.circleMarker(item.geometry.coordinates, { ...style, radius: selectedFeatureId === item.id ? 10 : 7, fillOpacity: Math.min(.85, opacity * .8) });
  else layer = L.circleMarker(item.geometry.coordinates, { ...style, radius: selectedFeatureId === item.id ? 10 : 7, fillOpacity: Math.min(.85, opacity * .8) });
  bindInteractiveHoverCard(layer, item);
  layer.on('mouseover', () => { if (layer.setStyle) layer.setStyle({ weight: 5, fillOpacity: Math.min(.4, opacity * .35) }); else layer.getElement()?.querySelector('.plan-marker')?.classList.add('feature-pulse'); });
  layer.on('mouseout', () => { if (layer.setStyle) layer.setStyle(featureStyle(item, opacity)); else layer.getElement()?.querySelector('.plan-marker')?.classList.remove('feature-pulse'); });
  return layer;
}

function makeProvisionalPlanLayer(item, opacity) {
  const color = layers[item.layer].color;
  const selected = selectedFeatureId === item.id;
  const layer = L.circleMarker(item.navigationCoordinate, {
    color: '#a65032',
    weight: selected ? 4 : 2,
    dashArray: '4 4',
    fillColor: color,
    fillOpacity: selected ? .58 : .22,
    opacity: Math.min(1, opacity + .2),
    radius: selected ? 9 : 6
  });
  bindInteractiveHoverCard(layer, item);
  layer.on('mouseover', () => layer.setStyle({ weight: 4, fillOpacity: .45 }));
  layer.on('mouseout', () => layer.setStyle({ weight: selectedFeatureId === item.id ? 4 : 2, fillOpacity: selectedFeatureId === item.id ? .58 : .22 }));
  return layer;
}

function geometryCoordinates(geometry) {
  const coordinates = [];
  const walk = (value) => {
    if (!Array.isArray(value)) return;
    if (typeof value[0] === 'number' && typeof value[1] === 'number') coordinates.push(value);
    else value.forEach(walk);
  };
  walk(geometry?.coordinates);
  return coordinates;
}

function featureWithinMapWindow(feature) {
  const coordinates = geometryCoordinates(feature.geometry);
  if (!coordinates.length) return false;
  const lngs = coordinates.map((coordinate) => coordinate[0]);
  const lats = coordinates.map((coordinate) => coordinate[1]);
  return Math.max(...lngs) >= currentDataBounds.minLng && Math.min(...lngs) <= currentDataBounds.maxLng && Math.max(...lats) >= currentDataBounds.minLat && Math.min(...lats) <= currentDataBounds.maxLat;
}

function overpassToGeoJSON(payload, id) {
  const features = (payload.elements || []).filter((element) => element.type === 'way' && element.geometry?.length > 1).map((element) => ({
    type: 'Feature',
    properties: { ...(element.tags || {}), osm_id: element.id, osm_type: element.type, ...(element.version != null ? { osm_version: element.version } : {}), ...(element.timestamp ? { osm_timestamp: element.timestamp } : {}) },
    geometry: { type: 'LineString', coordinates: element.geometry.map((point) => [point.lon, point.lat]) }
  }));
  return { type: 'FeatureCollection', name: `OpenStreetMap ${id}`, metadata: { source: 'OpenStreetMap via Overpass', retrieved_at: new Date().toISOString() }, features };
}

function overpassToPointGeoJSON(payload, id) {
  const features = (payload.elements || []).map((element) => {
    const lat = element.lat ?? element.center?.lat;
    const lon = element.lon ?? element.center?.lon;
    if (typeof lat !== 'number' || typeof lon !== 'number') return null;
    return { type: 'Feature', properties: { ...(element.tags || {}), osm_id: element.id, osm_type: element.type, ...(element.version != null ? { osm_version: element.version } : {}), ...(element.timestamp ? { osm_timestamp: element.timestamp } : {}) }, geometry: { type: 'Point', coordinates: [lon, lat] } };
  }).filter(Boolean);
  return { type: 'FeatureCollection', name: `OpenStreetMap ${id}`, metadata: { source: 'OpenStreetMap via Overpass', retrieved_at: new Date().toISOString() }, features };
}

async function loadExternalGeoJSON(definition) {
  if (definition.localUrl) {
    const bundled = window.jlgReferenceSnapshots?.[definition.localUrl];
    if (bundled) return bundled;
    try {
      const localResponse = await fetch(definition.localUrl);
      if (localResponse.ok) return localResponse.json();
    } catch (_error) {
      // A local-file preview may disallow fetch(); the bundled snapshot above still works.
    }
  }
  const response = await fetch(definition.url);
  if (!response.ok) throw new Error(`Source request failed (${response.status})`);
  if (definition.mode === 'datagov') {
    const poll = await response.json();
    if (poll.code !== 0 || !poll.data?.url) throw new Error(poll.errMsg || 'data.gov.sg did not return a download URL');
    const datasetResponse = await fetch(poll.data.url);
    if (!datasetResponse.ok) throw new Error(`GeoJSON download failed (${datasetResponse.status})`);
    const data = await datasetResponse.json();
    return { ...data, metadata: { source: definition.source.url, retrieved_at: new Date().toISOString() } };
  }
  const payload = await response.json();
  return definition.mode === 'overpass-points' ? overpassToPointGeoJSON(payload, definition.title) : overpassToGeoJSON(payload, definition.title);
}

function externalFeatureDetails(id, properties, definition, geometryType) {
  const labelMap = {
    NAME: 'Recorded name', OBJECTID: 'Object ID', OBJECTID_1: 'Object ID', osm_id: 'OSM ID', osm_type: 'OSM object type',
    amenity: 'Amenity tag', highway: 'Highway tag', waterway: 'Waterway tag', natural: 'Natural tag', landuse: 'Land-use tag',
    name: 'Mapped name', ref: 'Reference code', surface: 'Surface', access: 'Access', operator: 'Operator', opening_hours: 'Opening hours',
    wheelchair: 'Wheelchair access', covered: 'Covered', lit: 'Lit', drinking_water: 'Drinking water', toilets: 'Toilets', shelter_type: 'Shelter type',
    bicycle_parking: 'Bicycle parking', capacity: 'Capacity', seats: 'Seats', check_date: 'OSM check date', maxspeed: 'Max speed', oneway: 'One-way'
  };
  const preferredKeys = id === 'roads'
    ? ['osm_type', 'osm_id', 'name', 'highway', 'ref', 'surface', 'access', 'lit', 'maxspeed', 'oneway']
    : id === 'waterways'
      ? ['osm_type', 'osm_id', 'name', 'waterway', 'intermittent', 'seasonal', 'tunnel']
      : id === 'woodland'
        ? ['osm_type', 'osm_id', 'name', 'natural', 'landuse', 'access']
        : id === 'amenities_ref'
          ? ['osm_type', 'osm_id', 'name', 'amenity', 'drinking_water', 'toilets', 'shelter_type', 'bicycle_parking', 'covered', 'wheelchair', 'opening_hours']
          : id === 'greenery' ? ['NAME', 'OBJECTID_1', 'L_CODE'] : ['OBJECTID'];
  const details = [
    { label: 'Geometry', value: geometryType }
  ];
  preferredKeys.forEach((key) => {
    const raw = properties[key];
    if (raw === undefined || raw === null || raw === '') return;
    const value = Array.isArray(raw) ? raw.join(', ') : String(raw);
    const label = labelMap[key] || key;
    if (!details.some((detail) => detail.label === label)) details.push({ label, value });
  });
  return details.slice(0, 10);
}

function externalFeatureItem(id, feature, index, metadata = {}) {
  const definition = externalLayerDefinitions[id];
  const properties = feature.properties || {};
  const classTag = properties.amenity || properties.highway || properties.waterway || properties.natural || properties.landuse;
  const mappedName = properties.NAME || properties.name || null;
  const name = mappedName || (id === 'waterbodies' ? `Waterbody${properties.OBJECTID == null ? '' : ` · OBJECTID ${properties.OBJECTID}`}` : classTag ? String(classTag).replaceAll('_', ' ') : definition.title);
  const geometryType = feature.geometry?.type || 'unknown';
  return {
    id: `external-${id}-${properties.osm_id ?? properties.OBJECTID ?? properties.OBJECTID_1 ?? index}`,
    mapCode: id.slice(0, 3).toUpperCase(),
    name,
    displayTitle: name,
    displaySubtitle: mappedName && properties.amenity ? `Amenity: ${String(properties.amenity).replaceAll('_', ' ')}` : null,
    group: definition.title,
    type: id,
    legend: id,
    layer: id,
    from: 5,
    to: 5,
    documentedPeriod: 'Current reference; source snapshot date shown below',
    geometryType,
    geometry: feature.geometry,
    spatialStatus: id === 'waterbodies' || id === 'greenery' ? 'indicative-official' : 'open-reference',
    source: definition.source,
    details: externalFeatureDetails(id, properties, definition, geometryType),
    rawProperties: properties,
    extractedAt: metadata.retrieved_at || null,
    datasetId: id === 'greenery' || id === 'waterbodies' ? id : 'osm',
    recordType: 'gis-reference'
  };
}

function externalStyle(id) {
  const color = layers[id].color;
  if (id === 'waterbodies' || id === 'greenery' || id === 'woodland') return { color, weight: id === 'waterbodies' ? 2 : 1.8, opacity: .76, fillColor: color, fillOpacity: .16, dashArray: id === 'greenery' ? '5 4' : undefined };
  return { color, weight: id === 'roads' ? 2.2 : 2, opacity: .78, lineCap: 'round', lineJoin: 'round', dashArray: id === 'waterways' ? '7 5' : undefined };
}

function addExternalGeoJSON(id, data) {
  const state = externalLayerState[id];
  const visibleFeatures = (data.features || []).filter(featureWithinMapWindow);
  const featureIndexes = new Map(visibleFeatures.map((feature, index) => [feature, index]));
  const collection = { ...data, features: visibleFeatures };
  state.count = visibleFeatures.length;
  state.layer = L.geoJSON(collection, {
    style: () => externalStyle(id),
    pointToLayer: (_feature, latlng) => L.circleMarker(latlng, { ...externalStyle(id), radius: 4 }),
    onEachFeature: (feature, layer) => {
      const item = externalFeatureItem(id, feature, featureIndexes.get(feature) ?? 0, data.metadata);
      bindInteractiveHoverCard(layer, item);
    }
  });
  state.loaded = true;
  state.error = null;
  updateExternalLayerVisibility();
}

function featureBelongsToExternalLayer(id, feature) {
  const properties = feature.properties || {};
  if (id === 'roads') return Boolean(properties.highway);
  if (id === 'waterways') return Boolean(properties.waterway);
  if (id === 'woodland') return properties.natural === 'wood' || properties.landuse === 'forest';
  if (id === 'amenities_ref') return Boolean(properties.amenity);
  return true;
}

function updateExternalLayerVisibility() {
  const currentState = timeValue >= 4;
  externalLayerIds.forEach((id) => {
    const state = externalLayerState[id];
    if (!state.layer) return;
    const shouldShow = enabledLayers.has(id) && currentState;
    if (shouldShow && !map.hasLayer(state.layer)) state.layer.addTo(map);
    if (!shouldShow && map.hasLayer(state.layer)) map.removeLayer(state.layer);
  });
}

async function ensureExternalLayer(id) {
  const state = externalLayerState[id];
  if (!state || state.loaded || state.loading) return;
  state.loading = true;
  try {
    const data = await loadExternalGeoJSON(externalLayerDefinitions[id]);
    const layerData = { ...data, features: (data.features || []).filter((feature) => featureBelongsToExternalLayer(id, feature)) };
    addExternalGeoJSON(id, layerData);
  } catch (error) {
    state.error = error.message;
  } finally {
    state.loading = false;
    renderLayerControls();
  }
}

function renderFeatures() {
  featureGroup.clearLayers();
  features.filter((item) => isFeatureVisible(item) && (!item.researchOnly || showResearchLeads) && item.spatialStatus !== 'quarantined' && item.mapDisplay !== 'source-only').forEach((item) => {
    const opacity = spatialOpacity(item, timeValue);
    if (opacity > .03) featureGroup.addLayer(item.mapDisplay === 'source-only' ? makeProvisionalPlanLayer(item, opacity) : makeFeatureLayer(item, opacity));
  });
  updateExternalLayerVisibility();
}

function isFeatureVisible(item) {
  if (item.additionalLenses?.some((id) => enabledLayers.has(id))) return true;
  if (!item.primaryLens) return enabledLayers.has(item.layer);
  // Plan-derived facilities and amenities have two deliberate paths to the map:
  // their named collection, or their assigned research lens. This prevents a
  // single Facilities checkbox from becoming a hidden prerequisite for every
  // place in the 53-record collection.
  return enabledLayers.has(item.layer) || enabledLayers.has(item.primaryLens);
}

function renderLayerControls() {
  const control = document.getElementById('layer-controls');
  const controlMarkup = (id, layer) => {
    const suffix = externalLayerState[id]?.loading ? ' · loading' : externalLayerState[id]?.error ? ' · unavailable' : '';
    return `<label class="layer-toggle" title="${escapeHtml(layer.description)}">
      <input type="checkbox" data-layer="${id}" ${enabledLayers.has(id) ? 'checked' : ''} aria-label="Toggle ${escapeHtml(layer.label)}" />
      <span class="layer-swatch" style="--layer:${layer.color}"></span><span>${escapeHtml(layer.label)}${suffix}</span>
    </label>`;
  };
  const group = (title, note, ids) => `<section class="layer-control-group"><p class="layer-control-group-title">${title}</p><p class="layer-control-group-note">${note}</p>${ids.map((id) => controlMarkup(id, layers[id])).join('')}</section>`;
  control.innerHTML = [
    group('Research lenses', 'A lens shows its thematic research objects and matching named plan records.', thematicLayerIds),
    group('NHB Heritage Trail', 'A separate 25-stop National Heritage Board route. Numbers remain in its register and cards.', heritageTrailLayerIds),
    group('Named plan records', 'Use these to show all Facilities or all Amenities, regardless of research lens.', namedRecordLayerIds),
    group('Current reference data', 'These datasets are available only in the present-day map state.', externalLayerIds)
  ].join('');
  control.querySelectorAll('input[data-layer]').forEach((input) => input.addEventListener('change', (event) => {
    const id = event.target.dataset.layer;
    if (event.target.checked) {
      enabledLayers.add(id);
      if (externalLayerState[id]) ensureExternalLayer(id);
    } else enabledLayers.delete(id);
    renderLayerControls();
    renderFeatures();
  }));
  renderLayerStatus();
}

function renderLayerStatus() {
  const status = document.getElementById('layer-status');
  if (!status) return;
  if (!enabledLayers.size) {
    status.textContent = 'No map layers selected. Choose a research lens, a named-record collection, or a current reference dataset.';
    return;
  }
  const currentOnlySelected = currentOnlyLayerIds.filter((id) => enabledLayers.has(id));
  if (timeValue < 4 && currentOnlySelected.length) {
    const labels = currentOnlySelected.map((id) => layers[id].label).join(', ');
    status.textContent = `${labels} selected; these current records appear when the timeline reaches 2024.`;
    return;
  }
  const thematicSelected = thematicLayerIds.filter((id) => enabledLayers.has(id));
  const heritageTrailSelected = heritageTrailLayerIds.some((id) => enabledLayers.has(id));
  status.textContent = thematicSelected.length
    ? `${thematicSelected.map((id) => layers[id].label).join(', ')} selected.${heritageTrailSelected ? ' NHB Heritage Trail is also selected as a separate route.' : ''} Matching named plan records follow their assigned research lens.`
    : heritageTrailSelected
      ? 'NHB Heritage Trail selected. Its directions points appear on the present-day map.'
    : `${enabledLayers.size} map dataset${enabledLayers.size === 1 ? '' : 's'} selected.`;
}

function setAllLayers(enabled) {
  if (enabled) {
    Object.keys(layers).forEach((id) => {
      enabledLayers.add(id);
      if (externalLayerState[id]) ensureExternalLayer(id);
    });
  } else {
    enabledLayers.clear();
  }
  renderLayerControls();
  renderFeatures();
}

function enableFeatureVisibility(item) {
  enabledLayers.add(item.primaryLens || item.layer);
  if (externalLayerState[item.primaryLens || item.layer]) ensureExternalLayer(item.primaryLens || item.layer);
}

document.getElementById('select-all-layers').addEventListener('click', () => setAllLayers(true));
document.getElementById('clear-all-layers').addEventListener('click', () => setAllLayers(false));

document.getElementById('show-research-leads').addEventListener('change', (event) => {
  showResearchLeads = event.target.checked;
  renderFeatures();
});

function renderFeatureSource(source) {
  return `<div class="feature-source"><b>Primary spatial / object record</b><br>${sourceLink(source)}<br>${escapeHtml(source.institution)} · checked ${escapeHtml(source.date)}<br><span class="source-url">${escapeHtml(source.url)}</span></div>`;
}

function relatedSourcesFor(item) {
  if (item.id.startsWith('nhb-trail-')) {
    return [...item.heritageTrailStops.map((stop) => sources[`nhbTrail${stop.number}`]), ...(item.heritageTrailStops.some((stop) => stop.number === 20) ? [sources.mandaiBirdClosure] : [])];
  }
  const dossier = caseDossierFor(item);
  const cited = dossier?.sections.flatMap((section) => section.refs.map((id) => sources[id])) || [];
  const articleCited = atlasArticles[dossier?.articleId || dossier?.id]?.sections.flatMap((section) => section.paragraphs.flatMap((paragraph) => paragraph.refs.map((id) => sources[id]))) || [];
  const related = [...cited, ...articleCited, ...(!dossier ? (item.storySources || []) : []), item.source, item.purposeSource, item.imageSource, ...(item.spatialAudit?.sources || []), ...(item.relatedSources || [])];
  if (item.group === 'Chinese Garden' || item.name === 'Chinese Garden') related.push(sources.nhbChinese, sources.nas1975, sources.cna2024Opening, sources.straits2024Preview, sources.academicStokols, sources.nparksAnnualReport);
  if (item.group === 'Japanese Garden' || item.name === 'Japanese Garden') related.push(sources.pmoOpening, sources.cna2024Opening, sources.straits2024Preview, sources.academicStokols, sources.nparksAnnualReport);
  if (item.group === 'Lakeside Garden' || item.name === 'Lakeside Garden') related.push(sources.mothership2019Opening, sources.cna2018Plan, sources.academicStokols, sources.nparksAnnualReport);
  if (item.layer === 'facilities' || item.layer === 'amenities' || item.layer === 'amenities_ref') related.push(sources.nparksServices, sources.nparksDining, sources.nparksGettingHere, sources.cna2024Opening, sources.straits2024Preview, sources.academicStokols);
  if (item.layer === 'ecology') related.push(sources.nparksGrasslands, sources.nparksWetlands, sources.nparksLakeside, sources.nparksAnnualReport, sources.pubJurongGuide);
  if (item.layer === 'public') related.push(sources.nparksBrochure, sources.cna2018Plan, sources.straits2024Preview);
  if (item.layer === 'hidden') related.push(sources.nhbIndustrial, sources.nlbJurong, sources.academicStokols, sources.pubJurongGuide);
  if (item.layer === 'engineered') related.push(sources.pmoOpening, sources.pubJurongGuide, sources.academicStokols);
  if (item.layer === 'governance') related.push(sources.nparks2024Opening, sources.nparksVisitorGuidelines, sources.nparksSmart, sources.nparksWaterSystems, sources.uraJurongLakeDistrict, sources.academicStokols);
  if (item.heritageTrailStops) related.push(...item.heritageTrailStops.map((stop) => sources[`nhbTrail${stop.number}`]));
  // Never truncate sources used in this case. A bibliography limit previously
  // allowed narrative citations to disappear behind a generic reading list.
  return [...new Map(related.filter(Boolean).map((source) => [source.url, source])).values()].sort((a, b) => apaCitation(a).localeCompare(apaCitation(b)));
}

function citedSourcesFor(item) {
  const dossier = caseDossierFor(item);
  const articleCited = atlasArticles[dossier?.articleId || dossier?.id]?.sections.flatMap((section) => section.paragraphs.flatMap((paragraph) => paragraph.refs.map((id) => sources[id]))) || [];
  const cited = [item.source, item.purposeSource, item.imageSource, ...articleCited, ...(dossier?.sections.flatMap((section) => section.refs.map((id) => sources[id])) || []), ...(!dossier ? (item.storySources || []) : []), ...(item.heritageTrailStops || []).map((stop) => sources[`nhbTrail${stop.number}`]), ...(item.heritageTrailStops?.some((stop) => stop.number === 20) ? [sources.mandaiBirdClosure] : [])];
  return [...new Map(cited.filter(Boolean).map((source) => [source.url, source])).values()];
}

function renderRelatedSources(item) {
  const related = relatedSourcesFor(item);
  if (!related.length) return '';
  const citedUrls = new Set(citedSourcesFor(item).map((source) => source.url));
  const render = (records) => `<div class="related-sources">${records.map((source) => `<div data-source-id="${escapeHtml(source.key)}"><b>${escapeHtml(source.institution)}</b>${sourceLink(source)}<span class="apa-citation">${escapeHtml(apaCitation(source))}</span>${source.evidenceScope ? `<small>${escapeHtml(source.evidenceScope)}</small>` : ''}<small>Checked ${escapeHtml(source.date)}</small></div>`).join('')}</div>`;
  const further = related.filter((source) => !citedUrls.has(source.url));
  return `<h3>References</h3>${render(related.filter((source) => citedUrls.has(source.url)))}${further.length ? `<details class="further-reading"><summary>Further reading / corroborating context</summary>${render(further)}</details>` : ''}`;
}

function verificationLabel(item) {
  if (item.spatialStatus === 'quarantined' && item.navigationCoordinate) return 'temporary plan position';
  if (item.mapDisplay === 'source-only') return 'record only';
  if (item.researchOnly) return 'research marker';
  if (item.spatialStatus === 'approximate') return 'approximate extent';
  if (item.spatialStatus === 'orientation') return 'orientation point';
  if (item.spatialStatus === 'plan-derived') return 'NParks plan point';
  if (item.spatialStatus === 'indicative-official') return 'official planning geometry';
  if (item.spatialStatus === 'open-reference') return 'open reference geometry';
  return 'mapped feature';
}

function renderFeatureDetails(item) {
  if (!item.details?.length) return '';
  return `<h3>Original attributes / mapped details</h3><dl class="feature-details">${item.details.map((detail) => `<div><dt>${escapeHtml(detail.label)}</dt><dd>${escapeHtml(detail.value)}</dd></div>`).join('')}</dl>`;
}

function renderEvidenceStory(item) {
  if (item.id.startsWith('nhb-trail-')) return '';
  const dossier = caseDossierFor(item);
  if (dossier) return renderCaseDossier(item, dossier);
  if (['facilities', 'amenities', 'amenities_ref'].includes(item.layer)) return '';
  if (!item.story) return '';
  const storySources = [...new Map((item.storySources || []).filter(Boolean).map((source) => [source.url, source])).values()];
  return `<div class="evidence-story"><h3>Evidence-led story</h3><p>${escapeHtml(item.story)} ${inlineCitations(storySources)}</p></div>`;
}

function renderHeritageTrailCard(item) {
  if (!item.heritageTrailStops?.length) return '';
  const stops = [...item.heritageTrailStops].sort((a, b) => a.number === focusedHeritageStop ? -1 : b.number === focusedHeritageStop ? 1 : a.number - b.number);
  return `<section class="heritage-trail-card" aria-label="Jurong Heritage Trail account">
    <h3>Jurong Heritage Trail · National Heritage Board</h3>
    ${stops.map((stop) => `<article class="heritage-stop-account">
      <h4>${stop.number}. ${escapeHtml(stop.name)}</h4>
      <p>${escapeHtml(stop.summary)}</p>
      <p class="heritage-position"><b>Map position:</b> ${escapeHtml(stop.positionNote)}</p>
      <a class="heritage-source-action" href="${escapeHtml(sources[`nhbTrail${stop.number}`].url)}" target="_blank" rel="noopener noreferrer">Read the full NHB account ↗</a>
      ${stop.number === 20 ? `<p class="heritage-update">Jurong Bird Park closed on 3 January 2023. ${sourceLink(sources.mandaiBirdClosure, 'Operator’s closure notice ↗')}</p>` : ''}
    </article>`).join('')}
  </section>`;
}

function inlineCitations(records) {
  if (!records.length) return '';
  return `<span class="inline-citations">(${records.map((source) => `<a href="${escapeHtml(source.url)}" data-cite-id="${escapeHtml(source.key)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(source.title)}">${escapeHtml(source.inTextAuthor)}, ${escapeHtml(source.citeYear)}</a>`).join('; ')})</span>`;
}

function caseDossierFor(item) {
  const place = placeResearch[item.id];
  if (place) return { id: item.id, articleId: place.articleId || null, sections: place.sections, related: [], featured: Boolean(place.articleId), referenceOnly: !place.articleId, contextual: false };
  const exactPlaceAliases = {
    'Stoneboat': 'stoneboat', 'Grand Arch': 'grand-arch', 'Bonsai Garden': 'bonsai',
    'Freshwater Swamp': 'freshwater-swamp', 'Grasslands': 'grasslands', 'The Lone Tree': 'lone-tree-memory',
    'Forest Ramble (Children’s Playground)': 'forest-ramble', 'Therapeutic Garden': 'therapeutic-garden',
    'Rasau Walk': 'rasau', 'Neram Streams': 'neram', 'Allotment Gardens': 'allotments',
    'Cascading Creek': 'creek'
  };
  const alias = ['facilities', 'amenities'].includes(item.layer) ? exactPlaceAliases[item.name] : caseResearch.aliases[item.name];
  const id = atlasArticles[item.id] ? item.id : caseResearch.cases[item.id] ? item.id : alias;
  if (!id) return null;
  const archive = caseResearch.cases[id];
  const authored = publicResearch[id];
  const sections = authored || [publicReference[id]].filter(Boolean);
  return { id, sections, related: authored ? archive.related : [], featured: Boolean(authored || atlasArticles[id]), referenceOnly: !authored && !atlasArticles[id],
    contextual: id !== item.id && !['Stoneboat', 'Freshwater Swamp', 'Grasslands', 'Therapeutic Garden', 'The Lone Tree', 'Floral Garden', 'Grand Arch', 'Bonsai Garden', 'Rasau Walk', 'Neram Streams', 'Allotment Gardens', 'Water Lily Garden', 'Cascading Creek', 'Forest Ramble (Children’s Playground)'].includes(item.name) };
}

function renderCaseDossier(item, dossier) {
  const related = dossier.related.map((id) => features.find((entry) => entry.id === id)).filter(Boolean);
  const articleId = dossier.articleId || dossier.id;
  const article = atlasArticles[articleId] && (!dossier.contextual || item.name === 'The Lone Tree') ? atlasArticles[articleId] : null;
  if (article) {
    const refs = [...new Set(article.sections.flatMap((section) => section.paragraphs.flatMap((paragraph) => paragraph.refs)))];
    return `<article class="case-dossier featured-case atlas-inline-article" aria-label="Place story">
      <h3>${article.status === 'case-study' ? 'Case study' : 'Expanded research draft'}</h3>
      <h4 class="atlas-card-title">${escapeHtml(article.title)}</h4>
      <p class="atlas-lead">${escapeHtml(article.lead)}</p>
      ${article.sections.map((section) => `<section class="atlas-inline-section"><h4>${escapeHtml(section.heading)}</h4>${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph.text)} ${inlineCitations(paragraph.refs.map((key) => sources[key]).filter(Boolean))}</p>`).join('')}</section>`).join('')}
      <details class="atlas-research-record"><summary>Research record and references</summary><div><p>${escapeHtml(article.audit.uncertainty)}</p><ol>${refs.map((key) => `<li>${sourceLink(sources[key], apaCitation(sources[key]))}</li>`).join('')}</ol></div></details>
    </article>`;
  }
  return `<article class="case-dossier${dossier.featured ? ' featured-case' : ' compact-case'}" aria-label="${dossier.featured ? 'Place story' : 'Place record'}">
    <h3>${dossier.featured ? 'Place story' : 'Place record'}</h3>
    ${dossier.contextual ? '<p class="case-scope">This account describes the surrounding place, not the exact selected point.</p>' : ''}
    ${dossier.sections.map((section) => `<section class="case-section record"><h4>${escapeHtml(section.title)}</h4><p>${escapeHtml(section.text)} ${inlineCitations(section.refs.map((id) => sources[id]).filter(Boolean))}</p></section>`).join('')}
    ${related.length ? `<div class="related-cases"><h4>Connected cases</h4>${related.map((entry) => `<button type="button" data-related-case="${escapeHtml(entry.id)}">${escapeHtml(entry.name)} →</button>`).join('')}<small>Mapped destinations are highlighted; research records open as text only.</small></div>` : ''}
  </article>`;
}

function spatialBadgeLabel(item) {
  if (item.mapDisplay === 'source-only') return 'record only';
  if (item.researchOnly) return 'research marker';
  if (item.spatialStatus === 'approximate') return 'approximate extent';
  if (item.spatialStatus === 'orientation') return 'orientation point';
  if (item.spatialStatus === 'plan-derived') return 'NParks plan point';
  return 'mapped object';
}

function renderGISFeatureCard(item) {
  const dataset = datasetInformation[item.datasetId];
  const properties = item.rawProperties;
  const recordDescription = item.datasetId === 'greenery'
    ? `The selected NParks record names this managed area “${properties.NAME || 'not recorded'}”. Its polygon describes an indicative management area, not a habitat survey.`
    : item.datasetId === 'waterbodies'
      ? `The selected URA record is a planning waterbody polygon${properties.OBJECTID == null ? '' : ` (OBJECTID ${properties.OBJECTID})`}. This record does not provide a place name or a historical shoreline.`
      : `The selected OpenStreetMap record${properties.name ? ` is named “${properties.name}”` : ' has no recorded name'}${properties.amenity ? ` and carries the amenity=${properties.amenity} tag` : properties.highway ? ` and carries the highway=${properties.highway} tag` : properties.waterway ? ` and carries the waterway=${properties.waterway} tag` : properties.natural ? ` and carries the natural=${properties.natural} tag` : ''}. This is a present-day map record, not a dated account of the earlier landscape.`;
  const osmType = properties.osm_type;
  const osmId = properties.osm_id;
  const objectUrl = ['node', 'way', 'relation'].includes(osmType) && /^\d+$/.test(String(osmId ?? ''))
    ? `https://www.openstreetmap.org/${osmType}/${osmId}` : null;
  const sourceUrl = objectUrl || item.source.url;
  const rawAttributes = Object.entries(properties).map(([key, value]) => `<div><dt>${escapeHtml(key)}</dt><dd>${escapeHtml(value == null ? 'Not recorded' : Array.isArray(value) ? value.join(', ') : value)}</dd></div>`).join('');
  return `<div class="feature-card gis-card" style="--feature-color:${layers[item.layer].color}">
    <div class="feature-kicker">CURRENT REFERENCE · ${escapeHtml(dataset.title)}</div>
    <h2>${escapeHtml(item.name)}</h2>
    ${item.displaySubtitle ? `<div class="feature-subtitle">${escapeHtml(item.displaySubtitle)}</div>` : ''}
    <p class="dataset-summary">${escapeHtml(dataset.summary)}</p>
    <p class="dataset-date">${escapeHtml(dataset.date)}${item.extractedAt ? ` · Retrieved ${escapeHtml(item.extractedAt.slice(0, 10))}` : ''}</p>
    <h3>What this mapped object records</h3><p>${escapeHtml(recordDescription)}</p>
    <h3>Selected record</h3><dl class="feature-details">${item.details.map(({ label, value }) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl>
    <p class="dataset-date"><a href="${escapeHtml(sourceUrl)}" target="_blank" rel="noopener noreferrer">${objectUrl ? 'View this OSM object' : 'View source dataset'} ↗</a></p>
    <details><summary>About this dataset</summary><div><p>${escapeHtml(dataset.method)}</p><p>${sourceLink(item.source)}</p><p>Source checked ${escapeHtml(item.source.date)}. This check date is not the object’s creation or survey date.</p><p class="source-url">${escapeHtml(item.source.url)}</p></div></details>
    <details><summary>All source attributes</summary><div><dl class="feature-details">${rawAttributes}</dl></div></details>
    <details><summary>Reference</summary><div><p>${escapeHtml(apaCitation(item.source))}</p></div></details>
  </div>`;
}

function selectFeature(item) {
  selectedFeatureId = item.id;
  const panel = document.getElementById('evidence-panel');
  if (item.recordType === 'gis-reference') {
    panel.innerHTML = renderGISFeatureCard(item);
    panel.scrollTop = 0;
    renderFeatures();
    return;
  }
  const layer = layers[item.primaryLens || item.layer];
  const dossier = caseDossierFor(item);
  panel.innerHTML = `<div class="feature-card" style="--feature-color:${layer.color}">
    <div class="feature-kicker">${layer.icon} ${escapeHtml(layers[item.layer].label)}${item.primaryLens ? ` · ${escapeHtml(layer.label)}` : ''}${item.layer !== 'nhb' && item.additionalLenses?.includes('nhb') ? ' · NHB Heritage Trail' : ''}</div>
    <h2>${escapeHtml(item.heritageTrailStops?.find((stop) => stop.number === focusedHeritageStop)?.name || item.displayTitle || item.name)}</h2>
    ${item.displaySubtitle ? `<div class="feature-subtitle feature-place-name">${escapeHtml(item.displaySubtitle)}</div>` : ''}
    <div class="feature-subtitle">Mapped period: ${escapeHtml(periodLabel(item))} · geometry: ${escapeHtml(item.geometryType)}</div>
    <div class="evidence-badges"><span class="evidence-badge ${escapeHtml(item.spatialStatus)}">${escapeHtml(spatialBadgeLabel(item))}</span><span class="evidence-badge">geometry: ${escapeHtml(item.geometryType)}</span>${verificationLabel(item) !== spatialBadgeLabel(item) ? `<span class="evidence-badge evidence-status">${escapeHtml(verificationLabel(item))}</span>` : ''}</div>
    <div class="feature-actions">${item.id.startsWith('nhb-trail-') ? '' : googleMapsAction(item, 'feature-map-link')}</div>
    ${item.image ? `<div class="feature-image-credit">Image source: ${sourceLink(item.imageSource || item.source)}</div>` : ''}
    ${!item.image && ['facilities', 'amenities'].includes(item.layer) && googleMapsLinkKind(item) === 'name-search' ? '<p class="feature-image-note">Google Maps name search; place listing not verified.</p>' : ''}
    ${dossier || item.heritageTrailStops ? '' : `<h3>What this place is</h3><p>${escapeHtml(item.purpose || item.fact)} ${inlineCitations([item.purposeSource || item.source])}</p>`}
    ${renderHeritageTrailCard(item)}
    ${renderEvidenceStory(item)}
    <details class="research-status"><summary>Map record and research notes</summary>${renderFeatureDetails(item)}${item.periodEvidence ? `<p>${escapeHtml(item.periodEvidence)}</p>` : ''}${item.limitation ? `<p>${escapeHtml(item.limitation)}</p>` : ''}${item.spatialAudit?.basis ? `<p>${escapeHtml(item.spatialAudit.basis)}</p>` : ''}</details>
    ${renderRelatedSources(item)}
    <details class="source-record"><summary>Primary map / object record</summary>${renderFeatureSource(item.source)}</details>
  </div>`;
  panel.scrollTop = 0;
  panel.querySelectorAll('[data-related-case]').forEach((button) => button.addEventListener('click', () => {
    const related = features.find((entry) => entry.id === button.dataset.relatedCase);
    if (!related) return;
    if (related.geometry?.type === 'Point' && related.mapDisplay !== 'source-only') {
      enableFeatureVisibility(related);
      renderLayerControls();
      if (timeValue < related.from || timeValue > related.to) {
        document.getElementById('timeline').value = String(related.from);
        updateTimeline(related.from);
      }
      map.setView(related.geometry.coordinates, 16.5);
    }
    selectFeature(related);
  }));
  document.querySelectorAll('.facility-jump').forEach((button) => {
    const selected = button.dataset.featureId === item.id;
    button.closest('li')?.classList.toggle('selected', selected);
    if (selected) button.setAttribute('aria-current', 'true');
    else button.removeAttribute('aria-current');
  });
  document.querySelectorAll('.heritage-jump').forEach((button) => {
    const selected = button.dataset.featureId === item.id && (!focusedHeritageStop || Number(button.dataset.trailNumber) === focusedHeritageStop);
    button.closest('li')?.classList.toggle('selected', selected);
    if (selected) button.setAttribute('aria-current', 'true');
    else button.removeAttribute('aria-current');
  });
  renderFeatures();
}

function renderBaseEvidence(value) {
  if (selectedFeatureId) return;
  const display = timelineLabel(value);
  const selected = Math.round(value);
  const isStop = Math.abs(value - selected) < .06;
  const year = years[selected].year;
  const content = {
    1953: { title: 'Before the lake gardens', text: 'The 1953 topographical sheets include a Jurong sheet with Sungei Jurong before the later lake-garden project. Its mapped river, routes and place names give visitors a starting point for investigating the landscape before the recreational lake. The sheet records cartographic observations, not a complete account of local livelihoods or ecology.', reading: 'Compare the water symbols and routes with the later sheets. Ask which features remain legible and which have been redrawn, without treating different map symbols as measured landscape change.', source: sources.nus1953 },
    1971: { title: 'Lake formation in context', text: 'The official account dates completion of the Jurong River sluice works and formation of Jurong Lake to 1971. The 1971 topographical map provides a separate spatial record of mapped water, routes and infrastructure during that transformation. Read the map and the dated account together: a sheet published in 1971 need not show the landscape after the works were completed.', reading: 'Compare its water and transport symbols with 1953 to investigate how the wider Jurong landscape was being remade. This is a question for visual comparison, not a measured inundation area.', source: sources.nus1971, eventSource: sources.pmoOpening },
    1975: { title: 'Gardens in an engineered lake', text: 'The official chronology places the Japanese Garden’s completion in 1973 and the Chinese Garden’s in 1975. The 1975 Jurong sheet situates lake, islands, routes and surrounding land within the same mapped landscape. It allows the designed leisure spaces to be examined alongside the engineered water system and nearby development.', reading: 'Compare with earlier sheets to ask how a working river-and-lake landscape became a setting for public recreation. Apparent shoreline differences are not precise measurements, especially across maps of different scales.', source: sources.nus1975, eventSource: sources.pmoOpening },
    2019: { title: 'Lakeside Garden opens', text: 'Lakeside Garden opened as the first phase of the present Jurong Lake Gardens in 2019. This dated event separates the earlier lake-and-garden landscape from the later three-garden redevelopment. The contemporary OneMap canvas helps locate the project, but it does not recreate the 2019 landscape or prove which facilities existed on opening day.', reading: 'Use dated plans and opening records, rather than today’s amenity layer, to investigate who the new public space was designed to serve and what changed on the ground.', source: sources.pmoOpening },
    2024: { title: 'Three gardens together', text: 'The rejuvenated Chinese and Japanese Gardens reopened on 8 September 2024, completing the three-garden Jurong Lake Gardens project with Lakeside Garden. NParks documents retained landmarks as well as new gardens, pavilions and community spaces. The present-day OneMap canvas locates these places; it is not a map surveyed on the reopening date.', reading: 'Compare the official opening account with earlier mapped land and water, while keeping current OSM, NParks and URA features distinct from an opening-day inventory.', source: sources.nparks2024Opening }
  };
  const card = content[year];
  const historical = year <= 1975;
  const metadata = historicalMapEligibility[year];
  const comparison = historical ? 'Visual comparison only: different survey dates, scales and cartographic conventions prevent precise area or shoreline measurements here.' : '';
  document.getElementById('evidence-panel').innerHTML = `<div class="base-card">
    <span class="section-kicker">03 · ${historical ? 'HISTORICAL MAP' : 'DOCUMENTED EVENT'}</span>
    <h2>${escapeHtml(display.year)} · ${escapeHtml(isStop ? card.title : 'Visual transition')}</h2>
    <div class="evidence-badges"><span class="evidence-badge">${historical ? 'historical evidence' : 'documented event'}</span>${year >= 2019 ? '<span class="evidence-badge">present-day orientation map</span>' : ''}</div>
    <h3>What this state shows</h3><p>${escapeHtml(isStop ? card.text : 'This is an exploratory visual transition, not an intermediate historical survey or a measurement of landscape change.')}</p>
    ${isStop ? `<h3>Why compare it?</h3><p>${escapeHtml(card.reading)}</p>` : ''}
    <h3>Sources</h3><p>${sourceLink(card.source)}${card.eventSource ? ` · ${sourceLink(card.eventSource, 'Dated event account')}` : ''}</p>
    <details><summary>Map information and references</summary><div><p>${escapeHtml(historical ? `Original map publication: ${year}; ${metadata.scale}; ${metadata.maker}. NUS later digitised and georeferenced the map. Study-area survey date is not established here.` : `Event date: ${year}. The OneMap tiles are contemporary and have no ${year} survey date in this project.`)}</p>${comparison ? `<p>${escapeHtml(comparison)}</p>` : ''}${historical && year === 1971 ? '<p>NUS reports later SVY21 registration using control points and transformation tests; this is separate from the original map production.</p>' : ''}${historical ? `<p>Integrated map service: <span class="source-url">${escapeHtml(card.source.serviceUrl)}</span></p>` : ''}<p>Source checked ${escapeHtml(card.source.date)}; this is not the map’s survey or event date.</p><p>${escapeHtml(apaCitation(card.source))}</p>${card.eventSource ? `<p>${escapeHtml(apaCitation(card.eventSource))}</p>` : ''}</div></details>
  </div>`;
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function baseMapState(value) {
  const state = { 1953: 0, 1971: 0, 1975: 0, current: 0, label: '' };
  if (value < 1) {
    const t = clamp01(value);
    state[1953] = 1 - t;
    state[1971] = t;
    state.label = t < .06 ? 'Historical map: 1953' : 'Visual comparison · NUS 1953 → 1971';
  } else if (value < 2) {
    const t = clamp01(value - 1);
    state[1971] = 1 - t;
    state[1975] = t;
    state.label = t < .06 ? 'Historical map: 1971' : 'Visual comparison · NUS 1971 → 1975';
  } else if (value < 3) {
    const t = clamp01((value - 2) / .65);
    state[1975] = 1 - t;
    state.current = t;
    state.label = t < .06 ? 'Historical map: 1975' : 'Visual transition · 1975 map → present-day OneMap';
  } else {
    state.current = 1;
    state.label = 'Present-day OneMap for orientation · not a map of the selected event year';
  }
  return state;
}

function updateRasterLayers() {
  const state = baseMapState(timeValue);
  currentBaseLayer.setOpacity(state.current);
  historicalYears.forEach((year) => {
    const layer = historicalLayerFor(year);
    if (layer && typeof layer.setOpacity === 'function') layer.setOpacity(historicalRasterState[year]?.status === 'unavailable' ? 0 : state[year]);
  });
  document.getElementById('base-map-label').textContent = state.label;
  const notice = document.getElementById('map-state-notice');
  const eventYear = timeValue >= 3 && Math.abs(timeValue - Math.round(timeValue)) < .06 ? years[Math.round(timeValue)].year : null;
  notice.className = `map-state-notice${eventYear ? ' event' : ''}`;
  notice.textContent = eventYear ? `${eventYear} documented event · present-day OneMap is for orientation, not a ${eventYear} survey.`
    : timeValue < 3 ? 'Historical map comparison is visual and exploratory; it does not measure changes in area or shoreline.'
      : 'Transition to the present-day orientation map; intervening landscape states are not measured.';
  if (state.current > .5) updateMapStatus('Present-day OneMap for orientation · select an object to inspect its source');
  else if (historicalYears.some((year) => state[year] > .5 && historicalRasterState[year]?.status === 'unavailable')) updateMapStatus('Selected historical map service is unavailable · no current-map substitute');
  else updateMapStatus('NUS historical map · visual comparison only');
}

function timelineLabel(value) {
  const lower = Math.floor(value);
  const upper = Math.ceil(value);
  if (lower === upper || Math.abs(value - lower) < .06) return { year: years[lower].year, context: years[lower].context, status: lower >= 3 ? 'documented event' : 'published map' };
  return { year: `c. ${years[lower].year}–${years[upper].year}`, context: `transition between documented states`, status: 'visual transition' };
}

function updateTimeline(value) {
  timeValue = Number(value);
  if (timeValue < 4 && (selectedFeatureId?.startsWith('external-') || features.some((item) => item.id === selectedFeatureId && item.from === 4))) selectedFeatureId = null;
  const lower = Math.floor(timeValue);
  const display = timelineLabel(timeValue);
  document.getElementById('timeline-year').textContent = display.year;
  document.getElementById('timeline-context').textContent = display.context;
  document.getElementById('timeline-status').textContent = display.status;
  document.getElementById('timeline-description').textContent = years[Math.round(timeValue)].description;
  document.getElementById('map-title').textContent = `Jurong Lake Gardens · ${display.year}`;
  renderFeatures();
  renderLayerStatus();
  updateRasterLayers();
  renderBaseEvidence(timeValue);
  renderPeriodPhotos(timeValue);
}

function renderSourceLedger() {
  document.getElementById('source-ledger').innerHTML = Object.values(sources).map((source) => `<div class="source-record"><b>${escapeHtml(source.institution)}</b>${sourceLink(source)}<span class="apa-citation">${escapeHtml(apaCitation(source))}</span><span class="source-url">${escapeHtml(source.url)}</span>${source.serviceUrl ? `<span class="source-service">GIS tile template used by the map: ${escapeHtml(source.serviceUrl)}</span>` : ''}<span class="source-date">Checked ${escapeHtml(source.date)}</span></div>`).join('');
}

function renderPeriodPhotos(value) {
  const selectedIndex = Math.round(value);
  const year = years[selectedIndex].year;
  const records = photoRecords.filter((item) => item.displayYears.includes(year));
  const cards = records.length ? records.map((item) => `<article class="photo-card ${item.image ? '' : 'source-only'}">
    ${item.image ? `<a class="photo-image-link" href="${escapeHtml(item.videoUrl || item.source.url)}" target="_blank" rel="noopener noreferrer"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.imageAlt)}" loading="lazy" /></a>` : `<a class="photo-source-placeholder" href="${escapeHtml(item.source.url)}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(item.sourceOnlyLabel || 'ARCHIVE IMAGE')}</span><b>${escapeHtml(item.sourceOnlyTitle || item.imageLinkLabel || 'Open the source record ↗')}</b></a>`}
    <div class="photo-card-body"><span class="photo-meta">${escapeHtml(item.source.institution)} · ${escapeHtml(item.evidenceLabel || (item.exact ? 'exactly dated' : 'nearest dated reference'))}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.note)}</p>${item.videoUrl ? `<a class="inline-source video-source" href="${escapeHtml(item.videoUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.videoLinkLabel || 'Open the video ↗')}</a>` : ''}${item.videoSource ? `<span class="source-url">Video source: ${escapeHtml(item.videoSource.url)}</span>` : ''}<a class="inline-source" href="${escapeHtml(item.source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.source.title)} ↗</a><span class="source-url">${escapeHtml(item.source.url)}</span><span class="source-date">Checked ${escapeHtml(item.source.date)}</span></div>
  </article>`).join('') : `<article class="photo-card source-only photo-gap"><div class="photo-source-placeholder"><span>NO PERIOD PHOTO</span><b>No dated photograph is available in this register</b></div><div class="photo-card-body"><span class="photo-meta">Image availability · ${year}</span><h3>Use the mapped and written sources</h3><p>The current source register has no displayable photograph dated to this selected state. A modern image is not substituted for it.</p>${year < 2019 ? `<a class="inline-source" href="${sources[`nus${year}`]?.url ?? sources.nusAbout.url}" target="_blank" rel="noopener noreferrer">Open NUS map information ↗</a>` : ''}</div></article>`;
  document.getElementById('period-photos').innerHTML = cards;
}

function renderFacilityRegister() {
  const registerItem = (item, point) => {
    if (!point) return `<li class="unmapped"><span>${escapeHtml(item.name)}</span><em>${escapeHtml(item.type)}</em></li>`;
    const clickable = Boolean(point?.geometry?.coordinates);
    const lens = layers[point.primaryLens];
    return `<li class="${clickable ? 'mapped' : 'unmapped'}"${clickable ? '' : ' title="Brochure-listed facility; location needs further spatial checking"'}><span>${clickable ? `<button class="facility-jump" type="button" data-feature-id="${escapeHtml(point.id)}"><b class="facility-code">${escapeHtml(point.mapCode)}</b> ${escapeHtml(item.name)}</button>` : `<b class="facility-code">${escapeHtml(point.mapCode)}</b> ${escapeHtml(item.name)}`}</span><em><span class="facility-lens" style="--lens-color:${lens.color}">${escapeHtml(lens.label)}</span><small>${escapeHtml(item.type)}</small></em></li>`;
  };
  const groups = ['Chinese Garden', 'Japanese Garden', 'Lakeside Garden'].map((garden) => {
    const pageSource = garden === 'Chinese Garden' ? sources.nparksChinese : garden === 'Japanese Garden' ? sources.nparksJapanese : sources.nparksLakeside;
    const items = facilityNames.filter((item) => item.garden === garden).map((item) => {
      const point = planFacilityByName.get(item.name);
      return registerItem(item, point);
    }).join('');
    const clickableCount = facilityNames.filter((item) => {
      if (item.garden !== garden) return false;
      const point = planFacilityByName.get(item.name);
      return Boolean(point?.geometry?.coordinates);
    }).length;
    const gardenClass = garden.toLowerCase().replace(/\s+/g, '-');
    return `<section class="facility-group facility-group--${gardenClass}"><div class="facility-group-head"><h3>${escapeHtml(garden)}</h3><div>${sourceLink(pageSource, 'NParks page')} · ${sourceLink(sources.nparksBrochure, 'brochure map')}</div></div><span class="facility-status">${clickableCount} named locations can be opened on the map. Colours show our primary interpretive lens; brochure-derived positions are approximate.</span><ul>${items}</ul></section>`;
  }).join('');
  const amenities = amenityFeatures.map((point) => registerItem(point, point)).join('');
  const brochureSymbols = amenityNames.map((item) => `<li><span>${escapeHtml(item.name)}</span><em>${escapeHtml(item.type)}</em></li>`).join('');
  document.getElementById('facility-register').innerHTML = `${groups}<section class="facility-group amenities-group"><div class="facility-group-head"><h3>Named amenities & access</h3><div>${sourceLink(sources.nparksBrochure, 'NParks brochure map')}</div></div><span class="facility-status">14 named service and access points are linked to the map. Colours show our primary interpretive lens; coordinates remain separate from the thematic classification.</span><ul>${amenities}</ul><details class="brochure-symbols"><summary>Brochure symbol key</summary><ul>${brochureSymbols}</ul></details></section>`;
  document.querySelectorAll('.facility-jump').forEach((button) => button.addEventListener('click', () => {
    const item = features.find((featureItem) => featureItem.id === button.dataset.featureId);
    if (!item) return;
    enableFeatureVisibility(item);
    renderLayerControls();
    document.getElementById('timeline').value = String(item.from);
    updateTimeline(item.from);
    const coordinate = item.geometry?.coordinates;
    if (!coordinate) return;
    map.setView(coordinate, 16.5);
    clearProvisionalLocator();
    selectFeature(item);
    document.getElementById('map').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

function renderHeritageTrailRegister() {
  document.getElementById('heritage-trail-register').innerHTML = `<div class="facility-group-head">
    <h3>25 mapped trail stops</h3>
    <div><a href="${escapeHtml(sources.nhbJurongTrail.url)}" target="_blank" rel="noopener noreferrer">NHB trail ↗</a> · <button id="show-heritage-trail" class="heritage-map-button" type="button">show all on map</button></div>
  </div><ol class="heritage-trail-list">${jurongHeritageTrail.map((stop) => {
    const featureId = stop.existingId || `nhb-trail-${stop.sharedWith || stop.number}`;
    return `<li><button class="heritage-jump" type="button" data-feature-id="${escapeHtml(featureId)}" data-trail-number="${stop.number}"><b>${stop.number}</b><span>${escapeHtml(stop.name)}</span></button><em>${stop.existingId ? 'Existing map place' : stop.sharedWith ? 'Shared viewpoint' : 'NHB directions point'}</em></li>`;
  }).join('')}</ol><p class="heritage-trail-credit">Accounts are independently summarised from National Heritage Board records; each card links to the full original entry.</p>`;
  document.querySelectorAll('.heritage-jump').forEach((button) => button.addEventListener('click', () => {
    const item = features.find((entry) => entry.id === button.dataset.featureId);
    if (!item?.geometry?.coordinates) return;
    focusedHeritageStop = Number(button.dataset.trailNumber);
    enabledLayers.add('nhb');
    showResearchLeads = true;
    document.getElementById('show-research-leads').checked = true;
    renderLayerControls();
    document.getElementById('timeline').value = '4';
    updateTimeline(4);
    map.setView(item.geometry.coordinates, 15.5);
    selectFeature(item);
    document.getElementById('map').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

document.getElementById('timeline').addEventListener('input', (event) => updateTimeline(event.target.value));
document.addEventListener('click', (event) => {
  if (event.target.id !== 'show-heritage-trail') return;
  enabledLayers.add('nhb');
  showResearchLeads = true;
  document.getElementById('show-research-leads').checked = true;
  renderLayerControls();
  document.getElementById('timeline').value = '4';
  updateTimeline(4);
  map.fitBounds(jurongHeritageTrail.map((stop) => stop.coordinates), { padding: [28, 28], maxZoom: 12 });
  document.getElementById('map').scrollIntoView({ behavior: 'smooth', block: 'center' });
});
document.getElementById('reset-view').addEventListener('click', () => map.setView([1.3375, 103.7285], 15.25));
document.getElementById('play-time').addEventListener('click', (event) => {
  playing = !playing;
  event.currentTarget.setAttribute('aria-pressed', String(playing));
  event.currentTarget.textContent = playing ? 'Pause change' : 'Play change';
  if (playing) {
    if (timeValue >= 4) {
      document.getElementById('timeline').value = '0';
      updateTimeline(0);
    }
    playTimer = window.setInterval(() => {
      const next = timeValue + .015;
      if (next >= 4) { timeValue = 4; updateTimeline(4); playing = false; window.clearInterval(playTimer); event.currentTarget.setAttribute('aria-pressed', 'false'); event.currentTarget.textContent = 'Play change'; return; }
      document.getElementById('timeline').value = next;
      updateTimeline(next);
    }, 65);
  } else if (playTimer) window.clearInterval(playTimer);
});

renderLayerControls();
renderSourceLedger();
renderFacilityRegister();
renderHeritageTrailRegister();
renderFeatures();
externalLayerIds.forEach((id) => ensureExternalLayer(id));
document.getElementById('timeline').value = '2';
updateTimeline(2);
renderPeriodPhotos(2);
window.setTimeout(() => map.invalidateSize(), 250);
