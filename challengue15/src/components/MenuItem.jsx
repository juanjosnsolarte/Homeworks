import { useState } from "react";

const MenuItem = ({ node, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="menu-item">
      <div className="menu-title" onClick={() => {
        setOpen(!open);
        if (node.component) onSelect(node.component);
      }}>
        {node.title}
      </div>
      {open && node.children.length > 0 && (
        <div className="submenu">
          {node.children.map((child, i) => (
            <MenuItem key={i} node={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
