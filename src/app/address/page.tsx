"use client";

import {
    Controller,
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    addressSchema,
    AddressFormData,
} from "@/validations/addressSchema";
import { useRouter } from "next/navigation";
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";

import CustomInput from "@/components/common/CustomInput";
import { createAddress } from "@/services/address.service";

export default function AddressPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } =
        useForm<AddressFormData>({
            resolver:
                zodResolver(
                    addressSchema
                ),

            defaultValues: {
                fullName: "",
                phone: "",
                addressLine1: "",
                addressLine2: "",
                landmark: "",
                city: "",
                state: "",
                pincode: "",
                addressType: "home",
            },
        });

    const onSubmit = async (
        data: AddressFormData
    ) => {
        try {
            console.log(data);

            const res =
                await createAddress(data);
            if (res.success) {
                alert(
                    "Address added successfully"
                );
            }

            reset();
            router.push("/checkout");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 600,
                mx: "auto",
                mt: 4,
            }}
        >
            <Typography
                variant="h4"
                sx={{ mb: 3 }}
            >
                Add Address
            </Typography>

            <form
                onSubmit={handleSubmit(
                    onSubmit
                )}
            >
                <CustomInput
                    label="Full Name"
                    register={register(
                        "fullName"
                    )}
                    error={
                        errors.fullName
                            ?.message
                    }
                />

                <CustomInput
                    label="Phone Number"
                    register={register(
                        "phone"
                    )}
                    error={
                        errors.phone
                            ?.message
                    }
                />

                <CustomInput
                    label="Address Line 1"
                    register={register(
                        "addressLine1"
                    )}
                    error={
                        errors
                            .addressLine1
                            ?.message
                    }
                />

                <CustomInput
                    label="Address Line 2"
                    register={register(
                        "addressLine2"
                    )}
                    error={
                        errors
                            .addressLine2
                            ?.message
                    }
                />

                <CustomInput
                    label="Landmark"
                    register={register(
                        "landmark"
                    )}
                    error={
                        errors.landmark
                            ?.message
                    }
                />

                <CustomInput
                    label="City"
                    register={register(
                        "city"
                    )}
                    error={
                        errors.city
                            ?.message
                    }
                />

                <CustomInput
                    label="State"
                    register={register(
                        "state"
                    )}
                    error={
                        errors.state
                            ?.message
                    }
                />

                <CustomInput
                    label="Pincode"
                    register={register(
                        "pincode"
                    )}
                    error={
                        errors.pincode
                            ?.message
                    }
                />

<Controller
    name="addressType"
    control={control}
    defaultValue="home"
    render={({ field }) => (
        <TextField
            {...field}
            select
            fullWidth
            margin="normal"
            label="Address Type"
            value={field.value ?? "home"}
            error={!!errors.addressType}
            helperText={errors.addressType?.message}
        >
            <MenuItem value="home">
                Home
            </MenuItem>

            <MenuItem value="office">
                Office
            </MenuItem>
        </TextField>
    )}
/>

                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3 }}
                >
                    Save Address
                </Button>
            </form>
        </Box>
    );
}