// components/PDFViewer.js
import React, { useEffect } from 'react';
import pdfjs from 'pdfjs-dist/build/pdf';

export default function PDFViewer({ pdfPath }) {
  useEffect(() => {
    const loadPdf = async () => {
      const pdf = await pdfjs.getDocument(pdfPath).promise;
      const page = await pdf.getPage(1); // Render the first page

      const canvas = document.getElementById('pdfCanvas');
      const context = canvas.getContext('2d');
      const viewport = page.getViewport({ scale: 1 });

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      
      page.render(renderContext);
    };

    loadPdf();
  }, [pdfPath]);

  return (
    <canvas id="pdfCanvas"></canvas>
  );
}
