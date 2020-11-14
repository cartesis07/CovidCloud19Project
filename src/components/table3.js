import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import "./table.css";

import { Line } from "react-chartjs-2";


export class Table3 extends React.Component {

    constructor(){
        super();
        this.state={
            TotalConfirmed: [],
            TotalDeaths: [],
            TotalRecovered: [],
            date: [],
        }
    }

    componentDidMount(){

        function minTwoDigits(n) {
            return (n < 10 ? '0' : '') + n;
          }

        var datestring = "https://api.covid19api.com/world?from=2020-04-13T00:00:00Z&to=";
        const date = new Date();
        date.setDate(date.getDate() - 1);
        datestring = datestring + date.getFullYear().toString() + "-" + minTwoDigits(date.getMonth()).toString() + "-" + minTwoDigits(date.getDate()).toString() + "T00:00:00Z";
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            const xhr2 = JSON.parse(xhr.responseText);
            console.log(xhr2);
            var length = Object.keys(xhr2).length;
            var totalc = 0;
            var totald = 0;
            var totalr = 0;
            for (let i = 0; i < length; i++){
                totalc = totalc + xhr2[i].NewConfirmed;
                totald = totald + xhr2[i].NewDeaths;
                totalr = totalr + xhr2[i].NewRecovered;
                this.setState(prev => ({
                    TotalConfirmed: [...prev.TotalConfirmed, totalc]
                  }))
                this.setState(prev => ({
                    TotalRecovered: [...prev.TotalRecovered, totalr]
                  }))
                this.setState(prev => ({
                    TotalDeaths: [...prev.TotalDeaths, totald]
                  }))
                this.setState(prev => ({
                    date: [...prev.date, i]
                }))
            }
        });
        xhr.open('GET', datestring);
        xhr.send();
    }


    render(){
        return(
            <div className="Line">
                        <Line data={{
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
            data: this.state.TotalDeaths
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
            data: this.state.TotalRecovered
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
          data: this.state.TotalConfirmed,
        },
      ]
    }} options={{ responsive: true,
                  title: {
                    display: true,
                    text: 'Worldwide Total Cases',
                    fontColor: "white",
                    fontSize: 25,
                },
                legend: {
                    labels: {
                       fontColor: 'white'
                    }
                  }, }
                 } />
            </div>
        );
    }
}