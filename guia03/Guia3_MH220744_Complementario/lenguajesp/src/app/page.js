"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "../../components/Modal";
import styles from "./page.module.css";

export default function Home() {
  const [lenguajes, setLenguajes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [lenguajeActivo, setLenguajeActivo] = useState(null);

  useEffect(() => {
    fetch("/lenguajes.js")
      .then((res) => res.json())
      .then((data) => setLenguajes(data));
  }, []);

  const abrirModal = (lenguaje) => {
    setLenguajeActivo(lenguaje);
    setModalOpen(true);
  };

  return (
    <main className={styles.main}>
      <h1>Lenguajes de Programación</h1>
      <div className={styles.grid}>
        {lenguajes.map((lenguaje) => (
          <div key={lenguaje.id} className={styles.card}>
            <Image
              src={lenguaje.imagen}
              alt={lenguaje.nombre}
              width={100}
              height={100}
            />
            <h3>{lenguaje.nombre}</h3>
            <button onClick={() => abrirModal(lenguaje)}>Ver más</button>
          </div>
        ))}
      </div>

      <Modal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        lenguaje={lenguajeActivo}
      />
    </main>
  );
}
