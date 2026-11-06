import { WasherApp } from "@/components/WasherApp";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>
          Bosch Serie 8 <span>· WGB244A40</span>
        </h1>
      </header>
      <WasherApp />
      <footer className={styles.footer}>
        По официальной инструкции Bosch WGB244A40 (BSH 9001735129). Кнопки справа — по аналогии с фото панели.
        Лимиты «Pflegeleicht Plus» в инструкции не указаны.
      </footer>
    </main>
  );
}
