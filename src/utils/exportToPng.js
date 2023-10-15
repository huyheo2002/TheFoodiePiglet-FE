import React, { useEffect } from 'react';
import html2canvas from 'html2canvas';

function ExportToPNG({ children, onExportClick }) {
    // using function below to export file :v
    const handleExportClick = async () => {
        const content = document.getElementById('export-content');
        try {
            const canvas = await html2canvas(content);
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'exported-image.png';
            link.click();
        } catch (error) {
            console.error('Error exporting to PNG:', error);
        }
    };   

    return (
        <div className="">
            {/* <button onClick={() => handleExportClick()} className='visible'>Export to PNG</button> */}
            <div id="export-content">
                {children}
            </div>
        </div>
    );
}

export default ExportToPNG;
