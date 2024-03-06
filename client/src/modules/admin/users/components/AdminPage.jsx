import React from "react";

const role = localStorage.getItem("role");
const username = localStorage.getItem("username");
const AdminPage = () => {
  return (
    <>
      <div>
        <p>Rol: {role}</p>
        <p>Nombre de Usuario: {username}</p>
      </div>
    </>
  );
};

export default AdminPage;
