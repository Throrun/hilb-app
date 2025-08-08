import { GridColDef } from "@mui/x-data-grid";
import OfferActions from "./OfferActions";

export const columns: GridColDef<rowType>[] = [
    {
        field: "buildingNumber",
        headerName: "Nr budynku",
        width: 100,
    },
    {
        field: "workValue",
        headerName: "Wartość prac",
        type: "number",
        width: 105,
        valueGetter: (params) => `${params} zł`,
    },
    {
        field: "jobDescription",
        headerName: "Opis Prac",
        width: 150,
        sortable: false,
    },
    {
        field: "creationDate",
        headerName: "Data",
        width: 155,
    },
    {
        field: "actions",
        headerName: "Akcje",
        width: 120,
        renderCell: (params) => OfferActions(params.row),
        cellClassName: "flex",
    },
];

export type rowType = {
    _id: string,
    buildingNumer: string;
    workValue: number;
    jobDescription: string;
    creationDate: string;
    items: object;
    actions: string;
};