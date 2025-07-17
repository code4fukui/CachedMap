import * as t from "https://deno.land/std/testing/asserts.ts";
import { CachedMap } from "./CachedMap.js";
import { sleep } from "https://js.sabae.cc/sleep.js";

Deno.test("simple", async () => {
  const cache = new CachedMap();
  cache.set("a", "abc");
  cache.set("b", "bcd");
  t.assertEquals(cache.get("a"), "abc");
  t.assertEquals(cache.get("b"), "bcd");
  t.assertEquals(cache.get("c"), undefined);
});
Deno.test("gc", async () => {
  const cache = new CachedMap(2); // maxSize = 1
  cache.set("a", "abc");
  cache.set("b", "bcd");
  cache.set("c", "cde");
  t.assertEquals(cache.get("a"), undefined); // gc
  t.assertEquals(cache.get("c"), "cde"); // use c before b
  await sleep(1);
  t.assertEquals(cache.get("b"), "bcd");
  cache.set("d", "def");
  t.assertEquals(cache.get("b"), "bcd"); // gc
  t.assertEquals(cache.get("c"), undefined);
  t.assertEquals(cache.get("d"), "def");
});
