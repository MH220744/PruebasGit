"use client";
import React, { useState } from "react";
import styles from "../app/page.module.css";
import Producto from "./Todo.jsx";

const Form = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    marca: "",
    cantidad: "",
    precio: ""
  });

  const [productos, setProductos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [indiceEdicion, setIndiceEdicion] = useState(null);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const { nombre, marca, cantidad, precio } = producto;

    if (
      !nombre.trim() ||
      !marca.trim() ||
      isNaN(cantidad) || cantidad <= 0 ||
      isNaN(precio) || precio <= 0
    ) {
      alert("Todos los campos deben estar completos y válidos.");
      return;
    }

    if (modoEdicion) {
      const nuevosProductos = [...productos];
      nuevosProductos[indiceEdicion] = producto;
      setProductos(nuevosProductos);
      setModoEdicion(false);
      setIndiceEdicion(null);
    } else {
      setProductos([...productos, producto]);
    }

    setProducto({ nombre: "", marca: "", cantidad: "", precio: "" });
  };

  const deleteProducto = (index) => {
    const nuevosProductos = [...productos];
    nuevosProductos.splice(index, 1);
    setProductos(nuevosProductos);

    if (modoEdicion && indiceEdicion === index) {
      setModoEdicion(false);
      setIndiceEdicion(null);
      setProducto({ nombre: "", marca: "", cantidad: "", precio: "" });
    }
  };

  const editarProducto = (index) => {
    setProducto(productos[index]);
    setModoEdicion(true);
    setIndiceEdicion(index);
  };

  const calcularTotal = () => {
    return productos.reduce((total, p) => {
      return total + parseFloat(p.precio) * parseInt(p.cantidad);
    }, 0).toFixed(2);
  };

  return (
    <>
      <form onSubmit={handleClick}>
        <input
          className={styles.form_input}
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={producto.nombre}
          onChange={handleChange}
        />
        <input
          className={styles.form_input}
          type="text"
          name="marca"
          placeholder="Marca"
          value={producto.marca}
          onChange={handleChange}
        />
        <input
          className={styles.form_input}
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={producto.cantidad}
          onChange={handleChange}
        />
        <input
          className={styles.form_input}
          type="number"
          name="precio"
          placeholder="Precio unitario"
          step="0.01"
          value={producto.precio}
          onChange={handleChange}
        />
        <button className={styles.form_button} type="submit">
          {modoEdicion ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <h2>Productos:</h2>
      {productos.map((p, index) => (
        <Producto
          key={index}
          producto={p}
          index={index}
          deleteProducto={deleteProducto}
          editarProducto={editarProducto}
        />
      ))}

      <h3>Total: ${calcularTotal()}</h3>
    </>
  );
};

export default Form;
