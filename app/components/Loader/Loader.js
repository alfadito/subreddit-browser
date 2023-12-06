import classNames from "classnames";
import styles from "./Loader.module.scss";

export const Loader = ({ type = "dark", label }) => {
  return (
    <div className={styles.loaderContainer}>
      <div
        className={classNames(styles.loader, styles[type])}
      ></div>
      {label && <div className={styles.label}>{label}</div>}
    </div>
  );
};
