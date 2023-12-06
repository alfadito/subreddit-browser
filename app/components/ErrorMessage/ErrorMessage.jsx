import styles from "./ErrorMessage.module.scss"

export const ErrorMessage = ({message, action}) => {
  return (
    <div className={styles.error}>
      <div>{message}</div>
      <div className={styles.retry} onClick={action}>Click here to retry.</div>
    </div>
  );
};
