export function assertNode26() {
  const major = Number.parseInt(process.versions.node, 10);
  if (major !== 26) {
    console.error(
      `Node.js 26 is required. Current version is ${process.versions.node}.`,
    );
    process.exit(1);
  }
}

export function node26Report() {
  assertNode26();

  const features = new Map();
  features.getOrInsert("temporal", "enabled");
  features.getOrInsert("map.getOrInsert", "enabled");

  return {
    node: process.versions.node,
    startedAt: Temporal.Now.instant().toString(),
    features: Object.fromEntries(features),
  };
}

if (process.argv[1]?.endsWith("assert-node26.mjs")) {
  assertNode26();
}
