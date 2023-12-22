import React, { useState, useEffect } from "react";
import Product from "./components/Product";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import ProducUpdate from "./components/ProducUpdate";

const Products = () => {
  const [visibleProductUpdate, setVisibleProductUpdate] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      toast.success("Products Fetched Successfully");
    } catch (error) {
      toast.error("Products Fetched Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBtnCliked = async (id) => {
    setLoading(true);
    try {
      setProducts(products.filter((product) => product.id !== id));
      toast.success("Product Deleted Successfully");
    } catch (error) {
      toast.error("Product Deleted Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEditBtnCliked = (product) => {
    setEditedProduct(product);
    setVisibleProductUpdate(true);
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className={styles.productsContainer}>
      {products.map((product) => {
        return <Product key={product.id} product={product} onDelete={handleDeleteBtnCliked} onUpdate={handleEditBtnCliked} />;
      })}
      {products.length === 0 && (
        <div className={styles.notFound}>
          <h2>No Products Found</h2>
        </div>
      )}
      <ProducUpdate visible={visibleProductUpdate} setVisible={setVisibleProductUpdate} editedProduct={editedProduct} setEditedProduct={setEditedProduct} setProducts={setProducts} />
    </div>
  );
};

export default Products;
