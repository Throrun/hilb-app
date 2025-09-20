import { offer } from "@/lib/db_collections";

import { z } from "zod";

export async function GET() {

    try {
        const dbResponse = await offer.find().toArray();
        
        //const response = dbResponse.map(({ _id, ...rest }) => rest);
        return new Response(JSON.stringify(dbResponse), { status: 200 });
    } catch (error) {
        return new Response(`Error: ${error}`);
    }
}

const schema = z.object({
    buildingNumber: z.string().nonempty(),
    jobDescription: z.string().nullable(),
    workValue: z.number(),
    items: z.array(
        z.object({
            id: z.string(),
            value: z.union([z.string(), z.number(), z.boolean()]),
        })
    ),
});

export async function POST(request: Request) {
    const formData = await request.json();
    const result = schema.safeParse(formData.data);
    if (!result.success) {
        return new Response(`Error: ${result.error}`, { status: 400 });
    }
    try {
        const date = getFormattedDate();
        const offerData = { ...result.data, creationDate: `${date}` };
        const dbResponse = await offer.insertOne(offerData);
        if (!dbResponse.acknowledged) {
            throw new Error("Insert failed");
        }
        return new Response("Offer added correctly!", { status: 201 });
    } catch (error) {
        return new Response(`Database Error: ${error}`);
    }
}

function getFormattedDate(){

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formatted = `${year}.${month}.${day} ${hours}:${minutes}`;// ex. 2025-09-18 14:07

    return formatted;
}