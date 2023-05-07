/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import AddEvent from "../../src/components/Events/AddEvent"
import { render, screen, cleanup } from '@testing-library/react';
import { AuthContext } from "../context/AuthContext";
import '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import React from "react";

afterEach(cleanup);

describe('AddEvent', () => {
    it("should render Create Event component correctly", () => {
        const onSubmit = jest.fn();
        const user = {
            token: 'mytoken',
        };
        render(
            <AuthContext.Provider value={{ user }}>
                <AddEvent />
            </AuthContext.Provider>
        );
        const element = screen.getByText(/add new Event/i)
        expect(element).toBeInTheDocument();
    });

    it("should not display any error message if the form is submitted correctly", async () => {
        const onSubmit = jest.fn();
        const user = {
            token: 'mytoken',
        };
        render(
            <AuthContext.Provider value={{ user }}>
                <AddEvent />
            </AuthContext.Provider>
        );
        const alertElement = screen.queryByRole("alert");
        expect(alertElement).not.toBeInTheDocument();
    });

    it("displays an error message when form is submitted with empty feilds", async () => {
        const onSubmit = jest.fn();
        const user = {
            token: 'mytoken',
        };
        const { getByRole } = render(
            <AuthContext.Provider value={{ user }}>
                <AddEvent />
            </AuthContext.Provider>
        );
        const submitButton = getByRole("button", { name: /Create/i });
        userEvent.click(submitButton);
    });
})

