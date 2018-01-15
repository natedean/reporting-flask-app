import React, {Component} from 'react';
import 'milligram/dist/milligram.css';
import './App.css';
import {fetchReportData} from "./services";
import Navigation from './Navigation';
import ReportDataDescription from './ReportDataDescription';
import ReportContainer from './ReportContainer';

class App extends Component {

  state = {
    isLoading: false,
    reportData: null
  };

  fetchReportData = () => {
    this.setState(() => ({isLoading: true}));

    fetchReportData()
      .then(reportData => {
        this.setState(() => ({reportData, isLoading: false}));
      })
      .catch(err => {
        this.setState(() => ({isLoading: false}));
        alert(`There has been an error fetching report data: ${err.message}`);
      });
  };

  render() {
    const {isLoading, reportData} = this.state;

    return (
      <div className="App wrapper">
        <Navigation/>
        <div className="container body">
          {!reportData && <div>
            <ReportDataDescription/>
            <button
              disabled={isLoading}
              onClick={this.fetchReportData}>
              {isLoading ? 'Loading...' : 'Fetch Report Data'}
            </button>
          </div>}
          {reportData && <ReportContainer reportData={reportData} />}
        </div>
      </div>
    );
  }
}

export default App;
