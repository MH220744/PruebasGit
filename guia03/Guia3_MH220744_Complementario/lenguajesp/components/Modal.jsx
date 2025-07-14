"use client";
import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ show, onClose, lenguaje }) => {
  if (!show) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <h2>{lenguaje.nombre}</h2>
        <p>{lenguaje.descripcion}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
