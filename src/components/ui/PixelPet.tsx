import { useEffect, useRef, useState } from "react";

type Point = {
  x: number;
  y: number;
};

type PixelPetProps = {
  spriteSrc?: string;
};

const PET_SIZE = 24;
const FOLLOW_SPEED = 0.016;
const SLEEP_RADIUS = 16;
const FOLLOW_DELAY_MS = 300;
const SLEEP_HOLD_MS = 220;
const FOLLOW_OFFSET_X = 14;
const FOLLOW_OFFSET_Y = 12;
const ZIGZAG_AMPLITUDE = 4;
const ZIGZAG_SPEED = 0.009;

const getInitialPosition = (): Point => {
  if (typeof window === "undefined") {
    return { x: 0, y: 0 };
  }

  return {
    x: window.innerWidth - 128,
    y: window.innerHeight * 0.68,
  };
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const PixelFallback = ({
  sleeping,
  isChasing,
  primaryFill,
  detailFill,
}: {
  sleeping: boolean;
  isChasing: boolean;
  primaryFill: string;
  detailFill: string;
}) => {
  const earTilt = isChasing ? 1 : 0;
  const legShift = isChasing ? 1 : 0;

  return (
    <div className="relative w-full h-full select-none">
      <svg
        viewBox="0 0 24 24"
        className="h-full w-full"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <rect x="0" y="0" width="24" height="24" fill="transparent" />

        <rect x="7" y="2" width="2" height="2" fill={primaryFill} transform={`translate(${-earTilt}, ${earTilt})`} />
        <rect x="15" y="2" width="2" height="2" fill={primaryFill} transform={`translate(${earTilt}, ${earTilt})`} />
        <rect x="6" y="4" width="12" height="8" fill={primaryFill} />
        <rect x="8" y="6" width="2" height="1" fill={detailFill} />
        <rect x="14" y="6" width="2" height="1" fill={detailFill} />
        <rect x="11" y="8" width="2" height="1" fill={detailFill} />

        <rect x="4" y="6" width="2" height="2" fill={primaryFill} />
        <rect x="18" y="6" width="2" height="2" fill={primaryFill} />
        <rect x="3" y="10" width="2" height="2" fill={primaryFill} />
        <rect x="19" y="10" width="2" height="2" fill={primaryFill} />

        <rect x="7" y="12" width="2" height="4" fill={primaryFill} transform={`translate(${-legShift}, 0)`} />
        <rect x="10" y="12" width="2" height="4" fill={primaryFill} />
        <rect x="13" y="12" width="2" height="4" fill={primaryFill} transform={`translate(${legShift}, 0)`} />
        <rect x="16" y="12" width="2" height="4" fill={primaryFill} />

        <rect x="16" y="12" width="4" height="1" fill={primaryFill} />
        <rect x="18" y="11" width="2" height="1" fill={primaryFill} />
        <rect x="19" y="10" width="2" height="1" fill={primaryFill} />

        {isChasing ? (
          <rect x="20" y="13" width="2" height="2" fill={primaryFill} />
        ) : (
          <rect x="20" y="14" width="2" height="1" fill={primaryFill} />
        )}
      </svg>

      {sleeping && (
        <div className={`absolute -top-4 right-0 text-[10px] font-mono ${primaryFill === "white" ? "text-white" : "text-black"}`}>
          zZ
        </div>
      )}
    </div>
  );
};

const PixelPet = ({ spriteSrc }: PixelPetProps) => {
  const [position, setPosition] = useState<Point>(() => getInitialPosition());
  const [sleeping, setSleeping] = useState(false);
  const [isChasing, setIsChasing] = useState(false);
  const [isUsingImage, setIsUsingImage] = useState(Boolean(spriteSrc));
  const [isDarkMode, setIsDarkMode] = useState(true);
  const positionRef = useRef<Point>(position);
  const targetRef = useRef<Point>(position);
  const cursorRef = useRef<Point>({ x: 0, y: 0 });
  const sleepingRef = useRef(false);
  const lastMoveAtRef = useRef(0);
  const sleepStartedAtRef = useRef(0);

  useEffect(() => {
    if (spriteSrc) {
      setIsUsingImage(true);
    }
  }, [spriteSrc]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const syncTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const petPosition = getInitialPosition();
    const target = { ...petPosition };
    const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    positionRef.current = { ...petPosition };
    targetRef.current = { ...target };
    cursorRef.current = { ...cursor };
    lastMoveAtRef.current = performance.now();

    let active = true;
    let animationFrame = 0;

    const syncBounds = (next: Point) => ({
      x: clamp(next.x, 16, window.innerWidth - PET_SIZE - 16),
      y: clamp(next.y, 16, window.innerHeight - PET_SIZE - 16),
    });

    const handlePointerMove = (event: PointerEvent) => {
      const moved = Math.hypot(event.clientX - cursorRef.current.x, event.clientY - cursorRef.current.y);

      cursor.x = event.clientX;
      cursor.y = event.clientY;
      target.x = event.clientX - PET_SIZE / 2 + FOLLOW_OFFSET_X;
      target.y = event.clientY - PET_SIZE / 2 + FOLLOW_OFFSET_Y;
      cursorRef.current = { ...cursor };
      targetRef.current = { ...target };
      lastMoveAtRef.current = performance.now();

      if (sleepingRef.current && moved > 2) {
        const sleptFor = performance.now() - sleepStartedAtRef.current;

        if (sleptFor >= SLEEP_HOLD_MS) {
          sleepingRef.current = false;
          setSleeping(false);
        }
      }
    };

    const handleResize = () => {
      const next = syncBounds(petPosition);
      petPosition.x = next.x;
      petPosition.y = next.y;
      target.x = clamp(target.x, 16, window.innerWidth - PET_SIZE - 16);
      target.y = clamp(target.y, 16, window.innerHeight - PET_SIZE - 16);
      positionRef.current = { ...petPosition };
      targetRef.current = { ...target };
      setPosition(next);
    };

    const step = () => {
      if (!active) {
        return;
      }

      if (!sleepingRef.current) {
        const idleFor = performance.now() - lastMoveAtRef.current;
        if (idleFor < FOLLOW_DELAY_MS) {
          setIsChasing(false);
          animationFrame = window.requestAnimationFrame(step);
          return;
        }

        const speed = idleFor > 140 ? FOLLOW_SPEED * 0.45 : FOLLOW_SPEED;
        const angle = Math.atan2(target.y - petPosition.y, target.x - petPosition.x);
        const zigzagOffset = Math.sin(performance.now() * ZIGZAG_SPEED) * ZIGZAG_AMPLITUDE;
        const movingTarget = {
          x: target.x + Math.cos(angle + Math.PI / 2) * zigzagOffset,
          y: target.y + Math.sin(angle + Math.PI / 2) * zigzagOffset,
        };
        const distanceToTarget = Math.hypot(movingTarget.x - petPosition.x, movingTarget.y - petPosition.y);

        setIsChasing(distanceToTarget > 4);

        petPosition.x += (movingTarget.x - petPosition.x) * speed;
        petPosition.y += (movingTarget.y - petPosition.y) * speed;

        const bounded = syncBounds(petPosition);
        petPosition.x = bounded.x;
        petPosition.y = bounded.y;
        positionRef.current = { ...petPosition };

        const petCenterX = petPosition.x + PET_SIZE / 2;
        const petCenterY = petPosition.y + PET_SIZE / 2;
        const distanceToCursor = Math.hypot(cursorRef.current.x - petCenterX, cursorRef.current.y - petCenterY);

        if (distanceToCursor <= SLEEP_RADIUS) {
          sleepingRef.current = true;
          sleepStartedAtRef.current = performance.now();
          setSleeping(true);
          setIsChasing(false);
        }

        setPosition({ x: petPosition.x, y: petPosition.y });
      }

      animationFrame = window.requestAnimationFrame(step);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize);
    animationFrame = window.requestAnimationFrame(step);

    return () => {
      active = false;
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
    };
    }, []);

  return (
      <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-40 pointer-events-none opacity-90"
      style={{
        width: PET_SIZE,
        height: PET_SIZE,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          willChange: "transform",
      }}
    >
        <div
            className={`relative h-full w-full drop-shadow-[0_0_18px_rgba(126,225,216,0.2)] transition-transform duration-200 ${sleeping ? "scale-95" : isChasing ? "scale-105 -rotate-1" : "scale-100"}`}
        >
        {isUsingImage ? (
          <img
            src={spriteSrc}
            alt=""
              className="h-full w-full object-contain"
            style={{ imageRendering: "pixelated" }}
            onError={() => setIsUsingImage(false)}
          />
        ) : (
          <PixelFallback
            sleeping={sleeping}
            isChasing={isChasing}
            primaryFill={isDarkMode ? "white" : "black"}
            detailFill={isDarkMode ? "black" : "white"}
          />
        )}
      </div>
      </div>
  );
};

export default PixelPet;