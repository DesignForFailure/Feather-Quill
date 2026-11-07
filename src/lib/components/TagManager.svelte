<script lang="ts">
  import { tagColor } from "../utils/tagColor";
  import { onDestroy, untrack } from "svelte";
  import { invoke } from "@tauri-apps/api/core";
  import { Loader2, Pencil, Plus, Trash2, X, Check } from "lucide-svelte";
  import themePalette from "../../styles/theme/palette.json";
  import type { Tag } from "../types";
  import { t } from "../i18n";

  let {
    projectId,
    onState,
    onChange,
  }: {
    projectId: string;
    onState?: (state: { dirty: boolean; busy: boolean }) => void;
    onChange?: () => void;
  } = $props();

  let tags = $state<Tag[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);

  let editingTag = $state<Partial<Tag> | null>(null);

  /** Land keyboard users on the editor (and scroll it into view) when it opens. */
  function focusOnMount(node: HTMLElement) {
    node.focus();
  }
  let editMode = $state<"create" | "edit">("create");
  let saving = $state(false);
  $effect(() => {
    const state = { dirty: editingTag !== null, busy: saving };
    untrack(() => onState?.(state));
  });
  onDestroy(() => onState?.({ dirty: false, busy: false }));

  const PRESET_COLOR_TOKENS: Array<[string, keyof typeof themePalette.light]> = [
    ["Red", "--tag-red"],
    ["Orange", "--tag-orange"],
    ["Yellow", "--tag-yellow"],
    ["Green", "--tag-green"],
    ["Teal", "--tag-teal"],
    ["Blue", "--tag-blue"],
    ["Purple", "--tag-purple"],
    ["Pink", "--tag-pink"],
    ["Slate", "--tag-slate"],
    ["Cyan", "--tag-cyan"],
  ];
  const PRESET_COLORS = PRESET_COLOR_TOKENS.map(([name, token]) => ({
    name,
    color: themePalette.light[token],
  }));

  async function loadTags() {
    loading = true;
    error = null;
    try {
      tags = await invoke("get_tags", { projectId });
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    } finally {
      loading = false;
    }
  }

  $effect(() => {
    if (projectId) loadTags();
  });

  function getRootTags(): Tag[] {
    return tags.filter((t) => !t.parent_id).sort((a, b) => a.position - b.position);
  }

  function getChildTags(parentId: string): Tag[] {
    return tags.filter((t) => t.parent_id === parentId).sort((a, b) => a.position - b.position);
  }

  function openCreateForm(parentId: string | null = null) {
    editMode = "create";
    editingTag = {
      name: "",
      color: null,
      parent_id: parentId,
    };
  }

  function openEditForm(tag: Tag) {
    editMode = "edit";
    editingTag = { ...tag };
  }

  function cancelEdit() {
    editingTag = null;
  }

  async function saveTag() {
    if (!editingTag?.name?.trim()) return;

    saving = true;
    try {
      if (editMode === "create") {
        await invoke("create_tag", {
          projectId,
          name: editingTag.name.trim(),
          color: editingTag.color || null,
          parentId: editingTag.parent_id || null,
        });
      } else if (editingTag.id) {
        await invoke("update_tag", {
          tagId: editingTag.id,
          update: {
            name: editingTag.name.trim(),
            color: editingTag.color !== undefined ? editingTag.color : undefined,
            parent_id: undefined,
            position: undefined,
          },
        });
      }
      editingTag = null;
      await loadTags();
      onChange?.();
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    } finally {
      saving = false;
    }
  }

  async function deleteTag(id: string) {
    if (saving) return;
    saving = true;
    try {
      await invoke("delete_tag", { tagId: id });
      await loadTags();
      onChange?.();
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    } finally {
      saving = false;
    }
  }
</script>

