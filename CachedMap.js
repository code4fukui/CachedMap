export class CachedMap {
  constructor(lifetimesec = 60 * 60) { // 1hour
    this.map = new Map();
    this.lifetime = lifetimesec * 1000;
    if (this.lifetime) {
      this.t = setInterval(() => {
        this.collectGarbage();
      }, this.lifetime / 10);
    }
  }
  stopGarbageCollector() {
    if (this.t) {
      clearInterval(this.t);
      this.t = null;
    }
  }
  get(name) {
    const o = this.map.get(name);
    if (!o) return null;
    o.access = new Date().getTime();
    return o.obj;
  }
  set(name, o) {
    if (this.has(name)) return this;
    const t = new Date().getTime();
    this.map.set(name, {
      obj: o,
      access: t,
      create: t,
    });
  }
  has(name) {
    return this.map.has(name);
  }
  collectGarbage() {
    const keys = this.map.keys();
    const t = new Date().getTime() - this.lifetime;
    for (const name of keys) {
      const o = this.map.get(name);
      if (o.access <= t) {
        this.map.delete(name);
      }
    }
  }
};
