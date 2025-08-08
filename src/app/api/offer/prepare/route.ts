import {
    adjustWorkValueIds,
    calculateHoursOfWork,
    calculateWorkValue,
} from "@/lib/calculateWorkValue";
import z from "zod";

const schema = z.object({
    buildingNumber: z.string(),
    jobDescription: z.string().nullable(),
    items: z
        .array(
            z.object({
                id: z.string(),
                value: z.union([z.string(), z.number()]),
            })
        )
        .optional(),
});

export async function POST(request: Request) {
    const formData = await request.json();
    const result = schema.safeParse(formData);
    if (!result.success) {
        return new Response(`Error: ${result.error}`, { status: 400 });
    }
    const buildingNumber = result.data.buildingNumber;
    const jobDescription = result.data.jobDescription;
    const adjusteditems = adjustWorkValueIds(
        result.data.items ? result.data.items : []
    );
    const items = await calculateHoursOfWork(
        adjusteditems ? adjusteditems : []
    );
    const workValue = await calculateWorkValue(items);
    const body = {
        buildingNumber,
        jobDescription,
        workValue,
        items,
    };
    return new Response(JSON.stringify(body), { status: 200 });
}
