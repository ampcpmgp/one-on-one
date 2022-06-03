<script>
  import {
    currentId,
    mediaStream,
    tmpId,
  } from "./../../../states/!common/room.js";
  import { srcObject } from "../../../actions/video";
  import { push } from "svelte-spa-router";

  $currentId = $tmpId;

  function exit() {
    $currentId = "";
    push("/");
  }
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video use:srcObject={$mediaStream} autoplay playsinline />
<button on:click={exit}>退室する</button>
