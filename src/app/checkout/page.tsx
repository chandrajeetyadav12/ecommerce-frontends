"use client";

import {
    Box,
    Button,
    Card,
    Radio,
    Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

import {
    getAddresses,
} from "@/services/address.service";

import {
    placeOrder,
} from "@/services/order.service";

import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const router = useRouter();

    const [addresses, setAddresses] =
        useState<any[]>([]);

    const [selectedAddress,
        setSelectedAddress] =
        useState("");

    const [loading,
        setLoading] =
        useState(false);

    useEffect(() => {
        const fetchAddresses =
            async () => {
                const res =
                    await getAddresses();

                if (res.success) {
                    setAddresses(
                        res.addresses
                    );

                    if (
                        res.addresses.length
                    ) {
                        setSelectedAddress(
                            res.addresses[0]._id
                        );
                    }
                }
            };
        fetchAddresses();
    }, []);



    const handlePlaceOrder =
        async () => {
            try {
                setLoading(true);

                const res =
                    await placeOrder({
                        addressId:
                            selectedAddress,

                        paymentMethod:
                            "COD",
                    });

                if (res.success) {
                    router.push(
                        "/customer/order"
                    );
                }
            } finally {
                setLoading(false);
            }
        };

    return (
        <Box
            sx={{
                maxWidth: 800,
                mx: "auto",
                mt: 4,
            }}
        >
            <Typography
                sx={{ mt: 3 }}
                variant="h6"
            >
                Select Address
            </Typography>

            {addresses.length === 0 ? (
                <Box sx={{ mt: 2 }}>
                    <Typography sx={{ mb: 2 }}>
                        No address found. Please add an address first.
                    </Typography>

                    <Button
                        variant="contained"
                        href="/address"
                    >
                        Add Address
                    </Button>
                </Box>
            ) : (
                addresses.map((address) => (
                    <Card
                        key={address._id}
                        sx={{
                            p: 2,
                            mt: 2,
                        }}
                    >
                        {/* Address Details */}
                    </Card>
                ))
            )}

            <Typography
                variant="h6"
                sx={{ mt: 4 }}
            >
                Payment Method
            </Typography>

            <Card
                sx={{
                    p: 2,
                    mt: 2,
                }}
            >
                <Radio checked />

                Cash On Delivery
            </Card>

            <Button
                sx={{ mt: 4 }}
                fullWidth
                variant="contained"
                onClick={handlePlaceOrder}
                disabled={
                    loading ||
                    !selectedAddress
                }
            >
                Place Order
            </Button>
        </Box>
    );
}