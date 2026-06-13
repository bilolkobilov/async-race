import { useState } from 'react';
import Garage from './pages/Garage/Garage';
import Winners from './pages/Winners/Winners';
import styles from './App.module.css';

type View = 'garage' | 'winners';

const App = () => {
  const [view, setView] = useState<View>('garage');

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoAccent}>Async</span> Race
        </div>
        <nav className={styles.nav}>
          <button
            className={`${styles.navBtn} ${view === 'garage' ? styles.active : ''}`}
            onClick={() => setView('garage')}
            type="button"
          >
            Garage
          </button>
          <button
            className={`${styles.navBtn} ${view === 'winners' ? styles.active : ''}`}
            onClick={() => setView('winners')}
            type="button"
          >
            Winners
          </button>
        </nav>
      </header>

      <main className={styles.main}>
        <div style={{ display: view === 'garage' ? 'block' : 'none' }}>
          <Garage />
        </div>
        <div style={{ display: view === 'winners' ? 'block' : 'none' }}>
          <Winners />
        </div>
      </main>
    </div>
  );
};

export default App;
