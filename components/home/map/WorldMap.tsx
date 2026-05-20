"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import UserDot from "./UserDot";
import { MAP_USERS } from "./map.data";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap() {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
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
                                fill="#E2E8F0"
                                stroke="#FFFFFF"
                                strokeWidth={0.5}
                                style={{
                                    default: { outline: "none" },
                                    hover: { outline: "none", fill: "#CBD5E1" },
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
