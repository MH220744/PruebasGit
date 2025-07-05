"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  // Estado para contador
  const [contador, setContador] = useState(0);

  // conversor
  const [grados, setGrados] = useState("");
  const [conversion, setConversion] = useState("CtoF");
  const [resultado, setResultado] = useState("");

  const convertir = () => {
    const valor = parseFloat(grados);
    if (isNaN(valor)) {
      setResultado("Ingrese un número válido.");
      return;
    }
    if (conversion === "CtoF") {
      setResultado(`${valor}°C = ${(valor * 9) / 5 + 32}°F`);
    } else {
      setResultado(`${valor}°F = ${((valor - 32) * 5) / 9}°C`);
    }
  };

  // login
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState("");

  const iniciarSesion = () => {
    if (usuario === "admin" && clave === "1234") {
      setMensaje(`Bienvenido, ${usuario}`);
    } else {
      setMensaje("Credenciales incorrectas.");
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
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

        {/* CONTADOR */}
        <section className={styles.calculadora}>
          <h2>Contador</h2>
          <p>Valor actual: <strong>{contador}</strong></p>
          <button className={styles.button} onClick={() => setContador(contador + 1)}>Incrementar</button>
          <button className={styles.button} onClick={() => setContador(contador - 1)}>Decrementar</button>
        </section>

        {/* CONVERSOR */}
        <section className={styles.calculadora}>
          <h2>Conversor de Temperatura</h2>
          <input
            className={styles.inputnum}
            type="number"
            value={grados}
            onChange={(e) => setGrados(e.target.value)}
            placeholder="Ingrese temperatura"
          />
          <select
            className={styles.inputnum}
            value={conversion}
            onChange={(e) => setConversion(e.target.value)}
          >
            <option value="CtoF">Celsius a Fahrenheit</option>
            <option value="FtoC">Fahrenheit a Celsius</option>
          </select>
          <button className={styles.button} onClick={convertir}>Convertir</button>
          {resultado && <p className={styles.resultado}>{resultado}</p>}
        </section>

        {/* LOGIN */}
        <section className={styles.calculadora}>
          <h2>Inicio de Sesión</h2>
          <input
            className={styles.inputnum}
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            className={styles.inputnum}
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
          <button className={styles.button} onClick={iniciarSesion}>Iniciar sesión</button>
          {mensaje && <p className={styles.resultado}>{mensaje}</p>}
        </section>

        {/* botones originales */}
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image className={styles.logo} src="/vercel.svg" alt="Vercel" width={20} height={20} />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://nextjs.org/learn" target="_blank" rel="noopener noreferrer">
          <Image src="/file.svg" alt="File icon" width={16} height={16} aria-hidden />
          Learn
        </a>
        <a href="https://vercel.com/templates?framework=next.js" target="_blank" rel="noopener noreferrer">
          <Image src="/window.svg" alt="Window icon" width={16} height={16} aria-hidden />
          Examples
        </a>
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          <Image src="/globe.svg" alt="Globe icon" width={16} height={16} aria-hidden />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
