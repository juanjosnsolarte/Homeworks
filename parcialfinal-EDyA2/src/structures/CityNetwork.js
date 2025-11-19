export class GreenZoneNode {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }
}

export class CityNetwork {
  constructor() {
    this.cities = [];
    this.adjacency = {}; 
    this.greenZones = {};
    this.lastZoneId = 0; 
  }

  addCity(name) {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (this.cities.includes(trimmed)) return;

    this.cities.push(trimmed);
    this.adjacency[trimmed] = new Set();
    this.greenZones[trimmed] = [];
  }

  deleteCity(name) {
    if (!this.cities.includes(name)) return;

    this.cities = this.cities.filter((c) => c !== name);

    delete this.adjacency[name];
    for (const city of Object.keys(this.adjacency)) {
      this.adjacency[city].delete(name);
    }

    delete this.greenZones[name];

    this._recalculateLastZoneId();
  }

  connectCities(a, b) {
    if (!this.adjacency[a] || !this.adjacency[b]) return;
    if (a === b) return; 
    this.adjacency[a].add(b);
    this.adjacency[b].add(a);
  }

  getNeighbors(name) {
    return this.adjacency[name] ? Array.from(this.adjacency[name]) : [];
  }

  _createZoneNode(name) {
    const id = ++this.lastZoneId;
    return new GreenZoneNode(id, name);
  }

  addRootZone(cityName, zoneName) {
    if (!this.greenZones[cityName]) {
      this.greenZones[cityName] = [];
    }
    const newRoot = this._createZoneNode(zoneName);
    this.greenZones[cityName].push(newRoot);
  }

  addSubZone(cityName, parentId, zoneName) {
    const roots = this.greenZones[cityName];
    if (!roots || roots.length === 0) return;

    const parent = this._findNodeByIdInRoots(roots, parentId);
    if (!parent) return;

    const newNode = this._createZoneNode(zoneName);
    parent.addChild(newNode);
  }

  editZone(cityName, zoneId, newName) {
    const roots = this.greenZones[cityName];
    if (!roots || roots.length === 0) return;

    const node = this._findNodeByIdInRoots(roots, zoneId);
    if (!node) return;

    node.name = newName;
  }

  getCityRoots(cityName) {
    return this.greenZones[cityName] || [];
  }

  getCityRootZone(cityName) {
    const roots = this.greenZones[cityName];
    return roots && roots.length > 0 ? roots[0] : null;
  }

  _findNodeById(node, id) {
    if (!node) return null;
    if (node.id === id) return node;

    for (const child of node.children) {
      const found = this._findNodeById(child, id);
      if (found) return found;
    }
    return null;
  }

  _findNodeByIdInRoots(roots, id) {
    for (const root of roots) {
      const found = this._findNodeById(root, id);
      if (found) return found;
    }
    return null;
  }

  _countZones(node) {
    if (!node) return 0;
    let total = 1;
    for (const child of node.children) {
      total += this._countZones(child);
    }
    return total;
  }

  _height(node) {
    if (!node) return 0;
    if (node.children.length === 0) return 1;
    let maxChild = 0;
    for (const child of node.children) {
      const h = this._height(child);
      if (h > maxChild) maxChild = h;
    }
    return 1 + maxChild;
  }

  getStats(cityName) {
    const roots = this.greenZones[cityName];
    if (!roots || roots.length === 0) {
      return { totalZones: 0, height: 0 };
    }

    let totalZones = 0;
    let maxHeight = 0;

    for (const root of roots) {
      totalZones += this._countZones(root);
      const h = this._height(root);
      if (h > maxHeight) maxHeight = h;
    }

    return { totalZones, height: maxHeight };
  }

  _recalculateLastZoneId() {
    let maxId = 0;

    for (const roots of Object.values(this.greenZones)) {
      if (!roots) continue;
      for (const root of roots) {
        const stack = [root];
        while (stack.length > 0) {
          const node = stack.pop();
          if (node.id > maxId) maxId = node.id;
          node.children.forEach((child) => stack.push(child));
        }
      }
    }

    this.lastZoneId = maxId;
  }
}
