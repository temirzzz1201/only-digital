import { HistoryPeriod } from "../../types";
import "./history-years.scss";

export default function HistoryYears({ period }: { period: HistoryPeriod }) {
  return (
    <div className="history-years">
      <span className="history-years__item history-years__item_blue">
        {period.start}
      </span>
      <span className="history-years__item history-years__item_red">
        {period.end}
      </span>
    </div>
  );
}
