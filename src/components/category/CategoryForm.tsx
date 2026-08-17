"use client";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  categorySchema,
  CategoryFormData,
} from "@/validations/categorySchema";

import {
  createCategory,
} from "@/services/category.service";

import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export default function CategoryForm() {
  const showAlert = (message: string) => {
    if (typeof window !== "undefined") {
      window.alert(message);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } =
    useForm<CategoryFormData>({
      resolver:
        zodResolver(
          categorySchema
        ),
    });

  const onSubmit = async (
    data: CategoryFormData
  ) => {
    try {
      const res =
        await createCategory(
          data
        );

      if (!res.success) {
        showAlert(
          res.message ||
            "Category creation failed"
        );
        return;
      }

      showAlert(
        "Category created successfully"
      );
      reset();
    } catch (error) {
      const apiError = error as ApiError;
      const message =
        apiError.response?.data?.message ||
        "Something went wrong";

      showAlert(message);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          textAlign: "center",
        }}
      >
        Create Category
      </Typography>

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
      >
        <TextField
          fullWidth
          label="Category Name"
          {...register(
            "name"
          )}
          error={
            !!errors.name
          }
          helperText={
            errors.name
              ?.message
          }
        />

        <Button
          sx={{ mt: 2 }}
          variant="contained"
          type="submit"
        >
          Create Category
        </Button>
      </form>
    </Box>
  );
}