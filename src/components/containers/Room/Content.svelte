<script>
  import {
    connect,
    disconect,
    mediaStream,
    remoteStream,
  } from "./../../../states/!common/room.js";
  import { srcObject } from "../../../actions/video";
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";

  export let params = {};

  onMount(() => {
    connect(params.id);
  });

  function exit() {
    disconect();
    push("/");
  }
</script>

<video use:srcObject={$mediaStream} muted autoplay playsinline />
<!-- svelte-ignore a11y-media-has-caption -->
<video use:srcObject={$remoteStream} autoplay playsinline />
<button on:click={exit}>退室する</button>
