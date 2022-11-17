import Portal from "./Portal";
import classNames from "classnames/bind";
import styles from "./Modal.module.css";
import { useEffect } from "react";

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const yPosition = window.scrollY;
    const xPosition = window.scrollX;
    document.body.style.overflow = "hidden";
    window.scrollTo(xPosition, yPosition);

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <Portal>
      <div className={cx("modal-dimmer")} onClick={onClose}>
        {children}
      </div>
    </Portal>
  );
}
