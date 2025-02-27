import React from "react";
// import "./NotFound.css"; // Optional: Add custom styling

const NotFound = () => {
  return (
    <div className="not-found-container text-center">
      <img
        src="https://img.freepik.com/free-vector/flat-404-error-template_23-2147741201.jpg"
        alt="404 Not Found"
        className="not-found-image img-fluid"
      />
      <div className="mt-4">
        <a href="/" className="btn btn-primary">
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
