import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getExpenses, deleteExpense } from "../services/expenseApi";
import { useNavigate } from "react-router-dom";

const AllExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    const res = await getExpenses();
    setExpenses(res.data?.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };


  const filteredExpenses = expenses.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        <Header search={search} setSearch={setSearch} />

        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">All Expenses</h2>

          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left py-2">Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredExpenses.map((e) => (
                <tr key={e._id} className="border-b text-gray-500">
                  <td className="py-3">{e.title}</td>
                  <td className="text-center">{e.category}</td>
                  <td className="text-center font-semibold">₹{e.amount}</td>
                  <td className="text-center space-x-4">
                    <button
                      onClick={() => navigate(`/expenses/edit/${e._id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(e.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No matching expenses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllExpenses;
