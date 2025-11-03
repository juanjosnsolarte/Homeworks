import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { NaryTree, Node } from "./structures/NaryTree";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Electronics from "./subpages/Electronics";
import Laptops from "./subpages/Laptops";
import Phones from "./subpages/Phones";
import Clothing from "./subpages/Clothing";
import Tshirts from "./subpages/Tshirts";
import Jeans from "./subpages/Jeans";
import "./index.css";

function App() {
  const home = new Node("Home", "/", <Home />);
  const about = new Node("About", "/about", <About />);
  const products = new Node("Products", "/products", <Products />);
  const contact = new Node("Contact", "/contact", <Contact />);

  // Submenú electronics 
  const electronics = new Node("Electronics", "/products/electronics", <Electronics />);
  const laptops = new Node("Laptops", "/products/electronics/laptops", <Laptops />);
  const phones = new Node("Phones", "/products/electronics/phones", <Phones /> );

  // Submenú clothing
  const clothing = new Node("Clothing", "/products/clothing", <Clothing />);
  const tshirts = new Node("Tshirts", "/products/clothing/tshirts", <Tshirts />);
  const jeans = new Node("Jeans", "/products/clothing/jeans", <Jeans />);

  // Submenú electronics 
  products.addChild(electronics);
  electronics.addChild(laptops);
  electronics.addChild(phones);

  // Submenú clothing
  products.addChild(clothing);
  clothing.addChild(tshirts);
  clothing.addChild(jeans);

  const root = new Node("Menu Principal", "/", null);
  root.addChild(home);
  root.addChild(about);
  root.addChild(products);
  root.addChild(contact);

  const tree = new NaryTree(root);

  const [selectedComponent, setSelectedComponent] = useState(<Home />);

  return (
    <div className="app-container">
      <Sidebar tree={tree} onSelect={setSelectedComponent} />
      <div className="content">{selectedComponent}</div>
    </div>
  );
}

export default App;