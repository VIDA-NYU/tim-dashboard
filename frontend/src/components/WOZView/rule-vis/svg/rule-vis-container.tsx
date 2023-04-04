import { generateStaticRule } from "../utils";
import RuleVisSVG from "./rule-vis-svg";

interface RuleVisContainerProps {}

export default function RuleVisContainer({}: RuleVisContainerProps) {
  
    let ruleDef = generateStaticRule();
    return (
    <div>
      <h1>RuleVisContainer</h1>
      <RuleVisSVG rootRule={ruleDef} width={720} height={540} />
    </div>
  );
}