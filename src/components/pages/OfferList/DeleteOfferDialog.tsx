import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

type DeleteOfferDialogProps = {
    open: boolean,
    onClose: () => void,
    onConfirm: () => void,
}

export default function DeleteOfferDialog({
    open,
    onClose,
    onConfirm,
}: DeleteOfferDialogProps){
    return (
        <>
            <Dialog
                open={open}
                keepMounted
                onClose={onClose}
            >
                <DialogTitle>{"Uwaga"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Czy na pewno chcesz usunąć ten wpis?
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