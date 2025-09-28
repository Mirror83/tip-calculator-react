import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "@/app";

describe("App", () => {
  it("renders", () => {
    render(<App />);

    expect(screen.queryByText("Bill")).toBeVisible();
  });
});
