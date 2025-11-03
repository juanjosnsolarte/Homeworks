import MenuItem from "./MenuItem";

const Sidebar = ({ tree, onSelect }) => {
  return (
    <div className="sidebar">
      <h2>{tree.root.title}</h2>
      {tree.root.children.map((node, index) => (
        <MenuItem key={index} node={node} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default Sidebar;
