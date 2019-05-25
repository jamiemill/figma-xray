import { fetchDocument, fetchStyle } from "../api";

const personalToken = process.argv[2];
if (!personalToken) throw "No token";
const fileID = process.argv[3];
if (!fileID) throw "No file ID";

(async () => {
  console.error(`Fetching document ${fileID}...`);
  const documentResponse = await fetchDocument(fileID, personalToken);

  let styleResponses = [];
  if (documentResponse) {
    for (let styleID in documentResponse.styles) {
      const key = documentResponse.styles[styleID].key;
      console.error(`Fetching style ${key}...`);
      const style = await fetchStyle(key, personalToken);
      styleResponses.push(style);
    }
  }
  const data = { documentResponse, styleResponses };
  console.log(JSON.stringify(data, null, "  "));
})().catch(e => console.error(e.message));
