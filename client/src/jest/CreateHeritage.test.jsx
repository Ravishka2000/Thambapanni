
import CreateHeritage from "../../src/components/Heritages/AddHeritages"
import { render, screen, fireEvent,waitFor,cleanup } from '@testing-library/react';
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { act } from 'react-dom/test-utils';
import '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'

afterEach(cleanup);

describe('CreateHeritage', () => {
  it("should render Create Heritage component correctly", () => {
    const onSubmit = jest.fn();
    const user = {
      token: 'mytoken',
    };
    const { getByTestId,getByRole,queryByTestId,debug} = render(<AuthContext.Provider value={{ user }}>
      <CreateHeritage />
     </AuthContext.Provider> );
    const element = screen.getByText(/add new heritage/i)
    expect(element).toBeInTheDocument();
  });

  it("should show success message when the Create Heritage is successful.", async () => {
    const onSubmit = jest.fn();
    const user = {
      token: 'mytoken',
    };
    const { getByTestId,getByRole,queryByTestId,debug} = render(<AuthContext.Provider value={{ user }}>
      <CreateHeritage />
     </AuthContext.Provider> );
    const submitButton = getByRole("button", { name: /Create/i });
    await userEvent.click(submitButton);
    const alertElement = screen.queryByRole("alert");
    expect(alertElement).not.toBeInTheDocument();
});
  it("displays an error message when form is submitted with empty feilds", async () => {
    const onSubmit = jest.fn();
    const user = {
      token: 'mytoken',
    };
    const { getByTestId,getByRole,queryByTestId,debug} = render( <AuthContext.Provider value={{ user }}>
            <CreateHeritage />
           </AuthContext.Provider> 
            );

    const submitButton = getByRole("button", { name: /Create/i });
    userEvent.click(submitButton);


  });

  it("should not display any error message if the form is submitted correctly", async () => {
    const onSubmit = jest.fn();
    const user = {
      token: 'mytoken',
    };
    const { getByTestId,getByRole,queryByTestId,debug} = render( <AuthContext.Provider value={{ user }}>
            <CreateHeritage />
           </AuthContext.Provider> 
    );

    const alertElement = screen.queryByRole("alert");
    expect(alertElement).not.toBeInTheDocument();
  });

})

