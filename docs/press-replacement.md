# Replacing Press

## What Press was

Kindling used Press, a separate project, for its visual theme and brand assets. The upstream README excluded its mirrored files from Kindling's MIT grant, and Press's rights notice supplied no permissive project-wide license.

The dependency inventory found no imports of its mirrored Svelte components. The application used its CSS theme, font declarations, Tailwind aliases, and tag palette. The bundled font binaries have their own SIL Open Font License notices and are retained under those terms. The Lucide icon license is retained separately in `static/licenses/LUCIDE.txt`.

## What was removed

- The complete `src/styles/press/` mirror: styles, theme data, manifest, and unused Svelte components, including its unused editor wrappers.
- The separately licensed `DESIGN_GUIDE.md` and mirror synchronization/generation scripts.
- Upstream Kindling/Press brand artwork and native icons. Feather Quill's original icons remain.
- The inherited screenshots, vector demo, and visual baseline image corpus. New screenshots must be captured from Feather Quill and reviewed.
- Dead Vite/Vitest aliases, lint exclusions, and instructions requiring a sibling Press checkout.

These are current-tree removals. Git history, upstream copyright notices, and attribution have not been rewritten or relicensed.

## What replaced it

`src/styles/theme/` is an original MIT-licensed theme implemented for this fork. It uses a blue-grey interface with independently selected spacing and colour values. `tokens.css` contains semantic variables; `controls.css` implements the application-owned markup's controls; `fonts.css` loads the existing OFL font binaries; `utilities.css` exposes Tailwind aliases; and `palette.json` supplies new tag choices.

Application and QA selectors now use `fq-*`, and the application root is `fq-app`. The retained component-scoped styles, application overlays, and interaction logic were part of Kindling's MIT-licensed application, outside its excluded mirror. They are maintained as application code, not presented as newly authored replacements.

Existing custom/imported tag colours still render as stored. Choosing a new tag colour uses the fork's palette; the replacement does not rewrite stored projects.

The `check:design-system` command now checks local variable references, palette coverage, the absence of removed mirror paths, and retention of font notices. It does not verify a third-party snapshot or require a sibling repository.

## Independence claim and limits

The implementer had previously inspected some Press documentation and material during the dependency investigation. A formal clean-room separation therefore cannot be claimed for this work. The replacement was authored independently from the application's interface requirements; the restricted styles, components, and artwork were not copied, translated, or relabeled as MIT code.

This record documents the engineering boundary. It does not claim that historical repository contents or every external build dependency has been relicensed. In particular, the optional upstream debug QA plugin has no supplied license and must remain excluded from distributed builds, as documented in the README.

## Verification

The PR records the executed type, formatting, build, unit, browser, and native checks and any remaining environment limitations. Upstream visual snapshots are not accepted as evidence for this new theme.

### Local results (2026-11-07)

- 1,169 frontend unit tests passed.
- All 34 QA harness tests and the demo-seed test suite passed.
- Production frontend build, type checks, lint, formatting, and local theme contract passed. Existing Svelte and raw-HTML lint warnings remain.
- Browser smoke passed with fixture data: scene selection, light and dark themes, settings, Escape handling, no uncaught page errors, and no document-level horizontal overflow. Fresh screenshots were reviewed and saved in `docs/assets/`.
- Rust formatting passed. A user-local Rust toolchain was installed without changing shell profiles. Native tests were attempted with `--no-default-features` but stopped at missing host GObject/GTK development libraries; native tests and Clippy require CI or a configured development environment.

For browser checks, start `FEATHER_QUILL_BROWSER_MOCKS=1 npm run dev`, then run `npm run test:browser-theme`. Install the Playwright Chromium browser first, or set `CHROMIUM_EXECUTABLE` to an existing compatible browser. The fixture backend is opt-in for the development server and excluded from production builds. Screenshots are generated under ignored `qa/browser/output/`; they are not automatically accepted native baselines.
