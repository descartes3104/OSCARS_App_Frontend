"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(weekday);
dayjs.extend(isoWeek);

export default function KomarigotoPage() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState([]);
  
  const holidays = [
    "2025-01-01", "2025-01-13", "2025-02-11", "2025-02-24", "2025-03-20",
    "2025-04-29", "2025-05-03", "2025-05-05", "2025-05-06", "2025-07-21",
    "2025-08-11", "2025-09-15", "2025-09-23", "2025-10-13", "2025-11-03", "2025-11-24"
  ];

  useEffect(() => {
    // イベントデータをバックエンドから取得
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("イベントデータの取得に失敗しました");
        }
        const data = await response.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  const getDayClass = (day) => {
    if (!day) return "p-2 border rounded bg-gray-100";
    const today = dayjs();
    const isPast = day.isBefore(today, "day");
    const isToday = day.isSame(today, "day");
    const isSunday = day.weekday() === 0;
    const isSaturday = day.weekday() === 6;
    const isHoliday = holidays.includes(day.format("YYYY-MM-DD"));

    let classes = "p-2 border rounded cursor-pointer ";
    if (isPast) {
      classes += "bg-gray-200 text-gray-400 cursor-default";
    } else if (isToday) {
      classes += "bg-yellow-300";
    } else {
      classes += "bg-white";
    }
    if (isSaturday) classes += " text-blue-500";
    if (isSunday || isHoliday) classes += " text-red-500";

    return classes;
  };

  const handleConfirmClick = (dateStr) => {
    // 該当日付のイベントがリストに存在するか確認
    const eventExists = events.some((event) => event.date === dateStr);

    if (eventExists) {
      window.location.href = `/komarigoto/kakunin?date=${dateStr}`;
    } else {
      window.location.href = `/komarigoto/touroku?date=${dateStr}`;
    }
  };

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.weekday();
  const endDay = endOfMonth.weekday();

  const emptyDaysBefore = Array.from({ length: startDay }, () => null);
  const emptyDaysAfter = Array.from({ length: 6 - endDay }, () => null);
  const daysInMonth = Array.from({ length: endOfMonth.date() }, (_, i) =>
    startOfMonth.add(i, "day")
  );
  const days = [...emptyDaysBefore, ...daysInMonth, ...emptyDaysAfter];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">サポート/サポーティ向け 困りごとお助けカレンダー</h1>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
          className="py-1 px-3 border rounded bg-white text-black"
        >
          前月
        </button>
        <h2>{currentDate.format("YYYY年MM月")}</h2>
        <button
          onClick={() => setCurrentDate(currentDate.add(1, "month"))}
          className="py-1 px-3 border rounded bg-white text-black"
        >
          次月
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["日", "月", "火", "水", "木", "金", "土"].map((day, index) => (
          <div key={index} className="text-center font-bold">{day}</div>
        ))}
        {days.map((day, index) => {
          const dateStr = day && day.format("YYYY-MM-DD");

          return (
            <div
              key={index}
              className={getDayClass(day)}
            >
              {day && (
                <>
                  <div>{day.date()}</div>

                  {/* 登録リンク */}
                  <a
                    href={`/komarigoto/touroku?date=${dateStr}`}
                    className="text-blue-500 underline text-sm mr-2"
                  >
                    登録
                  </a>

                  {/* 確認リンク */}
                  <a
                    href={`/komarigoto/kakunin?date=${dateStr}`}
                    className="text-green-500 underline text-sm"
                  >
                    確認
                  </a>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
