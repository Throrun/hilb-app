import { getWorkValue } from "./excel/excel";
import { items } from "@/types/offer";

export async function calculateWorkValue(items: items[]): Promise<number> {
    let finalWorkValue: number = 0;
    await Promise.all(
        items.map(async ({ id, value }) => {
            if (typeof value === "number") {
                const workValue = await getWorkValue(id);
                finalWorkValue += workValue * value;
            }
        })
    );
    return finalWorkValue;
}

export async function calculateHoursOfWork(itemList: items[]) {
    const workValue = await getWorkValue("5.1");
    const newList: items[] = itemList
        .map(({ id, value }) => {
            if (typeof id === "string" && typeof value === "number") {
                if (id === "5.1") {
                    const newValue: number = Math.ceil(value / workValue);
                    return {
                        id,
                        value: newValue,
                    };
                }
            }
            return {
                id,
                value,
            };
        })
        .filter(
            (itemList): itemList is { id: string; value: number } =>
                itemList !== undefined
        );
    return newList;
}

export function adjustWorkValueIds(itemList: items[]): items[] {
    const newData: items[] = itemList
        .map(({ id, value }) => {
            if (typeof id === "string" && typeof value === "number") {
                let newId: string = id;
                if (id === "1.1") {
                    if (value >= 26 && value <= 50) {
                        newId = "1.3";
                    } else if (value > 50) {
                        newId = "1.5";
                    }
                }
                if (id === "1.2") {
                    if (value >= 26 && value <= 50) {
                        newId = "1.4";
                    } else if (value > 50) {
                        newId = "1.6";
                    }
                }
                if (id === "1.7") {
                    if (value > 50) {
                        newId = "1.9";
                    }
                }
                if (id === "1.8") {
                    if (value > 50) {
                        newId = "1.10";
                    }
                }
                if (id === "1.11") {
                    if (value > 25 && value <= 100) {
                        newId = "1.12";
                    } else if (value > 100 && value <= 500) {
                        newId = "1.13";
                    } else if (value > 500) {
                        newId = "1.14";
                    }
                }
                if (id === "1.15") {
                    if (value > 10 && value <= 20) {
                        newId = "1.16";
                    } else if (value > 20 && value <= 40) {
                        newId = "1.17";
                    } else if (value > 40) {
                        newId = "1.18";
                    }
                }
                if (id === "4.1") {
                    if (value > 100 && value <= 500) {
                        newId = "4.2";
                    } else if (value > 500 && value <= 1000) {
                        newId = "4.3";
                    } else if (value > 1000 && value <= 5000) {
                        newId = "4.4";
                    } else if (value > 5000 && value <= 10000) {
                        newId = "4.5";
                    } else if (value > 10000 && value <= 60000) {
                        newId = "4.6";
                    } else if (value > 60000) {
                        newId = "4.7";
                    }
                }
                return {
                    id: newId,
                    value: value,
                };
            } else if (typeof id === "string" && typeof value === "string") {
                let newId: string = id;
                let newValue: number = 0;
                if (id === "3.1") {
                    switch (value) {
                        case "10m":
                            newId = "3.1";
                            break;
                        case "25m":
                            newId = "3.2";
                            break;
                        case "54m":
                            newId = "3.3";
                            break;
                        default:
                            throw new Error("Wrong parameter");
                    }
                    newValue = 1;
                }
                return {
                    id: newId,
                    value: newValue,
                };
            }
        })
        .filter(
            (itemList): itemList is { id: string; value: number } =>
                itemList !== undefined
        );
    return newData;
}
