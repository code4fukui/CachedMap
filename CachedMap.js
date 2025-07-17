export class CachedMap {
  constructor(maxSize = 1000) {
    this.map = new Map();
    this.maxSize = maxSize;
  }
  get(name) {
    const o = this.map.get(name);
    if (!o) return undefined;
    o.access = Date.now();
    return o.obj;
  }
  set(name, o) {
    const t = Date.now();
    this.map.set(name, {
      obj: o,
      access: t,
    });
    // LRU処理: サイズオーバー時は最も古いものを削除
    while (this.map.size > this.maxSize) {
      let maxt = Date.now();
      let id = null;
      for (const name of this.map.keys()) {
        const o = this.map.get(name);
        if (o.access < maxt) {
          maxt = o.access;
          id = name;
        }
      }
      this.map.delete(id);
    }
    return this;
  }
  has(name) {
    return this.map.has(name);
  }
  delete(name) {
    return this.map.delete(name);
  }
  size() {
    return this.map.size;
  }
  clear() {
    this.map.clear();
  }
  keys() {
    return this.map.keys();
  }
  values() {
    return Array.from(this.map.values()).map(e => e.obj);
  }
  entries() {
    return Array.from(this.map.entries()).map(([k, v]) => [k, v.obj]);
  }
  forEach(fn) {
    for (const [k, v] of this.map.entries()) {
      fn(v.obj, k, this);
    }
  }
};
