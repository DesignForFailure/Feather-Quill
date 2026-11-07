<!-- Feather Quill wordmark, with a reversed variant for dark chrome. -->
<script lang="ts">
  let { height = 22 }: { height?: number } = $props();
  const width = $derived(Math.round(height * 5));
</script>

<span class="brand-wordmark" role="img" aria-label="Feather Quill">
  <img class="on-light" src="/feather-quill/wordmark.svg" alt="" {width} {height} />
  <img class="on-dark" src="/feather-quill/wordmark-reversed.svg" alt="" {width} {height} />
</span>

<style>
  .brand-wordmark {
    display: inline-flex;
    flex: none;
  }
  img {
    display: block;
    height: auto;
  }
  .on-dark {
    display: none;
  }
  :global([data-theme="dark"]) .on-light {
    display: none;
  }
  :global([data-theme="dark"]) .on-dark {
    display: block;
  }
</style>
