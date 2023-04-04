// @ts-nocheck

import styled from "@emotion/styled";
import { RuleUnitBase } from "../types";
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { RuleUnitOperationBase } from "../types";
import RuleUnitComponent from "./rule-unit-comp";

interface RuleVisSVGProps {
    rootRule: RuleUnitBase,
    width: number;
    height: number;
  
}

const SVG = styled("svg")({

})

const margins = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
}



export default function RuleVisSVG({rootRule, width, height}: RuleVisSVGProps){
    const svgRef = useRef<SVGSVGElement>(null);

    const chartWidth = width - margins.left - margins.right;
    const chartHeight = height - margins.top - margins.bottom;
    
    const nodeWidth = 160;
    const nodeHeight = 50;

    const partitionFunc = d3.partition<RuleUnitBase>()
                .size([chartWidth, chartHeight])
                .padding(10);

    const hierarchyRoot = d3.hierarchy(rootRule, (d) => {
            if (d instanceof RuleUnitOperationBase) {
                //   @ts-ignore
              return d.children;
            }
            return null;
          });
    
    const treeLayout = d3.tree().size([chartHeight - 160, chartWidth - nodeWidth]);
    treeLayout(hierarchyRoot);

    const invertedXScale = d3.scaleLinear().range([chartWidth - nodeWidth, 0]).domain([0, chartWidth - nodeWidth]);
    const linkGenerator = d3.linkHorizontal<RuleUnitBase>()
        .x((node) => invertedXScale(node.y))
        .y((node) => node.x + nodeHeight/2);;

    console.log(hierarchyRoot.descendants());

    useEffect(() => {
        if (svgRef.current) {
          const svg = d3.select(svgRef.current);
    
          // Clear the SVG before rendering
        //   svg.selectAll('*').remove();
    
          const treeLayout = d3.tree().size([chartWidth, chartHeight]);
          const partition = d3.partition<RuleUnitBase>()
                .size([chartWidth, chartHeight])
                .padding(10);

          const root = d3.hierarchy(rootRule, (d) => {
            if (d instanceof RuleUnitOperationBase) {
                //   @ts-ignore
              return d.children;
            }
            return null;
          }).sum(() => 1);
    
          treeLayout(root);
    
        // partition(root);

          // Draw links (edges)
          //   @ts-ignore
        //   const linkGenerator = d3.linkVertical<RuleUnitBase>()
        // //   @ts-ignore
        //   .x((node) => node.x)
        // //   @ts-ignore
        //   .y((node) => node.y);
          
        //   svg.selectAll('.link')
        //   .data(root.links())
        //   .join('path')
        //   .attr('class', 'link')
        // //   @ts-ignore
        //   .attr('d', linkGenerator)
        //   .attr('stroke', 'black')
        //   .attr('fill', 'none');
      
        // Draw nodes

        // const cells = svg.selectAll('.cell')
        // .data(root.descendants())
        // .join('g')
        // .attr('transform', (d) => {
        //     console.log(d);
        //     //   @ts-ignore
        //     return `translate(${d.y0}, ${d.x0})`
        // })
        // .append('rect')
        // //   @ts-ignore
        // .attr('width', (d) => d.y1 - d.y0 - 5)
        // //   @ts-ignore
        // .attr('height', (d) => d.x1 - d.x0 - 5)
        // .attr('fill', (d) => d.children ? 'blue' : 'green')
        // .attr('stroke', 'white');

        // const labels = svg.selectAll('.label')
        // .data(root.descendants())
        // .join('g')
        // .attr('class', 'label')
        // //   @ts-ignore
        // .attr('transform', (d) => `translate(${d.y0 + 5}, ${d.x0})`);

        // labels.append('text')
        // .text((d) => d.data.name)
        // //   @ts-ignore
        // // .attr('x', (d) => (d.y1 - d.y0) / 2)
        // //   @ts-ignore
        // .attr('y', (d) => (d.x1 - d.x0) / 2)
        // .attr('dominant-baseline', 'middle')
        // .attr('font-size', '12px')
        // .attr('fill', 'white');
    

        // const nodes = svg.selectAll('.node')
        //   .data(root.descendants())
        //   .join('g')
        //   .attr('class', 'node')
        // //   @ts-ignore
        //   .attr('transform', (d) => `translate(${d.x0}, ${d.y0})`);
      
        // nodes.append('circle')
        //   .attr('r', 10)
        //   .attr('fill', (d) => d.children ? 'blue' : 'green');
      
        // nodes.append('text')
        //   .text((d) => d.data.name)
        //   .attr('text-anchor', 'middle')
        //   .attr('dominant-baseline', 'middle')
        //   .attr('font-size', '12px')
        //   .attr('y', -15);
      }
    }, [width, height, svgRef, svgRef.current]);
    const descendants = hierarchyRoot.descendants();
    
    

    return (
        <SVG
             width={width} height={height}
        >  
            <g ref={svgRef} transform={`translate(${margins.left}, ${margins.top})`}>
                <g>
                {
                    hierarchyRoot.links().map((d) => {
                        console.log(d);
                        return (
                            <path
                                d={linkGenerator(d)}
                                stroke={"black"}
                                fill={"none"}
                            ></path>
                        )
                    })

                }
                </g>
                <g>
                {
                    descendants.map((d) => {
                        console.log(d)
                        return (
                            <RuleUnitComponent
                                x={invertedXScale(d.y)}
                                y={d.x}
                                width={nodeWidth}
                                height={nodeHeight}
                                ruleUnit={d.data}
                            />
                        )
                    })
                }
                </g>
               
                
                {/* <RuleUnitComponent
                                x={hierarchyRoot.x}
                                y={hierarchyRoot.y}
                                width={nodeWidth}
                                height={nodeHeight}
                                ruleUnit={hierarchyRoot.data}
                            />  */}
            </g>
           
        </SVG>
    )

}