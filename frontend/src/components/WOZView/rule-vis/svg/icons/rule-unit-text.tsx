interface RuleUnitTextProps {
    text: string,
    color: string,
    height: number
}


export default function RuleUnitText({height, text, color}: RuleUnitTextProps) {

    return (
        <text 
            alignmentBaseline="middle"
            x="8" y={height/2} fontSize="14" fill={color}>
            {text}
        </text>
    )
}