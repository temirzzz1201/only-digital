import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { HistoryEvent } from "../../types";
import "swiper/css";
import "swiper/css/pagination";
import "./history-slider.scss";
interface Props {
  events: HistoryEvent[];
  setWrapperRef: (el: HTMLDivElement | null) => void;
}

export default function HistorySlider({ events, setWrapperRef }: Props) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateState = (s: SwiperType) => {
    setIsBeginning(s.isBeginning);
    setIsEnd(s.isEnd);
  };

  useEffect(() => {
    if (!swiper) return;
    swiper.slideTo(0, 0);
  }, [events, swiper]);

  return (
    <div className="history-slider" ref={setWrapperRef}>
      {!isBeginning && (
        <button
          className="history-slider__arrow history-slider__arrow_left hide-on-mobile"
          onClick={() => swiper?.slidePrev()}
        >
          ‹
        </button>
      )}

      <Swiper
        modules={[Pagination]}
        slidesPerView="auto"
        pagination={{ clickable: true }}
        onSwiper={(s: SwiperType) => {
          setSwiper(s);
          updateState(s);
        }}
        onSlideChange={updateState}
        className="history-slider__swiper"
      >
        {events.map((event, i) => (
          <SwiperSlide
            key={i}
            className="history-slider__slide
          "
          >
            <div className="history-card">
              <h4 className="history-card__title">{event.title}</h4>
              <p className="history-card__description">{event.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {!isEnd && (
        <button
          className="history-slider__arrow history-slider__arrow_right hide-on-mobile"
          onClick={() => swiper?.slideNext()}
        >
          ›
        </button>
      )}
    </div>
  );
}
