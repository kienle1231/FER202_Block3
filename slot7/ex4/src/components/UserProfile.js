import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div className="p-3">
      <h5>Hello, {user.name}, {user.age}</h5>
    </div>
  );
};

export default UserProfile;
