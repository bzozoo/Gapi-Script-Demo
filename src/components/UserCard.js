import React from "react";

export const UserCard = (props) => {
  return (
    <div>
      <h2>{props.user.name}</h2>
      <h4>{props.user.email}</h4>
      <img src={props.user.profileImg} alt="user profile" />
    </div>
  );
};
