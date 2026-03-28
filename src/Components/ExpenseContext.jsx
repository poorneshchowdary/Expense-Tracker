import { createContext, useState, useEffect, useMemo } from "react";

export const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser")
  );

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const stored = localStorage.getItem("expenses_" + currentUser);
      setExpenses(stored ? JSON.parse(stored) : []);
    } else {
      setExpenses([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "expenses_" + currentUser,
        JSON.stringify(expenses)
      );
    }
  }, [expenses, currentUser]);

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setExpenses([]);
  };

  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  }, [expenses]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        removeExpense,
        totalAmount,
        setCurrentUser,
        currentUser,   // ✅ added
        logout         // ✅ added
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}