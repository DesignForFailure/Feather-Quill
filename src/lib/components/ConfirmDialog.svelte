<script lang="ts">
  import DialogHeader from "./DialogHeader.svelte";
  import { modalFocus, type ModalFocusOptions } from "../utils/modalFocus";
  import { t } from "../i18n";
  interface Props {
    title: string;
    titleId?: string;
    embedded?: boolean;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
  }

  let {
    title,
    titleId = "dialog-title",
    embedded = false,
    message,
    confirmLabel = t("common.delete"),
    cancelLabel = t("common.cancel"),
    onConfirm,
    onCancel,
  }: Props = $props();

  // Destructive confirms start on the safe choice.
  function focusOnMount(node: HTMLElement) {
    queueMicrotask(() => node.focus());
  }

  // Standalone, this is its own modal. Embedded, the host dialog owns focus and keys.
  function dialogFocus(node: HTMLElement, options: ModalFocusOptions) {
    return embedded ? undefined : modalFocus(node, options);
  }
</script>

<div
  data-testid="confirm-dialog"
  class="dialog-scrim"
  use:dialogFocus={{ onEscape: onCancel, initialFocus: '[data-testid="dialog-cancel"]' }}
  role={embedded ? undefined : "alertdialog"}
  aria-modal={embedded ? undefined : true}
  aria-labelledby={embedded ? undefined : titleId}
  aria-describedby={embedded ? undefined : `${titleId}-message`}
  tabindex="-1"
>
  <div class="app-dialog-surface fq-dialog-narrow confirm">
    <DialogHeader {title} {titleId} onClose={onCancel} closeLabel={t("shell.closeConfirmation")} />
    <div class="fq-dialog-body">
      <p id={`${titleId}-message`} data-testid="dialog-message" class="confirm-message">
        {message}
      </p>
    </div>
    <footer class="fq-dialog-footer">
      <button
        type="button"
        data-testid="dialog-cancel"
        onclick={onCancel}
        use:focusOnMount
        class="fq-button fq-button--secondary"
      >
        {cancelLabel}
      </button>
      <button
        type="button"
        data-testid="dialog-confirm"
        onclick={onConfirm}
        class="fq-button fq-button--danger"
      >
        {confirmLabel}
      </button>
    </footer>
  </div>
</div>

<style>
  .confirm {
    display: flex;
    flex-direction: column;
    max-height: calc(100dvh - 48px);
  }
  .confirm-message {
    margin: 0;
    font: var(--text-base) / 1.6 var(--font-ui);
    color: var(--color-text);
  }
</style>
