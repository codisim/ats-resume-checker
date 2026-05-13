"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import UserDot from "./UserDot";
import { MAP_USERS } from "./map.data";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap() {
    return (
        <div className="bg-[#0D1512] border border-white/7 rounded-2xl overflow-hidden">
            <ComposableMap
                projection="geoNaturalEarth1"
                projectionConfig={{ scale: 153, center: [0, 10] }}
                style={{ width: "100%", height: "auto" }}
            >
                <Geographies geography={GEO_URL}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#1A2420"
                                stroke="#0A0F0D"
                                strokeWidth={0.5}
                                style={{
                                    default: { outline: "none" },
                                    hover: { outline: "none", fill: "#1F2E2A" },
                                    pressed: { outline: "none" },
                                }}
                            />
                        ))
                    }
                </Geographies>

                {MAP_USERS.map((u) => (
                    <UserDot
                        key={u.code}
                        coords={u.coords}
                        count={u.count}
                        code={u.code}
                        color={u.color}
                    />
                ))}
            </ComposableMap>
        </div>
    );
}