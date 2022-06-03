<script>
  import {
    currentId,
    mediaStream,
    remoteStream,
  } from "./../../../states/!common/room.js";
  import { srcObject } from "../../../actions/video";
  import { push } from "svelte-spa-router";

  export let params = {};

  $currentId = params.id;

  function exit() {
    $currentId = "";
    push("/");
  }
</script>

<video use:srcObject={$mediaStream} muted autoplay playsinline />
<!-- svelte-ignore a11y-media-has-caption -->
<video use:srcObject={$remoteStream} autoplay playsinline />
<button on:click={exit}>退室する</button>
