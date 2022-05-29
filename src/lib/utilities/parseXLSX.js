// imports
import { read, utils } from 'xlsx/xlsx.mjs';

export default async ({ e, header = undefined, range = undefined }) => {
  if (header !== undefined && range === undefined) range = 'A2:AAA9999';

  const {
    acceptedFiles: [file]
  } = e.detail;

  const buffer = await file.arrayBuffer();

  const workbook = read(buffer);
  const {
    SheetNames: [sheetName]
  } = workbook;

  const data = utils.sheet_to_json(workbook.Sheets[sheetName], {
    header,
    range
  });

  return data;
};
