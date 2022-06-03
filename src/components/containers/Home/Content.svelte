<script>
  import { mediaStream, remoteStream } from "./../../../states/!common/room.js";
  import RoomEntry from "./RoomEntry.svelte";
  import DeviceCheck from "./DeviceCheck.svelte";
  import Technology from "./Technology.svelte";
  import { nanoid } from "nanoid";
  import { formId, tmpId, currentId } from "../../../states/!common/room";
  import HowToUse from "./HowToUse.svelte";
  import Overview from "./Overview.svelte";
  import { srcObject } from "../../../actions/video";

  function handleRoomIdGenerateButtonClick() {
    $formId = nanoid();

    var type = "text/plain";
    var blob = new Blob([$formId], { type });
    var data = [new window.ClipboardItem({ [type]: blob })];

    navigator.clipboard.write(data).then(
      function () {
        // alert("ルームIDをコピーしました!");
      },
      function () {
        /* failure */
      }
    );
  }
</script>

<Overview />
<HowToUse />
<DeviceCheck />
<RoomEntry />
<Technology />

{#if $currentId === ""}
  <input
    type="text"
    bind:value={$formId}
    placeholder="ルームIDを入力してください"
  />
  <button on:click={() => ($currentId = $formId)}>入室する</button>
  <button on:click={handleRoomIdGenerateButtonClick}>ルームID生成</button>
{:else}
  <button on:click={() => ($currentId = "")}>退室する</button>
{/if}

{#if $currentId === $tmpId}
  <!-- svelte-ignore a11y-media-has-caption -->
  <video use:srcObject={$mediaStream} autoplay playsinline />
{:else if $currentId !== ""}
  <video use:srcObject={$mediaStream} muted autoplay playsinline />
  <!-- svelte-ignore a11y-media-has-caption -->
  <video use:srcObject={$remoteStream} autoplay playsinline />
{/if}

<style>
  input[type="text"] {
    width: 280px;
  }
</style>
