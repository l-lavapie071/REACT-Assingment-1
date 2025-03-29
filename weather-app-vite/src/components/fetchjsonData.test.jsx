import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, vi, it } from "vitest"; // Importing Vitest's expect and vi for mocking
import FetchJsonData from "../components/FetchJsonData";
import useFetchLocations from "../hooks/useFetchLocations";
import '@testing-library/jest-dom';


// Mock the custom hook
vi.mock("../hooks/useFetchLocations");

describe("FetchJsonData Component", () => {
    it("renders location data when fetched successfully", async () => {
        // Simulate successful data fetch
        useFetchLocations.mockReturnValue({
          data: [
            { city: "New York", temperature: "20°C" },
            { city: "Los Angeles", temperature: "25°C" },
          ],
          loading: false,
          error: null,
        });
    
        render(<FetchJsonData />);
    
        // Wait for the location to appear in the document
        await waitFor(() => {
          // Get all matching elements for "New York"
          const newYorkElements = screen.queryAllByText(/New York/i);
    
          // Assert that multiple instances of "New York" are present 
          expect(newYorkElements.length).toBeGreaterThan(1);
        });
      });

   it("filters locations based on search input", async () => {
    // Simulate successful data fetch
    useFetchLocations.mockReturnValue({
      data: [
        { city: "New York", temperature: "20°C" },
        { city: "Los Angeles", temperature: "25°C" },
      ],
      loading: false,
      error: null,
    });

    render(<FetchJsonData />);

    // Simulate user typing in the search bar
    fireEvent.change(screen.getByPlaceholderText(/Search for a location/i), {
      target: { value: "Los Angeles" },
    });

    await waitFor(() => {
      expect(screen.getByText(/Los Angeles/i)).toBeInTheDocument();
      //expect(screen.queryByText(/Los Angeles/i)).toBeNull();
    });
  });

  it("displays a message when no results are found", async () => {
    // Simulate successful data fetch
    useFetchLocations.mockReturnValue({
      data: [
        { city: "New York", temperature: "20°C" },
        { city: "Los Angeles", temperature: "25°C" },
      ],
      loading: false,
      error: null,
    });

    render(<FetchJsonData />);

    // Simulate user typing in the search bar with no matching results
    fireEvent.change(screen.getByPlaceholderText(/Search for a location/i), {
      target: { value: "Chicago" },
    });

    await waitFor(() => {
      expect(screen.getByText(/No results found/i)).toBeInTheDocument();
    });
  });
});
