interface ThinBarsProps {
  data: number[];
  overlay?: number[];
  height?: number;
  barColor?: string;
  overlayColor?: string;
  max?: number;
}

export function ThinBars({
  data,
  overlay,
  height = 160,
  barColor = '#4A8CF0',
  overlayColor = '#1E293B',
  max,
}: ThinBarsProps) {
  const effectiveMax = max ?? Math.max(...data, ...(overlay ?? []), 1);

  const overlayPoints = overlay
    ?.map((v, i) => {
      const x = (i / (overlay.length - 1 || 1)) * 100;
      const y = 100 - (v / effectiveMax) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="relative" style={{ height }}>
      <div className="absolute inset-0 flex items-end gap-[1.5px]">
        {data.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-[1px]"
            style={{ height: `${Math.max(2, (v / effectiveMax) * 100)}%`, backgroundColor: barColor, opacity: 0.85 }}
          />
        ))}
      </div>
      {overlay && (
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <polyline
            points={overlayPoints}
            fill="none"
            stroke={overlayColor}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  );
}
