"use client";

import OneCustomerInfoCard from "src/app/components/one_customer_info_card.jsx";
import deleteCustomer from "./deleteCustomer";
import fetchCustomer from "./fetchCustomer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeletePage(props) {
  const customer_id = props.params.id; // ルートパラメータから ID を取得
  const router = useRouter();
  const [customer, setCustomer] = useState(null);

  // 顧客情報を取得して状態にセット
  useEffect(() => {
    const fetchAndSetCustomer = async () => {
      try {
        const customerInfo = await fetchCustomer(customer_id);
        setCustomer(customerInfo[0]);
      } catch (error) {
        console.error("Failed to fetch customer:", error);
      }
    };

    if (customer_id) {
      fetchAndSetCustomer();
    }
  }, [customer_id]); // customer_id を依存配列に追加

  // 削除処理
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await deleteCustomer(customer_id);
      router.push(`/delete/confirm?customer_id=${customer_id}`);
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  };

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <OneCustomerInfoCard {...customer} />
      <button onClick={handleSubmit} className="btn btn-primary m-4 text-2xl">
        削除
      </button>
    </div>
  );
}
