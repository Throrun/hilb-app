import { createOfferRaport } from "@/lib/excel/excel";
import z from "zod";

const schema = z.object({
    items: z.array(
        z.object({
            id: z.string(),
            value: z.number(),
        })
    ),
    description: z.string(),
});

export async function POST(request: Request) {
    const formData = await request.json();

    const result = schema.safeParse(formData);
    if (!result.success) {
        return new Response(`Error: ${result.error}`, { status: 400 });
    }
    try {
        const date = new Date().toLocaleString("pl-PL");
        const buffer = await createOfferRaport(result.data);
        return new Response(buffer, {
            status: 200,
            headers: {
                'Content-Disposition': `attachment; filename="raport${date}.xlsx"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });
    } catch (error) {
        return new Response(`Database Error: ${error}`);
    }
}