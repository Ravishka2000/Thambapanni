import { render, screen } from "@testing-library/react";
import BlogDetails from "../BlogDetails";
import { BrowserRouter } from "react-router-dom";

describe("CreateBlog", () => {
  test("renders UpdateBlog component", () => {
    render(
      <BrowserRouter>
        <BlogDetails />
      </BrowserRouter>
    );
    expect(screen.getByText("Update Blog")).toBeInTheDocument();
  });

  test("renders UpdateBlog form", () => {
    render(
      <BrowserRouter>
        <BlogDetails />
      </BrowserRouter>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Image URL")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "UPDATE" })).toBeInTheDocument();
  });

});