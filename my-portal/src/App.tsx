import { useState, useMemo, useRef, useEffect } from 'react'
import './App.css'
import { motion, AnimatePresence } from "framer-motion";

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

export default function AestheticMediaPortal() {
  // --- Demo content (replace with your real metadata) ---
  const books = useMemo(
    () => [
      {
        id: "b1",
        title: "The Wind-Up Bird Chronicle",
        author: "Haruki Murakami",
        cover:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=640&auto=format&fit=crop",
        // fileUrl could be a signed URL or local path served via your backend
        fileUrl: "#",
      },
      {
        id: "b2",
        title: "Gödel, Escher, Bach",
        author: "Douglas Hofstadter",
        cover:
          "https://images.unsplash.com/photo-1524578477734-3b1b5d69c8fb?q=80&w=640&auto=format&fit=crop",
        fileUrl: "#",
      },
      {
        id: "b3",
        title: "Mushishi Vol. 1",
        author: "Yuki Urushibara",
        cover:
          "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=640&auto=format&fit=crop",
        fileUrl: "#",
      },
      {
        id: "b4",
        title: "The Left Hand of Darkness",
        author: "Ursula K. Le Guin",
        cover:
          "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=640&auto=format&fit=crop",
        fileUrl: "#",
      },
    ],
    []
  );

  const videos = useMemo(
    () => [
      {
        id: "v1",
        title: "Your Name (Trailer)",
        poster:
          "https://images.unsplash.com/photo-1608889335945-d9185f2d2f54?q=80&w=1280&auto=format&fit=crop",
        src:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", // demo
      },
      {
        id: "v2",
        title: "Calm Clouds",
        poster:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1280&auto=format&fit=crop",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
    ],
    []
  );

  const albums = useMemo(
    () => [
      {
        id: "a1",
        artist: "City Pop Essentials",
        title: "Shibuya Nights",
        cover:
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=640&auto=format&fit=crop",
        trackUrl:
          "https://www.kozco.com/tech/piano2-CoolEdit.mp3", // demo
      },
      {
        id: "a2",
        artist: "Lo-fi Studio",
        title: "Study Glow",
        cover:
          "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=640&auto=format&fit=crop",
        trackUrl: "https://www.kozco.com/tech/piano2.wav",
      },
    ],
    []
  );

  // --- UI State ---
  const [openBook, setOpenBook] = useState(null as null | (typeof books)[number]);
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const [isTvOn, setIsTvOn] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(albums[0]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Turn off TV video when switching off
  useEffect(() => {
    if (!isTvOn && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isTvOn]);

  // --- Helpers ---
  const ShelfTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-3 flex items-center gap-2">
      <span className="h-px w-6 bg-zinc-500/40" />
      <h2 className="text-zinc-100/90 font-semibold tracking-wider uppercase text-xs">
        {children}
      </h2>
      <span className="h-px flex-1 bg-zinc-500/40" />
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0b0c10] via-[#0b0c10] to-[#0f1115] text-zinc-100 relative overflow-hidden">
      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.08),transparent_60%)]" />

      {/* Glow orbs */}
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-14">
        {/* Header */}
        <div className="flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold tracking-tight"
          >
            Your Cozy Media Portal
          </motion.h1>

          <div className="text-xs text-zinc-400 hidden sm:block">MVP • Bookshelf • TV • Music</div>
        </div>

        {/* Grid layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bookshelf (2 columns on lg) */}
          <div className="lg:col-span-2">
            <ShelfTitle>Bookshelf</ShelfTitle>
            <div className="rounded-2xl bg-gradient-to-b from-zinc-800/40 to-zinc-900/40 border border-white/5 p-4 backdrop-blur">
              {/* wooden shelf vibe */}
              <div className="rounded-xl bg-[linear-gradient(135deg,#2a2926_0%,#2e2d28_100%)] border border-black/20 shadow-inner p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {books.map((bk) => (
                    <motion.button
                      key={bk.id}
                      whileHover={{ y: -4 }}
                      className="group relative rounded-xl overflow-hidden border border-black/30 bg-[#3a362f] shadow-lg"
                      onClick={() => setOpenBook(bk)}
                      title={bk.title}
                    >
                      <img
                        src={bk.cover}
                        alt={bk.title}
                        className="h-44 w-full object-cover"
                      />
                      <div className="p-3 text-left">
                        <div className="text-[11px] uppercase tracking-wide text-amber-200/80">
                          {bk.author}
                        </div>
                        <div className="text-sm font-semibold leading-tight line-clamp-2">
                          {bk.title}
                        </div>
                      </div>
                      {/* shine */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Retro TV */}
          <div className="lg:col-span-1">
            <ShelfTitle>Retro TV</ShelfTitle>
            <div className="rounded-2xl bg-gradient-to-b from-zinc-800/40 to-zinc-900/40 border border-white/5 p-4 backdrop-blur h-full">
              <div className="flex flex-col gap-4">
                {/* TV bezel */}
                <div className="relative mx-auto w-full aspect-video max-w-md rounded-[24px] bg-gradient-to-b from-[#2a2a2a] to-[#141414] border-8 border-[#3b3b3b] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                  {/* Screen */}
                  <div className="absolute inset-0 bg-black">
                    <AnimatePresence mode="wait">
                      {isTvOn ? (
                        <motion.video
                          key={currentVideo.id}
                          ref={videoRef}
                          src={currentVideo.src}
                          poster={currentVideo.poster}
                          className="h-full w-full object-cover"
                          autoPlay
                          controls
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      ) : (
                        <motion.div
                          key="static"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="h-full w-full bg-[repeating-conic-gradient(from_0deg,rgba(255,255,255,0.05)_0deg,rgba(255,255,255,0.05)_2deg,transparent_2deg,transparent_4deg)] flex items-center justify-center"
                        >
                          <div className="text-zinc-400 text-xs tracking-wider">TV OFF</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {/* Glass glare */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_-10%,rgba(255,255,255,0.12),transparent_40%)]" />
                  </div>

                  {/* Faux knobs */}
                  <div className="absolute right-2 top-2 flex flex-col gap-2">
                    <button
                      onClick={() => setIsTvOn((v) => !v)}
                      className={`h-8 w-8 rounded-full border border-black/40 shadow active:scale-95 transition ${
                        isTvOn ? "bg-emerald-500" : "bg-zinc-600"
                      }`}
                      title="Power"
                    />
                    <button
                      onClick={() => {
                        const idx = videos.findIndex((v) => v.id === currentVideo.id);
                        const next = videos[(idx + 1) % videos.length];
                        setCurrentVideo(next);
                        if (isTvOn) {
                          // restart playback for new video
                          setTimeout(() => videoRef.current?.play(), 80);
                        }
                      }}
                      className="h-8 w-8 rounded-full border border-black/40 bg-zinc-700 hover:bg-zinc-600 shadow active:scale-95 transition"
                      title="Channel"
                    />
                  </div>
                </div>

                {/* Channel list */}
                <div className="grid grid-cols-3 gap-2">
                  {videos.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setCurrentVideo(v);
                        if (isTvOn) setTimeout(() => videoRef.current?.play(), 80);
                      }}
                      className={`group rounded-lg overflow-hidden border border-white/10 bg-zinc-800/50 hover:bg-zinc-700/50 transition ${
                        currentVideo.id === v.id ? "ring-2 ring-indigo-400/70" : ""
                      }`}
                    >
                      <img src={v.poster} alt={v.title} className="h-20 w-full object-cover" />
                      <div className="p-2 text-[11px] text-left line-clamp-2 text-zinc-300 group-hover:text-white">
                        {v.title}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Music Shelf */}
        <div className="mt-8">
          <ShelfTitle>Music Shelf</ShelfTitle>
          <div className="rounded-2xl bg-gradient-to-b from-zinc-800/40 to-zinc-900/40 border border-white/5 p-4 backdrop-blur">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {albums.map((al) => (
                <motion.button
                  key={al.id}
                  whileHover={{ y: -3 }}
                  onClick={() => setCurrentAlbum(al)}
                  className={`group rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#18181b] to-[#0f0f12] hover:from-[#1e1e22] hover:to-[#121216] transition ${
                    currentAlbum.id === al.id ? "ring-2 ring-fuchsia-400/70" : ""
                  }`}
                >
                  <img src={al.cover} alt={al.title} className="h-36 w-full object-cover" />
                  <div className="p-3 text-left">
                    <div className="text-[11px] uppercase tracking-wide text-zinc-400">{al.artist}</div>
                    <div className="text-sm font-semibold leading-tight line-clamp-2">{al.title}</div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Mini player */}
            <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-3 py-2">
              <div className="flex items-center gap-3">
                <img src={currentAlbum.cover} alt="cover" className="h-10 w-10 rounded-md object-cover" />
                <div className="leading-tight">
                  <div className="text-sm font-medium">{currentAlbum.title}</div>
                  <div className="text-xs text-zinc-400">{currentAlbum.artist}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => audioRef.current?.paused ? audioRef.current?.play() : audioRef.current?.pause()}
                  className="rounded-md bg-zinc-800 px-3 py-1.5 text-sm hover:bg-zinc-700 active:scale-95 transition"
                >
                  Play/Pause
                </button>
                <audio ref={audioRef} src={currentAlbum.trackUrl} preload="metadata" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Book modal */}
      <AnimatePresence>
        {openBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setOpenBook(null)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-zinc-900 to-black shadow-2xl"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div>
                  <div className="text-sm text-zinc-400">{openBook.author}</div>
                  <div className="text-lg font-semibold">{openBook.title}</div>
                </div>
                <button
                  onClick={() => setOpenBook(null)}
                  className="rounded-md bg-zinc-800 px-3 py-1.5 text-sm hover:bg-zinc-700"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="md:col-span-1 p-4 border-r border-white/10 hidden md:block">
                  <img
                    src={openBook.cover}
                    alt={openBook.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <p className="mt-3 text-sm text-zinc-400">
                    This is a demo preview. Wire this panel to show description, tags, and your
                    personal notes for the book.
                  </p>
                </div>
                <div className="md:col-span-2 p-4">
                  {/* Reader area – replace with EPUB.js/PDF.js when you have real files */}
                  <div className="aspect-[3/4] w-full rounded-xl bg-zinc-950/60 border border-white/10 flex items-center justify-center text-zinc-400">
                    Reader preview goes here
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button className="rounded-md bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-sm font-medium">
                      Open
                    </button>
                    <button className="rounded-md bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 text-sm">
                      Add to Shelf
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fancy cursor spotlight */}
      <SpotlightCursor />
    </div>
  );
}

function SpotlightCursor() {
  useEffect(() => {
    const root = document.documentElement;
    const move = (e: MouseEvent) => {
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        background:
          "radial-gradient(120px 120px at var(--mx) var(--my), rgba(255,255,255,0.06), transparent 60%)",
      }}
    />
  );
}
