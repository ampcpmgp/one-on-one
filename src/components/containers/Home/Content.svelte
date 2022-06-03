<script>
  import { mediaStream, remoteStream } from "./../../../states/!common/room.js";
  import RoomEntry from "./RoomEntry.svelte";
  import DeviceCheck from "./DeviceCheck.svelte";
  import Technology from "./Technology.svelte";
  import { tmpId, currentId } from "../../../states/!common/room";
  import HowToUse from "./HowToUse.svelte";
  import Overview from "./Overview.svelte";
  import { srcObject } from "../../../actions/video";
</script>

<Overview />
<HowToUse />
<DeviceCheck />
<RoomEntry />
<Technology />

{#if $currentId === $tmpId}
  <!-- svelte-ignore a11y-media-has-caption -->
  <video use:srcObject={$mediaStream} autoplay playsinline />
{:else if $currentId !== ""}
  <video use:srcObject={$mediaStream} muted autoplay playsinline />
  <!-- svelte-ignore a11y-media-has-caption -->
  <video use:srcObject={$remoteStream} autoplay playsinline />
{/if}
