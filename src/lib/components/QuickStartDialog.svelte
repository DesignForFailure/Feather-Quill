<!--
  QuickStartDialog.svelte - In-app Quick Start guide

  Accessible from Help → Quick Start. Covers:
  - Import formats
  - Sidebar (chapters & scenes)
  - Scene panel (synopsis, beats, discovery notes)
  - References panel
-->
<script lang="ts">
  import DialogHeader from "./DialogHeader.svelte";
  import { shortcuts } from "../stores/shortcuts.svelte";
  import { modalFocus } from "../utils/modalFocus";
  import { t } from "../i18n";
  import {
    BookOpen,
    ChevronDown,
    FileText,
    Kanban,
    MapPin,
    PenTool,
    User,
    Users,
    Zap,
  } from "lucide-svelte";

  let { onClose }: { onClose: () => void } = $props();
</script>

<div
  class="dialog-scrim"
  use:modalFocus={{ onEscape: onClose }}
  role="dialog"
  aria-modal="true"
  aria-labelledby="quick-start-title"
  tabindex="-1"
>
  <div
    class="app-dialog-surface fq-dialog-default dialog-shell quick-start"
    data-testid="quick-start-dialog"
  >
    <DialogHeader
      title={t("onboarding.quickStartDialog.title")}
      titleId="quick-start-title"
      {onClose}
      closeLabel={t("common.close")}
      closeTestId="quick-start-close"
    />

    <div class="fq-dialog-body quick-start-body">
      <!-- Import -->
      <section class="fq-group">
        <h3 class="fq-group-title">{t("onboarding.quickStartDialog.importHeading")}</h3>
        <p class="font-fq-ui text-fq-base text-fq-text mb-3 max-w-fq-measure">
          {t("onboarding.quickStartDialog.importLede")}
        </p>
        <ul class="space-y-2 text-fq-ui text-fq-muted">
          <li class="flex items-start gap-2">
            <Kanban class="w-4 h-4 shrink-0 mt-0.5 quick-start-icon" />
            <span
              ><strong class="text-fq-text">Plottr</strong>{t(
                "onboarding.quickStartDialog.plottr"
              )}</span
            >
          </li>
          <li class="flex items-start gap-2">
            <PenTool class="w-4 h-4 shrink-0 mt-0.5 quick-start-icon" />
            <span
              ><strong class="text-fq-text">yWriter 7</strong>{t(
                "onboarding.quickStartDialog.ywriter"
              )}</span
            >
          </li>
          <li class="flex items-start gap-2">
            <FileText class="w-4 h-4 shrink-0 mt-0.5 quick-start-icon" />
            <span
              ><strong class="text-fq-text">Markdown</strong>{t(
                "onboarding.quickStartDialog.markdown"
              )}</span
            >
          </li>
          <li class="flex items-start gap-2">
            <BookOpen class="w-4 h-4 shrink-0 mt-0.5 quick-start-icon" />
            <span
              ><strong class="text-fq-text">Longform</strong>{t(
                "onboarding.quickStartDialog.longform"
              )}</span
            >
          </li>
          <li class="flex items-start gap-2">
            <FileText class="w-4 h-4 shrink-0 mt-0.5 quick-start-icon" />
            <span
              ><strong class="text-fq-text">Scrivener 3</strong>{t(
                "onboarding.quickStartDialog.scrivener"
              )}</span
            >
          </li>
        </ul>
      </section>

      <!-- Sidebar -->
      <section class="fq-group">
        <h3 class="fq-group-title">{t("onboarding.quickStartDialog.sidebarHeading")}</h3>
        <p class="font-fq-ui text-fq-base text-fq-text mb-3 max-w-fq-measure">
          {t("onboarding.quickStartDialog.sidebarLede")}
        </p>
        <ul class="space-y-2 text-fq-ui text-fq-muted">
          <li class="flex items-start gap-2">
            <ChevronDown class="w-4 h-4 shrink-0 mt-0.5 quick-start-icon" />
            <span>{t("onboarding.quickStartDialog.sidebarChapters")}</span>
          </li>
          <li class="flex items-start gap-2">
            <FileText class="w-4 h-4 shrink-0 mt-0.5 quick-start-icon" />
            <span>{t("onboarding.quickStartDialog.sidebarScenes")}</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-fq-accent-text shrink-0">•</span>
            <span>{t("onboarding.quickStartDialog.sidebarContextMenu")}</span>
          </li>
        </ul>
      </section>

      <!-- Scene Panel -->
      <section class="fq-group">
        <h3 class="fq-group-title">{t("onboarding.quickStartDialog.scenePanelHeading")}</h3>
        <p class="font-fq-ui text-fq-base text-fq-text mb-3 max-w-fq-measure">
          {t("onboarding.quickStartDialog.scenePanelLede")}
        </p>
        <ul class="space-y-2 text-fq-ui text-fq-muted">
          <li class="flex items-start gap-2">
            <Zap class="w-4 h-4 shrink-0 mt-0.5 quick-start-icon" />
            <span
              ><strong class="text-fq-text">{t("onboarding.quickStartDialog.synopsisLabel")}</strong
              >{t("onboarding.quickStartDialog.synopsisBullet")}</span
            >
          </li>
          <li class="flex items-start gap-2">
            <Zap class="w-4 h-4 shrink-0 mt-0.5 quick-start-icon" />
            <span
              ><strong class="text-fq-text">{t("onboarding.quickStartDialog.beatsLabel")}</strong
              >{t("onboarding.quickStartDialog.beatsBullet")}</span
            >
          </li>
          <li class="flex items-start gap-2">
            <span class="text-fq-accent-text shrink-0">•</span>
            <span>{t("onboarding.quickStartDialog.beatsContextMenu")}</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-fq-accent-text shrink-0">•</span>
            <span
              ><strong class="text-fq-text"
                >{t("onboarding.quickStartDialog.discoveryNotesLabel")}</strong
              >{#if shortcuts.label("toggle_discovery_notes")}
                ({shortcuts.label("toggle_discovery_notes")}){/if}{t(
                "onboarding.quickStartDialog.discoveryNotesRest"
              )}</span
            >
          </li>
        </ul>
      </section>

      <!-- References -->
      <section class="fq-group">
        <h3 class="fq-group-title">{t("onboarding.quickStartDialog.referencesHeading")}</h3>
        <p class="font-fq-ui text-fq-base text-fq-text mb-3 max-w-fq-measure">
          {t("onboarding.quickStartDialog.referencesLede")}
        </p>
        <ul class="space-y-2 text-fq-ui text-fq-muted">
          <li class="flex items-start gap-2">
            <User class="w-4 h-4 shrink-0 mt-0.5 quick-start-icon" />
            <span
              ><strong class="text-fq-text"
                >{t("onboarding.quickStartDialog.charactersLabel")}</strong
              >{t("onboarding.quickStartDialog.charactersBullet")}</span
            >
          </li>
          <li class="flex items-start gap-2">
            <MapPin class="w-4 h-4 shrink-0 mt-0.5 quick-start-icon" />
            <span
              ><strong class="text-fq-text"
                >{t("onboarding.quickStartDialog.locationsLabel")}</strong
              >{t("onboarding.quickStartDialog.locationsBullet")}</span
            >
          </li>
          <li class="flex items-start gap-2">
            <Users class="w-4 h-4 shrink-0 mt-0.5 quick-start-icon" />
            <span>{t("onboarding.quickStartDialog.linkReferences")}</span>
          </li>
        </ul>
      </section>

      <!-- Tips -->
      <section class="fq-group">
        <h3 class="fq-group-title">{t("onboarding.quickStartDialog.tipsHeading")}</h3>
        <ul class="space-y-2 text-fq-ui text-fq-muted">
          <li>
            <strong class="text-fq-text"
              >{shortcuts.label("export") ||
                t("onboarding.quickStartDialog.exportFallback")}</strong
            >{t("onboarding.quickStartDialog.exportRest")}
          </li>
          <li>
            <strong class="text-fq-text"
              >{shortcuts.label("toggle_discovery_notes") ||
                t("onboarding.quickStartDialog.discoveryNotesLabel")}</strong
            >{t("onboarding.quickStartDialog.discoveryNotesToggleRest")}
          </li>
          <li>
            <strong class="text-fq-text">{t("onboarding.quickStartDialog.snapshotsLabel")}</strong
            >{t("onboarding.quickStartDialog.snapshotsRest")}
          </li>
        </ul>
      </section>
    </div>

    <footer class="fq-dialog-footer">
      <button type="button" onclick={onClose} class="fq-button">
        {t("onboarding.quickStartDialog.gotIt")}
      </button>
    </footer>
  </div>
</div>

<style>
  .quick-start {
    height: min(720px, calc(100dvh - 48px));
  }
  .quick-start-body h3 {
    margin: 0 0 var(--space-3xs);
  }
  .quick-start-body p {
    margin: 0;
  }
  .quick-start-body :global(.quick-start-icon) {
    color: var(--color-text-muted);
  }
</style>
