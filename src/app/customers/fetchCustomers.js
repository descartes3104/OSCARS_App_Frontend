export default async function fetchCustomers() {
  try {
    const response = await fetch('https://api.example.com/customers');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format');
    }

    return data; // 正常なデータを返す
  } catch (error) {
    console.error('Failed to fetch customers:', error);
    return []; // エラー時は空の配列を返す
  }
}
