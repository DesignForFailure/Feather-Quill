// Browser-only smoke check of the original theme against the inherited UI.
// Start FEATHER_QUILL_BROWSER_MOCKS=1 npm run dev first. Uses sample fixtures only.
import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
const output = new URL("./output/", import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {}),
});
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    localStorage.setItem("feather-quill:onboardingCompleted", "true");
    localStorage.setItem("feather-quill:guidanceEnabled", "false");
    localStorage.setItem("feather-quill:theme", "light");
  });
  await page.goto(process.env.FEATHER_QUILL_BROWSER_URL || "http://127.0.0.1:1420");
  await page.locator("#startup-loading").waitFor({ state: "detached" });
  assert.equal(await page.title(), "Feather Quill");
  await page.getByText("Ember & Ash", { exact: true }).click();
  await page.getByRole("button", { name: "Settings", exact: true }).waitFor();
  await page.getByTestId("scene-item").filter({ hasText: "The Village" }).first().click();
  await page
    .getByTestId("scene-panel")
    .getByRole("heading", { name: "The Village", exact: true })
    .waitFor();
  for (const theme of ["light", "dark"]) {
    await page.evaluate(
      (value) => document.documentElement.setAttribute("data-theme", value),
      theme
    );
    await page.screenshot({ path: new URL(`editor-${theme}.png`, output).pathname });
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      true
    );
  }
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await page.getByRole("dialog").waitFor();
  await page.getByRole("navigation", { name: "Settings areas" }).waitFor();
  await page.screenshot({ path: new URL("settings-dark.png", output).pathname });
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "detached" });
  assert.deepEqual(errors, []);
  console.log(
    "Browser smoke passed: fixture project, both themes, settings, Escape, no page errors or horizontal overflow."
  );
} finally {
  await browser.close();
}
