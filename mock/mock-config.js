import mock from "am-mocktimes";
import { replace } from "svelte-spa-router";
import sleep from "../src/utils/sleep";
import * as room from "../src/states/!common/room";

mock({
  sleep,
  room,

  page(name) {
    replace(name);
  },
});
