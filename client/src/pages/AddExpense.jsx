import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { addExpense } from "../services/expenseApi.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext.jsx";

const schema = yup.object({
  title: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Title must contain only letters")
    .required("Title is required"),

  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),

  category: yup.string().required("Category is required"),
});

const AddExpense = () => {
  const {navigate} = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      amount: "",
      category: "General",
    },
  });


  const onSubmit = async (data) => {
    await addExpense(data);
    reset();
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        <Header />

        <div className="bg-white p-6 rounded shadow max-w-lg mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-lg font-semibold">Add Expense</h2>

            {/* TITLE */}
            <div>
              <input
                type="text"
                placeholder="Title"
                {...register("title")}
                className="border p-2 w-full rounded"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* AMOUNT */}
            <div>
              <input
                type="number"
                placeholder="Amount"
                {...register("amount")}
                className="border p-2 w-full rounded"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* CATEGORY */}
            <div>
              <select
                {...register("category")}
                className="border p-2 w-full rounded"
              >
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="General">General</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <button className="bg-blue-600 text-white w-full py-2 rounded" onClick={() => navigate("/")}>
              Add Expense
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
