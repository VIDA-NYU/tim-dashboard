import React from 'react';


interface RuleUnitTransformProps {
    x: number,
    y: number,
    children: React.ReactNode
}

export default function RuleUnitTransform({x, y, children}: RuleUnitTransformProps){
    return (
        <g
            transform={`translate(${x}, ${y})`}
        >
            {children}
        </g>
    )
}