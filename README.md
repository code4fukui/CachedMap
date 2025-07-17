# CacheMap

- Map with size limit for Cache

## usage

```js
import { CachedMap } from "https://code4fukui.github.io/CachedMap/CachedMap.js";
import { sleep } from "https://js.sabae.cc/sleep.js";

const maxSize = 1;
const cache = new CachedMap(maxSize);
cache.set("a", "abc");
await sleep(1);
cache.set("b", "bcd");
console.log(cache.get("a")); // null // expired
console.log(cache.get("b")); // "bcd"
```

## test

```sh
deno test --allow-import
```
