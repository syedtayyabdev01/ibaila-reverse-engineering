# Reconnaissance plan

## Objective

Understand the behavior and technical boundaries of iBaila well enough to write an independent implementation of selected features. This plan deliberately separates evidence from hypotheses.

## Phase 0 — target identity

Before analysis, record:

- Exact product name and version shown by the installer/app
- Target OS and architecture
- Official download/source URL and acquisition date
- Installer filename, byte size, and SHA-256
- Package type (for example: MSI, EXE, MSIX, DMG, ZIP, ASAR)
- Whether the build is signed, and signer/publisher details if present
- Any account, subscription, or online-service requirements

Do not use a third-party mirror unless the source and integrity can be independently verified.

## Phase 1 — static inventory

1. Preserve the original installer; analyze a working copy.
2. Identify package/container structure without launching the application.
3. Inventory executables, libraries, scripts, assets, manifests, and update metadata.
4. Determine whether the app uses Electron, another web runtime, or a native framework.
5. If JavaScript/Electron is confirmed, run REA's `analyze-javascript-application` workflow against the extracted application directory.
6. Record REA Evidence IDs, artifact hashes, coverage, limitations, and unknowns.

Do not assume Electron solely from appearance or a website description.

## Phase 2 — behavior matrix

Test each feature independently. Record preconditions, action, visible result, relevant logs, and repeatability.

| Area | Questions to answer | Status |
| --- | --- | --- |
| Launch / lifecycle | Startup behavior, tray/menu-bar presence, exit behavior | Not tested |
| Media sources | Which players/services are detected? What happens when source changes? | Not tested |
| Metadata | Track, artist, album, artwork, duration, playback state | Not tested |
| Audio visualization | Does the effect follow system output, app audio, or microphone input? | Not tested |
| Edge lighting | Geometry, color selection, animation, display coverage, performance | Not tested |
| Lyrics | Source, timing, language, seek synchronization, failure behavior | Not tested |
| Wallpapers | Still/animated formats, playback, pause, multi-display behavior | Not tested |
| Displays | DPI scaling, mixed resolutions, display attach/detach | Not tested |
| Preferences | Persisted settings, defaults, reset behavior | Not tested |
| Network | Hosts contacted, request purpose, offline behavior | Not tested |
| Updates | Update source, checks, package/signature behavior | Not tested |

## Phase 3 — feature traces

For each verified feature:

1. Choose a narrow observable seed (UI label, route, IPC channel, API, or module).
2. Use REA's `trace-application-feature` and, where useful, `trace-javascript-semantics`.
3. Inspect retained modules and evidence with `inspect-analysis-view`.
4. Keep static observations separate from runtime observations and inferences.
5. Record missing coverage; an empty trace does not prove a feature is absent.

## Phase 4 — independent implementation

Prioritize a small MVP after the target's platform and architecture are known. Candidate first milestone:

- Desktop shell and settings
- System-output audio capture (not microphone by default)
- Audio level / frequency-band analysis
- Configurable visualizer overlay
- Display selection and safe shutdown

Media-service integrations, synchronized lyrics, and animated wallpapers should be separate milestones because they involve distinct APIs, permissions, licensing, and reliability requirements.

## Safety and scope

Analyze only software and accounts you own or are authorized to inspect. Do not bypass DRM, payment, account controls, licensing, or access restrictions. Do not extract or redistribute proprietary assets or source code. Use public behavior, your own observations, and independently written code.
