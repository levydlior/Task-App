import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import TasksList from "../components/TasksList";
import { Box } from "@mui/material";
import NewTaskForm from "../components/NewTaskForm";

function Tasks() {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" />;

  return (
    <Box display='flex' justifyContent='center' width='100%' alignItems='center' flexDirection='column'>
      <NewTaskForm />
      <TasksList />
    </Box>
  );
}

export default Tasks;
