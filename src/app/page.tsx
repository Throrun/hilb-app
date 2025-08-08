"use client";
import BottomNav from "@/components/pages/BottomNav/BottomNav";
import NewOfferForm from "@/components/pages/OfferForm/NewOfferForm";
import OfferList from "@/components/pages/OfferList/OfferList";
import {
  Container
} from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState(1);
  return (
    <Container
      sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Container
        sx={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: 7,
          paddingX: 0,
          paddingTop: 2,
        }}
      >
        {value == 0 && <NewOfferForm />}
        {value == 1 && <OfferList />}
      </Container>
      <BottomNav value={value} setValue={setValue} />
    </Container>
  );
}
