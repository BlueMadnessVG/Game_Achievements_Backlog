import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useModalContext } from "../../context/modal.context";
import "./Modal.css";

interface ModalProps {
  children: ReactNode;
}

const eventListener = "keydown";

export function Modal({ children }: ModalProps) {
  const ModalRef = useRef<HTMLDivElement>(null);
  const { state, setState } = useModalContext();

  const closeModal = () => setState(false);
  const modalRoot = document.getElementById("modal");

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setState(false);
      }
    };

    if (state) {
      document.addEventListener(eventListener, handleEsc);
    }

    return () => {
      document.removeEventListener(eventListener, handleEsc);
    };
  }, [state, setState]);

  if (!state || !modalRoot) return null;

  return createPortal(
    <div className="overlay" onClick={closeModal}>
      <div className="modal" onClick={handleContentClick} ref={ModalRef}>
        {children}
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>,
    modalRoot
  );
}
