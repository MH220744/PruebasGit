"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

const element = (
  <>
    <h1>Hola, Mundo!</h1>
    <h2>Son las {new Date().toTimeString()}</h2>
  </>
);

const equiposData = [
  {
    id: 1,
    nombre: "Real Madrid",
    plantilla: [
      { id: 1, nombre: "Eden Hazard", Altura: "1.75", Peso: "74" },
      { id: 2, nombre: "Gonzalo García", Altura: "1.82", Peso: "74" },
      { id: 3, nombre: "Karim Benzema", Altura: "1.85", Peso: "81" },
    ],
  },
  {
    id: 2,
    nombre: "Barcelona",
    plantilla: [
      { id: 1, nombre: "Marc-André ter Stegen", Altura: "1.75", Peso: "74" },
      { id: 2, nombre: "Iñigo Martinez", Altura: "1.82", Peso: "74" },
      { id: 3, nombre: "Gavi", Altura: "1.85", Peso: "81" },
    ],
  },
];

const Equipos = ({ equipos }) => {
  return (
    <div className={styles.container__list}>
      <h2 className={styles.title}>Equipos de Fútbol</h2>
      {equipos.map((equipo) => (
        <div key={equipo.id}>
          <h3 className={styles.nameclub}>{equipo.nombre}</h3>
          <ul>
            {equipo.plantilla.map((jugador) => (
              <li className={styles.container__list} key={jugador.id}>
                <strong>{jugador.nombre}</strong>
                <p>
                  Altura: {jugador.Altura}m <br />
                  Peso: {jugador.Peso}Kg
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  // Para calculadora suma/resta
  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [resultadoCalc, setResultadoCalc] = useState(null);

  // Para tabla de multiplicar
  const [numero, setNumero] = useState(1);
  const [limite, setLimite] = useState(10);
  const [resultadoTabla, setResultadoTabla] = useState([]);

  const sumar = () => {
    const res = parseFloat(numero1) + parseFloat(numero2);
    setResultadoCalc(`Resultado de la suma: ${res}`);
  };

  const restar = () => {
    const res = parseFloat(numero1) - parseFloat(numero2);
    setResultadoCalc(`Resultado de la resta: ${res}`);
  };

  const generarTabla = () => {
    const nuevaTabla = [];
    for (let i = 1; i <= limite; i++) {
      nuevaTabla.push(`${numero} x ${i} = ${numero * i}`);
    }
    setResultadoTabla(nuevaTabla);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="App">{element}</div>

        <div>
          <h1>Mi Aplicación de Fútbol</h1>
          <Equipos equipos={equiposData} />
        </div>

        <div className={styles.calculadora}>
          <div className={styles.numeros}>
            <label className={styles.text}>Número 1:</label>
            <input
              className={styles.inputnum}
              type="number"
              value={numero1}
              onChange={(e) => setNumero1(e.target.value)}
            />
          </div>

          <div className={styles.numeros}>
            <label className={styles.text}>Número 2:</label>
            <input
              className={styles.inputnum}
              type="number"
              value={numero2}
              onChange={(e) => setNumero2(e.target.value)}
            />
          </div>

          <div>
            <button className={styles.button} onClick={sumar}>
              Sumar
            </button>
            <button className={styles.button} onClick={restar}>
              Restar
            </button>
          </div>

          {resultadoCalc && (
            <div className={styles.resultado}>{resultadoCalc}</div>
          )}
        </div>

        <div>
          <h2 className={styles.title2}>Tabla de Multiplicar</h2>
          <label className={styles.text}>
            Ingrese un número:
            <input
              className={styles.input}
              type="number"
              value={numero}
              onChange={(e) => setNumero(parseInt(e.target.value) || 1)}
            />
          </label>
          <br />
          <label className={styles.text}>
            Límite de números a mostrar:
            <input
              className={styles.input}
              type="number"
              value={limite}
              onChange={(e) => setLimite(parseInt(e.target.value) || 10)}
            />
          </label>
          <br />
          <button className={styles.button} onClick={generarTabla}>
            Generar Tabla
          </button>
          <hr />
          <h3>Resultado</h3>
          <ul className={styles.ul}>
            {resultadoTabla.map((item, index) => (
              <li className={styles.li} key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol>
          <li>
            Get started by editing <code>src/app/page.js</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
