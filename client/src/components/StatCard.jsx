import { useEffect, useState } from "react";
import { getExpenses } from "../services/expenseApi";

const StatCard = ({expenses, setExpenses}) => {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem("balance");
    return saved ? Number(saved) : 0;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempBalance, setTempBalance] = useState(balance);

  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance]);

  const handleSave = () => {
    setBalance(Number(tempBalance));
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await getExpenses();
      setExpenses(res.data?.data || []);
    };
    fetchExpenses();
  }, []);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
      {/* TOTAL */}
      <div className="bg-white p-5 rounded shadow">
        <p className="text-gray-500 text-sm">Total Expenses</p>
        <h2 className="text-2xl font-bold mt-1">₹ {total}</h2>
      </div>

      {/* THIS MONTH */}
      <div className="bg-white p-5 rounded shadow">
        <p className="text-gray-500 text-sm">This Month</p>
        <h2 className="text-2xl font-bold mt-1">₹ {total}</h2>
      </div>

      {/* BALANCE */}
      <div className="bg-white p-5 rounded shadow">
        <p className="text-gray-500 text-sm">Balance</p>

        <div className="min-h-16 flex items-center gap-4">
          {!isEditing ? (
            <>
              <h2 className="text-2xl font-bold whitespace-nowrap">
                ₹ {balance-total}
              </h2>

              <button
                onClick={() => {
                  setTempBalance(balance);
                  setIsEditing(true);
                }}
                className="text-blue-500 md:text-lg border-2 rounded-sm cursor-pointer hover:bg-blue-500 hover:text-white sm:px-0 md:px-2 border-blue-500 sm:text-xs"
              >
                Edit balance
              </button>
            </>
          ) : (
            <>
              <input
                type="number"
                className="border px-3 py-2 rounded w-50 text-sm"
                value={tempBalance}
                onChange={(e) => setTempBalance(e.target.value)}
              />

              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm cursor-pointer"
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
