<script>
  import { nanoid } from "nanoid";
  import {
    connect,
    disconect,
    mediaStream,
  } from "./../../../states/!common/room.js";
  import { srcObject } from "../../../actions/video";
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";

  onMount(() => {
    connect(nanoid());
  });

  function exit() {
    disconect();
    push("/");
  }
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video use:srcObject={$mediaStream} autoplay playsinline />
<button on:click={exit}>退室する</button>
