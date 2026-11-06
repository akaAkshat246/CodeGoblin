import React, { useState } from 'react';

// ==========================================
// 1. BAR GRAPH COMPONENT
// ==========================================
export interface BarDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
  color?: string;
  tooltip?: string;
}

export interface BarGraphProps {
  data: BarDataPoint[];
  title?: string;
  subtitle?: string;
  height?: number;
  className?: string;
  barColor?: string;
  showValues?: boolean;
}

export const BarGraph: React.FC<BarGraphProps> = ({
  data,
  title,
  subtitle,
  height = 180,
  className = '',
  barColor = '#A3E635',
  showValues = true,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const maxValue = Math.max(...data.map((d) => d.value), 10);

  return (
    <div className={`p-4 rounded-2xl bg-[#11111a] border border-white/10 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4 flex items-center justify-between">
          <div>
            {title && <h4 className="text-sm font-semibold text-white tracking-wide">{title}</h4>}
            {subtitle && <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>}
          </div>
          {hoveredIdx !== null && (
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-lime-400/10 text-lime-400 border border-lime-400/20 animate-in fade-in duration-100">
              {data[hoveredIdx].label}: {data[hoveredIdx].value} XP
            </span>
          )}
        </div>
      )}

      <div
        className="flex items-end justify-between gap-2 pt-6 pb-2"
        style={{ height }}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {data.map((item, i) => {
          const heightPercent = Math.min(100, Math.round((item.value / maxValue) * 100));
          const isHovered = hoveredIdx === i;

          return (
            <div
              key={item.label + i}
              className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
            >
              {/* Value on top of bar */}
              {showValues && (
                <span
                  className={`text-[10px] font-mono mb-1.5 transition-all duration-200 ${
                    isHovered ? 'text-lime-400 font-bold -translate-y-1' : 'text-zinc-500 opacity-70'
                  }`}
                >
                  {item.value}
                </span>
              )}

              {/* Bar pillar */}
              <div className="w-full max-w-[36px] bg-white/5 rounded-t-lg overflow-hidden h-full flex flex-col justify-end p-0.5">
                <div
                  className="w-full rounded-t-md transition-all duration-500 ease-out"
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: item.color || barColor,
                    boxShadow: isHovered
                      ? `0 0 16px ${item.color || barColor}`
                      : 'none',
                    opacity: hoveredIdx !== null && !isHovered ? 0.45 : 1,
                  }}
                />
              </div>

              {/* Label */}
              <span
                className={`text-[10px] font-mono mt-2 truncate w-full text-center transition-colors ${
                  isHovered ? 'text-white font-semibold' : 'text-zinc-400'
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// 2. CHART JS (CURVE / AREA CHART)
// ==========================================
export interface ChartDataPoint {
  x: string;
  y: number;
}

export interface ChartJSProps {
  data: ChartDataPoint[];
  title?: string;
  subtitle?: string;
  height?: number;
  className?: string;
  lineColor?: string;
  fillColor?: string;
  metricUnit?: string;
}

export const ChartJS: React.FC<ChartJSProps> = ({
  data,
  title,
  subtitle,
  height = 180,
  className = '',
  lineColor = '#A3E635',
  fillColor = 'rgba(163, 230, 53, 0.12)',
  metricUnit = 'XP',
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const maxY = Math.max(...data.map((d) => d.y), 10);
  const minY = Math.min(...data.map((d) => d.y), 0);
  const range = maxY - minY || 1;

  // Viewbox coordinates
  const svgWidth = 500;
  const svgHeight = 160;
  const paddingX = 20;
  const paddingY = 20;

  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - ((d.y - minY) / range) * (svgHeight - paddingY * 2);
    return { x, y, raw: d };
  });

  // Construct smooth SVG path using Catmull-Rom or Bezier
  const pathD = points.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const prev = arr[i - 1];
    const cpX1 = prev.x + (point.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (point.x - prev.x) / 2;
    const cpY2 = point.y;
    return `${acc} C ${cpX1},${cpY1} ${cpX2},${cpY2} ${point.x},${point.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${svgHeight - paddingY} L ${points[0].x},${svgHeight - paddingY} Z`;

  return (
    <div className={`p-4 rounded-2xl bg-[#11111a] border border-white/10 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-3 flex items-center justify-between">
          <div>
            {title && <h4 className="text-sm font-semibold text-white tracking-wide">{title}</h4>}
            {subtitle && <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>}
          </div>
          {activeIndex !== null && (
            <span className="text-xs font-mono font-bold text-lime-400 px-2 py-0.5 rounded bg-lime-400/10 border border-lime-400/20">
              {data[activeIndex].x}: {data[activeIndex].y} {metricUnit}
            </span>
          )}
        </div>
      )}

      <div className="relative w-full overflow-hidden" style={{ height }}>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={lineColor} stopOpacity="0.35" />
              <stop offset="100%" stopColor={lineColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={svgHeight - paddingY}
            x2={svgWidth - paddingX}
            y2={svgHeight - paddingY}
            stroke="rgba(255,255,255,0.08)"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={svgHeight / 2}
            x2={svgWidth - paddingX}
            y2={svgHeight / 2}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4 4"
          />

          {/* Area fill */}
          <path d={areaD} fill="url(#chartGradient)" />

          {/* Line stroke */}
          <path
            d={pathD}
            fill="none"
            stroke={lineColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Points */}
          {points.map((pt, i) => (
            <g key={i}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={activeIndex === i ? 5 : 3}
                fill={activeIndex === i ? '#ffffff' : lineColor}
                stroke={activeIndex === i ? lineColor : '#11111a'}
                strokeWidth="2"
                className="transition-all duration-150 cursor-pointer"
                onMouseEnter={() => setActiveIndex(i)}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mt-2 px-2">
        {data.map((d, i) => (
          <span
            key={i}
            onMouseEnter={() => setActiveIndex(i)}
            className={`cursor-pointer transition-colors ${
              activeIndex === i ? 'text-lime-400 font-bold' : 'hover:text-zinc-300'
            }`}
          >
            {d.x}
          </span>
        ))}
      </div>
    </div>
  );
};

