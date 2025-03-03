import React from "react";
import "./Profile.css"

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "A passionate developer who loves coding and creating awesome apps.",
    profilePicture:
      "https://th.bing.com/th/id/OIP.YDyoIafIwW1tILED3HgZRQHaHa?rs=1&pid=ImgDetMain",
  };

  return (
    <div className="container" style={{ marginTop: "10vh" }}>
      <div className="card mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body text-center">

          <div className="d-flex justify-content-center">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          <h3 className="card-title">{user.name}</h3>
          <p className="text-muted">{user.email}</p>
          <p className="card-text">{user.bio}</p>
          <a href="/" className="btn btn-primary">
            Edit Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
