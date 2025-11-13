import React, { useState, useMemo } from 'react';
import { mockSongs } from '../data/mockSongs';
import SinglyLinkedList from '../lib/SinglyLinkedList';
import styles from '../styles/modules/Playlist.module.scss';
import app from '../styles/modules/App.module.scss';

const Playlist = () => {
  const songList = useMemo(() => {
    const list = new SinglyLinkedList();
    mockSongs.forEach(song => list.add(song));
    return list;
  }, []);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const playNextSong = () => {
    if (currentSongIndex < songList.size() - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
  };

  const currentSong = songList.get(currentSongIndex);

  return (
    <div className={app.pageContainer}>
      <h1 className={styles.title}>Playlist</h1>
      {currentSong ? (
        <div>
          <div className={styles.title}>{currentSong.title}</div>
          <div className={styles.artist}>{currentSong.artist}</div>
          <div className={styles.actions}>
            <button className={styles['btn-sm']} onClick={playNextSong}>
              {currentSongIndex < songList.size() - 1 ? 'Siguiente' : 'Reiniciar'}
            </button>
          </div>
        </div>
      ) : (
        <p>No hay canciones en la lista.</p>
      )}
    </div>
  );
};

export default Playlist;
