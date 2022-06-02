import { test } from "uvu";
import * as assert from "uvu/assert";
import { greeting } from "./greetings";

test("挨拶が出来る", () => {
  greeting.subscribe((value) => {
    assert.is(value, "Hello world!");
  });
});

test.run();
