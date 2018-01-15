export const fetchReportData = () => {
  return fetch('/api/report')
    .then(res => res.json())
};
