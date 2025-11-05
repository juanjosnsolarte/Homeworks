import { useEffect, useMemo, useRef } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';

export default function Graph3D({ graph }) {
  const fgRef = useRef();
  const data = useMemo(() => graph.toForceGraph(), [graph]);

  const colorByType = (type) => (type === 'city' ? '#1f77b4' : '#2ca02c');

  const nodeThreeObject = (node) => {
    const size = node.type === 'city' ? 10 : 6;
    const geom = node.type === 'city'
      ? new THREE.SphereGeometry(size, 16, 16)
      : new THREE.OctahedronGeometry(size * 0.9);
    const mat = new THREE.MeshLambertMaterial({ color: colorByType(node.type) });
    return new THREE.Mesh(geom, mat);
  };

  useEffect(() => {
    fgRef.current?.zoomToFit(400, 100);
  }, []);

  return (
    <div style={{ height: '70vh', borderRadius: 12, overflow: 'hidden' }}>
      <ForceGraph3D
        ref={fgRef}
        graphData={data}
        nodeThreeObject={nodeThreeObject}
        linkOpacity={0.8}
        linkColor={() => '#ff7f0e'}          // solo “lives_in”
        linkWidth={() => 2.2}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.004}
        nodeLabel={n =>
          n.type === 'city'
            ? `🏙️ ${n.name}`
            : `👤 ${n.name} (${n.age})`
        }
        backgroundColor="#0c0f14"
      />
    </div>
  );
}
