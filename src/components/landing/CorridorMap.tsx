import type { ReactElement } from "react";

interface MapCity {
  name: string;
  x: number;
  y: number;
  anchor: "start" | "end";
  endpoint?: boolean;
}

// Approximate positions projected from real lat/long (720x300 projection inside a 780-wide viewBox for labels).
const MAP_CITIES: MapCity[] = [
  { name: "Morristown", x: 80, y: 235, anchor: "start", endpoint: true },
  { name: "Greeneville", x: 318, y: 260, anchor: "start" },
  { name: "Fall Branch", x: 425, y: 136, anchor: "end" },
  { name: "Kingsport", x: 457, y: 73, anchor: "end" },
  { name: "Johnson City", x: 564, y: 187, anchor: "end" },
  { name: "Elizabethton", x: 637, y: 170, anchor: "start" },
  { name: "Bristol", x: 649, y: 51, anchor: "end", endpoint: true },
];

const CORRIDOR_PATH = "M80 235 C 180 250, 250 262, 318 260 S 470 205, 564 187 S 640 95, 649 51";
const LABEL_OFFSET = 14;

function labelX(city: MapCity): number {
  return city.anchor === "start" ? city.x + LABEL_OFFSET : city.x - LABEL_OFFSET;
}

/** Stylized Morristown-to-Bristol corridor — decorative geography, no external map. */
export function CorridorMap(): ReactElement {
  return (
    <svg viewBox="0 0 780 300" role="img" aria-labelledby="corridor-map-title" className="h-auto w-full">
      <title id="corridor-map-title">Service corridor across Northeast Tennessee from Morristown to Bristol</title>
      <path d={CORRIDOR_PATH} fill="none" stroke="#527eff" strokeOpacity="0.28" strokeWidth="44" strokeLinecap="round" />
      <path d={CORRIDOR_PATH} fill="none" stroke="#da384d" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 10" />
      {MAP_CITIES.map((city) => (
        <g key={city.name}>
          <circle cx={city.x} cy={city.y} r={city.endpoint ? 10 : 7} fill="#ffffff" stroke="#da384d" strokeWidth={city.endpoint ? 5 : 4} />
          <text x={labelX(city)} y={city.y + 5} textAnchor={city.anchor} fill="#ffffff" fontSize={city.endpoint ? 18 : 15} fontWeight={city.endpoint ? 700 : 600} className="font-body">
            {city.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
