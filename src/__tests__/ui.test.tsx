import { render, screen } from "@testing-library/react";
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
});
