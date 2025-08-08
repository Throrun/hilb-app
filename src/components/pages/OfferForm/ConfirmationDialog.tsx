import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

type ConfirmDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    data: {
        buildingNumber: string;
        jobDescription: string;
        workValue: number;
        items?: { id: string; value: string | number | boolean }[];
    };
};

export default function ConfirmationDialog({
    open,
    onClose,
    onConfirm,
    data,
}: ConfirmDialogProps) {
    return (
        <>
            <Dialog
                open={open}
                keepMounted
                onClose={onClose}
                aria-describedby='alert-dialog-slide-description'
            >
                <DialogTitle>{"Sprawdź poprawność danych"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        Nr budynku: {data.buildingNumber}
                        <br />
                        Opis prac: {data.jobDescription}
                        <br />
                        numery prac:{" "}
                        {data.items != undefined
                            ? data.items.map((item) => item.id).join("; ")
                            : ""}
                        <br />
                        wartość prac: {data.workValue}zł
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Wróć</Button>
                    <Button onClick={onConfirm}>Zapisz</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
