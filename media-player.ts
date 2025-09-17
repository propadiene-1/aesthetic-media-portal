import React, { useMemo, useState, useRef, useEffect } from "react";
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