import { items, offerProps, offerPropsValidation } from "@/types/offer";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Box,
    Button,
    IconButton,
    TextField
} from "@mui/material";
import { FormEvent, useState } from "react";
import ConfirmationAlert from "./ConfirmationAlert";
import ConfirmationDialog from "./ConfirmationDialog";
import OfferField from "./OfferField";

interface OfferField {
    name: string;
    value: string | number | boolean;
}


export default function NewOfferForm() {
    const [data, setData] = useState<offerProps>();
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setalertType] = useState("");
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [fields, setFields] = useState(0);
   // const [files, setFiles] = useState<File[] | []>([]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        //files.forEach((file) => formData.append("files", file));
        const items: items[] = [];
        for (let index = 0; ; index++) {
            const id = formData.get(`dropdown-${index}`);
            const value = formData.get(`value-${index}`);
            if (name === null || value === null) break;
            if (typeof id !== "string" || typeof value !== "string") continue;
            items.push({
                id,
                value: isNaN(Number(value)) ? value : Number(value),
            });
        }
        const buildingNumberRaw = formData.get("buildingNumber");
        const jobDescriptionRaw = formData.get("jobDesc");

        const buildingNumber =
            typeof buildingNumberRaw === "string" ? buildingNumberRaw : "";
        const jobDescription =
            typeof jobDescriptionRaw === "string" ? jobDescriptionRaw : "";
        const rawData = { buildingNumber, jobDescription, items };
        const response = await fetch("/api/offer/prepare", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rawData),
        });
        const preparedData = await response.json();
        const parsedData = offerPropsValidation.safeParse(preparedData);
        if (!parsedData.success) {
            throw new Error(`Error in data validation ${parsedData.error}`);
        }
        const data: offerProps = {
            buildingNumber: parsedData.data.buildingNumber,
            jobDescription: parsedData.data.jobDescription,
            workValue: parsedData.data.workValue,
            items: parsedData.data.items,
        };
        setData(data);
        setOpenDialog(true);
    };
    const handleDialogConfirmation = async () => {
        const result = await fetch("/api/offer", {
            method: "POST",
            body: JSON.stringify({ data }),
            headers: { "Content-Type": "application/json" },
        });
        setOpenDialog(false);
        setOpenAlert(true);
        if (result.ok) {
            setalertType("success");
        } else {
            setalertType("error");
        }
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         setFiles(Array.from(e.target.files));
    //     }
    // };
    const handleAddParameter = () => {
        setFields(fields + 1);
    };
    const handleDeleteParameter = () => {
        if (fields > 0) {
            setFields(fields - 1);
        }
    };
    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
            <TextField
                name='buildingNumber'
                variant='outlined'
                label='Numer Budynku'
                type='text'
                required
            ></TextField>
            {[...Array(fields)].map((_, index) => (
                <OfferField key={index} id={index} />
            ))}
            <Box sx={{ display: "flex", flexDirection: "row-reverse", gap: 2 }}>
                <IconButton
                    disabled={fields === 0}
                    aria-label='Delete'
                    onClick={handleDeleteParameter}
                >
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label='Add' onClick={handleAddParameter}>
                    <AddIcon />
                </IconButton>
            </Box>
            <TextField
                name='jobDesc'
                variant='outlined'
                label='Opis prac'
                type='text'
                multiline
            ></TextField>
            {/* <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Wgraj Zdjęcia
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          multiple
        />
      </Button> */}
            <Button type='submit' variant='contained'>
                Zapisz
            </Button>
            {data && (
                <ConfirmationDialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    onConfirm={handleDialogConfirmation}
                    data={data}
                />
            )}
            {openAlert && (
                <ConfirmationAlert
                    open={openAlert}
                    onClose={handleCloseAlert}
                    type={alertType}
                />
            )}
        </Box>
    );
}
