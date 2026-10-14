const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const code = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const research = fs.readFileSync(path.join(root, 'case-research.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const brochureAudit = JSON.parse(fs.readFileSync(path.join(root, 'data', 'brochure-point-audit.json'), 'utf8'));
assert(!html.includes('layer-atlas') && !code.includes('renderLayerProfiles'));
assert(html.indexOf('case-research.js') < html.indexOf('app.js'));
assert(!html.includes('<b>Spatial audit.</b>'));
assert(html.includes('Show research markers'));
const preMap = code.slice(0, code.indexOf('const navigationBounds ='));
const helpers = code.slice(code.indexOf('const escapeHtml ='), code.indexOf('function buildHoverCard'));
const renderers = code.slice(code.indexOf('function renderFeatureSource'), code.indexOf('function spatialBadgeLabel'));
const context = vm.createContext({ console });
vm.runInContext(research + '\n' + preMap + '\n' + helpers + '\n' + renderers + '\nthis.result = {features, sources, caseResearch, caseDossierFor, relatedSourcesFor, renderEvidenceStory, googleMapsLink, googleMapsLinkKind};', context);
const { features, sources, caseResearch, caseDossierFor, relatedSourcesFor, renderEvidenceStory, googleMapsLink, googleMapsLinkKind } = context.result;
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
for (const item of features) {
  const dossier = caseDossierFor(item);
  if (['ecology', 'engineered', 'heritage', 'governance', 'public', 'hidden'].includes(item.layer)) assert(dossier, `${item.id}: no deep case`);
  if (!dossier) continue;
  const bibliography = new Set(relatedSourcesFor(item).map(source => source.url));
  dossier.sections.forEach(section => section.refs.forEach(id => assert(bibliography.has(sources[id].url), `${item.id}: truncated reference ${id}`)));
  const rendered = renderEvidenceStory(item);
  assert(rendered.includes('In-depth case analysis'), item.id);
  assert(!rendered.includes('undefined'), item.id);
}
assert(features.filter(item => item.layer === 'facilities').every(item => caseDossierFor(item)));
assert.equal(features.find(item => item.id === 'living-lab-governance').source.key, 'nparksSmart');
assert(renderEvidenceStory(features.find(item => item.id === 'therapeutic-garden')).includes('not a claim that visiting treats dementia'));

const japaneseGarden = features.find(item => item.id === 'japanese-garden');
assert.equal(japaneseGarden.from, 2.5, 'Japanese Garden must enter the timeline at its documented 1973 opening');
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
assert(planRecords.every(item => item.spatialStatus === 'plan-derived' && item.geometry?.coordinates?.every(Number.isFinite)), 'Each plan record needs a finite audited anchor');
assert.equal(brochureAudit.points.length, 53);
assert(brochureAudit.meanFitResidualMetres < 20);
assert(brochureAudit.meanLeaveOneOutMetres < 50);
for (const point of brochureAudit.points) {
  const feature = features.find(item => item.id === `facilities-${point.code.toLowerCase()}`);
  assert(feature, point.code);
  if (!['C1', 'L23'].includes(point.code)) assert.deepEqual(Array.from(feature.geometry.coordinates), point.coordinate, `${point.code}: diverged from reproducible brochure audit`);
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
assert(!code.includes('point.navigationCoordinate'), 'Rejected legacy coordinates must not drive list navigation');
assert.equal(features.find(item => item.id === 'floral-community-plots').mapDisplay, 'source-only');
assert(code.includes('properties.OBJECTID_1 ?? index'), 'NParks features need stable OBJECTID_1 IDs');
assert(code.includes('featureBelongsToExternalLayer'), 'OSM application categories must not depend on the numeric vertical layer tag');
assert(code.includes('featureIndexes.get(feature)'), 'External fallback labels and IDs need per-feature indexes');
console.log(JSON.stringify({pass:true, authoredCaseDossiers:caseCount, authoredSections:sections, paragraphCitations:citationCount, thematicCases:features.filter(item => ['ecology','engineered','heritage','governance','public','hidden'].includes(item.layer)).length, facilitiesWithCaseAnalysis:features.filter(item => item.layer==='facilities' && caseDossierFor(item)).length, mappedPlanRecords:planRecords.length, brochureControlMeanResidualMetres:brochureAudit.meanFitResidualMetres, japaneseGardenAnchor:japaneseGarden.geometry.coordinates}, null, 2));

