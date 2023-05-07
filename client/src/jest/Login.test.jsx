import { render, fireEvent, screen, getByLabelText,waitFor } from "@testing-library/react";
import Login from "../pages/Login";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { BrowserRouter } from 'react-router-dom';  
import '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'

describe("Login", () => {
    it("renders the Login in form",async ()=>{
        const login = jest.fn();
        const { getByLabelText, getByRole } = render(
            <BrowserRouter basename="/">
            <AuthContext.Provider value={{ login }}>
              <Login />
            </AuthContext.Provider>
          </BrowserRouter>
        );

    const emailInput = getByLabelText(/Email/i);
    const submitButton = getByRole("button", { name: /Sign In/i });
    const passwordInput = getByLabelText("Password");
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();


    })

    it("disables submit button when form is submitted with empty fields", async () => {
        const login = jest.fn();
        const { getByTestId,getByRole } = render( <BrowserRouter basename="/">
                <AuthContext.Provider value={{ login }}>
                   <Login />
                </AuthContext.Provider>
               </BrowserRouter>);
    
        const submitButton = getByRole("button", { name: /Sign In/i });
      
        await act(async () => {
          fireEvent.submit(submitButton);
        });
      
        expect(submitButton).toHaveProperty("disabled", true);
      });

      it("should not display any error message if the form is submitted correctly",async () => {
        const login = jest.fn();
        const { getByTestId,getByRole } = render( <BrowserRouter basename="/">
                <AuthContext.Provider value={{ login }}>
                   <Login />
                </AuthContext.Provider>
               </BrowserRouter>);
      
      const submitButton = getByRole("button", { name: /Sign In/i })
      await userEvent.click(submitButton);
    
      const alertElement = screen.queryByRole("alert");
      expect(alertElement).not.toBeInTheDocument();
    
      })

})