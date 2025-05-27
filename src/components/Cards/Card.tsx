import React, { useRef, useState } from "react";
import { useHolographicEffect } from "../../hooks";
import styles from "./Card.module.css";
import { animated } from "@react-spring/web";

interface CardProps {
  img: string;
  foil?: string;
  mask?: string;
  enableEffect?: boolean;
}



export function Card({
  img,
  foil = '',
  mask = '',
  enableEffect = true,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [randomSeed] = useState({ x: Math.random(), y: Math.random() });
  const [cosmosPosition] = useState({
    x: Math.floor(randomSeed.x * 734),
    y: Math.floor(randomSeed.y * 1280),
  });
  const [frontImg, setFrontImg] = useState("");
  const [foilStyles, setFoilStyles] = useState<Record<string, string>>({});

  const {
    isMobile,
    isActive,
    isInteracting,
    isLoading,
    setIsActive,
    setIsLoading,
    handleInteract,
    handleInteractEnd,
    retreat,
    springStyle,
  } = useHolographicEffect(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    if (mask || foil) {
      setFoilStyles({
        "--mask": `url(${mask})`,
        "--foil": `url(${foil})`,
      });
    }
  };

  const staticStyles = {
    "--seedx": randomSeed.x,
    "--seedy": randomSeed.y,
    "--cosmosbg": `${cosmosPosition.x}px ${cosmosPosition.y}px`,
  };

  const combinedStyles = {
    ...staticStyles,
    ...foilStyles,
  };

  const handleActive = () => {
    setIsActive(!isActive);
  };

  const cardClasses = [
    styles.card,
    "interactive",
    isActive ? "active" : "",
    isInteracting ? "interacting" : "",
    mask ? styles.masked : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <animated.div
      ref={cardRef}
      className={cardClasses}
      style={springStyle}
      data-set="normal"
    >
      <div className={styles.card_translater}>
        <animated.button
          className={styles.card_rotator}
          onClick={handleActive}
          onMouseMove={enableEffect ? handleInteract : undefined}
          onMouseLeave={enableEffect ? () => handleInteractEnd() : undefined}
          aria-label="Interactive card"
          tabIndex={0}
        >
          <img
            src="/assets/img/tcg-card-back-2x.jpg"
            alt="card back"
            className={styles.card_back}
            width="660"
            height="921"
          />

          <div className={styles.card_front} style={combinedStyles}>
            <img
              src={img}
              alt="Pokemon"
              onLoad={handleImageLoad}
              loading="lazy"
              width="660"
              height="921"
            />
            <div className={styles.card_shine} />
            <div className={styles.card_glare} />
          </div>
        </animated.button>
      </div>
    </animated.div>
  );
}
