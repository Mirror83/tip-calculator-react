import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it } from "vitest";
import App from "@/app";

describe("App", () => {
  beforeAll(() => {
    render(<App />);
  });

  it("renders", () => {
    expect(screen.getByRole("main")).toBeVisible();
  });

  it("has reset button disabled on initial render", () => {
    expect(screen.getByRole("button", { name: "RESET" })).toBeDisabled();
  });

  it("enables reset button when inputs are filled", async () => {
    const user = userEvent.setup();
    const billInput = screen.getByLabelText("Bill");
    const peopleInput = screen.getByLabelText("Number of People");
    const tipButton = screen.getByRole("button", { name: "5%" });

    await user.type(billInput, "100");
    await user.click(tipButton);
    await user.type(peopleInput, "2");

    expect(screen.getByRole("button", { name: "RESET" })).toBeEnabled();
  });

  it("clears inputs and resets calculations when reset button is clicked", async () => {
    const user = userEvent.setup();
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
});
