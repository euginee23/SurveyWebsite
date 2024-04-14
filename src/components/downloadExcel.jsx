import React from 'react';
import * as XLSX from 'xlsx';

const ExcelDownload = ({ surveyData }) => {
  const downloadExcel = async () => {
    const excelData = [
      ["Respondent", "Social Media", "Hours", "Streaming", "Communication", "Content", "Influenced", "Sharing Content", "Device", "Impact", "Following"],
      ...surveyData.map((data) => [
        data.respondent,
        data.social_media,
        data.hours,
        data.streaming,
        data.communication,
        data.content,
        data.influenced,
        data.sharing_content,
        data.device,
        data.impact,
        data.following,
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Survey Data');

    try {
      XLSX.writeFile(wb, 'survey_data.xlsx');
    } catch (error) {
      console.error('Error creating Excel file:', error);
    }
  };

  return (
    <button className="btn btn-success btn-lg mb-1 mt-1" onClick={downloadExcel}>
      Excel
    </button>
  );
};

export default ExcelDownload;
