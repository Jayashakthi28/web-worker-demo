/* eslint-disable no-restricted-globals */
import { pdf } from "@react-pdf/renderer";
import { PdfComponent } from "./PdfComponent";

self.onmessage = async (event) => {
  const { data } = event.data;
  console.log("Data received in web worker");
  const pdfData = await pdf(<PdfComponent data={data} />).toBlob();
  console.log("Pdf Blob has been generated in web worker");
  console.log("Passing data to the main thread");
  self.postMessage(pdfData);
};

self.onerror = (error) => {
  console.error("Worker encountered an error:", error);
};

self.onmessageerror = (error) => {
  console.error("Worker encountered a message error:", error);
};
