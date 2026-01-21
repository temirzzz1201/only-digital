import { useEffect, useRef, useCallback, useMemo } from "react";
import gsap from "gsap";
import { calculateCirclePoints } from "../../utils/calculateCirclePoints";
import { HistoryPeriod } from "../../types";
import "./history-circle.scss";

interface Props {
  periods: HistoryPeriod[];
  activeIndex: number;
  onChange: (index: number) => void;
}

export default function HistoryCircle({
  periods,
  activeIndex,
  onChange,
}: Props) {
  const rotatorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const points = useMemo(
    () => calculateCirclePoints(periods.length, 265, 50),
    [periods.length]
  );

  useEffect(() => {
    if (!rotatorRef.current || !textRef.current) return;

    const targetAngle = -points[activeIndex].angle - Math.PI / 4;
    const targetDeg = (targetAngle * 180) / Math.PI - 15;

    const tl = gsap.timeline();
    tl.set(textRef.current, { opacity: 0, y: 10 })
      .to(rotatorRef.current, {
        rotate: targetDeg,
        "--rotation": `${targetDeg}deg`,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
  }, [activeIndex, points]);

  const changePeriod = useCallback(
    (newIndex: number) => {
      if (newIndex !== activeIndex) onChange(newIndex);
    },
    [activeIndex, onChange]
  );

  const previous = useCallback(
    () => activeIndex > 0 && changePeriod(activeIndex - 1),
    [activeIndex, changePeriod]
  );

  const next = useCallback(
    () => activeIndex < periods.length - 1 && changePeriod(activeIndex + 1),
    [activeIndex, periods.length, changePeriod]
  );

  return (
    <div className="history-circle__wrapper">
      <div className="history-circle">
        <div className="history-circle__rotator" ref={rotatorRef}>
          {points.map((point, index) => (
            <button
              key={index}
              className={`history-circle__point ${
                index === activeIndex ? "history-circle__point_active" : ""
              }`}
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(${point.x}px, ${point.y}px) translate(-50%, -50%)`,
              }}
              onClick={() => changePeriod(index)}
            >
              <span className="history-circle__point-number">{index + 1}</span>
            </button>
          ))}
        </div>

        <span className="history-circle__point-text" ref={textRef}>
          {periods[activeIndex].label}
        </span>
      </div>

      <span className="history-circle__point-text history-circle__point-text_mobile">
        {periods[activeIndex].label}
      </span>

      <div className="history-circle__nav">
        <p className="history-circle__nav-text">
          {activeIndex + 1}/{periods.length}
        </p>

        <div className="history-circle__nav-wrapper">
          <button
            className={`history-circle__arrow history-circle__arrow_left ${
              activeIndex === 0 ? "history-circle__arrow_disabled" : ""
            }`}
            onClick={previous}
            disabled={activeIndex === 0}
            aria-label="Previous period"
          >
            ‹
          </button>

          <button
            className={`history-circle__arrow history-circle__arrow_right ${
              activeIndex === periods.length - 1
                ? "history-circle__arrow_disabled"
                : ""
            }`}
            onClick={next}
            disabled={activeIndex === periods.length - 1}
            aria-label="Next period"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
