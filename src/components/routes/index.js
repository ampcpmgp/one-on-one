import CheckerSvelte from "./Checker.svelte";
import Home from "./Home.svelte";
import NotFound from "./NotFound.svelte";
import RoomSvelte from "./Room.svelte";

export default {
  "/": Home,
  "/checker": CheckerSvelte,
  "/room/:id": RoomSvelte,
  "*": NotFound,
};
