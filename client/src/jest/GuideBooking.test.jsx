/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import GuideBooking from "../../src/components/TouristHome/GuideBooking"
import { render, screen, cleanup } from '@testing-library/react';
import { AuthContext } from "../context/AuthContext";
import '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import React from "react";
import 'whatwg-fetch';

afterEach(cleanup);

describe('GuideBooking', () => {
    it("should render Edit Event component correctly", () => {
        // eslint-disable-next-line no-unused-vars
        const onSubmit = jest.fn();
        const user = {
            token: 'mytoken',
        };
        render(
            <AuthContext.Provider value={{ user }}>
                <GuideBooking />
            </AuthContext.Provider>
        );
        const element = screen.getByText(/Booking Page/i)
        expect(element).toBeInTheDocument();
    });
    it("should not display any error message if the form is submitted correctly", async () => {
      const onSubmit = jest.fn();
      const user = {
          token: 'mytoken',
      };
      render(
          <AuthContext.Provider value={{ user }}>
              <GuideBooking />
          </AuthContext.Provider>
      );
      const alertElement = screen.queryByRole("alert");
      expect(alertElement).not.toBeInTheDocument();
  });

  
})
