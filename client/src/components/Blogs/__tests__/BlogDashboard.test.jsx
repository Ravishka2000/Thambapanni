import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BlogDashboard from "../BlogDashboard";

test("renders My Blogs and Create New Blog links", () => {
  render(
    <BrowserRouter>
      <BlogDashboard />
    </BrowserRouter>
  );

  const myBlogsLink = screen.getByText(/My Blogs/i);
  const createNewBlogLink = screen.getByText(/Create New Blog/i);

  expect(myBlogsLink).toBeInTheDocument();
  expect(createNewBlogLink).toBeInTheDocument();
});
