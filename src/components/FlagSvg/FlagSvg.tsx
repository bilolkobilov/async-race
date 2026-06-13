interface FlagSvgProps {
  size?: number;
}

const FlagSvg = ({ size = 32 }: FlagSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" width={size} aria-hidden="true">
    <rect x="4" y="2" width="2" height="36" fill="#555" />
    <rect x="6" y="2" width="8" height="4" fill="#222" />
    <rect x="14" y="2" width="8" height="4" fill="#eee" />
    <rect x="6" y="6" width="8" height="4" fill="#eee" />
    <rect x="14" y="6" width="8" height="4" fill="#222" />
    <rect x="6" y="10" width="8" height="4" fill="#222" />
    <rect x="14" y="10" width="8" height="4" fill="#eee" />
  </svg>
);

export default FlagSvg;
