import { Alert, Snackbar } from "@mui/material";

type ConfiramtionAlertProps = {
    open: boolean;
    onClose: () => void;
    type: string;
};

export default function ConfirmationAlert({
    open,
    onClose,
    type = "success",
}: ConfiramtionAlertProps) {
    return (
        <Snackbar
            open={open}
            onClose={onClose}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            {type === "success" ? (
                <Alert variant='filled' severity='success'>
                    Zapisano pomyślnie
                </Alert>
            ) : (
                <Alert variant='filled' severity='error'>
                    Błąd Zapisu!
                </Alert>
            )}
        </Snackbar>
    );
}
