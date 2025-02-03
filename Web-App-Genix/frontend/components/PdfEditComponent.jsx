import { useState } from "react";
import { Document, Page } from "react-pdf";

function PdfEditComponent() {

    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    return (
      <div style={{ textAlign: "center" }}>












        {file && (
          <Document
            file={URL.createObjectURL(file)}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        )}
      </div>
    );
}

export default PdfEditComponent