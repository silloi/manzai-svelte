<script lang="ts">
  let value = "string";
</script>

<div class="wrapper">
  <main>{value}</main>

  <textarea bind:value />
</div>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  textarea,
  main {
    width: 100%;
  }

  textarea {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  @media (min-width: 768px) {
    .wrapper {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
    }
  }
</style>
