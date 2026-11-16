# iBaila Reverse Engineering

A clean-room investigation and reimplementation workspace for understanding the observable features and architecture of [iBaila](https://aestheticmac.com/ibaila).

**Goal:** build an original desktop application that reproduces selected user-visible capabilities, using documented observations and independently written code. This repository is not affiliated with iBaila or its developers.

## Status

- [x] Repository initialized
- [x] REA workflow reviewed
- [ ] Acquire and verify an authorized iBaila installer/build
- [ ] Record target version, platform, hashes, and provenance
- [ ] Perform static application inventory with REA
- [ ] Capture user-visible behavior and runtime observations
- [ ] Write evidence-backed feature specifications
- [ ] Implement the first independent MVP
- [ ] Test and document compatibility gaps

No reverse-engineering findings are claimed yet. Findings must cite the artifact, observation, or test that supports them.

## Approach

1. **Identify the target.** Record the exact installer/build, version, platform, source URL, file hash, and acquisition date.
2. **Inventory before execution.** Identify the package format, runtime, bundled assets, JavaScript/Electron modules, native add-ons, and metadata.
3. **Observe behavior.** Test one feature at a time with controlled inputs and record screenshots, logs, and expected/actual results.
4. **Trace implementation paths.** Use REA's application graph and feature tracing where the target format is supported.
5. **Specify, then build.** Convert verified observations into independent feature specs and tests. Do not copy proprietary source, assets, branding, or credentials.
6. **Track uncertainty.** Label facts as observed, inferred, or unknown. Never present an inference as a confirmed implementation detail.

## REA setup

REA is a separate reverse-engineering toolkit. Follow its official instructions:

- Source: [morluto/rea](https://github.com/morluto/rea)
- Quick start: `npx rea-agents setup`
- Application workflow guide: [JavaScript application workflows](https://github.com/morluto/rea/blob/main/docs/guides/javascript/javascript-application-workflows.md)

REA's README currently lists Node.js 22.x (>=22.23.4), 24.x (>=24.22.1), or 26.12.1+ with npm. Check the upstream installation guide for current platform-specific prerequisites before setup. Review and approve setup changes yourself.

For an extracted JavaScript/Electron application or ASAR, the documented CLI pattern is:

```powershell
npx -y rea-agents@latest analyze-javascript-application "D:\\path\\to\\extracted\\app" --json
```

Use the actual authorized target path. Do not run an unknown installer or executable just to discover what it contains. Prefer static inventory first; runtime testing should use a disposable VM or Windows Sandbox where practical.

## Project layout

```text
.
├── README.md
├── docs/
│   ├── RECONNAISSANCE.md
│   └── FINDINGS_TEMPLATE.md
├── evidence/
│   └── .gitkeep
├── target/
│   └── target-profile.json
└── .gitignore
```

## Evidence rules

- Keep original target artifacts out of Git unless redistribution is explicitly permitted.
- Do not commit license keys, tokens, personal data, private logs, or account credentials.
- Store hashes and metadata in `target/target-profile.json`; store sanitized observations under `evidence/`.
- Screenshots and recordings should avoid personal notifications and account details.
- Every finding should include a confidence level and a reproducible verification step.

## License

The original code and documentation in this repository are provided under the MIT License. This does not grant rights to iBaila, its trademarks, binaries, artwork, or other third-party material.
