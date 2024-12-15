"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import OneCustomerInfoCard from "src/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer";

// サブコンポーネント（Suspense 内で使用）
const ConfirmPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customer_id = searchParams.get("customer_id");
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchAndSetCustomer = async () => {
      try {
        const customerData = await fetchCustomer(customer_id);
        setCustomer(customerData[0]);
      } catch (error) {
        console.error("Failed to fetch customer:", error);
        setCustomer(null);
      }
    };
    fetchAndSetCustomer();
  }, [customer_id]);

  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <div className="alert alert-success p-4 text-center">
          正常に作成しました
        </div>
        {customer ? (
          <OneCustomerInfoCard {...customer} />
        ) : (
          <div>Loading...</div>
        )}
        <button
          onClick={() => router.push("/customers")}
          className="btn btn-primary m-4 text-2xl"
        >
          戻る
        </button>
      </div>
    </>
  );
};

// メインコンポーネント
export default function ConfirmPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmPageContent />
    </Suspense>
  );
}
