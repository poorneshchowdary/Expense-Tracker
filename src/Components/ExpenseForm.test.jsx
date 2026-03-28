import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";  
import ExpenseForm from "./ExpenseForm";
import "@testing-library/jest-dom";

test("renders form inputs", () => {
  render(<ExpenseForm onAdd={() => {}} />);

  expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Amount")).toBeInTheDocument();
});