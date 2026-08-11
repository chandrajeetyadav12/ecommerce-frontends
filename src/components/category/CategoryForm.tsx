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

export default function CategoryForm() {
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

      console.log(res);

      reset();
    } catch (error) {
      console.log(error);
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