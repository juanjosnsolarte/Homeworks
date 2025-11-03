import { useMemo, useRef, useEffect, useState } from "react";
import Tree from "react-d3-tree";

export default function TreeView({ data, version }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      setDimensions({
        width: Math.max(300, clientWidth),
        height: Math.max(300, clientHeight),
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const translate = useMemo(
    () => ({ x: dimensions.width / 2, y: 60 }),
    [dimensions]
  );

  return (
    <div ref={containerRef} className="tree-container">
      <Tree
        key={version}            
        data={data}               
        translate={translate}
        zoom={0.8}
        separation={{ siblings: 1, nonSiblings: 1.2 }}
        orientation="vertical"
        collapsible={false}
        pathFunc="elbow"
      />
    </div>
  );
}
