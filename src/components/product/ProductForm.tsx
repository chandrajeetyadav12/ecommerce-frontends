"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    productSchema,
    ProductFormData,
} from "@/validations/productSchema";

import {
    Box,
    Button,
    Typography,
} from "@mui/material";

import CustomInput from "../common/CustomInput";

import FileUpload from "../common/FileUpload";

import { createProduct } from "@/services/product.service";
import { getCategories } from "@/services/category.service";
import { Category } from "@/types/category";

type ApiError = {
    response?: {
        data?: {
            message?: string;
        };
    };
};

export default function ProductForm() {
    const [loading, setLoading] =
        useState(false);
    const [image, setImage] =
        useState<File | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories =
            async () => {
                const res =
                    await getCategories();

                if (res.success) {
                    setCategories(
                        res.categories
                    );
                }
            };

        fetchCategories();
    }, []);

    const showAlert = (message: string) => {
        if (typeof window !== "undefined") {
            window.alert(message);
        }
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver:
            zodResolver(
                productSchema
            ),
    });

    const onSubmit = async (
        data: ProductFormData
    ) => {
        if (loading) return;
        setLoading(true);
        try {
            const formData =
                new FormData();

            formData.append(
                "name",
                data.name
            );

            formData.append(
                "description",
                data.description
            );

            formData.append(
                "category",
                data.category
            );

            formData.append(
                "price",
                data.price.toString()
            );

            formData.append(
                "stock",
                data.stock.toString()
            );

            if (image) {
                formData.append(
                    "image",
                    image
                );
            }

            const res =
                await createProduct(
                    formData
                );

            if (!res.success) {
                showAlert(
                    res.message ||
                        "Product creation failed"
                );
                return;
            }

            showAlert(
                res.message ||
                    "Product created successfully"
            );
            reset();
        } catch (error) {
            const apiError = error as ApiError;
            const message =
                apiError.response?.data?.message ||
                "Something went wrong";

            showAlert(message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 700,
                mx: "auto",
                mt: 4,
            }}
        >
            <Typography

                variant="h4"
                sx={{ mb: 3 }}
            >
                Create Product
            </Typography>

            <form
                onSubmit={handleSubmit(
                    onSubmit
                )}
            >
                <CustomInput
                    label="Product Name"
                    register={register(
                        "name"
                    )}
                    error={
                        errors.name?.message
                    }
                />

                <CustomInput
                    label="Description"
                    register={register(
                        "description"
                    )}
                    error={
                        errors.description
                            ?.message
                    }
                />

                {/* <CustomInput
                    label="Category"
                    register={register(
                        "category"
                    )}
                    error={
                        errors.category
                            ?.message
                    }
                /> */}
                <select
                    {...register(
                        "category"
                    )}
                >
                    <option value="">
                        Select Category
                    </option>

                    {categories.map(
                        (category: Category) => (
                            <option
                                key={
                                    category._id
                                }
                                value={
                                    category._id
                                }
                            >
                                {category.name}
                            </option>
                        )
                    )}
                </select>
                {errors.category && (
                    <Typography
                        color="error"
                        variant="body2"
                    >
                        {errors.category.message}
                    </Typography>
                )}

                <CustomInput
                    label="Price"
                    type="number"
                    register={register(
                        "price", {
                        valueAsNumber: true,
                    }
                    )}
                    error={
                        errors.price?.message
                    }
                />

                <CustomInput
                    label="Stock"
                    type="number"
                    register={register(
                        "stock", {
                        valueAsNumber: true,
                    }
                    )}
                    error={
                        errors.stock?.message
                    }
                />

                <FileUpload
                    label="Product Image"
                    onChange={setImage}
                />

                <Button
                    type="submit"
                    variant="contained"
                     disabled={loading}
                    sx={{ mt: 3 }}
                >
                    {loading
                        ? "Creating..."
                        : "Create Product"}
                </Button>
            </form>
        </Box>
    );
}