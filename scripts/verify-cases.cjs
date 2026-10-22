const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const code = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const research = fs.readFileSync(path.join(root, 'case-research.js'), 'utf8');
const publicResearchCode = fs.readFileSync(path.join(root, 'public-research.js'), 'utf8');
const atlasCode = fs.readFileSync(path.join(root, 'atlas-articles.js'), 'utf8');
const placeResearchCode = fs.readFileSync(path.join(root, 'place-research.js'), 'utf8');
const heritageCode = fs.readFileSync(path.join(root, 'heritage-trail.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const publishedAppAsset = html.match(/<script src="(app-[a-f0-9]{8}\.js)"><\/script>/)?.[1];
assert(publishedAppAsset, 'Page must load a versioned app asset');
assert.equal(fs.readFileSync(path.join(root, publishedAppAsset), 'utf8'), code, 'Published versioned asset must match app.js');
const brochureAudit = JSON.parse(fs.readFileSync(path.join(root, 'data', 'brochure-point-audit.json'), 'utf8'));
assert(!html.includes('layer-atlas') && !code.includes('renderLayerProfiles'));
assert(html.indexOf('case-research.js') < html.indexOf(publishedAppAsset));
assert(html.indexOf('case-research.js') < html.indexOf('public-research.js') && html.indexOf('public-research.js') < html.indexOf('atlas-articles.js') && html.indexOf('atlas-articles.js') < html.indexOf('place-research.js') && html.indexOf('place-research.js') < html.indexOf(publishedAppAsset));
assert(html.indexOf('heritage-trail.js') > html.indexOf('place-research.js') && html.indexOf('heritage-trail.js') < html.indexOf(publishedAppAsset));
assert(!html.includes('<b>Spatial audit.</b>'));
assert(html.includes('Show research anchors'));
assert(code.includes("group('Research lenses'") && code.includes("group('Named plan records'") && code.includes("group('Current reference data'"), 'Layer controls must distinguish lenses, named records and reference data');
const preMap = code.slice(0, code.indexOf('const navigationBounds ='));
const helpers = code.slice(code.indexOf('const escapeHtml ='), code.indexOf('function buildHoverCard'));
const renderers = code.slice(code.indexOf('function renderFeatureSource'), code.indexOf('function spatialBadgeLabel'));
const context = vm.createContext({ console });
vm.runInContext(research + '\n' + publicResearchCode + '\n' + atlasCode + '\n' + placeResearchCode + '\n' + heritageCode + '\n' + preMap + '\n' + helpers + '\nlet focusedHeritageStop = null;\n' + renderers + '\nthis.result = {features, sources, caseResearch, publicResearch, publicReference, atlasArticles, placeResearch, caseDossierFor, relatedSourcesFor, renderEvidenceStory, renderHeritageTrailCard, googleMapsLink, googleMapsLinkKind};', context);
const { features, sources, caseResearch, publicResearch, publicReference, atlasArticles, placeResearch, caseDossierFor, relatedSourcesFor, renderEvidenceStory, googleMapsLink, googleMapsLinkKind } = context.result;
assert.equal(features.filter(item => item.id.startsWith('nhb-trail-')).length, 22, 'NHB trail should add 22 markers after deduplication');
assert.equal(features.filter(item => item.heritageTrailStops).reduce((count, item) => count + item.heritageTrailStops.length, 0), 25, 'All 25 stops must be reachable through a map card');
assert(features.find(item => item.id === 'chinese-garden').heritageTrailStops[0].number === 17);
assert(features.find(item => item.id === 'japanese-garden').heritageTrailStops[0].number === 18);
assert(features.find(item => item.id === 'nhb-trail-8').heritageTrailStops.length === 2, 'Jurong Hill and port viewpoint should share one marker');
assert(context.result.renderHeritageTrailCard(features.find(item => item.id === 'nhb-trail-1')).includes('Read the full NHB account'));
assert(context.result.renderHeritageTrailCard(features.find(item => item.id === 'nhb-trail-20')).includes('closed on 3 January 2023'));
for (const [id, article] of Object.entries(atlasArticles)) {
  assert(caseResearch.cases[id] || /^facilities-[cjl]\d+$/.test(id), `${id}: article has no recognized place identity`);
  assert(article.sections.length >= 2, `${id}: no substantial article sections`);
  assert(article.audit.findings.length === 3, `${id}: editorial acceptance findings missing`);
  for (const section of article.sections) for (const paragraph of section.paragraphs) {
    assert(paragraph.refs.length, `${id}: uncited article paragraph`);
    paragraph.refs.forEach((key) => assert(sources[key]?.apa, `${id}: missing citation ${key}`));
  }
}
let caseCount = 0;
let sections = 0;
let citationCount = 0;
for (const [id, dossier] of Object.entries(caseResearch.cases)) {
  assert(dossier.sections.length >= 3, id);
  assert(dossier.sections.some(s => s.kind === 'record'), id);
  assert(dossier.sections.some(s => s.kind === 'interpretation'), id);
  assert(dossier.sections.some(s => s.kind === 'gap'), id);
  for (const section of dossier.sections) {
    assert(section.text.length >= 100, `${id}: empty/shallow section`);
    if (section.kind === 'record') assert(section.refs.length, `${id}: uncited record`);
    for (const sourceId of section.refs) {
      assert(sources[sourceId], `${id}: missing ${sourceId}`);
      assert(/^https:\/\//.test(sources[sourceId].url), sourceId);
      assert(sources[sourceId].apa && sources[sourceId].date, sourceId);
      citationCount++;
    }
    sections++;
  }
  caseCount++;
}
for (const [id, story] of Object.entries(publicResearch)) {
  assert(caseResearch.cases[id], `${id}: no archived evidence record`);
  assert(story.length, `${id}: empty public case`);
  for (const section of story) {
    assert(section.title && section.text.length > 80 && section.refs.length, `${id}: insufficient edited finding`);
    section.refs.forEach(ref => assert(sources[ref]?.apa, `${id}: missing cited source ${ref}`));
  }
}
assert.equal(Object.keys(publicResearch).length + Object.keys(publicReference).length, Object.keys(caseResearch.cases).length, 'Every archived case needs exactly one public editorial status');
for (const [id, section] of Object.entries(publicReference)) {
  assert(caseResearch.cases[id] && !publicResearch[id], `${id}: invalid reference classification`);
  assert(section.text && section.refs.length, `${id}: missing concise evidence`);
  section.refs.forEach(ref => assert(sources[ref]?.apa, `${id}: missing reference source ${ref}`));
}
for (const item of features) {
  const dossier = caseDossierFor(item);
  if (item.id.startsWith('nhb-trail-')) {
    assert.equal(dossier, null, `${item.id}: trail reference must not inherit an unrelated deep case`);
    assert(item.heritageTrailStops.every(stop => sources[`nhbTrail${stop.number}`]?.url.endsWith(stop.path)));
    continue;
  }
  if (['ecology', 'engineered', 'heritage', 'governance', 'public', 'hidden'].includes(item.layer)) assert(dossier, `${item.id}: no deep case`);
  if (!dossier) continue;
  const bibliography = new Set(relatedSourcesFor(item).map(source => source.url));
  dossier.sections.forEach(section => section.refs.forEach(id => assert(bibliography.has(sources[id].url), `${item.id}: truncated reference ${id}`)));
  const rendered = renderEvidenceStory(item);
  assert(rendered.includes(dossier.featured ? 'Place story' : 'Place record'), item.id);
  assert(!rendered.includes('Research limit') && !rendered.includes('Question for this place'), item.id);
  assert(!rendered.includes('undefined'), item.id);
}
assert(features.filter(item => item.layer === 'facilities').some(item => !caseDossierFor(item)), 'Ordinary facilities should not inherit fabricated research questions');
for (const name of ['Stoneboat', 'Freshwater Swamp', 'The Lone Tree', 'Floral Garden']) {
  const item = features.find(feature => feature.name === name && feature.layer === 'facilities');
  assert(item && caseDossierFor(item).featured, `${name}: missing authored place study`);
  const cited = new Set(relatedSourcesFor(item).map(source => source.key));
  caseDossierFor(item).sections.forEach(section => section.refs.forEach(id => assert(cited.has(id), `${name}: missing cited reference ${id}`)));
}
assert.equal(caseDossierFor(features.find(item => item.name === 'Cleansing Biotope')), null, 'Cleansing Biotope must not inherit a broad Clusia Cove narrative before its own research pass');
assert(caseDossierFor(features.find(item => item.id === 'former-fish-ponds')).featured);
assert(atlasArticles['facilities-c5'].sections.flatMap(section => section.paragraphs).some(paragraph => paragraph.text.includes('Registrar of Marriages')));
const livingLabStory = renderEvidenceStory(features.find(item => item.id === 'living-lab-governance'));
const livingLabArticleText = atlasArticles['living-lab-governance'].sections.flatMap(section => section.paragraphs).map(paragraph => paragraph.text).join(' ');
assert(livingLabStory.includes('Case study'), 'Living Lab must render as an accepted case study');
assert(livingLabStory.includes('The 2019 brief reveals the work technology was meant to replace'), 'Living Lab must render the full article inline');
assert(livingLabArticleText.includes('smart bins with capacity sensors'), 'Living Lab must identify actual monitored systems');
assert(livingLabArticleText.includes('11-seat autonomous vehicle'), 'Living Lab must preserve the dated mobility trial');
assert(livingLabArticleText.includes('Ngee Ann Polytechnic, IMDA and Xjera Labs'), 'Living Lab must identify robot-trial participants');
assert(renderEvidenceStory(features.find(item => item.name === 'Floral Garden')).includes('24 April 2024'));
assert(renderEvidenceStory(features.find(item => item.name === 'The Lone Tree')).includes('Lao Gao'));
for (const name of ['Floral Garden', 'The Lone Tree', 'Water Lily Garden', 'Guesthouse', 'Sunken Garden', 'Edible Garden', 'Stoneboat', 'Bonsai Garden', 'Cascading Creek']) {
  const item = features.find(feature => feature.layer === 'facilities' && feature.name === name);
  const expectedLabel = name === 'Stoneboat' ? 'Case study' : 'Expanded research draft';
  const rendered = renderEvidenceStory(item);
  assert(rendered.includes(expectedLabel), `${name}: article state is not labelled honestly`);
  assert(!rendered.includes('data-open-article'), `${name}: long-form content must not require a second click`);
  const dossier = caseDossierFor(item);
  const article = atlasArticles[dossier.articleId || dossier.id];
  const bibliography = new Set(relatedSourcesFor(item).map(source => source.url));
  for (const section of article.sections) for (const paragraph of section.paragraphs) for (const key of paragraph.refs)
    assert(bibliography.has(sources[key].url), `${name}: article citation ${key} absent from references`);
}
assert(!renderEvidenceStory(features.find(item => item.name === 'Water Lily Pavilion')).includes('Case study'), 'Pavilion must not inherit the Water Lily Garden article');
assert(!renderEvidenceStory(features.find(item => item.name === 'Water Lily Pavilion')).includes('Expanded research draft'), 'Pavilion must not inherit the Water Lily Garden draft');
const japanesePlaceIds = Array.from({ length: 11 }, (_, index) => `facilities-j${index + 1}`);
const japaneseTexts = new Set();
for (const id of japanesePlaceIds) {
  const item = features.find(feature => feature.id === id);
  const dossier = caseDossierFor(item);
  assert(placeResearch[id], `${id}: missing direct place research`);
  assert.equal(dossier.id, id, `${id}: inherited another place identity`);
  const text = dossier.sections.map(section => `${section.title} ${section.text}`).join(' ');
  assert(!japaneseTexts.has(text), `${id}: duplicated another Japanese Garden record`);
  japaneseTexts.add(text);
}
assert(renderEvidenceStory(features.find(item => item.id === 'facilities-j2')).includes('tatami'), 'Teahouse must explain its three tea settings');
assert(renderEvidenceStory(features.find(item => item.id === 'facilities-j5')).includes('250'), 'Guest Pavilion must retain its own venue specification');
assert(renderEvidenceStory(features.find(item => item.id === 'facilities-j7')).includes('Ng Cheng Huat'), 'Resthouse must include its documented user account');
assert(renderEvidenceStory(features.find(item => item.id === 'facilities-j8')).includes('seasonally'), 'Floral Ridge must remain a concise evidence-led entry');
assert(renderEvidenceStory(features.find(item => item.id === 'facilities-j11')).includes('Iwagumi'), 'Breathing Gallery must explain its aquascaping content');
const chinesePlaceIds = Array.from({ length: 13 }, (_, index) => `facilities-c${index + 1}`);
const chineseTexts = new Set();
for (const id of chinesePlaceIds) {
  const item = features.find(feature => feature.id === id);
  const dossier = caseDossierFor(item);
  assert(placeResearch[id], `${id}: missing direct place research`);
  assert.equal(dossier.id, id, `${id}: inherited another place identity`);
  const text = dossier.sections.map(section => `${section.title} ${section.text}`).join(' ');
  assert(!chineseTexts.has(text), `${id}: duplicated another Chinese Garden record`);
  chineseTexts.add(text);
}
assert(renderEvidenceStory(features.find(item => item.id === 'facilities-c2')).includes('Expanded research draft'), 'Edible Garden needs its own expanded draft');
const stoneboatStory = renderEvidenceStory(features.find(item => item.id === 'facilities-c5'));
const stoneboatArticleText = atlasArticles['facilities-c5'].sections.flatMap(section => section.paragraphs).map(paragraph => paragraph.text).join(' ');
assert(stoneboatStory.includes('Case study'), 'Stoneboat must be the first accepted deep case study');
assert(stoneboatStory.includes('What Stoneboat reveals about the garden'), 'Stoneboat must render the complete article inline');
assert(stoneboatArticleText.includes('27 June 1982'), 'Stoneboat needs its dated marriage-registry evidence');
assert(stoneboatArticleText.includes('23.5-by-8.5-metre'), 'Stoneboat needs its documented internal dimensions');
assert(stoneboatArticleText.includes('Yu Yuen-Chen'), 'Stoneboat must situate the building in the documented garden design');
assert(renderEvidenceStory(features.find(item => item.id === 'facilities-c8')).includes('Expanded research draft'), 'Bonsai Garden needs its own expanded draft');
assert(renderEvidenceStory(features.find(item => item.id === 'facilities-c9')).includes('shuttle'), 'Pagoda Plaza needs its current access role');
assert(renderEvidenceStory(features.find(item => item.id === 'facilities-c13')).includes('without transferring'), 'Cascade Pavilion must not inherit the creek ecology');
const namedRecords = features.filter(item => ['ecology', 'engineered', 'heritage', 'governance', 'public', 'hidden', 'facilities', 'amenities'].includes(item.layer));
assert.equal(namedRecords.length, 110, 'Named-place inventory must include thematic, facility, amenity and deduplicated trail records');
assert.equal(new Set(namedRecords.map(item => item.id)).size, 110, 'Named-place identifiers must remain unique');
for (const item of namedRecords) {
  assert(item.name && item.source?.url?.startsWith('https://'), `${item.id}: missing name or map provenance`);
  if (item.purposeSource) assert(item.purposeSource.url.startsWith('https://'), `${item.id}: missing purpose provenance`);
}
assert(renderEvidenceStory(features.find(item => item.name === 'Grand Arch')).includes('Place record'));
assert(renderEvidenceStory(features.find(item => item.name === 'Tea Pavilion')).includes('three pavilions'), 'Tea Pavilion needs its own built-form record');
assert(!renderEvidenceStory(features.find(item => item.name === 'Tea Pavilion')).includes('Registrar of Marriage'), 'Tea Pavilion must not inherit Stoneboat civic history');
assert.equal(features.find(item => item.name === 'Stoneboat').details[0].label, 'Internal feature ID');
assert.equal(features.find(item => item.name === 'Stoneboat').details[1].value, '5');
assert.equal(features.find(item => item.id === 'living-lab-governance').source.key, 'nparksSmart');
assert(caseDossierFor(features.find(item => item.id === 'therapeutic-garden')).referenceOnly, 'Thin evidence should remain a reference entry');

const japaneseGarden = features.find(item => item.id === 'japanese-garden');
assert.equal(japaneseGarden.from, 1.5, 'Japanese Garden must remain midway between the 1971 and 1975 states at its documented 1973 opening');
assert.deepEqual(Array.from(japaneseGarden.geometry.coordinates), [1.3352024, 103.7313538]);
assert(japaneseGarden.spatialAudit.basis.includes('OBJECTID_1 170509'));
assert(!japaneseGarden.spatialAudit.basis.includes('Floral Garden'));
assert(japaneseGarden.spatialAudit.sources.some(source => source.key === 'nhbJapanese'));
assert.deepEqual(Array.from(features.find(item => item.id === 'jurong-lake').geometry.coordinates), [1.3419207, 103.7265501]);
assert.deepEqual(Array.from(features.find(item => item.id === 'lakeside-garden').geometry.coordinates), [1.3349528, 103.7264515]);
const loneTree = features.find(item => item.id === 'lone-tree-memory');
assert.deepEqual(Array.from(loneTree.geometry.coordinates), [1.33256, 103.72764]);
assert(loneTree.relatedSources.some(source => source.key === 'osmLoneTree'));
assert(code.includes('verifiedGoogleMapsPlaces'));
assert(code.includes('query_place_id=${encodeURIComponent(record.placeId)}'));
assert(code.includes("'verified-place-url'"));
assert(code.includes("'unresolved'"));
assert(code.includes('Floral+Garden/@1.3350755,103.72955'));
assert(code.includes('Guesthouse/@1.3375,103.7285'));
assert(code.includes('ChIJRbJiD-cP2jERkXkR2OZh8hI'));
assert(code.includes("verifiedGoogleMapsPlaces[item.id]"));
assert(code.includes('query=${encodeURIComponent(`${lat.toFixed(7)},${lng.toFixed(7)}`)}'));
assert(code.includes('if (!item.name)'), 'Coordinate fallback is restricted to unnamed records');
['former-fish-ponds', 'freshwater-swamp', 'forest-ramble', 'therapeutic-garden'].forEach(id => {
  const item = features.find(feature => feature.id === id);
  assert.equal(item.mapDisplay, 'source-only', `${id} must remain source-only until re-georeferenced`);
  assert.equal(item.geometry, null, `${id} must not expose a rejected coordinate`);
});
const planRecords = features.filter(item => ['facilities', 'amenities'].includes(item.layer));
assert.equal(planRecords.length, 67, '53 brochure attractions and 14 named amenities');
assert(planRecords.every(item => ['ecology', 'engineered', 'heritage', 'governance', 'public', 'hidden'].includes(item.primaryLens)), 'Every numbered place needs one interpretive lens');
assert.equal(new Set(planRecords.map(item => item.primaryLens)).size, 6, 'All six thematic lenses should have numbered places');
assert.equal(features.find(item => item.id === 'facilities-j1').primaryLens, 'ecology');
assert.equal(features.find(item => item.id === 'facilities-l8').primaryLens, 'engineered');
assert.equal(features.find(item => item.id === 'facilities-l23').primaryLens, 'hidden');
assert.equal(features.find(item => item.id === 'amenities-p-n').primaryLens, 'governance');
assert.equal(features.find(item => item.id === 'amenities-f1').primaryLens, 'public');
assert(code.includes('enabledLayers.has(item.primaryLens)'), 'Thematic layer controls must filter numbered places');
assert(code.includes('function isFeatureVisible(item)'), 'Layer visibility must have one audited decision point');
assert(code.includes("return enabledLayers.has(item.layer) || enabledLayers.has(item.primaryLens);"), 'Named records must be reachable by either their collection or their research lens');
assert(code.includes('function enableFeatureVisibility(item)') && code.includes('enabledLayers.add(item.primaryLens || item.layer)'), 'List navigation must reveal the place through its assigned research lens');
const visibilityContext = vm.createContext({ enabledLayers: new Set(['ecology']) });
vm.runInContext(code.slice(code.indexOf('function isFeatureVisible(item)'), code.indexOf('function renderLayerControls()')), visibilityContext);
assert.equal(visibilityContext.isFeatureVisible({ layer: 'facilities', primaryLens: 'ecology' }), true, 'An Ecology lens must reveal Ecology-tagged facility records after Clear all');
assert.equal(visibilityContext.isFeatureVisible({ layer: 'facilities', primaryLens: 'heritage' }), false, 'A thematic lens must not reveal unrelated facility records');
visibilityContext.enabledLayers = new Set(['facilities']);
assert.equal(visibilityContext.isFeatureVisible({ layer: 'facilities', primaryLens: 'heritage' }), true, 'Facilities must still provide the full named-record overview');
assert(code.includes('class="facility-jump"') && code.includes('class="facility-code"'), 'List navigation must retain map codes');
assert(code.includes("selectedFeatureId === item.id ? 'selected' : ''"), 'Selected list destination must highlight its marker');
assert(styles.includes('.plan-marker.selected { outline: 5px solid'), 'Selected marker ring must be five pixels wide');
const registerMarkup = { innerHTML: '' };
context.document = { getElementById: () => registerMarkup, querySelectorAll: () => [] };
vm.runInContext(code.slice(code.indexOf('function renderFacilityRegister()'), code.indexOf("document.getElementById('timeline').addEventListener")), context);
vm.runInContext('renderFacilityRegister()', context);
assert(registerMarkup.innerHTML.includes('class="facility-code">C1</b> Grand Arch'), 'Mapped facilities retain their brochure code');
assert(registerMarkup.innerHTML.includes('class="facility-code">F1</b> Fusion Spoon'), 'Named amenities retain their brochure code');
assert.equal((registerMarkup.innerHTML.match(/class="facility-jump"/g) || []).length, 65, 'Each audited point needs one direct list action');
assert(registerMarkup.innerHTML.includes('Drop-off point'), 'Unnumbered brochure symbols must not break the register');
assert(registerMarkup.innerHTML.includes('facility-group--lakeside-garden'), 'Lakeside Garden needs the wide desktop register layout');
assert(styles.includes('.facility-group--lakeside-garden ul, .amenities-group > ul { grid-template-columns: repeat(3'), 'Wide facility groups need three desktop columns');
assert.equal(sources.nhbJurongTrail.url, 'https://www.roots.gov.sg/places/places-landing/trails/jurong-heritage-trail', 'Archive reference must use the stable official trail page');
assert(!code.includes('jurong-booklet-6-june.pdf'), 'Retired Roots PDF direct link must not remain in the application');
const osmContext = vm.createContext({ externalLayerDefinitions: { amenities_ref: { title: 'OpenStreetMap amenity reference points', source: sources.osmReference } } });
vm.runInContext(code.slice(code.indexOf('function externalFeatureDetails('), code.indexOf('function externalStyle(')), osmContext);
const unnamedAmenity = vm.runInContext("externalFeatureItem('amenities_ref', { properties: { amenity: 'drinking_water', osm_id: 6775028763 }, geometry: { type: 'Point', coordinates: [103.7282713, 1.3360629] } }, 18)", osmContext);
assert.equal(unnamedAmenity.displayTitle, 'drinking water');
assert.equal(unnamedAmenity.name, 'drinking water', 'Amenity tag becomes the readable title');
assert.equal(unnamedAmenity.rawProperties.osm_id, 6775028763, 'Original identifier remains accessible');
assert.equal(unnamedAmenity.recordType, 'gis-reference');
const namedAmenity = vm.runInContext("externalFeatureItem('amenities_ref', { properties: { amenity: 'shelter', name: 'Garden shelter', osm_id: 123 }, geometry: { type: 'Point', coordinates: [103.7282713, 1.3360629] } }, 0)", osmContext);
assert.equal(namedAmenity.displayTitle, 'Garden shelter');
vm.runInContext(code.slice(code.indexOf('const datasetInformation ='), code.indexOf('const externalLayerState =')) + '\n' + code.slice(code.indexOf('function spatialBadgeLabel'), code.indexOf('function selectFeature')), context);
context.selectedGISObject = namedAmenity;
const gisCard = vm.runInContext('renderGISFeatureCard(selectedGISObject)', context);
assert(gisCard.includes('Garden shelter') && gisCard.includes('OpenStreetMap reference') && gisCard.includes('All source attributes'), 'A real selected OSM object needs a readable reference card');
assert.equal(namedAmenity.displaySubtitle, 'Amenity: shelter');
assert.equal((code.match(/escapeHtml\(item\.displayTitle \|\| item\.name\)/g) || []).length, 1, 'Hover card keeps the readable title');
assert(code.includes('?.name || item.displayTitle || item.name'), 'Evidence panel shows the selected heritage stop on a shared viewpoint');
assert(styles.includes('.feature-place-name') && styles.includes('.map-hover-name'), 'Original names need a second line in both cards');
assert(code.includes("item.spatialStatus === 'open-reference' ? 'OpenStreetMap source' : 'official source'"), 'Community data must not be labelled as an official source');
const mappedPlanRecords = planRecords.filter(item => item.spatialStatus === 'plan-derived');
const unresolvedPlanRecords = planRecords.filter(item => item.spatialStatus === 'quarantined');
assert.equal(mappedPlanRecords.length, 65, '65 audited current anchors should be visible');
assert(mappedPlanRecords.every(item => item.geometry?.coordinates?.every(Number.isFinite)), 'Mapped points need finite coordinates');
assert.deepEqual(Array.from(unresolvedPlanRecords, item => item.mapCode).sort(), ['J11', 'L20']);
assert(unresolvedPlanRecords.every(item => item.geometry === null && item.mapDisplay === 'source-only'));
assert.equal(brochureAudit.points.length, 53);
assert(brochureAudit.meanFitResidualMetres < 20);
assert(brochureAudit.meanLeaveOneOutMetres < 50);
for (const point of brochureAudit.points) {
  const feature = features.find(item => item.id === `facilities-${point.code.toLowerCase()}`);
  assert(feature, point.code);
  if (!['C1', 'L23', 'J11', 'L20'].includes(point.code)) assert.deepEqual(Array.from(feature.geometry.coordinates), point.coordinate, `${point.code}: diverged from reproducible brochure audit`);
}
assert.deepEqual(Array.from(features.find(item => item.id === 'amenities-f1').geometry.coordinates), Array.from(features.find(item => item.id === 'facilities-l4').geometry.coordinates));
assert.deepEqual(Array.from(features.find(item => item.id === 'amenities-f4').geometry.coordinates), Array.from(features.find(item => item.id === 'facilities-c1').geometry.coordinates));
assert(code.includes("['facilities', 'amenities'].includes(item.layer) || item.id === 'access-network'"), 'Named POIs without a verified Google Maps record are explicitly unresolved rather than sent to a coordinate page');
const floralGarden = features.find(item => item.id === 'facilities-j1');
const guesthouse = features.find(item => item.id === 'facilities-j4');
const lakesideMrt = features.find(item => item.id === 'amenities-m-l');
assert(relatedSourcesFor(lakesideMrt).every(source => source.key && source.date && source.apa), 'MRT source entries require complete citations');
const unresolvedTeahouse = features.find(item => item.id === 'facilities-j2');
assert.equal(googleMapsLinkKind(floralGarden), 'verified-place-url');
assert(googleMapsLink(floralGarden).includes('/maps/place/Floral+Garden/'));
assert.equal(googleMapsLinkKind(guesthouse), 'verified-place-url');
assert(googleMapsLink(guesthouse).includes('/maps/place/Guesthouse/'));
assert.equal(googleMapsLinkKind(lakesideMrt), 'place-id');
assert(googleMapsLink(lakesideMrt).includes('query_place_id=ChIJRbJiD-cP2jERkXkR2OZh8hI'));
assert.equal(googleMapsLinkKind(unresolvedTeahouse), 'name-search');
assert(googleMapsLink(unresolvedTeahouse).includes('query=Teahouse%2C%20Japanese%20Garden%2C%20Jurong%20Lake%20Gardens%2C%20Singapore'));
const lakesideGarden = features.find(item => item.id === 'lakeside-garden');
assert.equal(googleMapsLinkKind(lakesideGarden), 'name-search');
assert(googleMapsLink(lakesideGarden).includes('query=Lakeside%20Garden%2C%20Jurong%20Lake%20Gardens%2C%20Singapore'));
assert(!googleMapsLink(lakesideGarden).includes('1.3349528%2C103.7264515'), 'Named places must not use coordinate-only links');
assert(code.includes("item.spatialStatus !== 'quarantined'") && !code.includes('bindTooltip(`${item.name} · plan-derived provisional position`'), 'Only audited plan anchors may be drawn');
assert(code.includes('map.removeLayer(provisionalLocator)'), 'Temporary locator is removed independently of permanent feature groups');
assert(code.includes("if (timeValue >= 4) {\n      document.getElementById('timeline').value = '0';"), 'Play change should restart from the historical beginning after 2024');
assert(!code.includes('point.navigationCoordinate'), 'Rejected legacy coordinates must not drive list navigation');
assert.equal(features.find(item => item.id === 'floral-community-plots').mapDisplay, 'source-only');
assert(code.includes('properties.OBJECTID_1 ?? index'), 'NParks features need stable OBJECTID_1 IDs');
assert(code.includes('featureBelongsToExternalLayer'), 'OSM application categories must not depend on the numeric vertical layer tag');
assert(code.includes('featureIndexes.get(feature)'), 'External fallback labels and IDs need per-feature indexes');
console.log(JSON.stringify({pass:true, archivedCaseDossiers:caseCount, publicStories:Object.keys(publicResearch).length, conciseReferences:Object.keys(publicReference).length, archivedSections:sections, paragraphCitations:citationCount, thematicCases:features.filter(item => ['ecology','engineered','heritage','governance','public','hidden'].includes(item.layer)).length, facilitiesWithCaseAnalysis:features.filter(item => item.layer==='facilities' && caseDossierFor(item)).length, mappedPlanRecords:mappedPlanRecords.length, unresolvedPlanRecords:unresolvedPlanRecords.map(item => item.mapCode), brochureControlMeanResidualMetres:brochureAudit.meanFitResidualMetres, japaneseGardenAnchor:japaneseGarden.geometry.coordinates}, null, 2));
