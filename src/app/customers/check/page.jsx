"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";  // 追加：必要なhooksのインポート
import OneCustomerInfoCard from "../../components/one_customer_info_card";  // パスを相対パスに変更

async function fetchCustomer(id) {
  if (!id) throw new Error("Customer ID is required");
  
  const res = await fetch(`${process.env.API_ENDPOINT}/customers?customer_id=${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }
  return res.json();
}

function CustomerContent({ customerId }) {
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchCustomer(customerId);
        setCustomer(data[0]);
      } catch (err) {
        setError(err.message);
      }
    }
    
    if (customerId) {
      loadData();
    }
  }, [customerId]);

  if (error) {
    return (
      <div className="alert alert-error">
        <p>{error}</p>
        <a href="/customers" className="btn btn-outline btn-accent">
          一覧に戻る
        </a>
      </div>
    );
  }

  if (!customer) {
    return <div className="loading loading-spinner loading-lg"></div>;
  }

  return (
    <>
      <div className="alert alert-success">
        更新しました
      </div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <OneCustomerInfoCard customer={customer} />
      </div>
      <a 
        href="/customers"
        className="btn btn-outline btn-accent"
      >
        一覧に戻る
      </a>
    </>
  );
}

export default function CheckPage({ searchParams }) {
  const customerId = searchParams?.customer_id;

  return (
    <Suspense fallback={<div className="loading loading-spinner loading-lg"></div>}>
      <CustomerContent customerId={customerId} />
    </Suspense>
  );
}
