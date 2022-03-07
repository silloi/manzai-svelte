<script lang="ts">
  import Slides from "./lib/Slides.svelte";
  import Textarea from "./lib/Textarea.svelte";

  let text = "string";
</script>

<div class="wrapper">
  <Slides bind:text />

  <Textarea bind:text />
</div>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  @media (min-width: 768px) {
    .wrapper {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
    }
  }
</style>
