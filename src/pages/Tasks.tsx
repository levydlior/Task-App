import React from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import LogoutButton from "../common/LogoutButton";
import { Box, Typography, Checkbox } from "@mui/material";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type Task = {
  id: number;
  taskName: string;
  completed: boolean;
};

function Tasks() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:3001/tasks/");
    return response.data;
  };

  const taskQuery = useQuery({ queryKey: ["todos"], queryFn: fetchTasks });

  const updateTaskMutation = useMutation({
    mutationFn: async (task: Task) => {
      await axios.patch(`http://localhost:3001/tasks/${task.id}`, {
        completed: !task.completed,
      });
    },
    onMutate: async (task: Task) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTasks = queryClient.getQueryData<Task[]>(["todos"]);

      queryClient.setQueryData<Task[]>(["todos"], (old = []) =>
        old.map((t) =>
          t.id === task.id ? { ...t, completed: !task.completed } : t
        )
      );

      return { previousTasks };
    },
    onError: (_err, _task, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["todos"], context.previousTasks);
      }
    },
  });

  const handleCheckboxToggle = (task: Task) => {
    updateTaskMutation.mutate(task);
  };

  if (!token) return <Navigate to="/login" />;
  if (taskQuery.isFetching) return <Box>Loading</Box>;

  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <Typography variant="h2">My Tasks:</Typography>
        {taskQuery.data?.map((task: Task) => (
          <Box key={task.id} sx={{ borderBottom: "1px solid" }} display='flex' alignItems='center'>
            <Typography sx={{ color: "black" }}>{task.taskName}</Typography>
            <Checkbox
              checked={task.completed}
              onChange={() => handleCheckboxToggle(task)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Tasks;
