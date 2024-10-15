/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ["main"],
  ci: false,
  plugins: [
    "@semantic-release/commit-analyzer",

    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        changelogFile: "docs/CHANGELOG.md",
      },
    ],
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
        tarballDir: "dist",
      },
    ],
    "@semantic-release/github",
  ],
};
