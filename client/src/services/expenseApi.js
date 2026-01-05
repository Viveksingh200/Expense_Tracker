import { api } from "./axios";

export const addExpense = (data) =>
  api.post("/expenses", data);

export const getExpenses = () =>
  api.get("/expenses");

export const updateExpense = (id, data) =>
  api.put(`/expenses/${id}`, data);


export const deleteExpense = (id) =>
  api.delete(`/expenses/${id}`);
