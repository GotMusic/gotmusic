import type React from "react";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  artist: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  duration?: string;
  format?: string;
}

interface CatalogShowcaseProps {
  title?: string;
  products?: Product[];
  showFilters?: boolean;
  showSearch?: boolean;
  itemsPerPage?: number;
}

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Summer Vibes",
    artist: "DJ Producer",
    price: 2.99,
    currency: "USD",
    image: "https://via.placeholder.com/300x300/007bff/ffffff?text=Summer+Vibes",
    category: "Electronic",
    duration: "3:45",
    format: "MP3",
  },
  {
    id: "2",
    name: "Urban Beat",
    artist: "City Sounds",
    price: 1.99,
    currency: "USD",
    image: "https://via.placeholder.com/300x300/28a745/ffffff?text=Urban+Beat",
    category: "Hip-Hop",
    duration: "4:12",
    format: "WAV",
  },
  {
    id: "3",
    name: "Acoustic Dreams",
    artist: "Folk Artist",
    price: 3.49,
    currency: "USD",
    image: "https://via.placeholder.com/300x300/dc3545/ffffff?text=Acoustic+Dreams",
    category: "Folk",
    duration: "5:23",
    format: "FLAC",
  },
  {
    id: "4",
    name: "Electronic Pulse",
    artist: "Synth Master",
    price: 2.49,
    currency: "USD",
    image: "https://via.placeholder.com/300x300/ffc107/000000?text=Electronic+Pulse",
    category: "Electronic",
    duration: "6:18",
    format: "MP3",
  },
  {
    id: "5",
    name: "Jazz Fusion",
    artist: "Modern Jazz",
    price: 4.99,
    currency: "USD",
    image: "https://via.placeholder.com/300x300/6f42c1/ffffff?text=Jazz+Fusion",
    category: "Jazz",
    duration: "7:32",
    format: "WAV",
  },
  {
    id: "6",
    name: "Rock Anthem",
    artist: "Rock Band",
    price: 3.99,
    currency: "USD",
    image: "https://via.placeholder.com/300x300/fd7e14/ffffff?text=Rock+Anthem",
    category: "Rock",
    duration: "4:56",
    format: "FLAC",
  },
];

export const CatalogShowcase: React.FC<CatalogShowcaseProps> = ({
  title = "Music Catalog",
  products = defaultProducts,
  showFilters = true,
  showSearch = true,
  itemsPerPage = 6,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const categories = ["All", ...new Set(products.map((product) => product.category))];

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.artist.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((product) => selectedCategory === "All" || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "artist":
          return a.artist.localeCompare(b.artist);
        case "price":
          return a.price - b.price;
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    })
    .slice(0, itemsPerPage);

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>{title}</h1>

      {(showSearch || showFilters) && (
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {showSearch && (
            <input
              type="text"
              placeholder="Search music..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "0.5rem",
                border: "1px solid #e9ecef",
                borderRadius: "4px",
                minWidth: "200px",
              }}
            />
          )}

          {showFilters && (
            <>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: "0.5rem",
                  border: "1px solid #e9ecef",
                  borderRadius: "4px",
                }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "0.5rem",
                  border: "1px solid #e9ecef",
                  borderRadius: "4px",
                }}
              >
                <option value="name">Sort by Name</option>
                <option value="artist">Sort by Artist</option>
                <option value="price">Sort by Price</option>
                <option value="category">Sort by Category</option>
              </select>
            </>
          )}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #e9ecef",
              borderRadius: "8px",
              overflow: "hidden",
              background: "white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "1rem" }}>
              <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>{product.name}</h3>
              <p style={{ margin: "0 0 0.5rem 0", color: "#6c757d", fontSize: "0.9rem" }}>
                {product.artist}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <span
                  style={{
                    background: "#e9ecef",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                  }}
                >
                  {product.category}
                </span>
                <span style={{ fontWeight: "bold", color: "#007bff" }}>${product.price}</span>
              </div>

              {product.duration && (
                <div style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "0.5rem" }}>
                  Duration: {product.duration}
                </div>
              )}

              {product.format && (
                <div style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: "1rem" }}>
                  Format: {product.format}
                </div>
              )}

              <button
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#6c757d",
          }}
        >
          <h3>No products found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};
