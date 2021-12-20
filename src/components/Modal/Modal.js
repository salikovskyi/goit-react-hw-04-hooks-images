import css from './Modal.module.css'
import {useEffect} from 'react'
import { createPortal } from 'react-dom';


const modalRoot = document.querySelector('#modal-root');


const Modal = ({closeModal, children})  => {


  useEffect(() => {
    window.addEventListener('keydown', hendelKeyDown);
    return () => {
      window.removeEventListener('keydown', hendelKeyDown);
    }
  }, [])
  const hendelKeyDown = e => {
    
    if (e.code === 'Escape') {
      closeModal();
    }
  };
 const  hendelBecdropClick = e => {
  
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };
 

    return createPortal(
      <div className={css.overlay} onClick={hendelBecdropClick}>
    <div className={css.modal}>
      {children}
    </div>
  </div>,
  modalRoot
      )
  }


export default Modal;