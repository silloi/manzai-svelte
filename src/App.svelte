<script lang="ts">
  import Textarea from "./lib/Textarea.svelte";
  let text = "string";
</script>

<div class="wrapper">
  <main>{text}</main>

  <Textarea bind:text />
</div>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    width: 100%;
  }

  @media (min-width: 768px) {
    .wrapper {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
    }
  }
</style>
