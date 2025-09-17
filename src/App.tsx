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
type Book = {id: string; title: string; author: string; cover?: string; fileURL?: string}

type Show = {id: string; title: string; poster?: string; src?: string; showURL?: string}

type Album = {id: string; artist: string; title: string; src?: string; albumURL?: string}

export default function AestheticMediaPortal() {
  // --- Demo content (replace with your real metadata) ---
  const [rawBooks] = useState<Book[]>([
      { id: 'b1', title: 'A Room of One\'s Own', author: 'Virginia Woolf',
        fileURL: 'https://www.alyve.org/english/docs/11.1/a_room_of_ones_own-complete.pdf',
      },
      { id: 'b2', title: 'Night Sky With Exit Wounds', author: 'Ocean Vuong',
        fileURL: 'https://r1bfamilyportraits.wordpress.com/wp-content/uploads/2018/04/ocean-vuong-e28093-night-sky-with-exit-wounds-excerpts.pdf',
      },
      { id: 'b3', title: 'Gender Trouble', author: 'Judith Butler', 
        fileURL: 'https://selforganizedseminar.wordpress.com/wp-content/uploads/2011/07/butler-gender_trouble.pdf',
      },
      { id: 'b4', title: 'The Myth of Sisyphus', author: 'Albert Camus',
        fileURL: 'https://www2.hawaii.edu/~freeman/courses/phil360/16.%20Myth%20of%20Sisyphus.pdf',
      },
    ]);

  const [rawShows] = useState<Show[]>([
      { id: 'v1', title: 'Frieren(Trailer)',
        showURL: 'https://www.youtube.com/watch?v=01WEqntM1NI',},
      { id: 'v2', title: 'Calm Clouds',
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',},
    ]);

  const [rawAlbums] = useState<Album[]>([
      { id: 'a1', artist: 'Adrienne Lenker', title: 'Songs',
        albumURL: 'https://open.spotify.com/album/2Qt8Z1LB3Fsrf6nhBNsvUJ?si=tVwPs4IMSg-M3QhizaUdCw',},
      { id: 'a2', artist: 'Jane Remover', title: 'Frailty',
        albumURL: 'https://open.spotify.com/album/0Pm3i5huHlt1mjSLxyA1Re?si=mpjmpsMhQ--rVtN8xSig8Q',},
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
              <button onClick = {() => window.open(b.fileURL, "_blank")}>
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
              <button onClick={() => {
                if (s.src) {
                  setActiveShow(s)
                  {/*built-in player (if show)*/}
                  {activeShow?.id === s.id && (<video src={activeShow.src} controls/>)}
                }
                else if (s.showURL) {
                  window.open(s.showURL, "_blank")
               }
               {s.title}
              }}>
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
                  else if (a.albumURL){
                    {/*if link open in new window */}
                    window.open(a.albumURL, "_blank")
                  }
                }}>
                {/*built-in player (if file) */}
                {activeAlbum?.id === a.id && (<audio src={activeAlbum.src} controls/>)}
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