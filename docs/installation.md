# Installing Feather Quill

Feather Quill is an independent Kindling fork in its initial rebrand. Download an installer only when one is published on [this fork's releases page](https://github.com/DesignForFailure/Feather-Quill/releases). Kindling's upstream installers install a different application.

Builds depend on the available toolchains, release configuration, and signing credentials. This repository does not currently promise Apple signing, notarization, or a particular installer filename. Read the notes attached to the release you download.

| Platform | Installer formats     |
| -------- | --------------------- |
| macOS    | DMG                   |
| Windows  | EXE or MSI            |
| Linux    | AppImage, DEB, or RPM |

Verify the release's checksums when supplied. On macOS and Windows, follow the platform's normal installation process and evaluate any signing warning against the release information.

## Linux

An AppImage is suitable for distributions where installing a DEB or RPM is inappropriate, including immutable systems such as Bazzite. Using the actual filename you downloaded:

```bash
chmod +x "/path/to/downloaded.AppImage"
"/path/to/downloaded.AppImage"
```

For Debian- or RPM-based systems, install the appropriate release package using the distribution's package tools. The native executable is named `feather-quill`.

## Build from source

See the [README](../README.md#build-from-source) for Node, Rust, and Tauri prerequisites and build commands. No published installer is needed to build locally.

## Local data and existing Kindling projects

Feather Quill uses the application identifier `io.github.designforfailure.featherquill.app` and its own `feather-quill.db`. It does not automatically read or migrate a Kindling installation's library. Use supported import and export workflows to exchange projects, and keep an independent backup before attempting a manual migration.

Existing editorial review and feedback files remain compatible with their `.kindling-review` and `.kindling-feedback` extensions. See [fork branding and compatibility](fork-branding.md).

## Updates

Automatic checks remain inactive until a Feather Quill signing key is configured. The upstream Kindling public key is not reused. Until the fork publishes signed update metadata, obtain updates from this fork's releases and follow their instructions.
