interface CarSvgProps {
  color: string;
  width?: number;
}

const CarSvg = ({ color, width = 80 }: CarSvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 40"
    width={width}
    aria-hidden="true"
  >
    <rect x="10" y="20" width="80" height="14" rx="4" fill={color} />
    <path d="M20 20 L30 8 L70 8 L80 20 Z" fill={color} />
    <rect x="32" y="10" width="14" height="10" rx="2" fill="#c8e6ff" opacity="0.8" />
    <rect x="54" y="10" width="14" height="10" rx="2" fill="#c8e6ff" opacity="0.8" />
    <circle cx="25" cy="34" r="6" fill="#222" />
    <circle cx="25" cy="34" r="3" fill="#888" />
    <circle cx="75" cy="34" r="6" fill="#222" />
    <circle cx="75" cy="34" r="3" fill="#888" />
    <rect x="80" y="22" width="8" height="4" rx="1" fill="#ffee58" opacity="0.9" />
    <rect x="12" y="22" width="6" height="4" rx="1" fill="#ef5350" opacity="0.9" />
  </svg>
);

export default CarSvg;
