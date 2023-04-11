import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ExpenseClaimForm from './view/expenseForm'

describe("ExpenseClaimForm", () => {
  it("renders the form with initial state", () => {
    render(<ExpenseClaimForm />);

    expect(screen.getByLabelText("Category")).toHaveValue("");
    expect(screen.getByLabelText("Claim Description")).toHaveValue("");
    expect(screen.getByLabelText("Receipt Date")).toHaveValue("");
    expect(screen.getByLabelText("Claim Amount ($)")).toHaveValue("");
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("displays form errors when submitting with invalid input", () => {
    render(<ExpenseClaimForm />);

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("Please select a category.")).toBeInTheDocument();
    expect(
      screen.getByText("Please provide a claim description.")
    ).toBeInTheDocument();
    expect(screen.getByText("Please select a receipt date.")).toBeInTheDocument();
    expect(screen.getByText("Please provide a claim amount.")).toBeInTheDocument();
  });

  it("submits the form when all input is valid", () => {
    render(<ExpenseClaimForm />);

    const categorySelect = screen.getByLabelText("Category");
    const claimDescriptionInput = screen.getByLabelText("Claim Description");
    const receiptDateInput = screen.getByLabelText("Receipt Date");
    const claimAmountInput = screen.getByLabelText("Claim Amount ($)");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(categorySelect, { target: { value: "Medical" } });
    fireEvent.change(claimDescriptionInput, { target: { value: "Doctor's visit" } });
    fireEvent.change(receiptDateInput, { target: { value: "2023-04-10" } });
    fireEvent.change(claimAmountInput, { target: { value: "2000" } });
    fireEvent.click(submitButton);

    expect(console.log).toHaveBeenCalledWith({
      category: "Medical",
      claimDescription: "Doctor's visit",
      receiptDate: "2023-04-10",
      claimAmount: "2000",
    });
  });
});