import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { ElementType } from "react";

const iconMap: { [key: string]: ElementType } = {
    delete: DeleteIcon,
    download: DownloadIcon,
    edit: EditIcon,
};

export default function OfferActionButton({
    icon,
    onClick,
}: {
    icon: "delete" | "download" | "edit";
    onClick: () => void;
}) {
    const IconComponent = iconMap[icon];
    return (
        <IconButton onClick={onClick} aria-label='delete' size='medium'>
            <IconComponent />
        </IconButton>
    );
}
