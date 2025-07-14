"use client";
import React, { useState } from "react";
import styles from "./Slider.module.css";

const Tabs = ({ planeta }) => {
  const [tab, setTab] = useState("masa");

  return (
    <div className={styles.tabs}>
      <div className={styles.tab_buttons}>
        <button onClick={() => setTab("masa")}>Masa</button>
        <button onClick={() => setTab("distancia")}>Distancia al Sol</button>
        <button onClick={() => setTab("temperatura")}>Temperatura</button>
      </div>

      <div className={styles.tab_content}>
        {tab === "masa" && <p><strong>Masa:</strong> {planeta.masa}</p>}
        {tab === "distancia" && <p><strong>Distancia:</strong> {planeta.distancia}</p>}
        {tab === "temperatura" && <p><strong>Temperatura:</strong> {planeta.temperatura}</p>}
      </div>
    </div>
  );
};

export default Tabs;
