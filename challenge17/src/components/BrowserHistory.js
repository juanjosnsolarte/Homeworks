import React, { useState, useMemo } from 'react';
import mockPages from '../data/mockPages';
import DoublyLinkedList from '../lib/DoublyLinkedList';
import styles from '../styles/modules/BrowserHistory.module.scss';
import app from '../styles/modules/App.module.scss';

const BrowserHistory = () => {
  const pageList = useMemo(() => {
    const list = new DoublyLinkedList();
    mockPages.forEach(page => list.add(page));
    return list;
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goBack = () => { if (currentIndex > 0) setCurrentIndex(currentIndex - 1); };
  const goForward = () => { if (currentIndex < pageList.size() - 1) setCurrentIndex(currentIndex + 1); };

  const currentPage = pageList.get(currentIndex);

  return (
    <div className={app.pageContainer}>
      <h1 className={styles.title}>Historial de Navegación</h1>
      {currentPage ? (
        <>
          <div className={styles.title}>{currentPage.title}</div>
          <div className={styles.url}>{currentPage.url}</div>
          <div className={styles.actions}>
            <button
              className={`${styles.button} ${styles['button--ghost']}`}
              onClick={goBack}
              disabled={currentIndex === 0}
            >Atrás</button>
            <button
              className={`${styles.button} ${styles['button--secondary']}`}
              onClick={goForward}
              disabled={currentIndex === pageList.size() - 1}
            >Adelante</button>
          </div>
        </>
      ) : (
        <p>No hay páginas en el historial.</p>
      )}
    </div>
  );
};

export default BrowserHistory;
