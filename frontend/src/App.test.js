import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ClaimForm from "./view/expenseForm";

describe("ClaimForm", () => {
  it("renders the category select field", () => {
    render(<ClaimForm />);
    const categorySelect = screen.getByLabelText("Category");
    expect(categorySelect).toBeInTheDocument();
  });

  it("renders the receipt date field", () => {
    render(<ClaimForm />);
    const receiptDateField = screen.getByLabelText("Receipt Date");
    expect(receiptDateField).toBeInTheDocument();
  });

  it("renders the description field", () => {
    render(<ClaimForm />);
    const descriptionField = screen.getByLabelText("Description");
    expect(descriptionField).toBeInTheDocument();
  });

  it("renders the claim amount field", () => {
    render(<ClaimForm />);
    const claimAmountField = screen.getByLabelText("Claim Amount");
    expect(claimAmountField).toBeInTheDocument();
  });

  it("validates the form correctly when all fields are filled in correctly", () => {
    render(<ClaimForm />);
    const categorySelect = screen.getByLabelText("Category");
    const receiptDateField = screen.getByLabelText("Receipt Date");
    const descriptionField = screen.getByLabelText("Description");
    const claimAmountField = screen.getByLabelText("Claim Amount");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(categorySelect, { target: { value: "Telephone" } });
    fireEvent.change(receiptDateField, { target: { value: "2023-04-12" } });
    fireEvent.change(descriptionField, {
      target: { value: "A valid description" },
    });
    fireEvent.change(claimAmountField, { target: { value: 100 } });
    fireEvent.click(submitButton);

    const successMessage = screen.getByText(
      "Form submitted successfully!"
    );
    expect(successMessage).toBeInTheDocument();
  });

  it("displays an error message when required fields are not filled in", () => {
    render(<ClaimForm />);
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText(
      "Please fill out all required fields"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays an error message when description is too long", () => {
    render(<ClaimForm />);
    const descriptionField = screen.getByLabelText("Description");
    const submitButton = screen.getByText("Submit");
    fireEvent.change(descriptionField, {
      target: { value: "A description that is too long".repeat(20) },
    });
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText(
      "Description must be less than 200 characters"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays an error message when receipt date is more than 30 days old", () => {
    render(<ClaimForm />);
    const receiptDateField = screen.getByLabelText("Receipt Date");
    const submitButton = screen.getByText("Submit");
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 31);
    const oldDateString = oldDate.toISOString().substring(0, 10);
    fireEvent.change(receiptDateField, { target: { value: oldDateString } });
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText(
      "Receipt date cannot be more than 30 days old"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays an error message when claim amount is more than the maximum amount for the selected category", () => {
    render(<ClaimForm />);
    const categorySelect = screen.getByLabelText("Category");
    const claimAmountField = screen.getByLabelText("Claim Amount");
    const submitButton = screen.getByText("Submit");
    
    fireEvent.change(categorySelect, { target: { value: "Travel" } });
    fireEvent.change(claimAmountField, { target: { value: 10000 } });
    fireEvent.click(submitButton);
    
    const errorMessage = screen.getByText(
      "Claim amount exceeds maximum amount for selected category"
    );
    expect(errorMessage).toBeInTheDocument();
    });
    });
    