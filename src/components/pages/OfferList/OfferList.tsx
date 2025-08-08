import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { columns } from "./OfferList.types";

export default function OfferList() {
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/offer", {
                    method: "GET",
                });
                const json = await response.json();
                setTableData(json);
            } catch {
                throw new Error("Problem with Data Form API");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <Box>
            <DataGrid
                rows={tableData}
                columns={columns}
                initialState={{
                    sorting: {
                        sortModel: [{ field: "creationDate", sort: "desc" }],
                    },
                }}
                disableColumnMenu
                loading={loading}
                disableRowSelectionOnClick
                getRowId={(row) => row.creationDate}
            ></DataGrid>
        </Box>
    );
}
