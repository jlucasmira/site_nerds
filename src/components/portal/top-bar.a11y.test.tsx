import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { describe, expect, it } from "vitest";
import { TopBar } from "./top-bar";

expect.extend(toHaveNoViolations);

describe("TopBar accessibility", () => {
  it("has no detectable accessibility violations", async () => {
    const { container } = render(<TopBar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
