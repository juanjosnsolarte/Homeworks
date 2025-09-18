import React, { useState, useMemo } from 'react';
import { mockSongs } from '../data/mockSongs';
import SinglyLinkedList from '../lib/SinglyLinkedList';

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
    <div className="page-container">
      <h1>Playlist</h1>
      {currentSong ? (
        <div>
          <div className="song-title">{currentSong.title}</div>
          <div className="artist">{currentSong.artist}</div>
          <button onClick={playNextSong}>
            {currentSongIndex < songList.size() - 1 ? 'Siguiente' : 'Reiniciar'}
          </button>
        </div>
      ) : (
        <p>No hay canciones en la lista.</p>
      )}
    </div>
  );
};

export default Playlist;