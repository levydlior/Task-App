import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TaskFormSchema = Yup.object().shape({
  taskName: Yup.string().required(),
  completed: Yup.boolean().required(),
});

type NewTaskFormType = {
  taskName: string;
  completed: boolean;
};

const newTaskSubmit = async (data: NewTaskFormType) => {
  const response = await axios.post("http://localhost:3001/tasks", data);
  return response.data;
};

function NewTaskForm() {
  const methods = useForm<NewTaskFormType>({
    resolver: yupResolver(TaskFormSchema),
    values: { taskName: "", completed: false },
  });
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = methods;

  const newTaskMutation = useMutation({
    mutationFn: newTaskSubmit,
    onSuccess: () => {
      methods.reset();
      queryClient.invalidateQueries({ queryKey: ["todos"] }); 
    },
    onError: (error) => {
      methods.setError("taskName", {
        type: "manual",
        message: error.message,
      });
    },
  });

  const onSubmit = async (data: NewTaskFormType) => {
    newTaskMutation.mutate(data);
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
          label="New Task"
          {...methods.register("taskName")}
          error={!!errors.taskName}
          helperText={errors.taskName?.message}
        />

        <Button
          type="submit"
          disabled={isSubmitting || !isDirty}
          variant="outlined"
        >
          Add Task
        </Button>
      </form>
    </FormProvider>
  );
}

export default NewTaskForm;
