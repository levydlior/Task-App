import React from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import LogoutButton from "../common/LogoutButton";
import { Box } from "@mui/material";

function Tasks() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <Box>
      <LogoutButton />
    </Box>
  );
}

export default Tasks;
