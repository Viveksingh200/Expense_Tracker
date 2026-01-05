import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ExpenseChart = ({ expenses }) => {
//used to group this in array of object
  const data = Object.values(
    expenses.reduce((acc, curr) => {
      const category = curr.category?.trim() || "General";

      acc[category] = acc[category] || {
        category,
        amount: 0,
      };

      acc[category].amount += curr.amount;
      return acc;
    }, {})
  );

  return (
    <div className=" p-5 shadow w-full">
      <h2 className="font-semibold mb-4">Expenses by Category</h2>

      <div className="w-full h-90">
        <ResponsiveContainer width="100%" height="100%" aspect={2}>
          <BarChart data={data} barCategoryGap={30}>
            <XAxis
              dataKey="category"
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#7c3aed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;
