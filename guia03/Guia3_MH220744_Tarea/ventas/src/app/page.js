"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const [datos, setDatos] = useState([]);
  const [anioSeleccionado, setAnioSeleccionado] = useState(null);
  const [ventasFiltradas, setVentasFiltradas] = useState([]);

  useEffect(() => {
    fetch("/ventas.json")
      .then((res) => res.json())
      .then((data) => {
        setDatos(data);
        if (data.length > 0) setAnioSeleccionado(data[0].anio);
      });
  }, []);

  useEffect(() => {
    if (!anioSeleccionado) return;
    const añoData = datos.find((d) => d.anio === anioSeleccionado);
    setVentasFiltradas(añoData ? añoData.ventas : []);
  }, [anioSeleccionado, datos]);

  return (
    <main style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h1>Ventas Mensuales</h1>

      <label htmlFor="anio-select">Selecciona un año:</label>
      <select
        id="anio-select"
        value={anioSeleccionado || ""}
        onChange={(e) => setAnioSeleccionado(Number(e.target.value))}
        style={{ marginLeft: 10, padding: 5, fontSize: 16 }}
      >
        {datos.map((d) => (
          <option key={d.anio} value={d.anio}>
            {d.anio}
          </option>
        ))}
      </select>

      <div style={{ width: "100%", height: 400, marginTop: 40 }}>
        <ResponsiveContainer>
          <LineChart data={ventasFiltradas}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="monto"
              stroke="#0070f3"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}
