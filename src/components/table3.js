import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import "./table.css";

import { Line } from "react-chartjs-2";

import { Spinner, Alert } from 'reactstrap';

export class Table3 extends React.Component {

    constructor(){
        super();
        this.state={
            TotalConfirmed: [],
            TotalDeaths: [],
            TotalRecovered: [],
            date: [],
            loaded: false,
            error: false,
        }
    }

    async fetchCall(){
      var response = await fetch("https://corona.lmao.ninja/v2/historical/all")
      if(response.ok){
        const data = await response.json()

        for (var element in data.deaths){
            this.setState({ TotalDeaths: this.state.TotalDeaths.concat(data.deaths[element])})
            this.setState({ TotalRecovered: this.state.TotalRecovered.concat(data.recovered[element])})
            this.setState({ TotalConfirmed: this.state.TotalConfirmed.concat(data.cases[element])})
            this.setState({ date: this.state.date.concat(element)})
        }

        this.setState({loaded: true})
      }
      else{
        this.setState({error: true})
      }
    }


    componentDidMount(){
        this.fetchCall()
    }

    render(){
        return(
            <div className="Line">
                      {this.state.error ? <Alert className="block1" color="danger">
        <h4 className="alert-heading">Oops, API call error</h4>
        <p>
          This website is running with the free version of <a href="https://covid19api.com" target="_blank" rel="noreferrer">COVID19API</a>, so it is unfortunately rate-limited.
        </p>
        <hr />
        <p className="mb-0">
          Please, try to <a href="javascript:window.location.href=window.location.href">refresh</a> this page to display this data !
        </p>
        </Alert> : null}
            {!this.state.loaded && !this.state.error ? <Spinner className="Spinner" color="primary"/> : null}        
            {this.state.loaded ?           <Line data={{
      labels: this.state.date,
      datasets: [
        {
            label: "Total Deaths",
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(255, 134,159,0.4)",
            borderColor: "rgba(255, 134, 159, 1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(255, 134, 159, 1)",
            pointBackgroundColor: "rgba(255, 134,159,0.4)",
            pointBorderWidth: 2,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: "rgb(0, 0, 0)",
            pointHoverBorderColor: "rgba(220, 220, 220, 1)",
            pointHoverBorderWidth: 4,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.state.TotalDeaths.sort(function(a, b){return a - b})
          },
          {
            label: "Total Recovered",
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(98,  182, 239,0.4)",
            borderColor: "rgba(98,  182, 239, 1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(98,  182, 239, 1)",
            pointBackgroundColor: "rgba(98,  182, 239,0.4)",
            pointBorderWidth: 2,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: "rgb(0, 0, 0)",
            pointHoverBorderColor: "rgba(220, 220, 220, 1)",
            pointHoverBorderWidth: 4,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.state.TotalRecovered.sort(function(a, b){return a - b})
          },
        {
          label: "Total Cases",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(255, 177, 101,0.4)",
          borderColor: "rgba(255, 177, 101, 1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(255, 177, 101, 1)",
          pointBackgroundColor: "rgba(255, 177, 101,0.4)",
          pointBorderWidth: 2,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 4,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.TotalConfirmed.sort(function(a, b){return a - b}),
        },
      ]
    }} options={{ responsive: true,
                  title: {
                    display: true,
                    text: 'Worldwide Total Cases',
                    fontColor: "white",
                    fontSize: 25,
                },
                animation: false,
                xAxes: [{
                  type: 'time',
                  time: {
                    displayFormats: {
                       'millisecond': 'MMM DD',
                      'second': 'MMM DD',
                      'minute': 'MMM DD',
                      'hour': 'MMM DD',
                      'day': 'MMM DD',
                      'week': 'MMM DD',
                      'month': 'MMM DD',
                      'quarter': 'MMM DD',
                      'year': 'MMM DD',
                    }
                  }
                }],
                legend: {
                    labels: {
                       fontColor: 'white'
                    }
                  }, }
                 } /> : null}
            </div>
        );
    }
}