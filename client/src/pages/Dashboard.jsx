import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseChart from "../components/ExpenseChart";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6 w-full">
        <Header  />

        {/* STAT CARDS */}
        <div className="">
          <StatCard setExpenses={setExpenses} expenses={expenses}/>
        </div>

        {/* CONTENT */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
          {/* CHART */}
          <div className="sm:col-span-1 md:col-span-2 w-full">
            <ExpenseChart expenses={expenses} />
          </div>

          {/* TABLE */}
          <ExpenseTable expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
