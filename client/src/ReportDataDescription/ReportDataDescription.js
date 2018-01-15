import React from 'react';
import './ReportDataDescription.css';

const ReportDataDescription = () => (
  <div className="report-data-description">
    <h3>Report Data</h3>
    <ol>
      <li>Total GPS messages</li>
      <li>Total CAN messages</li>
      <li>Total unique CAN messages (for purposes of this count message_id define a unique CAN message)</li>
      <li>Total run time of the data in the file base on the ts (timestamps)</li>
      <li>Average CAN messages per second of run time and per gps message</li>
      <li>The first ts (timestamp) that contains the most CAN messages</li>
      <li>The first ts (timestamp) that contains the least CAN messages</li>
    </ol>
  </div>
);

export default ReportDataDescription;
