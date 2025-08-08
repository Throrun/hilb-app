import { z } from "zod";

export type offerProps = {
    buildingNumber: string;
    jobDescription: string;
    workValue: number;
    items?: items[];
};

export type items = {
    id: string;
    value: string | number;
};

export const offerPropsValidation = z.object({
    buildingNumber: z.string(),
    jobDescription: z.string(),
    workValue: z.number(),
    items: z
        .array(
            z.object({
                id: z.string(),
                value: z.union([z.string(), z.number()]),
            })
        )
        .optional(),
});
