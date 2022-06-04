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

<div class="videos">
  <video use:srcObject={$mediaStream} muted autoplay playsinline />
  <!-- svelte-ignore a11y-media-has-caption -->
  <video use:srcObject={$remoteStream} autoplay playsinline />
</div>

<div>
  <button on:click={exit}>退室する</button>
</div>

<style>
  .videos {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  video {
    width: 100%;
    height: auto;
  }
</style>
