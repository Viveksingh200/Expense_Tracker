import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExpenses, updateExpense } from "../services/expenseApi";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


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

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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


  useEffect(() => {
    const fetchExpense = async () => {
      const res = await getExpenses();
      const expense = res.data?.data?.find((e) => e._id === id);

      if (!expense) {
        navigate("/expenses");
        return;
      }

      reset({
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
      });
    };

    fetchExpense();
  }, [id, reset, navigate]);


  const onSubmit = async (data) => {
    await updateExpense(id, data);
    navigate("/expenses");
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        <Header />

        <div className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-6">Edit Expense</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* TITLE */}
            <div>
              <input
                type="text"
                placeholder="Title"
                {...register("title")}
                className="border p-2 w-full rounded"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">
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
                <p className="text-red-500 text-sm">
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
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate("/expenses")}>
                Update
              </button>

              <button
                type="button"
                onClick={() => navigate("/expenses")}
                className="text-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditExpense;
