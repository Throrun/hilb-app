import { Stack } from "@mui/material";
import { ReactNode } from "react";

export default function OfferActionButton({
    children,
}: {
    children?: ReactNode;
}) {
    return (
        <Stack direction='row' spacing={-1}>
            {children}
        </Stack>
    );
}
