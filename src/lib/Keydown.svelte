<script lang="ts">
  export let position = 0;
  export let contents = [];
  export let slideNext = () => {};

  let keyCode = 0;

  const handleKeydown = (event) => {
    console.log(keyCode);
    if (position >= contents.length - 1) {
      return;
    }

    keyCode = event.keyCode;

    if (keyCode === 13 || keyCode === 39) {
      slideNext();
    }
  };
</script>

<svelte:window on:keydown={handleKeydown} />
