import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { EmailCard } from "../components/EmailCard";
import type { EmailOption } from "../types";

// Mock framer-motion to avoid animation issues in Jest
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<"div">) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("EmailCard Component", () => {
  const mockOption: EmailOption = {
    angle: "Test Angle",
    subject: "Test Subject",
    body: "Test Body Content",
    citation: "Test Citation Source",
  };

  it("renders the email option correctly", () => {
    render(
      <EmailCard
        option={mockOption}
        index={0}
        copiedIndex={null}
        onCopy={jest.fn()}
      />
    );

    expect(screen.getByText(/Test Angle/i)).toBeInTheDocument();
    expect(screen.getByText("Test Subject")).toBeInTheDocument();
    expect(screen.getByText("Test Body Content")).toBeInTheDocument();
    expect(screen.getByText("Test Citation Source")).toBeInTheDocument();
  });

  it("calls onCopy when the copy button is clicked", () => {
    const mockOnCopy = jest.fn();
    render(
      <EmailCard
        option={mockOption}
        index={0}
        copiedIndex={null}
        onCopy={mockOnCopy}
      />
    );

    const copyButton = screen.getByRole("button", { name: /Copy to clipboard/i });
    fireEvent.click(copyButton);

    expect(mockOnCopy).toHaveBeenCalledTimes(1);
    expect(mockOnCopy).toHaveBeenCalledWith("Test Subject\n\nTest Body Content", 0);
  });
});
