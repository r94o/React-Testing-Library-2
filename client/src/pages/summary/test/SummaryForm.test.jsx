import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
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

test("Popover responds to hover", () => {
  render(<SummaryForm />);
  const nullPopover = screen.queryByText("No Ice Cream will actually be delivered");
  expect(nullPopover).not.toBeInTheDocument();
})

test("Popover appears when hovered over and disappears when hovered off", async () => {
  render(<SummaryForm />);
  const termsAndConditions = screen.getByText("Terms and Conditions");
  userEvent.hover(termsAndConditions);
  const popover = screen.getByText("No Ice Cream will actually be delivered");
  expect(popover).toBeInTheDocument();
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() => screen.queryByText("No Ice Cream will actually be delivered"));
})