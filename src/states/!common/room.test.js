import { test } from "uvu";
import * as assert from "uvu/assert";
import { id } from "./room";

test("should id is empty string", () => {
  id.subscribe((value) => {
    assert.is(value, "");
  });
});

test.run();
