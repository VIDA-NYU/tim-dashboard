interface RuleUnitRectProps {
    width: number,
    height: number,
    color: string
}

export default function RuleUnitRect({width, height, color}: RuleUnitRectProps){
    return (
        <rect x="0" y="0" rx="5" ry="5" width={width} height={height} 
        stroke={color}
        strokeWidth={2}
        fill="white" />
    )
}