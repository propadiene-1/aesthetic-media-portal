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

type Album = {id: string; artist: string; title: string; cover?: string; trackUrl: string}

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
      { id: 'a1', artist: 'City Pop Essentials', title: 'Shibuya Nights',
        trackUrl: 'https://www.kozco.com/tech/piano2-CoolEdit.mp3',},
      { id: 'a2', artist: 'Lo-fi Studio', title: 'Study Glow',
        trackUrl: 'https://www.kozco.com/tech/piano2.wav',},
    ]);
  
  // useMemo wrappers — currently just pass data through
  const books = useMemo(() => rawBooks, [rawBooks])
  const shows = useMemo(() => rawShows, [rawShows])
  const tracks = useMemo(() => rawAlbums, [rawAlbums])

  
  return (
    <div style={{ padding: 16 }}>
      <h1> Media Portal</h1>

      <section>
        <h2>Books</h2>
        <ul>
          {books.map(b => (
            <li key={b.id}>
              {b.title} {b.author && <>— {b.author}</>}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Shows</h2>
        <ul>
          {shows.map(s => (
            <li key={s.id}>{s.title}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Music</h2>
        <ul>
          {tracks.map(t => (
            <li key={t.id}>
              {t.title} {t.artist && <>— {t.artist}</>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}