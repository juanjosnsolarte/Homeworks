import React, { useState, useMemo } from 'react';
import mockPages from '../data/mockPages';
import DoublyLinkedList from '../lib/DoublyLinkedList';

const BrowserHistory = () => {
  const pageList = useMemo(() => {
    const list = new DoublyLinkedList();
    mockPages.forEach(page => list.add(page));
    return list;
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goForward = () => {
    if (currentIndex < pageList.size() - 1) setCurrentIndex(currentIndex + 1);
  };

  const currentPage = pageList.get(currentIndex);

  return (
    <div className="page-container">
      <h1>Historial de Navegación</h1>
      {currentPage ? (
        <>
          <div className="page-title">{currentPage.title}</div>
          <div className="page-url">{currentPage.url}</div>
          <button onClick={goBack} disabled={currentIndex === 0}>Atrás</button>
          <button onClick={goForward} disabled={currentIndex === pageList.size() - 1}>Adelante</button>
        </>
      ) : (
        <p>No hay páginas en el historial.</p>
      )}
    </div>
  );
};

export default BrowserHistory;