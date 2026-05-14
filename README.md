# CachedMap

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A Map with a size limit for caching.

## Features
- Implements a Least Recently Used (LRU) cache replacement strategy
- Automatically removes the least recently used items when the cache size exceeds the limit
- Provides common Map-like methods for managing the cache

## Usage

```js
import { CachedMap } from "https://code4fukui.github.io/CachedMap/CachedMap.js";
import { sleep } from "https://js.sabae.cc/sleep.js";

const maxSize = 1;
const cache = new CachedMap(maxSize);
cache.set("a", "abc");
await sleep(1);
cache.set("b", "bcd");
console.log(cache.get("a")); // null (expired)
console.log(cache.get("b")); // "bcd"
```

## Test

```sh
deno test --allow-import
```

## License

MIT License — see [LICENSE](LICENSE).