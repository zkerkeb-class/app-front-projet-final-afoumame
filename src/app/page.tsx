'use client';
import React, { useState, useRef, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './globals.css';

export default function Home() {
  const [currentSong, setCurrentSong] = useState({
    title: "La Danse des Canards", 
    artist: "Canard", 
    cover: "/cover/dansedescanards.jpg", 
    music: "/media/dansedescanards.mp3",
    duration: "2:33"
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(25);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = useRef(null);
  
  const playlists = [
    "Musique Likée",
    "Découvertes de la semaine",
    "Mix Pop",
    "Mix Rock",
    "Mix Détente",
    "Mix Motivation"
  ];
  
  const forYou = [
    { title: "La Danse des Canards", artist: "Canard", cover: "/cover/dansedescanards.jpg", music: "dansedescanards.mp3" },
    { title: "La Danse des Canards", artist: "Canard", cover: "/cover/dansedescanards.jpg", music: "dansedescanards.mp3" },
    { title: "La Danse des Canards", artist: "Canard", cover: "/cover/dansedescanards.jpg", music: "dansedescanards.mp3" },
    { title: "La Danse des Canards", artist: "Canard", cover: "/cover/dansedescanards.jpg", music: "dansedescanards.mp3" },
    { title: "La Danse des Canards", artist: "Canard", cover: "/cover/dansedescanards.jpg", music: "dansedescanards.mp3" },
    { title: "La Danse des Canards", artist: "Canard", cover: "/cover/dansedescanards.jpg", music: "dansedescanards.mp3" },
  ];

  const recentlyPlayed = [
    { title: "Highway to Hell", artist: "AC/DC", cover: "/api/placeholder/150/150" },
    { title: "Billie Jean", artist: "Michael Jackson", cover: "/api/placeholder/150/150" },
    { title: "Imagine", artist: "John Lennon", cover: "/api/placeholder/150/150" },
    { title: "Shape of You", artist: "Ed Sheeran", cover: "/api/placeholder/150/150" },
    { title: "Blinding Lights", artist: "The Weeknd", cover: "/api/placeholder/150/150" },
    { title: "Dance Monkey", artist: "Tones and I", cover: "/api/placeholder/150/150" }
  ];
  
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.audioEl.current?.pause();
    } else {
      audioRef.current?.audioEl.current?.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  // Update current time during playback
  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.audioEl.current) {
      setCurrentTime(audioRef.current.audioEl.current.currentTime);
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current && audioRef.current.audioEl.current) {
      audioRef.current.audioEl.current.volume = newVolume / 100;
    }
  };
  
  // Handle seeking
  const handleSeek = (e) => {
    const seekTime = (parseInt(e.target.value) / 100) * 153; // 2:33 in seconds is 153
    setCurrentTime(seekTime);
    if (audioRef.current && audioRef.current.audioEl.current) {
      audioRef.current.audioEl.current.currentTime = seekTime;
    }
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  // Auto-update time
  useEffect(() => {
    const audioElement = audioRef.current?.audioEl.current;
    if (audioElement) {
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, []);

  // Add this to the <head> of your document
  useEffect(() => {
    // Create style element
    const style = document.createElement('style');
    style.textContent = `
      /* Hide slider thumb */
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 0;
        height: 0;
      }
      
      input[type=range]::-moz-range-thumb {
        width: 0;
        height: 0;
        border: 0;
      }
      
      input[type=range]::-ms-thumb {
        width: 0;
        height: 0;
      }
    `;
    document.head.appendChild(style);
    
    // Cleanup
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className="spotify-app bg-black text-white h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-gray-900">
        <div className="flex items-center">
          <div className="text-2xl font-bold mr-4">
            <span className="text-green-500">Spotify</span>
          </div>
          <div className="flex space-x-4">
            <button className="bg-gray-800 px-4 py-2 rounded">Accueil</button>
            <button className="bg-gray-800 px-4 py-2 rounded">Rechercher</button>
            <button className="bg-gray-800 px-4 py-2 rounded">Bibliothèque</button>
          </div>
        </div>
        <div className="flex items-center">
          <button className="bg-white text-black font-bold px-4 py-2 rounded">S'inscrire</button>
          <button className="bg-gray-800 px-4 py-2 rounded ml-2">Se connecter</button>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 p-4">
          <h3 className="font-bold mb-4">Playlists</h3>
          <ul>
            {playlists.map((playlist, index) => (
              <li key={index} className="mb-2 hover:text-green-500 cursor-pointer">{playlist}</li>
            ))}
          </ul>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-gray-800 to-black">
          <h2 className="text-2xl font-bold mb-6">Écoutés récemment</h2>
          <div className="grid grid-cols-3 gap-4">
            {recentlyPlayed.map((song, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded hover:bg-gray-700 cursor-pointer">
                <img src={song.cover} alt={song.title} className="w-full mb-2" />
                <h3 className="font-bold">{song.title}</h3>
                <p className="text-gray-400">{song.artist}</p>
              </div>
            ))}
          </div>
          
          <h2 className="text-2xl font-bold mt-8 mb-6">Fait pour vous</h2>
          <div className="grid grid-cols-6 gap-4">
            {forYou.map((song, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded hover:bg-gray-700 cursor-pointer">
                <img src={song.cover} alt={`Cover ${song.title}`} className="w-full mb-2" />
                <h3 className="font-bold">{song.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Player */}
      <div className="h-24 bg-gray-900 flex items-center px-4 border-t border-gray-800">
        {/* Song info */}
        <div className="flex items-center w-1/4">
          <img src={currentSong.cover} alt={currentSong.title} className="h-14 w-14 mr-4" />
          <div>
            <h4 className="font-bold">{currentSong.title}</h4>
            <p className="text-gray-400 text-sm">{currentSong.artist}</p>
          </div>
        </div>
        
        {/* Controls */}
        <div className="w-2/4 flex flex-col items-center">
          <div className="flex items-center mb-2">
            <button className="mx-2 text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
              </svg>
            </button>
            <button className="mx-2" onClick={togglePlayPause}>
              {isPlaying ? (
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <button className="mx-2 text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z" />
              </svg>
            </button>
          </div>
          <div className="w-full flex items-center">
            <span className="text-xs text-gray-400 mr-2">{formatTime(currentTime)}</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={(currentTime / 153) * 100} 
              onChange={handleSeek}
              className="flex-1 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${(currentTime / 153) * 100}%, #4D4D4D ${(currentTime / 153) * 100}%, #4D4D4D 100%)`
              }}
            />
            <span className="text-xs text-gray-400 ml-2">{currentSong.duration}</span>
          </div>
        </div>
        
        {/* Volume */}
        <div className="w-1/4 flex justify-end items-center">
          <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071a1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243a1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828a1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${volume}%, #4D4D4D ${volume}%, #4D4D4D 100%)`
            }}
          />
        </div>
        
        {/* Audio Player (hidden) */}
        <ReactAudioPlayer
          ref={audioRef}
          src={currentSong.music}
          volume={volume / 100}
          className="hidden"
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
}