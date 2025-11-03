import { useState } from "react";
import TreeView from "../components/TreeView";
import BinarySearchTree from "../structures/BinarySearchTree";

const SERIE_INICIAL = [8, 3, 10, 1, 6, 14, 4, 7, 13];

export default function Trees() {

  const [bst] = useState(() => {
    const t = new BinarySearchTree();
    SERIE_INICIAL.forEach(v => t.insert(v));
    return t;
  });

  const [value, setValue] = useState("");
  const [q, setQ] = useState("");

  const [version, setVersion] = useState(0);

    const data = bst.toD3();


  const onInsert = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    bst.insert(+value);     
    setValue("");
    setVersion(v => v + 1); 
  };

  const logTraversals = () => {
    console.clear();
    console.log("INORDER   (L-N-R):", bst.inorder());
    console.log("POSTORDER (L-R-N):", bst.postorder());
    console.log("PREORDER  (N-L-R):", bst.preorder());
  };

  const found =
    q !== "" ? (bst.contains(+q) ? "Está en el árbol" : "No está") : "";

  return (
    <>
      <form onSubmit={onInsert} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          type="number"
          placeholder="número a insertar"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button>Insertar</button>
        <button type="button" onClick={logTraversals}>Imprimir recorridos</button>
      </form>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
        <input
          type="number"
          placeholder="buscar valor"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <span>{found}</span>
      </div>
      <TreeView data={data} version={version} />
    </>
  );
}
