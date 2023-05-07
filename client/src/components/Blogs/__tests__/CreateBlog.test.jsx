import { render, screen } from "@testing-library/react";
import CreateBlog from "../CreateBlog";
import { BrowserRouter } from "react-router-dom";

describe("CreateBlog", () => {
  test("renders CreateBlog component", () => {
    render(
      <BrowserRouter>
        <CreateBlog />
      </BrowserRouter>
    );
    expect(screen.getByText("Create A Blog")).toBeInTheDocument();
  });

  test("renders CreateBlog form", () => {
    render(
      <BrowserRouter>
        <CreateBlog />
      </BrowserRouter>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Image URL")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SUBMIT" })).toBeInTheDocument();
  });

});


  
