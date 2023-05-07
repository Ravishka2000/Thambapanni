/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { render, fireEvent, screen, getByLabelText,waitFor } from "@testing-library/react";
import GuideSignup from "../pages/GuideSignup";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useSignup } from "../hooks/useSignup";
import { BrowserRouter } from 'react-router-dom';  
import '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'


describe("GuideSignUp", () => {
    it("renders the sign in form",async ()=>{
        const signup = jest.fn();
        const { getByLabelText, getByRole } = render(
            <BrowserRouter basename="/">
            <AuthContext.Provider value={{ signup }}>
              <GuideSignup />
            </AuthContext.Provider>
          </BrowserRouter>
        );

    const firstNameInput = getByLabelText(/First Name/i);
    const lastNameInput = getByLabelText(/Last Name/i);
    const emailInput = getByLabelText(/Email/i);
    const mobileInput = getByLabelText(/Mobile/i);
    const submitButton = getByRole("button", { name: /Sign up/i });
   
    const passwordInput = getByLabelText("Password");

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(mobileInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();


    })

    it("should not display any errors if the form is submitted correctly",async () => {
      const signup = jest.fn();
      const { getByTestId,getByRole } = render( <BrowserRouter basename="/">
              <AuthContext.Provider value={{ signup }}>
                 <GuideSignup />
              </AuthContext.Provider>
             </BrowserRouter>);
  
    const submitButton = getByRole("button", { name: /Sign up/i })
    await userEvent.click(submitButton);
  
    const alertElement = screen.queryByRole("alert");
    expect(alertElement).not.toBeInTheDocument();
  
    })

  it("disables submit button when form is submitted with empty fields", async () => {
    const signup = jest.fn();
    const { getByTestId,getByRole } = render( <BrowserRouter basename="/">
            <AuthContext.Provider value={{ signup }}>
               <GuideSignup />
            </AuthContext.Provider>
           </BrowserRouter>);

    const submitButton = getByRole("button", { name: /Sign up/i });
  
    await act(async () => {
      fireEvent.submit(submitButton);
    });
  
    expect(submitButton).toHaveProperty("disabled", true);
  });

  

});