import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
    it("fetches and displays robots", async () => {
        const mockUsers = [
            { id: 1, name: "John", email: "john@example.com" },
            { id: 2, name: "Alice", email: "alice@example.com" },
        ];

        // Mock the fetch function and return the mockUsers data
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockUsers),
            })
        );

        render(<App />);

        // Wait for the fetch request and data population
        await waitFor(() => {
            expect(screen.getByText("Loading")).toBeInTheDocument();
        });

        // Check that the fetched data is displayed correctly
        expect(screen.getByText("RoboFriends")).toBeInTheDocument();
        expect(screen.queryByText("Loading")).toBeNull();
        expect(screen.getByText("John")).toBeInTheDocument();
        expect(screen.getByText("Alice")).toBeInTheDocument();
    });

    it("filters robots based on search", async () => {
        const mockUsers = [
            { id: 1, name: "John", email: "john@example.com" },
            { id: 2, name: "Alice", email: "alice@example.com" },
        ];

        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockUsers),
            })
        );

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText("Loading")).toBeInTheDocument();
        });

        // Type "Alice" in the search box
        const searchInput = screen.getByRole("textbox");
        fireEvent.change(searchInput, { target: { value: "Alice" } });

        // Check that only Alice is displayed
        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.queryByText("John")).toBeNull();
    });
});