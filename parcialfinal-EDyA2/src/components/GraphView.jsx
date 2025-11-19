import { useEffect, useRef, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";

const GraphView = ({ network }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const buildGraphData = () => {
    const nodes = [];
    const links = [];

    const cityId = (name) => `city-${name}`;
    const zoneId = (zone) => `zone-${zone.id}`;

    network.cities.forEach((city) => {
      nodes.push({
        id: cityId(city),
        name: `Ciudad: ${city}`,
        label: city,
        type: "city",
      });
    });

    const added = new Set();
    network.cities.forEach((city) => {
      const neighbors = network.getNeighbors(city);
      neighbors.forEach((n) => {
        const key = [city, n].sort().join("--");
        if (added.has(key)) return;
        added.add(key);

        links.push({
          source: cityId(city),
          target: cityId(n),
          type: "city-connection",
        });
      });
    });

    const entries = Object.entries(network.greenZones || {});

    for (const [cityName, roots] of entries) {
      if (!Array.isArray(roots) || roots.length === 0) continue;

      const traverse = (node, parent) => {
        if (!node) return;

        nodes.push({
          id: zoneId(node),
          name: `Zona: ${node.name}`,
          label: node.name,
          type: "zone",
        });

        if (parent) {
          links.push({
            source: zoneId(parent),
            target: zoneId(node),
            type: "zone-link",
          });
        } else {
          links.push({
            source: cityId(cityName),
            target: zoneId(node),
            type: "city-zone",
          });
        }

        (node.children || []).forEach((child) => traverse(child, node));
      };

      roots.forEach((root) => traverse(root, null));
    }

    return { nodes, links };
  };

  const graphData = buildGraphData();

  return (
    <div className="card graph-container">
      <h2>Vista 3D de la red</h2>

      <div className="graph-3d-wrapper" ref={containerRef}>
        {dimensions.width > 0 && dimensions.height > 0 && (
          <ForceGraph3D
            graphData={graphData}
            width={dimensions.width}
            height={dimensions.height}
            style={{ width: "100%", height: "100%" }}
            backgroundColor="#000000" 
            nodeLabel="name"
            nodeRelSize={6}
            nodeColor={(node) =>
              node.type === "city" ? "#2563eb" : "#22c55e"
            }
            linkColor={(link) => {
              if (link.type === "city-connection") return "#9ca3af";
              if (link.type === "city-zone") return "#4ade80";
              return "#86efac";
            }}
            linkWidth={(link) =>
              link.type === "city-connection" ? 2 : 1
            }
            linkOpacity={0.7}
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={0.01}
            linkDirectionalParticleColor={(link) =>
              link.type === "city-connection" ? "#e5e7eb" : "#bbf7d0"
            }
          />
        )}
      </div>
    </div>
  );
};

export default GraphView;
