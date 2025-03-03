import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface SlicedPieChartProps {
  data: { label: string; value: number }[];
}

const predefinedColors = [
  '#343C6A', // Entertainment
  '#FC7900', // Bill Expense
  '#232323', // Others
  '#396AFF', // Investment
];

const generateDynamicColors = (n: number) => {
  const baseHueRange = 360;
  const saturation = 0.8;
  const lightness = 0.4;

  const colorStep = baseHueRange / (n - 4);

  const dynamicColors: string[] = [];
  for (let i = 0; i < n - 4; i++) {
    const hue = (i * colorStep + 180) % baseHueRange;
    const color = d3.hsl(hue, saturation, lightness).toString();
    dynamicColors.push(color);
  }

  return dynamicColors;
};

const SlicedPieChart: React.FC<SlicedPieChartProps> = ({ data }) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const width = isMobile ? 200 : 270;
  const height = isMobile ? 195 : 265; // Reduced height by 5px

  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const radius = Math.min(width, height) / 2;
    const svg = d3
      .select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .html('')
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pie = d3
      .pie<{ label: string; value: number }>()
      .value((d) => d.value)
      .sort(null)
      .padAngle(0.05);

    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc');

    const totalSlices = data.length;
    const dynamicColors = totalSlices > 4 ? generateDynamicColors(totalSlices) : [];
    const colors = [...predefinedColors, ...dynamicColors];

    // Draw slices and apply popping effect
    arcs
      .append('path')
      .attr('d', (d) => arc(d)!)
      .attr('fill', (_, i) => colors[i % colors.length])
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .on('mouseover', function (event, d) {
        const percentage = Math.round((d.data.value / d3.sum(data, (d) => d.value)) * 100);
        const label = d.data.label;

        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = '1';
          tooltipRef.current.style.left = `${event.pageX + 10}px`;
          tooltipRef.current.style.top = `${event.pageY - 10}px`;
          tooltipRef.current.innerHTML = `${label}: ${percentage}%`;
        }
      })
      .on('mouseout', function () {
        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = '0';
        }
      })
      .attr('transform', (d, i) => {
        // Reduced offset for popping effect
        const offsetX = (Math.random() - 0.5) * 5; // Reduced horizontal offset
        const offsetY = (Math.random() - 0.5) * 5; // Reduced vertical offset
        return `translate(${offsetX}, ${offsetY})`;
      });

    // Add text labels
    arcs
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .attr('font-weight', isMobile ? '700' : '600')
      .each(function (d) {
        const percentage = Math.round((d.data.value / d3.sum(data, (d) => d.value)) * 100);
        const label = d.data.label;

        const labelLines = [percentage + '%', label];

        d3.select(this).text(labelLines[0]).attr('y', -10);

        d3.select(this)
          .append('tspan')
          .text(labelLines[1])
          .attr('x', 0)
          .attr('dy', '1.2em')
          .attr('text-anchor', 'middle');
      });
  }, [data, width, height, isMobile]);

  return (
    <>
      <svg ref={ref}></svg>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '5px',
          opacity: 0,
          pointerEvents: 'none',
          transition: 'opacity 0.3s',
          fontSize: isMobile ? '12px' : '14px',
        }}
      ></div>
    </>
  );
};

export default SlicedPieChart;
