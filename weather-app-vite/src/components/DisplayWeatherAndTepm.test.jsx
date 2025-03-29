import React from "react";
import { render, screen } from "@testing-library/react";
import DisplayWeatherAndTemp from "./DisplayWeatherAndTemp";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom"; // Import jest-dom for custom matchers

describe("DisplayWeatherAndTemp Component", () => {
  it("renders location details correctly", () => {
    const mockLocation = {
      city: "New York",
      weather: "Sunny",
      temperature: 22,
    };

    render(<DisplayWeatherAndTemp location={mockLocation} />);

    expect(screen.getByText(/City: New York/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Weather: Sunny \| Temperature: 22/)
    ).toBeInTheDocument();
  });
});
