import { RuleUnitAction, RuleUnitBase } from "../types"

interface RuleUnitDefaultComponentProps {
    ruleUnit: RuleUnitBase,
    x: number, y: number,
    width: number, height: number
}

export default function RuleUnitDefaultComponent ({ruleUnit, x, y, width, height}: RuleUnitDefaultComponentProps){
    return (
        <g transform={`translate(${x}, ${y})`}>
                                <rect
                                    width={width}
                                    height={height}
                                    fill={ruleUnit.ruleSatisfied ? 'blue' : 'green'}
                                    stroke="white"
                                />
                                <text
                                    x={width / 2}
                                    y={height / 2}
                                    dominantBaseline="middle"
                                    textAnchor="middle"
                                    fontSize="12px"
                                    fill="white"
                                >

                                    Whoops;

                                </text>
                            </g>
    )
}
