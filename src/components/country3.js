import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import "./table.css";

import { Line } from "react-chartjs-2";

import { Spinner } from 'reactstrap';

export class Country3 extends React.Component {
    constructor(){
        super();
        this.state={
            TotalConfirmed: [],
            TotalDeaths: [],
            TotalRecovered: [],
            date: [],
            name: "",
            loaded: false,
        }
    }

    componentDidMount(){
        
        let countryref = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)

        var datestring1 = "https://api.covid19api.com/dayone/country/" + countryref + "/status/confirmed";
        var datestring2 = "https://api.covid19api.com/total/country/" + countryref + "/status/recovered";
        var datestring3 = "https://api.covid19api.com/total/country/" + countryref + "/status/deaths";

        fetch(datestring1)
        .then(response => response.json())
        .then(data => {
          var length1 = Object.keys(data).length;

            const x_date = new Date();
            const x_date2 = new Date();
            x_date2.setDate(x_date.getDate() - length1);

            this.setState({name: data[0].Country + " Total Cases"})

            for (let i = 0; i < length1; i++){

              const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

              var newstringdate = x_date2.getDate().toString() + " " + monthNames[x_date2.getMonth()];
              this.setState(prev => ({
                date: [...prev.date, newstringdate]
              }))
              x_date2.setDate(x_date2.getDate() + 1);
              
              this.setState(prev => ({
                TotalConfirmed: [...prev.TotalConfirmed, data[i].Cases]
              }))
            }
        });

        fetch(datestring2)
        .then(response => response.json())
        .then(data => {
          var length2 = Object.keys(data).length;

          for (let i = 0; i < length2; i++){
            this.setState(prev => ({
              TotalRecovered: [...prev.TotalRecovered, data[i].Cases]
            }))
          }   
        });

        fetch(datestring3)
        .then(response => response.json())
        .then(data => {
          var length3 = Object.keys(data).length;

          for (let i = 0; i < length3; i++){
            this.setState(prev => ({
              TotalDeaths: [...prev.TotalDeaths, data[i].Cases]
            }))
          }
          this.setState({loaded: true})
        });
    }

    render(){
        return(
            <div className="Line">
            {!this.state.loaded ? <Spinner className="Spinner" color="primary"/> : null}        
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
                  animation: false,
                  title: {
                    display: true,
                    text: this.state.name,
                    fontColor: "white",
                    fontSize: 25,
                },
                legend: {
                    labels: {
                       fontColor: 'white'
                    }
                  }, 
                }
                 } />
            </div>
        );
    }
}