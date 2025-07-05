"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";

const Equipos = ({ equipos }) => (
  <div className={styles.container__list}>
    <h2 className={styles.title}>Equipos de Fútbol</h2>
    {equipos.map((equipo) => (
      <div key={equipo.id}>
        <h3 className={styles.nameclub}>{equipo.nombre}</h3>
        <ul className={styles.listaJugadores}>
          {equipo.plantilla.map((jugador) => (
            <li className={styles.cardJugador} key={jugador.id}>
              <Image
                src={jugador.foto}
                alt={jugador.nombre}
                width={100}
                height={100}
                className={styles.fotoJugador}
              />
              <div>
                <strong>{jugador.nombre}</strong>
                <p>
                  Altura: {jugador.Altura} m<br />
                  Peso: {jugador.Peso} Kg
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default function Home() {
  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [resultado, setResultado] = useState(null);

  const validar = () => {
    if (numero1 === "" || numero2 === "") {
      setResultado("Ambos campos son obligatorios.");
      return false;
    }
    return true;
  };

  const sumar = () => {
    if (!validar()) return;
    setResultado(`Resultado: ${parseFloat(numero1) + parseFloat(numero2)}`);
  };

  const restar = () => {
    if (!validar()) return;
    setResultado(`Resultado: ${parseFloat(numero1) - parseFloat(numero2)}`);
  };

  const multiplicar = () => {
    if (!validar()) return;
    setResultado(`Resultado: ${parseFloat(numero1) * parseFloat(numero2)}`);
  };

  const dividir = () => {
    if (!validar()) return;
    if (parseFloat(numero2) === 0) {
      setResultado("Error: división por cero.");
      return;
    }
    setResultado(`Resultado: ${parseFloat(numero1) / parseFloat(numero2)}`);
  };

  const potencia = () => {
    if (!validar()) return;
    setResultado(`Resultado: ${Math.pow(parseFloat(numero1), parseFloat(numero2))}`);
  };

  const raiz = () => {
    if (numero1 === "") {
      setResultado("Ingrese el número.");
      return;
    }
    const n = parseFloat(numero1);
    if (n < 0) {
      setResultado("No se puede calcular raíz de número negativo.");
      return;
    }
    setResultado(`Resultado: ${Math.sqrt(n).toFixed(4)}`);
  };

  const limpiar = () => {
    setNumero1("");
    setNumero2("");
    setResultado(null);
  };

  const equiposData = [
    {
      id: 1,
      nombre: "Real Madrid",
      plantilla: [
        { id: 1, nombre: "Eden Hazard", Altura: "1.75", Peso: "74", foto: "/imagenes/hazard.jpg" },
        { id: 2, nombre: "Gonzalo García", Altura: "1.82", Peso: "74", foto: "/imagenes/garcia.jpg" },
        { id: 3, nombre: "Karim Benzema", Altura: "1.85", Peso: "81", foto: "/imagenes/benzema.jpg" },
      ],
    },
    {
      id: 2,
      nombre: "Barcelona",
      plantilla: [
        { id: 1, nombre: "Marc-André ter Stegen", Altura: "1.75", Peso: "74", foto: "/imagenes/terstegen.jpg" },
        { id: 2, nombre: "Iñigo Martinez", Altura: "1.82", Peso: "74", foto: "/imagenes/inigo.jpg" },
        { id: 3, nombre: "Gavi", Altura: "1.85", Peso: "81", foto: "/imagenes/gavi.jpg" },
      ],
    },
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image className={styles.logo} src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
        <ol>
          <li>Edita <code>src/app/page.js</code>.</li>
          <li>Guarda y ve los cambios instantáneamente.</li>
        </ol>

        <div className={styles.ctas}>
          <a className={styles.primary} href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">
            <Image className={styles.logo} src="/vercel.svg" alt="Vercel" width={20} height={20} />
            Deploy now
          </a>
          <a className={styles.secondary} href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
            Read our docs
          </a>
        </div>

        <h1>Aplicación de Fútbol</h1>
        <Equipos equipos={equiposData} />

        <h2>Calculadora</h2>
        <div className={styles.calculadora}>
          <div className={styles.numeros}>
            <label className={styles.text}>Número 1:</label>
            <input className={styles.inputnum} type="number" value={numero1} onChange={(e) => setNumero1(e.target.value)} />
          </div>
          <div className={styles.numeros}>
            <label className={styles.text}>Número 2:</label>
            <input className={styles.inputnum} type="number" value={numero2} onChange={(e) => setNumero2(e.target.value)} />
          </div>
          <div>
            <button className={styles.button} onClick={sumar}>Sumar</button>
            <button className={styles.button} onClick={restar}>Restar</button>
            <button className={styles.button} onClick={multiplicar}>Multiplicar</button>
            <button className={styles.button} onClick={dividir}>Dividir</button>
            <button className={styles.button} onClick={potencia}>Potencia</button>
            <button className={styles.button} onClick={raiz}>Raíz Cuadrada</button>
            <button className={styles.button} onClick={limpiar}>Borrar</button>
          </div>
          {resultado && <div className={styles.resultado}>{resultado}</div>}
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
