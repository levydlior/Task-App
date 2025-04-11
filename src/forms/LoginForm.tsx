import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

type LoginFormType = {
  email: string;
  password: string;
};

const login = async (data: LoginFormType) => {
  const response = await axios.post("http://localhost:3001/auth/login", data);
  return response.data;
};

function LoginForm() {
  const methods = useForm<LoginFormType>({
    resolver: yupResolver(LoginSchema),
    values: { email: "", password: "" },
  });
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = methods;

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.access_token);
      navigate("/tasks");
    },
    onError: () => {
      methods.setError("email", {
        type: "manual",
        message: "Invalid email or password",
      });
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    loginMutation.mutate(data);
  };
  return (
    <FormProvider {...methods}>
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
          Login
        </Button>
      </form>
    </FormProvider>
  );
}

export default LoginForm;
