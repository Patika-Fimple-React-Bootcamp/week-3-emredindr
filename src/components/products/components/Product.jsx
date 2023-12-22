import React, { useState } from "react";
import styles from "../styles.module.css";
import { MdDelete, MdEdit } from "react-icons/md";
 
const Product = ({ product, onDelete, onUpdate }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.productCard} key={product.id}>
      <div className={styles.iconContainer}>
        <i className={styles.deleteIcon} onClick={() => onDelete(product.id)}>
          <MdDelete size={25} />
        </i>
        <i className={styles.editIcon} onClick={() => onUpdate(product)}>
          <MdEdit size={25} />
        </i>
      </div>
      <h2 className={styles.productTitle}>{product.title}</h2>
      <img className={styles.productImage} src={product.image} />
      <button onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={styles.productPrice}>
        {isHovered ? `Buy now ($ ${product.price})` : `$ ${product.price}`}
      </button>
    </div>
  );
};

export default Product;
