"use client";

import { Marker } from "react-simple-maps";

interface UserDotProps {
    coords: [number, number];
    count: number;
    code: string;
    color: string;
}

export default function UserDot({ coords, count, code, color }: UserDotProps) {
    const r = Math.max(5, Math.min(14, Math.sqrt(count) * 1.4));

    return (
        <Marker coordinates={coords}>
            {/* Outer glow */}
            <circle r={r * 2.5} fill={color} opacity={0.08} />
            {/* Mid ring */}
            <circle r={r * 1.4} fill={color} opacity={0.18} />
            {/* Core dot */}
            <circle r={r} fill={color} opacity={0.9} />
            {/* Label */}
            <text
                y={-r - 5}
                textAnchor="middle"
                fontSize={9}
                fill={color}
                opacity={0.85}
                fontFamily="sans-serif"
                fontWeight="600"
            >
                {code}
            </text>
        </Marker>
    );
}
