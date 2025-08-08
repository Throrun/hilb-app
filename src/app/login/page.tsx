"use client";

import { Box, Button, TextField } from "@mui/material";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const password = formData.get("password");
        await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ password }),
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });
        router.push("/");
    };
    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, p: 1 }}
        >
            <TextField
                name='password'
                variant='outlined'
                label='Password'
                type='password'
            ></TextField>
            <Button type='submit' variant='contained'>
                Submit
            </Button>
        </Box>
    );
}
