import { fetchDocument } from "../api";

const personalToken = process.argv[2];
const fileID = process.argv[3];

console.log(`fileID: ${fileID}`);
console.log(`personalToken: ${personalToken}`);

(async () => {
  const document = await fetchDocument(fileID, personalToken);
  console.log(JSON.stringify(document, null, "  "));
})().catch(e => console.error(e.message));
