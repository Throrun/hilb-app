import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";

type BottomNavProps = {
    value: number;
    setValue: (value: number) => void;
};

export default function BottomNav({ value, setValue }: BottomNavProps) {
    return (
        <Box
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 5 }}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction
                    label='Dodaj Ofertę'
                    icon={<AddIcon />}
                />
                <BottomNavigationAction
                    label='Lista Ofert'
                    icon={<ListAltIcon />}
                />
                {/* <BottomNavigationAction label="Ustawienia" icon={<SettingsIcon />} /> */}
            </BottomNavigation>
        </Box>
    );
}
