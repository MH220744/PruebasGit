import styles from "./page.module.css";
import Form from "@/components/Form";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="App">
        <h1>Lista de Compras</h1>
        <p>Agrega tus productos</p>
        <Form />
      </div>
    </main>
  );
}
