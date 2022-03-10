import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from 'antd';


const Template = ({data}) => {

    const outputPdf = () => {
       exportPDF();
    }

    const exportPDF = () => {
        const input = document.getElementById('content');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('img/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(imgData, 'PNG', 1, 1);
                pdf.save("Hóa đơn.pdf");
            });
    }

    return (
        <div >
           <Button onClick={outputPdf}>Click vào để xuất hóa đơn</Button>
           
           <div 
             id="content" 
             style={{ 
              position: "fixed",
              left: "100vw",
              width: "790px" 
             }}>
                {data}
           </div>
        </div>
    )
};


export default Template;