import { ReactNode } from "react";
import styles from "./styles.module.css";

type CustomButtonProps = {
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
};

function CustomButton(props: CustomButtonProps) {
  const handleClick = () => {
    props.onClick();
  };

  return (
    <button
      className={styles.customButton}
      type="button"
      disabled={props.disabled}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
}

export default CustomButton;
