const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const snapshotPaths = [
  'data/osm-jlg.geojson',
  'data/nparks-jlg.geojson',
  'data/ura-water-jlg.geojson'
];

const snapshots = Object.fromEntries(snapshotPaths.map((relativePath) => [
  relativePath,
  JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'))
]));

const output = [
  '/* Generated from the three checked-in GeoJSON snapshots. Do not edit by hand. */',
  `window.jlgReferenceSnapshots = ${JSON.stringify(snapshots)};`,
  ''
].join('\n');

fs.writeFileSync(path.join(root, 'reference-snapshots.js'), output, 'utf8');
