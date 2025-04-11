import { Box, Stack, Typography } from "@mui/material";
import RegisterForm from "../forms/RegisterForm";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";

function Register() {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/tasks" />;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      alignContent="center"
      padding="10px"
    >
      <Stack height="100%" justifyContent="center" spacing="10px">
        <Typography
          sx={{
            color: "black",
          }}
        >
          Register:
        </Typography>
        <RegisterForm />
      </Stack>
    </Box>
  );
}

export default Register;
