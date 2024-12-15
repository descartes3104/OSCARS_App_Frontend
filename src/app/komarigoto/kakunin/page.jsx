"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function KakuninPage({ searchParams }) {
  const [eventData, setEventData] = useState(null);
  const router = useRouter();
  const date = searchParams?.date || "";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://127.0.0.1:5000/api/events?date=${date}`);
      if (response.ok) {
        const data = await response.json();
        setEventData(data);
      } else {
        router.push(`/komarigoto/touroku?date=${date}`);
      }
    };
    fetchData();
  }, [date]);

  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4">困りごとを確認</h1>
      {eventData && eventData.length > 0 ? (
        <div className="space-y-4">
            {eventData.map((event, index) => (
                <div key={index} className="border p-4 rounded bg-white shadow">
                    <p><strong>場所:</strong> {event.place}</p>
                    <p><strong>依頼事項:</strong> {event.task}</p>
                    <p><strong>特徴:</strong> {event.features}</p>
                    <p><strong>ポイント:</strong> {event.points}</p>
                    <button className="py-2 px-4 bg-green-500 text-white rounded">助ける</button>
                </div>
            ))}
        </div>
      ) : (
        <p>{eventData ? "データがありません" : "データを取得中..."}</p>
      )}
    </div>
  );
}
