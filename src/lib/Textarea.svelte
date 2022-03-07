<script lang="ts">
  export let text = "";
</script>

<textarea bind:value={text} />

<style>
  textarea {
    width: 100%;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  @media (min-width: 768px) {
    textarea {
      height: 100vh;
      box-sizing: border-box;
    }
  }
</style>
