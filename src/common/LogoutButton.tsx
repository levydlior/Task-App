import { Box, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

function LogoutButton() {
  const [logOutError, setLogOutError] = useState<string | null>(null);
  const logout = async () => {
    const response = await axios.post("http://localhost:3001/auth/logout");
    return response.data;
  };

  const navigate = useNavigate();
  const { setToken } = useAuth();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
        setToken(null)
              navigate("/login");
      console.log('out')
    },
    onError: (error) => {
      setLogOutError(error.message);
    },
  });
  return (
    <Box>
      <Button onClick={() => logoutMutation.mutate()}>Logout</Button>
      {logOutError && logOutError}
    </Box>
  );
}

export default LogoutButton;
