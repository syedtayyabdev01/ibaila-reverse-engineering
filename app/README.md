# Verdant Audio

A Windows-first desktop music player prototype with a green, audio-reactive desktop aesthetic.

## Current MVP

- Electron desktop shell with context isolation, sandboxing, and Node integration disabled in the renderer.
- Import and play local MP3, WAV, FLAC, M4A, AAC, OGG, and OPUS files.
- Basic queue, previous/next, play/pause, volume, and seek controls.
- Live frequency visualizer and adjustable green accent/lighting color.
- NSIS Windows installer configuration.

The current version is an early MVP. It does not yet include system-wide edge lighting, wallpaper integration, synced lyrics, streaming-service integrations, multi-monitor effects, or persistent library metadata.

## Requirements

- Windows 10/11 x64
- Node.js 22.23.4+ or 24.22.1+
- npm

## Run locally

From this directory:

```powershell
npm install
npm start
```

## Build Windows installer

```powershell
npm run dist
```

The installer is written to `release/ Verdant-Audio-Setup-0.1.0.exe` (without the space after release/).

For a folder build without an installer:

```powershell
npm run dist:dir
```

## Project principles

- Keep music files on the user's device; no uploads or account collection.
- Use only authorized assets, source, and integrations.
- Treat the original product's license and written permission as the scope boundary.
- Do not copy proprietary artwork, branding, or source unless the permission explicitly allows it.
