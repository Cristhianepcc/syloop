interface Series {
  label: string;
  color: string;
}

interface GroupedBarsProps {
  categories: string[];
  series: Series[];
  values: number[][];
  height?: number;
}

export function GroupedBars({ categories, series, values, height = 220 }: GroupedBarsProps) {
  const max = Math.max(...values.flat(), 1);

  return (
    <div>
      <div className="flex gap-4" style={{ height }}>
        {categories.map((cat, i) => (
          <div key={cat} className="flex flex-1 flex-col items-center justify-end gap-2">
            <div className="flex w-full flex-1 items-end justify-center gap-1">
              {series.map((s, si) => (
                <div
                  key={s.label}
                  className="w-full max-w-[18px] rounded-t-[3px]"
                  style={{
                    height: `${Math.max(2, (values[si][i] / max) * 100)}%`,
                    backgroundColor: s.color,
                  }}
                  title={`${s.label}: ${values[si][i]}`}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-[#475569]">{cat}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-4">
        {series.map((s) => (
          <span key={s.label} className="inline-flex items-center gap-1.5 text-xs text-[#475569]">
            <span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
