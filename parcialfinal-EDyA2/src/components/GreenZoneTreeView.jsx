const GreenZoneTreeView = ({ node }) => {
  if (!node) return null;

  return (
    <ul className="tree">
      <li>
        <div className="tree-node">
          <span className="tree-node-id">#{node.id}</span>
          <span className="tree-node-name">{node.name}</span>
        </div>
        {node.children.length > 0 && (
          <ul>
            {node.children.map((child) => (
              <li key={child.id}>
                <GreenZoneTreeView node={child} />
              </li>
            ))}
          </ul>
        )}
      </li>
    </ul>
  );
};

export default GreenZoneTreeView;
