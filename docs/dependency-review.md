# Inherited npm dependency findings

The owner's `npm ci` completed successfully on 2026-11-07. Its deprecation warnings and audit advisories are separate concerns: installation succeeding does not mean the dependency tree is free of known vulnerabilities.

This initial branding change does not upgrade dependencies. Only package identity is changed in the npm lockfiles. The following findings were inspected in the installation log and confirmed against the installed dependency tree with `npm explain`; this is not a complete security audit or an exploitability assessment.

| Installed package  | Path into this repository                                   | Installation finding                                                                                                                                                                                                    |
| ------------------ | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `glob@10.5.0`      | `@wdio/cli` → `@wdio/config`                                | Deprecation notice; audit also reports a moderate cancellation/traversal advisory                                                                                                                                       |
| `handlebars@4.7.9` | `conventional-changelog-cli` → changelog writer             | Audit reports critical JavaScript-injection advisories, including [GHSA-p8wg-vrv2-v86f](https://github.com/advisories/GHSA-p8wg-vrv2-v86f) and [GHSA-8r5x-fm3f-whwj](https://github.com/advisories/GHSA-8r5x-fm3f-whwj) |
| `zod@3.25.76`      | `tauri-plugin-mcp-server`, directly and through the MCP SDK | Audit reports a high-severity collection-validation resource-exhaustion advisory, [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5)                                                              |

These particular paths are development dependencies. Other advisories appeared in the installation report, including tooling and transitive HTTP/MCP packages. Being a development dependency does not by itself establish that a vulnerability is harmless or unreachable.

A dependency-maintenance pass should capture fresh `npm audit --json` and `npm audit --omit=dev --json` reports, inspect each dependency path and advisory's affected range, update compatible parent packages, and run the application and test suites again. Avoid a blind `npm audit fix --force`: it can introduce unrelated major-version changes. Rust advisories require a separate Cargo audit.

The current session's shell has restricted networking and could not fetch a fresh npm audit report. The observations above are from the successful terminal installation's log, not a newly completed audit. No vulnerability fixes are claimed by the rebrand.
