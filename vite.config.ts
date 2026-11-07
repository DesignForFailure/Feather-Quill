import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

export default defineConfig(({ command }) => {
  // Explicitly opt into fixtures for browser UI checks; never include them in a build.
  // @ts-expect-error process is a nodejs global
  const useMocks = command === "serve" && process.env.FEATHER_QUILL_BROWSER_MOCKS === "1";

  // One variable sets the locale for both halves of `npm run tauri dev`: Rust reads
  // FEATHER_QUILL_LOCALE for the native menus, the webview reads VITE_FEATHER_QUILL_LOCALE.
  // Dev server only, so a stray shell variable can never bake a locale into a release.
  // @ts-expect-error process is a nodejs global
  const env = process.env;
  if (command === "serve" && env.FEATHER_QUILL_LOCALE && !env.VITE_FEATHER_QUILL_LOCALE) {
    env.VITE_FEATHER_QUILL_LOCALE = env.FEATHER_QUILL_LOCALE;
  }

  return {
    plugins: [svelte(), tailwindcss()],
    publicDir: "static",
    resolve: {
      alias: {
        $lib: path.resolve("./src/lib"),
        ...(useMocks
          ? {
              "@tauri-apps/api/core": path.resolve("./src/dev/browser-core.ts"),
              "@tauri-apps/api/event": path.resolve("./src/dev/mock-event.ts"),
              "@tauri-apps/api/window": path.resolve("./src/dev/browser-window.ts"),
              "@tauri-apps/plugin-dialog": path.resolve("./src/dev/mock-dialog.ts"),
              "@tauri-apps/plugin-opener": path.resolve("./src/dev/mock-opener.ts"),
            }
          : {}),
      },
    },
    clearScreen: false,
    server: {
      port: 1420,
      strictPort: true,
      host: host || false,
      hmr: host
        ? {
            protocol: "ws",
            host,
            port: 1421,
          }
        : undefined,
      watch: {
        // QA writes screenshots, DOM dumps and reports while driving the app.
        // Watching those artifacts reloads the webview mid-scenario.
        ignored: [
          "**/src-tauri/**",
          "**/qa/visual/results/**",
          "**/qa/visual/data/**",
          "**/qa/demo/data/**",
        ],
      },
    },
  };
});
