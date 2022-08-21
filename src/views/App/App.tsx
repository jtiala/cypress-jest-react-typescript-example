import { useState } from "react";
import styles from "./App.module.css";
import Button from "../../components/Button";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Cypress + Jest + React + TypeScript Example</h1>
        <div className={styles.buttons}>
          <Button
            data-testid="increase-button"
            onClick={() => setCounter(counter + 1)}
          >
            {counter === 0
              ? "Click me!"
              : counter === 1
              ? "Button clicked 1 time"
              : `Button clicked ${counter} times`}
          </Button>
          <Button data-testid="reset-button" onClick={() => setCounter(0)}>
            Reset
          </Button>
        </div>
      </header>
    </div>
  );
}

export default App;
