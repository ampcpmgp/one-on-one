<script>
  import { currentId } from "./../../states/!common/room.js";
  import Content from "../containers/Home/Content.svelte";
  import Header from "../parts/Header/Header.svelte";

  $currentId = "";
</script>

<Header />
<Content />
