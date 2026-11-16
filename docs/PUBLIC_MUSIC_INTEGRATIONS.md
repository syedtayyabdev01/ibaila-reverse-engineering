# Public Free Release — Music Provider Integration Plan

## Product model
Verdant Audio is planned as a free Windows desktop application. Free does not grant rights to redistribute, proxy, record, cache, or stream provider catalogues without permission. Provider account, subscription, region, advertising and playback rules remain in force.

## Implemented in this milestone
- Music Services panel in the desktop UI.
- Official provider launch actions for Spotify, YouTube Music, Apple Music, Google Drive and OneDrive.
- External navigation is handled by Electron's main process through a strict service-ID allowlist. The renderer cannot pass arbitrary URLs to the operating system.
- Local audio playback remains available.

## Important current limitation
The buttons open official provider websites. They do NOT yet perform OAuth, sync cloud files, import playlists, or provide in-app streaming. Do not advertise these services as connected playback until their approved integrations are implemented and tested.

## Integration roadmap
1. Spotify: apply for appropriate developer access; use Authorization Code with PKCE for public desktop clients. Begin with permitted user-authorized metadata/library features. Use approved Spotify playback surfaces and preserve Spotify restrictions. Do not capture Spotify audio or feed it into audio-reactive visualizations.
2. YouTube / YouTube Music: use the official embedded player / IFrame Player API and permitted Data API functions. Do not extract media streams, remove ads, hide required controls, or imply a public full-playback SDK exists for YouTube Music.
3. Apple Music: integrate MusicKit where applicable. Issue developer tokens from a backend; require explicit user authorization and verify desktop distribution requirements.
4. Google Drive: OAuth 2.0 with PKCE where supported; request least-privilege file scopes. Play only files the signed-in user is authorized to access.
5. OneDrive: Microsoft identity platform OAuth 2.0 with PKCE; use Microsoft Graph least-privilege file permissions.
6. Add a small backend for token exchange, Apple developer-token signing, rate limits, privacy-safe diagnostics and disconnect/revocation. Never ship client secrets or signing keys in the Electron bundle.
7. Add provider-specific integration tests, consent screens, privacy policy, terms, security review and provider approval before public release.

## Release gates
- Production OAuth redirect URIs and app registrations configured.
- Provider approvals/policy review completed where required.
- Verdant never collects provider passwords.
- Tokens stored with OS-backed secure storage, not localStorage.
- Disconnect/revoke and data-deletion flows tested.
- Clear disclosures for paid subscriptions and regional restrictions.
- Legal review of product branding, assets and permission scope.
