//Question 1
import React, { useState } from "react";

const ProductCard = React.memo(function ProductCard({ product, onAddToCart }) {
  console.log("ProductCard rendered:", product.id);

  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
  );
});

const CartSummary = React.memo(function CartSummary({ cartCount }) {
  console.log("CartSummary rendered");
  return <h2>Cart: {cartCount}</h2>;
});

const productsData = [
  { id: 1, name: "Laptop", price: 70000 },
  { id: 2, name: "Phone", price: 40000 },
  { id: 3, name: "Headphones", price: 5000 },
];

function Store() {
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = productsData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (id) => {
    console.log("Added:", id);
    setCartCount((c) => c + 1);
  };

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products"
      />

      <CartSummary cartCount={cartCount} />

      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

export default Store;


//Question 2

const products = [
  { id: 1, name: "iPhone", category: "mobile", price: 70000 },
  { id: 2, name: "MacBook", category: "laptop", price: 120000 },
  { id: 3, name: "AirPods", category: "audio", price: 20000 },
  { id: 4, name: "Samsung Galaxy", category: "mobile", price: 65000 },
  { id: 5, name: "Dell XPS", category: "laptop", price: 95000 },
];

const CategoryTabs = React.memo(function CategoryTabs({ activeCategory, onChange }) {
  console.log("CategoryTabs rendered");

  return (
    <div>
      {["all", "mobile", "laptop", "audio"].map((cat) => (
        <button key={cat} onClick={() => onChange(cat)}>
          {cat} {activeCategory === cat ? "(selected)" : ""}
        </button>
      ))}
    </div>
  );
});

const SearchBar = React.memo(function SearchBar({ search, onSearch }) {
  console.log("SearchBar rendered");

  return (
    <input
      value={search}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search products"
    />
  );
});

const ProductCard2 = React.memo(function ProductCard({ product, onWishlist, isWishlisted }) {
  console.log("ProductCard rendered:", product.id);

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p>₹{product.price}</p>
      <button onClick={() => onWishlist(product.id)}>
        {isWishlisted ? "Remove Wishlist" : "Add Wishlist"}
      </button>
    </div>
  );
});

const WishlistSummary = React.memo(function WishlistSummary({ count }) {
  console.log("WishlistSummary rendered");
  return <h2>Wishlist Count: {count}</h2>;
});

 function ProductPage2() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [wishlist, setWishlist] = useState([]);

  const visibleProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <WishlistSummary count={wishlist.length} />

      <CategoryTabs
        activeCategory={activeCategory}
        onChange={(cat) => setActiveCategory(cat)}
      />

      <SearchBar search={search} onSearch={(value) => setSearch(value)} />

      {visibleProducts.map((product) => (
        <ProductCard2
          key={product.id}
          product={product}
          isWishlisted={wishlist.includes(product.id)}
          onWishlist={handleWishlist}
        />
      ))}
    </div>
  );
}


//Question 3

const FieldCard = React.memo(function FieldCard({
  field,
  onLabelChange,
  onDelete,
  onToggleRequired,
}) {
  console.log("FieldCard rendered:", field.id);

  return (
    <div style={{ border: "1px solid gray", margin: "12px", padding: "12px" }}>
      <input
        value={field.label}
        onChange={(e) => onLabelChange(field.id, e.target.value)}
        placeholder="Field label"
      />

      <p>Type: {field.type}</p>

      <label>
        <input
          type="checkbox"
          checked={field.required}
          onChange={() => onToggleRequired(field.id)}
        />
        Required
      </label>

      <button onClick={() => onDelete(field.id)}>Delete</button>
    </div>
  );
});

const FormPreview = React.memo(function FormPreview({ title, fields }) {
  console.log("FormPreview rendered");

  return (
    <div>
      <h2>{title}</h2>
      {fields.map((field) => (
        <div key={field.id}>
          {field.label} {field.required ? "*" : ""}
        </div>
      ))}
    </div>
  );
});

const Toolbar = React.memo(function Toolbar({ onAddText, onAddPhone }) {
  console.log("Toolbar rendered");

  return (
    <div>
      <button onClick={onAddText}>Add Text Field</button>
      <button onClick={onAddPhone}>Add Phone Field</button>
    </div>
  );
});

function FormBuilder() {
  const [title, setTitle] = useState("Customer Verification Form");
  const [fields, setFields] = useState([
    { id: 1, type: "text", label: "Full Name", required: true },
    { id: 2, type: "phone", label: "Phone Number", required: false },
  ]);

  const handleAddText = () => {
    setFields((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "text",
        label: "New Text Field",
        required: false,
      },
    ]);
  };

  const handleAddPhone = () => {
    setFields((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "phone",
        label: "New Phone Field",
        required: false,
      },
    ]);
  };

  const handleDelete = (id) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  const handleToggleRequired = (id) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, required: !field.required } : field
      )
    );
  };

  const handleLabelChange = (id, value) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, label: value } : field
      )
    );
  };

  return (
    <div>
      <h1>Form Builder</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Form title"
      />

      <Toolbar onAddText={handleAddText} onAddPhone={handleAddPhone} />

      {fields.map((field) => (
        <FieldCard
          key={field.id}
          field={field}
          onDelete={handleDelete}
          onToggleRequired={handleToggleRequired}
          onLabelChange={handleLabelChange}
        />
      ))}

      <FormPreview title={title} fields={fields} />
    </div>
  );
}