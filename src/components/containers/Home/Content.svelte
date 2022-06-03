<script>
  import RoomEntry from "./RoomEntry.svelte";
  import DeviceCheck from "./DeviceCheck.svelte";
  import Technology from "./Technology.svelte";
  import { nanoid } from "nanoid";
  import { AYAME_WS_URL } from "./../../../constants/ayame.js";
  import { formId, tmpId, currentId } from "../../../states/!common/room";
  import * as Ayame from "@open-ayame/ayame-web-sdk";
  import HowToUse from "./HowToUse.svelte";
  import Overview from "./Overview.svelte";

  /** @type {HTMLVideoElement} */
  let localVideo;
  /** @type {HTMLVideoElement} */
  let remoteVideo;

  /** @type {import("@open-ayame/ayame-web-sdk/dist/connection").default} */
  let conn;

  /** @type {MediaStream} */
  let mediaStream;

  async function exitRoom() {
    mediaStream.getTracks().forEach((track) => track.stop());
    conn?.disconnect();
    $currentId = "";
  }

  /**
   * @param {string} id
   */
  async function enterRoom(id) {
    if (id === "") {
      alert("ルームIDを入力してください");
      return;
    }

    $currentId = id;

    const ayameRoomId = `one-on-one-jp-${id}`;

    conn = Ayame.connection(AYAME_WS_URL, ayameRoomId);

    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    await conn.connect(mediaStream);
    conn.on("disconnect", console.log);
    conn.on("addstream", (/** @type {any} */ e) => {
      remoteVideo.srcObject = e.stream;
    });
    localVideo.srcObject = mediaStream;
  }

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
  <button on:click={() => enterRoom($formId)}>入室する</button>
  <button on:click={handleRoomIdGenerateButtonClick}>ルームID生成</button>
{:else}
  <button on:click={() => exitRoom()}>退室する</button>
{/if}

{#if $currentId === $tmpId}
  <!-- svelte-ignore a11y-media-has-caption -->
  <video bind:this={localVideo} autoplay playsinline />
{:else if $currentId !== ""}
  <video bind:this={localVideo} muted autoplay playsinline />
  <!-- svelte-ignore a11y-media-has-caption -->
  <video bind:this={remoteVideo} autoplay playsinline />
{/if}

<style>
  input[type="text"] {
    width: 280px;
  }
</style>
