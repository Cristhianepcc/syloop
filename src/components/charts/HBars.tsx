interface HBarItem {
  label: string;
  value: string;
  color?: string;
}

interface HBarsProps {
  data: HBarItem[];
  values: number[];
  onSelect?: (label: string) => void;
  selected?: string;
}

export function HBars({ data, values, onSelect, selected }: HBarsProps) {
  const max = Math.max(...values, 1);

  return (
    <div className="flex flex-col gap-3">
      {data.map((item, i) => {
        const isSelected = selected === item.label;
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => onSelect?.(item.label)}
            disabled={!onSelect}
            className={`grid grid-cols-[100px_1fr_72px] items-center gap-3 rounded-[8px] px-1 py-1 text-left ${
              onSelect ? 'hover:bg-[#F1F5F9] focus-visible:focus-ring' : ''
            }`}
          >
            <span className="truncate text-sm font-medium text-ink">{item.label}</span>
            <span className="h-2.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
              <span
                className="block h-full rounded-full transition-all"
                style={{
                  width: `${Math.max(4, (values[i] / max) * 100)}%`,
                  backgroundColor: item.color ?? (isSelected ? '#1D4ED8' : '#4A8CF0'),
                }}
              />
            </span>
            <span className="text-right text-sm font-semibold text-ink">{item.value}</span>
          </button>
        );
      })}
    </div>
  );
}
