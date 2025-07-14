"use client";
import React, { useEffect, useState } from "react";
import Slider from "../../components/Slider";
import Tabs from "../../components/Tabs";

export default function Home() {
  const [planetas, setPlanetas] = useState([]);
  const [planetaActivo, setPlanetaActivo] = useState(null);

  useEffect(() => {
    fetch("/planetas.json")
      .then((res) => res.json())
      .then((data) => setPlanetas(data));
  }, []);

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Planetas del Sistema Solar</h1>
      <Slider planetas={planetas} onSelect={setPlanetaActivo} />

      {planetaActivo && (
        <>
          <h2>{planetaActivo.nombre}</h2>
          <Tabs planeta={planetaActivo} />
        </>
      )}
    </main>
  );
}
