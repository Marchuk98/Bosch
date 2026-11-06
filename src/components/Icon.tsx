import { ICONS, type IconName } from "@/lib/icons";

type Props = {
  name: IconName;
  size?: number | string;
  strokeWidth?: number;
  className?: string;
};

export function Icon({ name, size = 24, strokeWidth = 1.6, className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
