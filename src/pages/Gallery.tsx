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

// ─── Asset imports ──────────────────────────────────────────────────────────────
import Gallery3  from "../asset/Gallery_3.jpg";
import Gallery5  from "../asset/Gallery_5.jpg";
import Gallery6  from "../asset/Gallery_6.jpg";
import Gallery7  from "../asset/Gallery_7.jpg";
import Gallery8  from "../asset/Gallery_8.mp4";
import Gallery9  from "../asset/Gallery_9.jpg";
import Gallery1Png from "../asset/GALLERY1.png";
import Gallery7Png from "../asset/GALLERY7.png";

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
  category: string;
  height: CardHeight;
  accent: string;
  isVideo?: boolean;
}

const HEIGHT_PX: Record<CardHeight, number> = {
  xs: 180, sm: 240, md: 300, lg: 380, xl: 460,
};

const LOCAL_ITEMS: GalleryItem[] = [
  { id: 1,  src: Gallery1Png, alt: "Juno Moments",      location: "Landscapes",       category: "Wild",      height: "lg",  accent: T.olive },
  { id: 2,  src: Gallery3,    alt: "Gallery 3",          location: "Destinations",     category: "Culture",   height: "sm",  accent: T.terracotta },
  { id: 3,  src: Gallery5,    alt: "Gallery 5",          location: "Adventures",       category: "Jungle",    height: "xl",  accent: T.olive },
  { id: 4,  src: Gallery6,    alt: "Gallery 6",          location: "Serenity",         category: "Ancient",   height: "sm",  accent: T.sand },
  { id: 5,  src: Gallery7,    alt: "Gallery 7",          location: "Hidden Gems",      category: "History",   height: "lg",  accent: T.terracotta },
  { id: 6,  src: Gallery8,    alt: "Gallery Reel",       location: "In Motion",        category: "Cinema",    height: "md",  accent: T.amber, isVideo: true },
  { id: 7,  src: Gallery9,    alt: "Gallery 9",          location: "The Journey",      category: "Wild",      height: "xl",  accent: T.olive },
  { id: 8,  src: Gallery7Png, alt: "Juno Gallery 7",    location: "Curated",          category: "Featured",  height: "sm",  accent: T.amberLight },
];

// ─── Skeleton Card ─────────────────────────────────────────────────────────────
function SkeletonCard({ height, style = {} }: { height: number; style?: React.CSSProperties; key?: React.Key }) {
  return (
    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        height,
        background: T.sandLight,
        position: "relative",
        marginBottom: 16,
        ...style,
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
      {/* skeleton layer */}
      <div 
        style={{ 
          position: "absolute", 
          inset: 0, 
          zIndex: 1, 
          opacity: loaded ? 0 : 1, 
          pointerEvents: "none", 
          transition: "opacity 0.4s ease" 
        }}
      >
        <SkeletonCard height={h} style={{ marginBottom: 0 }} />
      </div>

      {/* actual image */}
      <div
        style={{
          height: h,
          overflow: "hidden",
          position: "relative",
          zIndex: 0,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease",
          width: "100%",
        }}
      >
        {item.isVideo ? (
          <video
            src={item.src}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              filter: hovered ? "brightness(0.85)" : "brightness(1)",
              transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.7s ease",
            }}
          />
        ) : (
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
              transform: hovered ? "scale(1.08)" : "scale(1)",
              filter: hovered ? "brightness(0.85)" : "brightness(1)",
              transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.7s ease",
            }}
          />
        )}

        {/* gradient veil removed as text is gone */}

        {/* category chip removed */}

        {/* Save Button removed */}

        {/* bottom meta removed */}
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
