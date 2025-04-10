import { Box, Stack, Typography } from "@mui/material";
import LoginForm from "../forms/LoginForm";

function Login() {

  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      alignContent="center"
    >
      <Stack height="100%" justifyContent="center" spacing="10px">
        <Typography
          sx={{
            color: "black",
          }}
        >
          Login:
        </Typography>
        <LoginForm />
      </Stack>
    </Box>
  );
}

export default Login;
