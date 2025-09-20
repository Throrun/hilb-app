import { useState } from "react";
import OfferActionButton from "./OfferActionButton";
import OfferActionStack from "./OfferActionStack";
import { rowType } from "./OfferList.types";
import DeleteOfferDialog from "./DeleteOfferDialog";


export default function OfferActions(offerData: rowType) {
    const [OpenOfferDialog, setOpenOfferDialog] = useState(false);

    const handleDownload = async () => {
        try {
            const reportBody = {            
                items: offerData.items,
                description: offerData.jobDescription,
            }
            console.log(reportBody);
            
            
            const response = await fetch(`/api/offer/report`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reportBody),
            });
            
            const blob = await response.blob();
            
            const url = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            
        
            const parsedBuildingNumber = JSON.parse(JSON.stringify(offerData)).buildingNumber.replaceAll(" ", "_");
            link.download = `oferta_${parsedBuildingNumber}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);
        } catch {
            throw new Error("Problem with Data Form API");
        }
    };
    const handleOpenDeleteDialog = () => {
        setOpenOfferDialog(true);
    }
    const handleOnCloseDeleteDialog = () => {
        setOpenOfferDialog(false);
    }
    const handleDelete = async () => {
        try {
            await fetch(`/api/offer/${offerData._id}`, {
                method: "DELETE",
            });
            setOpenOfferDialog(false);
        } catch {
            throw new Error("Problem with Data Form API");
        }
    };

    return (
        <OfferActionStack>
            <OfferActionButton icon='download' onClick={handleDownload} />
            <OfferActionButton icon='delete' onClick={handleOpenDeleteDialog} />
            {OpenOfferDialog && <DeleteOfferDialog open={OpenOfferDialog} onClose={handleOnCloseDeleteDialog} onConfirm={handleDelete} />}
        </OfferActionStack>
    );
}
