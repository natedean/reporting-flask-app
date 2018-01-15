import React, {Component} from 'react';
import 'milligram/dist/milligram.css';
import './App.css';
import {fetchReportData} from "./services";
import Navigation from './Navigation';
import ReportDataDisplay from './ReportDataDisplay';

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

  getButtonText() {
    const {isLoading, reportData} = this.state;

    if (isLoading) return `Loading Report Data...`;

    if (!reportData) return `Fetch Report Data`;

    return `Reload Report Data`;
  }

  render() {
    const {isLoading, reportData} = this.state;

    return (
      <div className="App wrapper">
        <Navigation/>
        <div className="container body">
          <ReportDataDisplay reportData={reportData}/>
          <button
            disabled={isLoading}
            onClick={this.fetchReportData}>
            {this.getButtonText()}
          </button>
        </div>
      </div>
    );
  }
}

export default App;
