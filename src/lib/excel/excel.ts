import ExcelJS from "exceljs";
import path from "path";

let cachedWorkbook: ExcelJS.Workbook | null = null;

export async function getWorkbook(): Promise<ExcelJS.Workbook> {
    if (cachedWorkbook) return cachedWorkbook;
    const filePath = path.join(process.cwd(), "src/data", "dane.xlsx");
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    cachedWorkbook = workbook;
    return workbook;
}

export async function getWorkValue(id: string): Promise<number> {
    const workbook = await getWorkbook();
    const worksheet = workbook.getWorksheet("Zestawienie");
    if (worksheet === undefined) {
        throw new Error("Missing worksheet");
    }
    for (const row of worksheet.getRows(1, worksheet.rowCount) || []) {
        const cellA = row.getCell(1).value;
        if (cellA === id) {
            const materialPrice = row.getCell(8).value;
            const labourPrice = row.getCell(10).value;
            if (
                typeof materialPrice === "number" &&
                typeof labourPrice === "number"
            ) {
                return materialPrice + labourPrice;
            } else if (typeof labourPrice === "number") {
                return labourPrice;
            }
        }
    }
    throw new Error("WorkValue Not found!");
}

export async function createOfferRaport(offerData: {items:Array<{ id: string, value: number }>, description:string}) {
    const workbook = await getWorkbook();
    const worksheet = workbook.getWorksheet("Zestawienie");

    const newWorkbook = new ExcelJS.Workbook();
    const newSheet = newWorkbook.addWorksheet('Nowe Zestawienie');

    if (worksheet === undefined) {
        throw new Error("Missing worksheet");
    }

    //cofiguration of newsheet
    newSheet.getColumn(5).width = 60;
    newSheet.getColumn(7).width = 11;
    newSheet.getColumn(9).width = 11;
    newSheet.getColumn(11).width = 11;
    newSheet.getColumn(12).width = 11;
    newSheet.getColumn(8).numFmt = "#,##0.00 zł";
    newSheet.getColumn(9).numFmt = "#,##0.00 zł";
    newSheet.getColumn(10).numFmt = "#,##0.00 zł";
    newSheet.getColumn(11).numFmt = "#,##0.00 zł";
    newSheet.getColumn(12).numFmt = "#,##0.00 zł";
    
    newSheet.addRow(worksheet.getRow(10).values);
    newSheet.mergeCells("A1:E1");
    newSheet.mergeCells("H1:I1");
    newSheet.mergeCells("J1:K1");
    newSheet.getRow(1).alignment = {
        wrapText:true,
        vertical: 'middle',
        horizontal: 'center',}

    newSheet.addRow(worksheet.getRow(11).values);
    newSheet.addRow([]);
    newSheet.mergeCells("A2:E3");
    newSheet.mergeCells("F2:F3");
    newSheet.mergeCells("G2:G3");
    newSheet.mergeCells("H2:H3");
    newSheet.mergeCells("I2:I3");
    newSheet.mergeCells("J2:J3");
    newSheet.mergeCells("K2:K3");
    newSheet.mergeCells("L2:L3");
    newSheet.getRow(2).alignment = {
        wrapText:true,
        vertical: 'middle',
        horizontal: 'center',}

    for (const row of worksheet.getRows(1, worksheet.rowCount) || []) {
        const cellA = row.getCell(1).value;

        const match = offerData.items.find(value => value.id === cellA)
        if (match) {
            const newRow = newSheet.addRow(row.values);
            const newRowNumber = newRow.number;
            newSheet.mergeCells(`B${newRowNumber}:E${newRowNumber}`)
            newRow.getCell(6).value = match.value;
            newRow.getCell(9).value = { formula: `IF(H${newRowNumber}="n/d","n/d",F${newRowNumber}*H${newRowNumber})`, result: "" };
            newRow.getCell(11).value = { formula: `F${newRowNumber}*J${newRowNumber}`, result: "" };
            newRow.getCell(12).value = { formula: `IF(H${newRowNumber}="n/d",0,I${newRowNumber}+K${newRowNumber})`, result: "" };
        }
    }
    
    
    const lastRow = newSheet.lastRow?.number;
    const sumRow = newSheet.addRow([
        '','Opis wykonanych prac:','', '',`${offerData.description}`,'','','',{formula: `SUMIF(I3:I${lastRow}, ">=0")`},'',{formula: `SUM(K3:K${lastRow})`},{formula: `SUM(L3:L${lastRow})`}
    ])
    sumRow.height = 30;
    sumRow.getCell(9).numFmt = "#,##0.00 zł"
    sumRow.getCell(11).numFmt = "#,##0.00 zł"
    sumRow.getCell(12).numFmt = "#,##0.00 zł"
    sumRow.getCell(5).alignment = {wrapText: true,horizontal:"left",vertical: "top"}
    sumRow.getCell(2).alignment = {wrapText: true,horizontal:"left",vertical: "top"}

    const sumRowNumber = sumRow.number;
    newSheet.mergeCells(`B${sumRowNumber}:D${sumRowNumber}`);

    //await newWorkbook.xlsx.writeFile(path.join(process.cwd(), "src/data", "newFile.xlsx"));
    return await newWorkbook.xlsx.writeBuffer();
}