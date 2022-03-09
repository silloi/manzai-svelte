<script lang="ts">
  export let text = "";
</script>

<textarea bind:value={text} />

<style>
  textarea {
    width: 100%;
  }

  @media (min-width: 768px) {
    textarea {
      height: 100vh;
      box-sizing: border-box;
    }
  }
</style>