{#snippet tagRow(tag: Tag, depth: number)}
  {@const children = getChildTags(tag.id)}
  <li>
    <div class="fq-tagrow">
      <span
        class="fq-swatch"
        class:fq-swatch--none={!tag.color}
        style:--swatch={tagColor(tag.color) ?? "transparent"}
        aria-hidden="true"
      ></span>
      <span class="fq-name">{tag.name}</span>
      {#if children.length > 0}
        <span class="fq-badge" title={t("sidebar.tagManager.childTags", { count: children.length })}
          >{children.length}</span
        >
      {/if}
      <div class="fq-row">
        {#if depth < 2}
          <button
            type="button"
            onclick={() => openCreateForm(tag.id)}
            class="fq-button fq-button--ghost fq-icon-button"
            aria-label={t("sidebar.tagManager.addChildTag")}
            title={t("sidebar.tagManager.addChildTag")}
            disabled={!!editingTag}
          >
            <Plus class="w-5 h-5" aria-hidden="true" />
          </button>
        {/if}
        <button
          type="button"
          onclick={() => openEditForm(tag)}
          class="fq-button fq-button--ghost fq-icon-button"
          aria-label={t("sidebar.tagManager.editTag")}
          title={t("sidebar.tagManager.editTag")}
          disabled={!!editingTag}
        >
          <Pencil class="w-5 h-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onclick={() => deleteTag(tag.id)}
          class="fq-button fq-button--ghost fq-icon-button tag-delete"
          aria-label={t("sidebar.tagManager.deleteTag")}
          title={t("sidebar.tagManager.deleteTag")}
        >
          <Trash2 class="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
    {#if children.length > 0}
      <ul>
        {#each children as child (child.id)}
          {@render tagRow(child, depth + 1)}
        {/each}
      </ul>
    {/if}
  </li>
{/snippet}

<div class="tags">
  <div class="tags-head">
    <p class="fq-help">{t("sidebar.tagManager.tagsNestLevels")}</p>
    <button
      type="button"
      onclick={() => openCreateForm()}
      class="fq-button fq-button--secondary"
      disabled={!!editingTag}
    >
      <Plus class="w-5 h-5" aria-hidden="true" />
      {t("sidebar.tagManager.newTag")}
    </button>
  </div>

  {#if loading}
    <p class="fq-help" role="status">{t("sidebar.tagManager.loadingTags")}</p>
  {:else if error}
    <p class="fq-error" role="alert">{error}</p>
  {:else if tags.length === 0 && !editingTag}
    <p class="fq-help">{t("sidebar.tagManager.noTags")}</p>
  {:else}
    <ul class="fq-tagtree">
      {#each getRootTags() as tag (tag.id)}
        {@render tagRow(tag, 0)}
      {/each}
    </ul>
  {/if}

  {#if editingTag}
    <div class="fq-tagedit">
      <div class="tags-edit-head">
        <h4>
          {editMode === "create" ? t("sidebar.tagManager.newTag") : t("sidebar.tagManager.editTag")}
        </h4>
        <button
          type="button"
          onclick={cancelEdit}
          class="fq-button fq-button--ghost fq-icon-button"
          aria-label={t("sidebar.tagManager.closeEditor")}
          title={t("sidebar.tagManager.closeEditor")}
        >
          <X class="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <div class="fq-field od-field">
        <label for="tag-name">{t("sidebar.tagManager.name")}</label>
        <input
          id="tag-name"
          type="text"
          use:focusOnMount
          bind:value={editingTag.name}
          placeholder={t("sidebar.tagManager.namePlaceholder")}
          disabled={saving}
        />
      </div>

      <fieldset class="fq-swatches">
        <legend>{t("sidebar.tagManager.color")}</legend>
        <button
          type="button"
          onclick={() => {
            if (editingTag) editingTag.color = null;
          }}
          class="fq-swatch-option fq-swatch-option--none swatch-button"
          class:is-selected={!editingTag.color}
          aria-pressed={!editingTag.color}
          aria-label={t("sidebar.tagManager.noColor")}
          title={t("sidebar.tagManager.noColor")}
        >
          <span
            >{#if !editingTag.color}<Check class="w-4 h-4" aria-hidden="true" />{/if}</span
          >
        </button>
        {#each PRESET_COLORS as preset (preset.name)}
          {@const color = preset.color}
          <button
            type="button"
            onclick={() => {
              if (editingTag) editingTag.color = color;
            }}
            class="fq-swatch-option swatch-button"
            class:is-selected={editingTag.color === color}
            style:--swatch={tagColor(color)}
            aria-pressed={editingTag.color === color}
            aria-label={t(`sidebar.tagManager.color${preset.name}`)}
            title={t(`sidebar.tagManager.color${preset.name}`)}
          >
            <span
              >{#if editingTag.color === color}<Check
                  class="w-4 h-4"
                  aria-hidden="true"
                />{/if}</span
            >
          </button>
        {/each}
      </fieldset>

      <div class="fq-row tags-edit-actions">
        <button
          type="button"
          onclick={cancelEdit}
          class="fq-button fq-button--secondary"
          disabled={saving}
        >
          {t("common.cancel")}
        </button>
        <button
          type="button"
          onclick={saveTag}
          class="fq-button"
          disabled={saving || !editingTag.name?.trim()}
          aria-busy={saving || undefined}
        >
          {#if saving}
            <Loader2 class="w-5 h-5 animate-spin" aria-hidden="true" />
          {/if}
          {editMode === "create" ? t("sidebar.tagManager.add") : t("common.save")}
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .tags {
    display: grid;
    gap: var(--space-s);
  }
  .tags-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-s);
  }
  .tags-head .fq-help {
    margin: 0;
  }
  .tags-edit-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: calc(-1 * var(--space-2xs)) calc(-1 * var(--space-2xs)) 0 0;
  }
  .tags-edit-head h4 {
    margin: 0;
    font: 600 var(--text-base) / 1.5 var(--font-ui);
    color: var(--color-text);
  }
  .tags-edit-actions {
    justify-content: flex-end;
  }
  .swatch-button {
    padding: 0;
    border: 0;
    background: transparent;
  }
  .swatch-button.is-selected > span {
    outline: 2px solid var(--color-text);
    outline-offset: 2px;
  }
  .swatch-button:focus-visible {
    outline: 2px solid var(--color-accent-text);
    outline-offset: 1px;
  }
  @media (hover: hover) {
    .tag-delete:hover {
      color: var(--color-error);
    }
  }
</style>
