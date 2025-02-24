"use client";

import React, { useState, useEffect, FormEvent } from "react";

interface Item {
  id: number;
  name: string;
}

const ItemsPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/items");
      if (!res.ok) {
        throw new Error("Error fetching items");
      }
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        throw new Error("Error posting item");
      }
      setName("");
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h1>Items</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "1rem" }}
        />
        <button type="submit">Add Item</button>
      </form>

      <ul style={{ marginTop: "2rem" }}>
        {items.map((item) => (
          <li key={item.id}>
            {item.id}: {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsPage;
