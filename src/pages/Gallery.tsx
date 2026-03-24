import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search } from "lucide-react";
import AmbientGlow from "../components/AmbientGlow";

gsap.registerPlugin(ScrollTrigger);

// ─── Brand tokens ──────────────────────────────────────────────────────────────
const T = {
  cream:       "#F5F0E4",
  creamDark:   "#EDE8D8",
  navy:        "#1C3554",
  navyLight:   "#2A4A6E",
  terracotta:  "#C4541A",
  amber:       "#E8A020",
  amberLight:  "#F2BC55",
  olive:       "#5A7A2E",
  oliveLight:  "#7A9E4A",
  sand:        "#D4C4A0",
  sandLight:   "#E8DCC0",
} as const;

// ─── Types ─────────────────────────────────────────────────────────────────────
type CardHeight = "xs" | "sm" | "md" | "lg" | "xl";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  location: string;
  country: string;
  category: string;
  height: CardHeight;
  accent: string;
}

const ITEMS: GalleryItem[] = [
  { id:  1, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=85", alt: "Swiss Alps",          location: "Swiss Alps",       country: "Switzerland", category: "Mountain",  height: "xl",  accent: T.olive },
  { id:  2, src: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=700&q=85", alt: "Venice canals",       location: "Grand Canal",      country: "Italy",       category: "City",      height: "md",  accent: T.navy },
  { id:  3, src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=700&q=85", alt: "Santorini",           location: "Oia",              country: "Greece",      category: "Island",    height: "sm",  accent: T.terracotta },
  { id:  4, src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=700&q=85", alt: "Fushimi Inari",       location: "Fushimi Inari",    country: "Japan",       category: "Culture",   height: "lg",  accent: T.terracotta },
  { id:  5, src: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=700&q=85", alt: "Sahara",              location: "Merzouga",         country: "Morocco",     category: "Desert",    height: "sm",  accent: T.amber },
  { id:  6, src: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=700&q=85", alt: "Maldives",            location: "North Atoll",      country: "Maldives",    category: "Ocean",     height: "xl",  accent: T.navy },
  { id:  7, src: "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=700&q=85", alt: "Northern Lights",     location: "Tromsø",           country: "Norway",      category: "Arctic",    height: "md",  accent: T.navyLight },
  { id:  8, src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=85", alt: "Amalfi Coast",        location: "Positano",         country: "Italy",       category: "Coast",     height: "sm",  accent: T.terracotta },
  { id:  9, src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=700&q=85", alt: "Patagonia",           location: "Torres del Paine", country: "Chile",       category: "Wild",      height: "lg",  accent: T.olive },
  { id: 10, src: "https://images.unsplash.com/photo-1539788816080-8d08a8a77bee?w=700&q=85", alt: "Cappadocia balloons", location: "Göreme",           country: "Turkey",      category: "Sky",       height: "xl",  accent: T.amber },
  { id: 11, src: "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=700&q=85", alt: "Iceland Waterfall",   location: "Skógafoss",        country: "Iceland",     category: "Nature",    height: "md",  accent: T.navyLight },
  { id: 12, src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=700&q=85", alt: "Bali Terraces",       location: "Tegalalang",       country: "Indonesia",   category: "Culture",   height: "sm",  accent: T.olive },
  { id: 13, src: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=700&q=85", alt: "Colosseum",           location: "Rome",             country: "Italy",       category: "History",   height: "lg",  accent: T.terracotta },
  { id: 14, src: "https://images.unsplash.com/photo-1562613960-adf392acf9e4?w=700&q=85", alt: "Amazon",              location: "Manaus",           country: "Brazil",      category: "Jungle",    height: "sm",  accent: T.olive },
  { id: 15, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=85", alt: "Machu Picchu",        location: "Machu Picchu",     country: "Peru",        category: "Ancient",   height: "md",  accent: T.sand },
  { id: 16, src: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=700&q=85", alt: "Great Wall",          location: "Mutianyu",         country: "China",       category: "History",   height: "xl",  accent: T.navy },
];

const HEIGHT_PX: Record<CardHeight, number> = {
  xs: 180, sm: 240, md: 300, lg: 380, xl: 460,
};

const galleryImages: Record<string, { default: string }> = import.meta.glob(
  "../assets/gallery/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

const LOCAL_ITEMS: GalleryItem[] = Object.values(galleryImages).map((mod, i) => {
  const original = ITEMS[i % ITEMS.length];
  return {
    ...original,
    id: i + 1,
    src: mod.default || (mod as any),
  };
});

// ─── Skeleton Card ─────────────────────────────────────────────────────────────
function SkeletonCard({ height }: { height: number; key?: React.Key }) {
  return (
    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        height,
        background: T.sandLight,
        position: "relative",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%)`,
          backgroundSize: "200% 100%",
          animation: "junoShimmer 1.6s ease-in-out infinite",
        }}
      />
      <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
        <div style={{ height: 14, width: "60%", borderRadius: 7, background: "rgba(28,53,84,0.12)", marginBottom: 8 }} />
        <div style={{ height: 10, width: "40%", borderRadius: 5, background: "rgba(28,53,84,0.08)" }} />
      </div>
    </div>
  );
}

// ─── Gallery Card ──────────────────────────────────────────────────────────────
function GalleryCard({ item }: { item: GalleryItem; key?: React.Key }) {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [saved, setSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(Math.floor(Math.random() * 50) + 12);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLImageElement>(null);
  const h = HEIGHT_PX[item.height];

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current!.getBoundingClientRect();
    const rx = ((e.clientY - r.top)  / r.height - 0.5) * -10;
    const ry = ((e.clientX - r.left) / r.width  - 0.5) *  10;
    setTilt({ rx, ry });
  }, []);

  const onLeave = useCallback(() => {
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
  }, []);

  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      setSaved(false);
      setSaveCount((c) => c - 1);
    } else {
      setSaved(true);
      setSaveCount((c) => c + 1);
    }
  };

  const dynamicShadowX = tilt.ry * -1.5;
  const dynamicShadowY = tilt.rx * 1.5 + 28;

  return (
    <div
      ref={cardRef}
      className="juno-card"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      style={{
        marginBottom: 16,
        borderRadius: 18,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        // 3-D tilt tracking mouse
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) ${hovered ? "scale(1.022)" : "scale(1)"}`,
        transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s cubic-bezier(0.16,1,0.3,1)",
        willChange: "transform",
        // Dynamic box-shadow shifting with tilt
        boxShadow: hovered
          ? `${dynamicShadowX}px ${dynamicShadowY}px 60px rgba(28,53,84,0.3), 0 0 0 2px ${item.accent}33`
          : `0 4px 18px rgba(28,53,84,0.10)`,
      }}
    >
      {/* skeleton while loading */}
      {!loaded && <SkeletonCard height={h} />}

      {/* actual image */}
      <div
        style={{
          height: h,
          overflow: "hidden",
          display: loaded ? "block" : "none",
          position: "relative",
        }}
      >
        <img
          ref={imgRef}
          src={item.src}
          alt={item.alt}
          onLoad={() => setLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            // Zoom in on hover and slightly dim brightness instead of just opacity layer
            transform: hovered ? "scale(1.08)" : "scale(1)",
            filter: hovered ? "brightness(0.85)" : "brightness(1)",
            transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.7s ease",
          }}
          referrerPolicy="no-referrer"
        />

        {/* gradient veil for extra contrast at bottom */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, transparent 30%, rgba(28,53,84,0.85) 100%)`,
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* category chip — top left (brightens on hover) */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: item.accent,
            color: "#fff",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "4px 10px",
            borderRadius: 30,
            // Brighten via filter on hover
            filter: hovered ? "brightness(1.15) saturate(1.2)" : "brightness(1)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.9)",
            transition: "opacity 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {item.category}
        </div>

        {/* Save Button — top right (Pinterest styling) */}
        <button
          onClick={toggleSave}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            borderRadius: 24,
            padding: "8px 16px",
            background: saved ? "#000000" : "#E60023", // Pinterest Red or Black Saved
            display: "flex",
            alignItems: "center",
            gap: "6px",
            border: "none",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            color: "#fff",
            opacity: hovered ? 1 : 0,
            // Bouncy cubic-bezier pop
            transform: hovered ? "scale(1) translateY(0)" : "scale(0.8) translateY(-10px)",
            transition: "opacity 0.2s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          {saved && (
            <span style={{ fontSize: 14 }}>✓</span>
          )}
          {saved ? `Saved ${saveCount}` : "Save"}
        </button>

        {/* bottom meta */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "16px 14px 14px",
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div
            style={{
              color: "#fff",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 18,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
            }}
          >
            {item.location}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginTop: 4,
            }}
          >
            {item.country}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Gallery Section ──────────────────────────────────────────────────────
export default function Gallery() {
  const sectionRef     = useRef<HTMLElement>(null);
  const headingRef     = useRef<HTMLDivElement>(null);
  const gridRef        = useRef<HTMLDivElement>(null);
  const marqueeRef     = useRef<HTMLDivElement>(null);

  const [columns, setColumns] = useState(4);
  const [loading, setLoading] = useState(true);

  // Responsive columns
  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      if (w < 520)       setColumns(1);
      else if (w < 780)  setColumns(2);
      else if (w < 1100) setColumns(3);
      else               setColumns(4);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  // Simulate image batch loading — reveal after 1.8s
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  // GSAP scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading split reveal
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll(".juno-line");
        gsap.fromTo(
          lines,
          { y: 60, opacity: 0, skewY: 3 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }



      // Marquee parallax scroll
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          x: "-20%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // GSAP card reveal (staggered cascade with IntersectionObserver / ScrollTrigger)
  useEffect(() => {
    if (loading) return;
    const cards = gridRef.current?.querySelectorAll(".juno-card");
    if (!cards?.length) return;

    gsap.fromTo(
      cards,
      { y: 60, opacity: 0, scale: 0.94 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: { each: 0.06, from: "start" }, 
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 88%",
          once: true,
        },
      }
    );
  }, [loading, columns]);

  const cols: GalleryItem[][] = useMemo(() => {
    const c: GalleryItem[][] = Array.from({ length: columns }, () => []);
    const heights = Array(columns).fill(0);
    LOCAL_ITEMS.forEach((item) => {
      const minIdx = heights.indexOf(Math.min(...heights));
      c[minIdx].push(item);
      heights[minIdx] += HEIGHT_PX[item.height] + 16;
    });
    return c;
  }, [columns]);

  // Skeleton columns
  const skeletonCols: CardHeight[][] = useMemo(() => {
    const sc: CardHeight[][] = Array.from({ length: columns }, () => []);
    const heights = Array(columns).fill(0);
    LOCAL_ITEMS.forEach((item) => {
      const minIdx = heights.indexOf(Math.min(...heights));
      sc[minIdx].push(item.height);
      heights[minIdx] += HEIGHT_PX[item.height] + 16;
    });
    return sc;
  }, [columns]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .juno-gallery-section * { box-sizing: border-box; }

        @keyframes junoShimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }

        @keyframes junoPulse {
          0%,100% { opacity:0.5; transform:scale(1);    }
          50%      { opacity:0.9; transform:scale(1.04); }
        }

        .juno-gallery-section ::-webkit-scrollbar        { width:5px; }
        .juno-gallery-section ::-webkit-scrollbar-track  { background:${T.creamDark}; }
        .juno-gallery-section ::-webkit-scrollbar-thumb  { background:${T.sand}; border-radius:3px; }
      `}</style>

      {/* Global Cursor Glow */}
      <AmbientGlow />

      <section
        ref={sectionRef}
        className="juno-gallery-section"
        style={{
          background: T.cream,
          padding: "120px 0 100px",
          minHeight: "100vh",
          overflow: "hidden",
          position: "relative",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Pulsing background orbs for depth */}
        <div style={{
          position: "absolute", top: "10%", right: "-8%",
          width: 500, height: 500, borderRadius: "50%",
          background: `radial-gradient(circle, ${T.amberLight}30 0%, transparent 70%)`,
          animation: "junoPulse 7s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "12%", left: "-4%",
          width: 400, height: 400, borderRadius: "50%",
          background: `radial-gradient(circle, ${T.oliveLight}20 0%, transparent 70%)`,
          animation: "junoPulse 9s ease-in-out infinite reverse",
          pointerEvents: "none",
        }} />

        {/* Marquee strip */}
        <div
          style={{
            overflow: "hidden",
            position: "absolute",
            top: "5%",
            left: 0,
            right: 0,
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.045,
          }}
        >
          <div
            ref={marqueeRef}
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: "clamp(80px, 12vw, 180px)",
              color: T.navy,
              letterSpacing: "-0.04em",
              userSelect: "none",
              width: "200%",
            }}
          >
            {Array(6).fill("EXPLORE THE WORLD ").join("· ")}
          </div>
        </div>

        {/* Section header */}
        <div
          ref={headingRef}
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "0 32px",
            position: "relative",
            zIndex: 1,
            marginBottom: 48,
          }}
        >
          <div
            className="juno-line"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: T.terracotta,
              marginBottom: 18,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ display: "inline-block", width: 28, height: 2, background: T.terracotta, borderRadius: 1 }} />
            Discover
          </div>

          <div style={{ overflow: "hidden" }}>
            <h2
              className="juno-line"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(42px, 6vw, 80px)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: T.navy,
                margin: 0,
              }}
            >
              A thousand words
            </h2>
          </div>

          <div style={{ overflow: "hidden" }}>
            <h2
              className="juno-line"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontStyle: "italic",
                fontSize: "clamp(42px, 6vw, 80px)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: T.amber,
                margin: 0,
                marginBottom: 20,
              }}
            >
              would ruin it.
            </h2>
          </div>
        </div>



        {/* Masonry grid */}
        <div
          ref={gridRef}
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "0 32px",
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
            position: "relative",
            zIndex: 1,
          }}
        >
          {loading &&
            skeletonCols.map((col, ci) => (
              <div key={ci} style={{ flex: 1, minWidth: 0 }}>
                {col.map((h, ri) => (
                  <SkeletonCard key={ri} height={HEIGHT_PX[h]} />
                ))}
              </div>
            ))}

          {!loading &&
            cols.map((col, ci) => (
              <div key={ci} style={{ flex: 1, minWidth: 0 }}>
                {col.map((item) => (
                  <GalleryCard key={item.id} item={item} />
                ))}
              </div>
            ))}
            

        </div>

      </section>
    </>
  );
}
