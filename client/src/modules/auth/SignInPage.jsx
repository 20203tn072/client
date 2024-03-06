import { Card, Spinner } from "flowbite-react";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { customAlert } from "../../config/alert/alert";
import AxiosClient from "../../config/http-gateway/http-client";
import AuthContext from "../../config/context/auth-context";

//tailwindcss - flowbite-react
// Interaz para iniciar sesion
//dispatch es el encargado de cambiar al usuario el contexto

const SignInPage = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  

 

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Campo obligatorio"),
      password: yup.string().required("Campo obligatorio"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      try {
        const response = await AxiosClient({
          url: "/auth/signin",
          method: "POST",
          data: values,
        });

        if (!response?.error) {
          dispatch({ type: "SIGNIN", payload: response.data });
          const isAdmin = response.data.roles.some(
            (role) => role.name === "ADMIN_ROLE"     
          );
          const isClient = response.data.roles.some(
            (role) => role.name === "CLIENT_ROLE"
          );

          const username = response.data.user.person.user.username;
          localStorage.setItem("role", isAdmin ? "ADMIN_ROLE" : (isClient ? "CLIENT_ROLE" : "USER_ROLE")),
          localStorage.setItem("username", username)

          // Validar por el ROL que tenga su usuario
          // Admin -> /admin
          // Client -> /client
          if (isAdmin) {
            navigate("/admin", { replace: true });
          } else {
            navigate("/user", { replace: true });
            
            navigate("/client", { replace: true });
            console.log(response);
          }
          
          
        } else throw Error("Error");
      } catch (error) {
        console.log(error);
        customAlert(
          "Iniciar Sesión",
          "Usuario y/o contraseña incorrecto",
          "error"
        );
      } finally {
       
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <Card className="max-w-sm ">
        <form
          className="flex max-w-md flex-col gap-4"
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Ususario: *" />
            </div>
            <TextInput
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              type="text"
              placeholder="erielit"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password: *" />
            </div>
            <TextInput
              id="password"
              name="password"
              type="password"
              placeholder="****"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              helperText={
                formik.errors.password && formik.touched.password ? (
                  <span className="font-medium text-red-600">
                    {formik.errors.password}
                  </span>
                ) : null
              }
              required
            />
          </div>
          <Button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? <Spinner /> : <>Iniciar</>}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SignInPage;
