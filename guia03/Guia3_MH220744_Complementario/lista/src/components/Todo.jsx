import React from "react";
import styles from "../app/page.module.css";

const Producto = ({ producto, index, deleteProducto, editarProducto }) => {
  const subtotal = (parseFloat(producto.precio) * parseInt(producto.cantidad)).toFixed(2);

  return (
    <div className={styles.list}>
      <div style={{ flex: 1 }}>
        <p><strong>{producto.nombre}</strong> ({producto.marca})</p>
        <p>Cantidad: {producto.cantidad}</p>
        <p>Precio: ${parseFloat(producto.precio).toFixed(2)}</p>
        <p>Subtotal: ${subtotal}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <button className={styles.btn_delete} onClick={() => deleteProducto(index)}>
          X
        </button>
        <button
          className={styles.btn_edit}
          onClick={() => editarProducto(index)}
        >
          ✎
        </button>
      </div>
    </div>
  );
};

export default Producto;
