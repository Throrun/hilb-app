import {
    Box,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import { useState } from "react";

const offerParameters = [
    { id: "1.1", label: "Naprawa membrany", type: "number" },
    { id: "1.2", label: "Wymiana membrany", type: "number" },
    { id: "1.7", label: "Naprawa papy", type: "number" },
    { id: "1.8", label: "Wymiana papy", type: "number" },
    { id: "1.11", label: "Naprawa izolacji", type: "number" },
    { id: "1.15", label: "Naprawa punktowa połaci dachowej", type: "number" },
    { id: "1.19", label: "Dogrzanie membrany na łączeniu", type: "number" },
    { id: "2.1", label: "rura wentylacyjna do 200mm", type: "number" },
    { id: "2.2", label: "podstawa wentylatora do 400mm", type: "number" },
    { id: "2.3", label: "podstawa wentylatora do 600mm", type: "number" },
    { id: "2.4", label: "podstawa wentylatora do 800mm", type: "number" },
    { id: "2.5", label: "podstawa wentylatora do 1000mm", type: "number" },
    { id: "2.6", label: "podstawa wentylatora do 1200mm", type: "number" },
    {
        id: "2.7",
        label: "Wykonanie obróbki podstawy świetlika",
        type: "number",
    },
    { id: "2.8", label: "attyki do 35cm powyżej lini dachu", type: "string" },
    { id: "2.9", label: "attyki do 50cm powyżej lini dachu", type: "string" },
    { id: "2.10", label: "attyki do 100cm powyżej lini dachu", type: "string" },
    { id: "2.11", label: "attyki do 150cm powyżej lini dachu", type: "string" },
    { id: "2.12", label: "attyki do 200cm powyżej lini dachu", type: "string" },
    {
        id: "3.1",
        label: "podnośnik",
        type: "options",
        options: ["10m", "25m", "54m"],
    },
    { id: "4.1", label: "Przegląd dachu", type: "number" },
    { id: "5.1", label: "praca serwisanta (kwota)", type: "number" },
    { id: "5.4", label: "wynagrodzenie za dojazd", type: "number" },
];

export default function OfferField({ id }: { id: number }) {
    const [param, setParam] = useState("");
    const [value, setValue] = useState("");
    const handleValueChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    };
    const handleChange = (event: SelectChangeEvent) => {
        setParam(event.target.value as string);
        setValue("");
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <FormControl fullWidth>
                <Select
                    name={`dropdown-${id}`}
                    value={param}
                    onChange={handleChange}
                >
                    {offerParameters.map((parameter) => (
                        <MenuItem key={parameter.id} value={parameter.id}>
                            {parameter.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {offerParameters.find((parameter) => parameter.id === param)
                ?.type === "bool" ? (
                <FormControl fullWidth>
                    <Select
                        name={`value-${id}`}
                        value={value}
                        onChange={handleValueChange}
                    >
                        <MenuItem value={"Tak"}>Tak</MenuItem>
                        <MenuItem value={"Nie"}>Nie</MenuItem>
                    </Select>
                </FormControl>
            ) : offerParameters.find((parameter) => parameter.id === param)
                  ?.type === "options" ? (
                <FormControl fullWidth>
                    <Select
                        name={`value-${id}`}
                        value={value}
                        onChange={handleValueChange}
                    >
                        {offerParameters
                            .find((parameter) => parameter.id === param)
                            ?.options?.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                    </Select>
                </FormControl>
            ) : (
                <TextField
                    name={`value-${id}`}
                    variant='outlined'
                    // label="Wymiana"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type={
                        offerParameters.find(
                            (parameter) => parameter.label === param
                        )?.type
                    }
                    required
                />
            )}
        </Box>
    );
}
