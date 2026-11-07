# Feather Quill: branding and compatibility

Feather Quill is maintained by DesignForFailure as an independent fork of [Kindling](https://github.com/smith-and-web/kindling), originally created by Josh Smith. The initial fork rebrand retains the inherited application features. Expanded writing modes, storyline tools, frequency analysis, and the whiteboard are planned work.

## Application identity

| Purpose                       | Feather Quill value                              |
| ----------------------------- | ------------------------------------------------ |
| Display name                  | Feather Quill                                    |
| Repository                    | DesignForFailure/Feather-Quill                   |
| npm package and native binary | feather-quill                                    |
| Rust library                  | feather_quill_lib                                |
| Application identifier        | io.github.designforfailure.featherquill.app      |
| Library database              | feather-quill.db                                 |
| Development library override  | FEATHER_QUILL_DATA_DIR                           |
| Development locale override   | FEATHER_QUILL_LOCALE / VITE_FEATHER_QUILL_LOCALE |
| QA background switch          | FEATHER_QUILL_QA_BACKGROUND                      |
| QA socket override            | FEATHER_QUILL_QA_SOCK                            |
| Local QA socket               | /tmp/feather-quill-qa.sock                       |
| Fork artwork                  | static/feather-quill/                            |
| Fork native icons             | src-tauri/icons/feather-quill/                   |

The app identifier isolates Feather Quill's platform data and web storage from Kindling. This rebrand does not migrate or modify a user's existing Kindling library. Internal event names, preference keys, QA globals, and build scripts use Feather Quill naming consistently.

The inherited version number is retained for now. An initial Feather Quill release should receive its own release notes and an explicit version decision before tagging.

## Names intentionally retained

These occurrences are compatibility or provenance, not missed display branding:

- `.kindling-review` and `.kindling-feedback`: existing editorial exchange extensions and MIME types.
- `kindling-editorial`: the published editorial JSON format discriminator.
- `<!-- kindling: ... -->`: metadata in exported Markdown and Longform documents. The matching importer must recognize exactly what the exporter writes.
- `kindling_project_type`: a published Longform frontmatter field.
- `kindling:novelwriter:root:`: an existing novelWriter mapping identifier.
- `.kindling-export` and its manifest header: export-folder ownership markers used to avoid deleting unrelated user files. Keeping them preserves the existing ownership checks.
- `@kindling/design-system`, Press's manifest and source artwork filenames: third-party provenance, not a Feather Quill package.
- Upstream copyright notices, changelog entries, numbered issue links, and existing screenshots or visual baselines: historical records.

## Update signing

The release endpoint points to this fork. The upstream public signing key was removed. An empty `plugins.updater.pubkey` causes `checkForUpdate()` to return before any update request; the install and save-before-restart logic remains available.

Before enabling automatic updates:

1. Generate and securely retain a new signing key pair for Feather Quill.
2. Set `plugins.updater.pubkey` in `src-tauri/tauri.conf.json` to its public key.
3. Configure the corresponding `TAURI_SIGNING_PRIVATE_KEY` and optional password in this fork's release secrets.
4. Set the GitHub Actions repository variable `FEATHER_QUILL_UPDATES_ENABLED=true` for signed release artifacts. Enable `bundle.createUpdaterArtifacts` for local signed builds and test a signed update against this fork's release metadata.

Without that variable, release automation builds installers, fixes AppImage permissions, and generates checksums without requiring updater signatures or `latest.json`.

Never reuse Kindling's signing configuration or assume its signing secrets exist in the fork. Apple signing and notarization also require this fork's own credentials; no signing claim is made for current builds.

## Feedback

The feedback form and validation are retained. The upstream Lambda endpoint is removed. Without a build-time `FEATHER_QUILL_FEEDBACK_ENDPOINT` pointing to an HTTPS service, submission returns an explanatory error and makes no network request. GitHub issues remain available from the About dialog.

A future configured service must honor the form's disclosure: send only the explicitly entered feedback plus app version, OS, and locale; do not attach manuscript content. Configuration is embedded at compile time, not read from a user's runtime environment.

## Artwork and local theme

The separately licensed Press mirror, guide, synchronization scripts, original artwork, and rendered snapshots were removed after the initial rebrand. The original Feather Quill artwork and native icons remain. The application now uses independently authored MIT-licensed styles in `src/styles/theme/`, application-owned `fq-*` selectors, and the separately licensed OFL fonts.

See [the replacement record](press-replacement.md) for the inventory, provenance, and why this is described as independent implementation rather than a formal clean-room process. Git history and original copyright notices remain intact.

## Verification

The initial rebrand's native checks were unavailable in the restricted session. Network and process access were subsequently enabled, so checks are rerun for the replacement and their current outcomes are recorded in the pull request. Old Press image baselines were removed; comparisons need new reviewed captures.

Inherited npm advisories remain recorded in [the dependency review](dependency-review.md). No dependency vulnerability fixes are claimed by the rebrand or theme replacement.
