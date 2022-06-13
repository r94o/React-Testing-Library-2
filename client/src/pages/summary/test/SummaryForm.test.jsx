import { render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm'
import userEvent from '@testing-library/user-event';

test("Checkbox is unchecked by default", () => {
  render(<SummaryForm />)
  const checkboxElement = screen.getByRole("checkbox", { name: "I agree to Terms and Conditions" });
  const buttonElement = screen.getByRole("button", { name: "Confirm order" });
  expect(checkboxElement).not.toBeChecked();
  expect(buttonElement).toBeDisabled();
})
test("button is enabled when checkbox clicked", () => {
  render(<SummaryForm />)
  const checkboxElement = screen.getByRole("checkbox", { name: "I agree to Terms and Conditions" });
  const buttonElement = screen.getByRole("button", { name: "Confirm order" });
  userEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
})
test("button is disabled when checkbox is clicked again", () => {
  render(<SummaryForm />)
  const checkboxElement = screen.getByRole("checkbox", { name: "I agree to Terms and Conditions" });
  const buttonElement = screen.getByRole("button", { name: "Confirm order" });
  userEvent.click(checkboxElement);
  userEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
})