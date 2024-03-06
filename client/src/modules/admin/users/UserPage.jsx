import { Badge, Button, Card, Label, TextInput } from "flowbite-react";
import React, { useEffect, useMemo, useState } from "react";
import AxiosClient from "../../../config/http-gateway/http-client";
import TableComponent from "../../../components/TableComponent";
import { LiaTrashSolid, LiaTrashRestoreSolid } from "react-icons/lia";
import { LiaEdit } from "react-icons/lia";
import { GoSearch } from "react-icons/go";

const UserPage = () => {

  const role = localStorage.getItem("role");
const username = localStorage.getItem("username");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [openModal, setOpenModal] = useState("");
  const columns = useMemo(() => [
    {
      name: "#",
      cell: (row, index) => <>{index + 1}</>,
      sortable: true,
      selector: (row, index) => index + 1,
    },
    {
      name: "Usuario",
      cell: (row) => <>{row.username}</>,
      sortable: true,
      selector: (row) => row.username,
    },
    {
      name: "Rol",
      cell: (row) => <>{row.roles[0].name}</>,
      sortable: true,
      selector: (row) => row.roles[0].name,
    },
    {
      name: "Estado",
      cell: (row) => (
        <Badge color={row.status ? "success" : "failure"}>
          {row.status ? "ACTIVO" : "INACTIVO"}
        </Badge>
      ),
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <Button outline pill color="warning" size={"sm"}>
            <LiaEdit />
          </Button>
          <Button
            outline
            color={row.status ? "failure" : "success"}
            pill
            size={"sm"}
          >
            {row.status ? <LiaTrashSolid /> : <LiaTrashRestoreSolid />}
          </Button>
        </>
      ),
    },
  ]);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await AxiosClient({
        url: "/user/",
        method: "GET",
      });
      console.log(response);
      if (!response.error) setUsers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filter = () => {
    return users.filter((user) => user.username.includes(filterText));
  };

  return (
    <>
      <section className="flex flex-col pt-4 px-3 gap-4">
        <h4 className="text-2xl">Usuarios</h4>
        <div className="flex w-full justify-between ">
          <div className="max-w-md">
            <Label htmlFor="search" value="Your email" />
            <TextInput
              id="search"
              type="text"
              rightIcon={GoSearch}
              value={filterText}
              placeholder="Buscar. . ."
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <Button onClick={() => setOpenModal()} pill outline color="success">
              Agregar
            </Button>
          </div>
        </div>
        <div>
          <Card>
            <TableComponent
              columns={columns}
              data={filter()}
              progress={loading}
            />
          </Card>
        </div>

        <div>
          <p>Rol: {role}</p>
          <p>Nombre de Usuario: {username}</p>
        </div>
      </section>
    </>
  );
};

export default UserPage;
