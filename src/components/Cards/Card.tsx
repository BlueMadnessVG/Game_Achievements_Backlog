import React, { useRef, useState } from "react";
import { useHolographicEffect } from "../../hooks";
import { animated } from "@react-spring/web";
import "./css/Card.css";
import "./css/Card_shiny.css";
import "./css/Card_Normal.css";
import "./css/Card_shiny_raycast.css";
import "./css/Card_Rainbow.css";
import "./css/Card_Radiant.css";
import "./css/Card_Glittery.css";

interface CardProps {
  img: string;
  radius?: number | string;
  foil?: string;
  mask?: string;
  enableEffect?: boolean;
  data_set?:
    | "Shiny"
    | "Shiny_raycast"
    | "Normal"
    | "Vibrant"
    | "Radiant"
    | "Glittery"
    | "Disable";
}

export function Card({
  img,
  radius,
  foil = "",
  mask = "",
  data_set = "Normal",
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

  const staticStyles: React.CSSProperties & Record<string, string | number> = {
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
    "card",
    "interactive",
    isActive ? "active" : "",
    isInteracting ? "interacting" : "",
    mask ? "masked" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <animated.div
      ref={cardRef}
      className={cardClasses}
      style={{
        ...springStyle,
        ...(radius !== undefined && {
          "--card-radius": typeof radius === "number" ? `${radius}px` : radius,
        }),
      }}
      data-set={data_set}
    >
      <div className={"card_translater"}>
        <animated.button
          className={"card_rotator"}
          onClick={handleActive}
          onMouseMove={enableEffect ? handleInteract : undefined}
          onMouseLeave={enableEffect ? () => handleInteractEnd() : undefined}
          aria-label="Interactive card"
          tabIndex={0}
        >
          <div className={"card_front"} style={combinedStyles}>
            <img
              src={img}
              alt="Pokemon"
              onLoad={handleImageLoad}
              loading="lazy"
            />
            <div className={"card_shine"} />
            <div className={"card_glare"} />
          </div>
        </animated.button>
      </div>
    </animated.div>
  );
}
