<script lang="ts">
  import Slides from "./lib/Slides.svelte";
  import Textarea from "./lib/Textarea.svelte";

  let text = "string";
</script>

<div class="flex">
  <div class="flex-item">
    <Slides bind:text />
  </div>

  <div class="flex-item">
    <Textarea bind:text />
  </div>
</div>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  :global(p) {
    margin: 0;
  }

  .flex {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  @media (min-width: 768px) {
    .flex {
      flex-direction: row-reverse;
      justify-content: flex-end;
    }

    .flex-item {
      flex: 1;
    }
  }
</style>
