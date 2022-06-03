<script>
  import DeviceCheck from "./DeviceCheck.svelte";
  import Technology from "./Technology.svelte";
  import { nanoid } from "nanoid";
  import { AYAME_WS_URL } from "./../../../constants/ayame.js";
  import { id, tmpId } from "../../../states/!common/room";
  import * as Ayame from "@open-ayame/ayame-web-sdk";
  import HowToUse from "./HowToUse.svelte";
  import Overview from "./Overview.svelte";

  /** @type {HTMLVideoElement} */
  let localVideo;
  /** @type {HTMLVideoElement} */
  let remoteVideo;

  let currentRoomId = "";

  /** @type {import("@open-ayame/ayame-web-sdk/dist/connection").default} */
  let conn;

  /** @type {MediaStream} */
  let mediaStream;

  async function exitRoom() {
    mediaStream.getTracks().forEach((track) => track.stop());
    conn?.disconnect();
    currentRoomId = "";
  }

  /**
   * @param {string} id
   */
  async function enterRoom(id) {
    if (id === "") {
      alert("ルームIDを入力してください");
      return;
    }

    currentRoomId = id;

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
    $id = nanoid();

    var type = "text/plain";
    var blob = new Blob([$id], { type });
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
<Technology />

{#if currentRoomId === ""}
  <input
    type="text"
    bind:value={$id}
    placeholder="ルームIDを入力してください"
  />
  <button on:click={() => enterRoom($id)}>入室する</button>
  <button on:click={handleRoomIdGenerateButtonClick}>ルームID生成</button>
  <button on:click={() => enterRoom($tmpId)}>カメラ・マイクチェック</button>
{:else}
  <button on:click={() => exitRoom()}>退室する</button>
{/if}

{#if currentRoomId === $tmpId}
  <!-- svelte-ignore a11y-media-has-caption -->
  <video bind:this={localVideo} autoplay playsinline />
{:else if currentRoomId !== ""}
  <video bind:this={localVideo} muted autoplay playsinline />
  <!-- svelte-ignore a11y-media-has-caption -->
  <video bind:this={remoteVideo} autoplay playsinline />
{/if}

<style>
  input[type="text"] {
    width: 280px;
  }
</style>
