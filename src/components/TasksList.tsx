import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Typography, Checkbox } from "@mui/material";
import { useAuth } from "../auth/AuthProvider";

type Task = {
  id: number;
  taskName: string;
  completed: boolean;
};

function TasksList() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:3001/tasks/");
    return response.data;
  };

  const taskQuery = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTasks,
    enabled: !!token,
  });

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

  if (taskQuery.isFetching) return <Box>Loading</Box>;

  return (
    <Box>
      <Typography variant="h2">My Tasks:</Typography>
      {taskQuery.data?.map((task: Task) => (
        <Box key={task.id} display="flex" alignItems="center">
          <Typography>{task.taskName}</Typography>
          <Checkbox
            checked={task.completed}
            onChange={() => updateTaskMutation.mutate(task)}
          />
        </Box>
      ))}
    </Box>
  );
}

export default TasksList;
