# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest fork release | Yes |

As Feather Quill is in early development, we support the latest version only.

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

Use this fork's [private vulnerability reporting](https://github.com/DesignForFailure/Feather-Quill/security/advisories/new) when enabled. Do not send Feather Quill reports to upstream Kindling's email address. If private reporting is unavailable, open a non-sensitive issue requesting a private contact without publishing exploit details.

Include the affected version, reproduction steps, and impact in the private report. This fork has not established response-time commitments.

### Scope

Security issues we're interested in:

- Local file access beyond intended scope
- Arbitrary code execution
- Data corruption or loss
- Privacy leaks (unintended data exposure)

### Out of Scope

- Issues requiring physical access to the user's machine
- Social engineering attacks
- Issues in dependencies (report these upstream, but let us know)

## Security Best Practices

Feather Quill is a desktop application that:

- Stores data locally in SQLite databases
- Reads project files from user-specified locations
- Has no analytics, telemetry, accounts or cloud sync, and never sends your manuscript
- Retains optional update and explicitly submitted feedback functionality, isolated from upstream Kindling services. Update checks are inactive until a fork signing key is configured; feedback makes no request until a fork-owned HTTPS endpoint is configured. See [fork branding](docs/fork-branding.md).
- Uses a local MIT-licensed theme. The upstream Press mirror and artwork were removed; separately licensed font notices remain intact.

### For Users

- Download Feather Quill only from official sources (GitHub Releases)
- Verify checksums when available
- Keep your operating system updated
- Be cautious when importing files from untrusted sources

## Acknowledgments

We appreciate the security research community. Contributors who responsibly disclose vulnerabilities will be acknowledged here.

---

Thank you for helping keep Feather Quill secure!
