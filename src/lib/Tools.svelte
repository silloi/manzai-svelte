<script lang="ts">
  export let slideToTop = () => {};
  export let slideNext = () => {};
</script>

<div class="tools">
  <button on:click={slideToTop}>top</button>
  <button on:click={slideNext}>next</button>
</div>

<style>
  .tools {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1000;
  }
</style>
