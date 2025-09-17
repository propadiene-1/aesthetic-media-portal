import { useState, useMemo } from 'react'
import './App.css'
/*import { motion, AnimatePresence } from "framer-motion";*/
/*also useRef, useEffect */

/**
 * aesthetic media portal
 * current features
 * - laning page-- books, TV, music 
 * - click on the pics to open or play the corresponding stuff 
 * - some animations and effects
 *
 * How to use:
 * - Drop this component into a React/Next.js app and ensure Tailwind CSS is set up.
 * - Replace the demo media arrays with your own (from an API or filesystem indexer).
 * - Wire the TODO hooks where noted to connect your backend later.
 */

/** ---------- Types ---------- */
type Book = {id: string; title: string; author: string; cover?: string; fileUrl?: string}

type Show = {id: string; title: string; poster?: string; src: string}

type Album = {id: string; artist: string; title: string; src?: string; albumUrl?: string}

export default function AestheticMediaPortal() {
  // --- Demo content (replace with your real metadata) ---
  const [rawBooks] = useState<Book[]>([
      { id: 'b1', title: 'A Room of One\'s Own', author: 'Virginia Woolf' },
      { id: 'b2', title: 'Night Sky With Exit Wounds', author: 'Ocean Vuong' },
      { id: 'b3', title: 'Gender Trouble', author: 'Judith Butler' },
      { id: 'b4', title: 'The Myth of Sisyphus', author: 'Albert Camus' },
    ]);

  const [rawShows] = useState<Show[]>([
      { id: 'v1', title: 'Your Name (Trailer)',
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',},
      { id: 'v2', title: 'Calm Clouds',
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',},
    ]);

  const [rawAlbums] = useState<Album[]>([
      { id: 'a1', artist: 'Adrienne Lenker', title: 'Songs',
        albumUrl: 'https://www.kozco.com/tech/piano2-CoolEdit.mp3',},
      { id: 'a2', artist: 'Jane Remover', title: 'Frailty',
        albumUrl: 'https://www.kozco.com/tech/piano2.wav',},
      { id: 'a3', artist: 'yeule', title: 'softscars',
        src: 'https://www.kozco.com/tech/piano2-CoolEdit.mp3',},
    ]);
  
  // useMemo wrappers — currently just pass data through
  const books = useMemo(() => rawBooks, [rawBooks])
  const shows = useMemo(() => rawShows, [rawShows])
  const albums = useMemo(() => rawAlbums, [rawAlbums])

  // update variables for show and track
  const [activeShow, setActiveShow] = useState<Show | null>(null)
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null)
  
  return (
    <div style={{ padding: 16 }}>
      <h1> Media Portal</h1>

      <section>
        <h2>Books</h2>
        <ul>
          {books.map(b => (
            <li key={b.id}>
              {/*open url in new tab on click*/}
              <button onClick = {() => window.open(b.fileUrl, "_blank")}>
                {/*title + author button */}
                {b.title} {b.author && <>— {b.author}</>}
              </button>
            </li>
          ))}
        </ul>
      </section> 
      <section>
        <h2>Shows</h2>
        <ul>
          {shows.map(s => (
            <li key={s.id}>
              {/*use state for show: active on click */}
              <button onClick={() => setActiveShow(s)}>
                {/*built-in player (if show)*/}
                {activeShow && (<video src={activeShow.src} controls/>)}
                {s.title}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Music</h2>
        <ul>
          {albums.map(a => (
            <li key={a.id}>
                <button onClick = {() => {
                  {/*if file open local player */}
                  if (a.src){
                    {/*use state for track: active on click */}
                    setActiveAlbum(a)
                  } 
                  else if (a.albumUrl){
                    {/*if link open in new window */}
                    window.open(a.albumUrl, "_blank")
                  }
                }}>
                {/*built-in player (if file) */}
                {activeAlbum && (<audio src={activeAlbum.src} controls/>)}
                {/*title + artist button */}
                {a.title} {a.artist && <>— {a.artist}</>}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}