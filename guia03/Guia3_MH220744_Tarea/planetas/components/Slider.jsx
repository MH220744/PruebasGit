"use client";
import React from "react";
import Image from "next/image";
import styles from "./Slider.module.css";

const Slider = ({ planetas, onSelect }) => {
  return (
    <div className={styles.slider}>
      {planetas.map((planeta) => (
        <div
          key={planeta.id}
          className={styles.slide}
          onClick={() => onSelect(planeta)}
        >
          <Image
            src={planeta.imagen}
            alt={planeta.nombre}
            width={150}
            height={150}
          />
          <p>{planeta.nombre}</p>
        </div>
      ))}
    </div>
  );
};

export default Slider;
