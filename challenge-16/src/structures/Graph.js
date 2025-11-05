let autoId = 1;
const genId = (prefix) => `${prefix}_${autoId++}`;

export default class Graph {
  constructor() {
    this.nodes = new Map();      
    this.links = [];             
    this.cityIndex = new Map();  
    this.peopleIndex = new Map();
  }

  addCity(name) {
    if (this.cityIndex.has(name)) return this.nodes.get(this.cityIndex.get(name));
    const id = genId('city');
    const node = { id, type: 'city', name };
    this.nodes.set(id, node);
    this.cityIndex.set(name, id);
    return node;
  }

  addPerson({ name, age, cityName }) {
    if (this.peopleIndex.has(name)) throw new Error(`Ya existe la persona "${name}"`);
    const city = this.addCity(cityName);
    const id = genId('person');
    const node = { id, type: 'person', name, age, cityId: city.id };
    this.nodes.set(id, node);
    this.peopleIndex.set(name, id);
    // ÚNICA relación: persona -> ciudad
    this.links.push({ source: id, target: city.id, relation: 'lives_in' });
    return node;
  }

  residents(cityName) {
    const cityId = this.cityIndex.get(cityName);
    if (!cityId) return [];
    return [...this.nodes.values()]
      .filter(n => n.type === 'person' && n.cityId === cityId)
      .map(n => ({ name: n.name, age: n.age }));
  }

  toForceGraph() {
    return { nodes: [...this.nodes.values()], links: [...this.links] };
  }

  cities() {
    return [...this.cityIndex.keys()];
  }
}
