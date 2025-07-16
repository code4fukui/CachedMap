# CacheMap

- Map with cache support

## usage

```js
import { CachedMap } from "https://code4fukui.github.io/CachedMap/CachedMap.js";
import { sleep } from "https://js.sabae.cc/sleep.js";

const lifetime = 0.1; // lifetime in sec, 0.1 = 100msec
const cache = new CachedMap(lifetime);
cache.set("a", "abc");
await sleep(150);
cache.set("b", "bcd");
t.assertEquals(cache.get("a"), null); // expired
t.assertEquals(cache.get("b"), "bcd");
t.assertEquals(cache.get("c"), null);
await sleep(150);
t.assertEquals(cache.get("b"), null); // expired
cache.stopGarbageCollector();
```
