import * as t from "https://deno.land/std/testing/asserts.ts";
import { CachedMap } from "./CachedMap.js";
import { sleep } from "https://js.sabae.cc/sleep.js";

Deno.test("simple", async () => {
  const cache = new CachedMap();
  cache.set("a", "abc");
  cache.set("b", "bcd");
  t.assertEquals(cache.get("a"), "abc");
  t.assertEquals(cache.get("b"), "bcd");
  t.assertEquals(cache.get("c"), null);
  cache.stopGarbageCollector();
});
Deno.test("gc", async () => {
  const cache = new CachedMap(0.1); // lifetime = 100msec
  cache.set("a", "abc");
  await sleep(150);
  cache.set("b", "bcd");
  t.assertEquals(cache.get("a"), null); // gc
  t.assertEquals(cache.get("b"), "bcd");
  t.assertEquals(cache.get("c"), null);
  await sleep(150);
  t.assertEquals(cache.get("b"), null); // gc
  cache.stopGarbageCollector();
});
