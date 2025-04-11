import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Link, TextField } from "@mui/material";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  name: Yup.string().required(),
  password: Yup.string().required(),
});

type RegisterFormType = {
  email: string;
  name: string;
  password: string;
};

const register = async (data: RegisterFormType) => {
  const response = await axios.post("http://localhost:3001/users", data);
  return response.data;
};

function RegisterForm() {
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);
  const methods = useForm<RegisterFormType>({
    resolver: yupResolver(RegisterSchema),
    values: { email: "", name: "", password: "" },
  });
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = methods;

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      setRegisterSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
    onError: () => {
      methods.setError("email", {
        type: "manual",
        message: "Invalid email or password",
      });
    },
  });

  const onSubmit = async (data: RegisterFormType) => {
    registerMutation.mutate(data);
  };
  return (
    <FormProvider {...methods}>
      {registerSuccess ? (
        <Alert  severity="success">Registration successful. You'll be redirected to login in a few seconds
        <br/>
        <Link href="/login">Go to login now</Link>
        </Alert>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <TextField
            label="Email"
            {...methods.register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Name"
            {...methods.register("name")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            {...methods.register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            disabled={isSubmitting || !isDirty}
            variant="outlined"
          >
            Register
          </Button>
        </form>
      )}
    </FormProvider>
  );
}

export default RegisterForm;
