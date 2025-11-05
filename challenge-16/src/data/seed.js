import Graph from '../structures/Graph';

export function buildSeedGraph() {
  const g = new Graph();

  g.addPerson({ name: 'Ana',   age: 24, cityName: 'Cali' });
  g.addPerson({ name: 'Luis',  age: 28, cityName: 'Cali' });
  g.addPerson({ name: 'Majo',  age: 22, cityName: 'Bogotá' });
  g.addPerson({ name: 'Santi', age: 30, cityName: 'Medellín' });
  g.addPerson({ name: 'Pablo', age: 26, cityName: 'Bogotá' });
  g.addPerson({ name: 'Vale',  age: 27, cityName: 'Medellín' });
  g.addPerson({ name: 'Juan',  age: 27, cityName: 'Medellín' });

  return g;
}
