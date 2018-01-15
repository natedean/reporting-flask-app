import React from 'react';
import PropTypes from 'prop-types';
import './ReportDataDisplay.css';

const ReportDataDisplay = ({reportData}) => (
  <div className="report-data-display">
    <h3>Report Data</h3>
    <ol>
      <li>Total GPS messages{
        reportData && `: ${reportData.gps_message_count}`}
      </li>
      <li>Total CAN messages{
        reportData && `: ${reportData.can_message_count}`}
      </li>
      <li>Total unique CAN messages{
        reportData && `: ${reportData.can_message_unique_count}`}
      </li>
      <li>Total run time of the data in the file base on the ts (timestamps){
        reportData && `: INCOMPLETE`}
      </li>
      <li>Average messages per second of run time
        {reportData && <ul>
          <li>CAN: {reportData.avg_can_messages_per_sec.toFixed(3)}</li>
          <li>GPS: {reportData.avg_gps_messages_per_sec.toFixed(3)}</li>
        </ul>}
      </li>
      <li>The first timestamp that contains the most CAN messages{
        reportData && `: ${reportData.first_can_ts_with_most_messages}`}
      </li>
      <li>The first timestamp that contains the least CAN messages{
        reportData && `: ${reportData.first_can_ts_with_least_messages}`}
      </li>
    </ol>
  </div>
);

ReportDataDisplay.propTypes = {
  reportData: PropTypes.object
};

export default ReportDataDisplay;
