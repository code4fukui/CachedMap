# CachedMap

キャッシュ用のサイズ制限付きMap。

## 機能
- LRU (Least Recently Used) キャッシュ置換アルゴリズムを実装
- キャッシュサイズが上限を超えた場合、最も古いアイテムを自動的に削除
- キャッシュ管理用の一般的なMapライクなメソッドを提供

## 使い方

```js
import { CachedMap } from "https://code4fukui.github.io/CachedMap/CachedMap.js";
import { sleep } from "https://js.sabae.cc/sleep.js";

const maxSize = 1;
const cache = new CachedMap(maxSize);
cache.set("a", "abc");
await sleep(1);
cache.set("b", "bcd");
console.log(cache.get("a")); // null (期限切れ)
console.log(cache.get("b")); // "bcd"
```

## テスト

```sh
deno test --allow-import
```

## ライセンス

MIT License — 詳細は[LICENSE](LICENSE)を参照。
