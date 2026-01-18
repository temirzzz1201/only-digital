import "./line.scss";

interface LineProps {
  orientation?: "vertical" | "horizontal";
  className?: string;
}

function Line({ orientation = "vertical", className = "" }: LineProps) {
  return <div className={`line line_${orientation} ${className}`.trim()} />;
}

export default Line;
