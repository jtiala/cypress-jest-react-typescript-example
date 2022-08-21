import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={styles.button} {...props} />;
}

export default Button;
