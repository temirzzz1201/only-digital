import { useState } from "react";
import { historyData } from "./data.mock";
import HistoryCircle from "./components/history-circle/HistoryCircle";
import HistoryYears from "./components/history-years/HistoryYears";
import HistorySlider from "./components/history-slider/HistorySlider";
import Line from "./components/line/Line";
import { useSwiperAnimation } from "./hooks/useSwiperAnimation";

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setSliderRef, changePeriod } = useSwiperAnimation(setActiveIndex);

  return (
    <main>
      <Line className="line_left" />
      <Line className="line_right" />
      <Line className="line_center-vertical line_vertical" />
      <Line className="line_center-horizontal line_horizontal" />

      <Line className="line_vertical line_left line_color" />

      <h1 className="main-title">Исторические даты</h1>

      <HistoryYears period={historyData[activeIndex]} />

      <HistoryCircle
        periods={historyData}
        activeIndex={activeIndex}
        onChange={changePeriod}
      />

      <HistorySlider
        events={historyData[activeIndex].events}
        setWrapperRef={setSliderRef}
      />
    </main>
  );
}

export default App;
