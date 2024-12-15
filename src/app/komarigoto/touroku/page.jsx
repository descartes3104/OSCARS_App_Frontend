"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TourokuPage({ searchParams }) {
  const [formData, setFormData] = useState({
    place: "",
    task: "",
    features: "",
    points: ""
  });
  const router = useRouter();
  const date = searchParams?.date || "";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, date })
    });
    if (response.ok) {
      alert("登録ありがとうございます！");
      router.push("/komarigoto");
    } else {
      console.error("Failed to submit data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4">困りごとを登録</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">場所</label>
          <input
            name="place"
            value={formData.place}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">依頼事項</label>
          <input
            name="task"
            value={formData.task}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">特徴</label>
          <input
            name="features"
            value={formData.features}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">ポイント</label>
          <input
            name="points"
            value={formData.points}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded"
        >
          登録
        </button>
      </form>
    </div>
  );
}
