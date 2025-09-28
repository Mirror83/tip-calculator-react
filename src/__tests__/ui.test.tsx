import { cleanup, render, screen } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import App from "@/app";

describe("App", () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup({});
    render(<App />);
  });

  afterEach(async () => {
    // Reset the app state by clicking the reset button after each test
    await user.click(screen.getByRole("button", { name: "RESET" }));
    // Clean up the DOM
    cleanup();
  });

  it("renders", () => {
    expect(screen.getByRole("main")).toBeVisible();
  });

  it("has reset button disabled on initial render", () => {
    expect(screen.getByRole("button", { name: "RESET" })).toBeDisabled();
  });

  it("enables reset button when inputs are filled", async () => {
    const billInput = screen.getByLabelText("Bill");
    const peopleInput = screen.getByLabelText("Number of People");
    const tipButton = screen.getByRole("button", { name: "5%" });

    await user.type(billInput, "100");
    await user.click(tipButton);
    await user.type(peopleInput, "2");

    expect(screen.getByRole("button", { name: "RESET" })).toBeEnabled();
  });

  it("clears inputs and resets calculations when reset button is clicked", async () => {
    const billInput = screen.getByLabelText("Bill");
    const peopleInput = screen.getByLabelText("Number of People");
    const tipButton = screen.getByRole("button", { name: "5%" });
    const resetButton = screen.getByRole("button", { name: "RESET" });

    await user.type(billInput, "100");
    await user.click(tipButton);
    await user.type(peopleInput, "2");

    expect(billInput).toHaveValue(100);
    expect(peopleInput).toHaveValue(2);
    expect(screen.getByTestId("tip-amount")).toHaveTextContent("$2.50");
    expect(screen.getByTestId("total-amount")).toHaveTextContent("$52.50");

    await user.click(resetButton);

    expect(billInput).toHaveValue(null);
    expect(peopleInput).toHaveValue(null);
    expect(screen.getByTestId("tip-amount")).toHaveTextContent("$0.00");
    expect(screen.getByTestId("total-amount")).toHaveTextContent("$0.00");
    expect(resetButton).toBeDisabled();
  });

  it("displays $0.00 for tip amount per person and on initial render", () => {
    const tipPerPerson = screen.getByTestId("tip-amount");
    const totalPerPerson = screen.getByTestId("total-amount");
    expect(tipPerPerson).toHaveTextContent("$0.00");
    expect(totalPerPerson).toHaveTextContent("$0.00");
  });

  it("calculates tip and total per person correctly on valid input", async () => {
    const billInput = screen.getByLabelText("Bill");
    const peopleInput = screen.getByLabelText("Number of People");
    const tipButton = screen.getByRole("button", { name: "5%" });

    await user.type(billInput, "100");
    await user.click(tipButton);
    await user.type(peopleInput, "2");

    const tipPerPerson = screen.getByTestId("tip-amount");
    const totalPerPerson = screen.getByTestId("total-amount");

    expect(tipPerPerson).toHaveTextContent("$2.50");
    expect(totalPerPerson).toHaveTextContent("$52.50");
  });

  it("handles custom tip percentage correctly", async () => {
    const billInput = screen.getByLabelText("Bill");
    const peopleInput = screen.getByLabelText("Number of People");
    const customTipInput = screen.getByLabelText("Custom");

    await user.type(billInput, "200");
    await user.type(customTipInput, "18");
    await user.type(peopleInput, "4");

    const tipPerPerson = screen.getByTestId("tip-amount");
    const totalPerPerson = screen.getByTestId("total-amount");

    expect(tipPerPerson).toHaveTextContent("$9.00");
    expect(totalPerPerson).toHaveTextContent("$59.00");
  });

  it("ignores invalid inputs gracefully", async () => {
    const billInput = screen.getByLabelText("Bill");
    const peopleInput = screen.getByLabelText("Number of People");
    const customTipInput = screen.getByLabelText("Custom");

    await user.type(billInput, "-50");
    await user.type(customTipInput, "abc");
    await user.type(peopleInput, "0");

    const tipPerPerson = screen.getByTestId("tip-amount");
    const totalPerPerson = screen.getByTestId("total-amount");

    expect(tipPerPerson).toHaveTextContent("$0.00");
    expect(totalPerPerson).toHaveTextContent("$0.00");
  });
});
