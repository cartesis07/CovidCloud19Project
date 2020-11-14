import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import { Bar } from "react-chartjs-2";

import "./table.css"

export class Table2 extends React.Component {

    constructor(){
        super();
        this.state = {
        NewRecovered: [],
        NewDeaths: [],
        NewCases: [],
        date: [],
        }
    }

    componentDidMount(){

      function minTwoDigits(n) {
        return (n < 10 ? '0' : '') + n;
      }

      var datestring = "https://api.covid19api.com/world?from=";
      const date = new Date();
      const date2 = new Date();
      date.setDate(date.getDate() - 1);
      date2.setDate(date.getDate() - 8);
      datestring = datestring + date2.getFullYear().toString() + "-" + minTwoDigits(date2.getMonth()).toString() + "-" + minTwoDigits(date2.getDate()).toString() + "T00:00:00Z&to=";
      datestring = datestring + date.getFullYear().toString() + "-" + minTwoDigits(date.getMonth()).toString() + "-" + minTwoDigits(date.getDate()).toString() + "T00:00:00Z";
      console.log(datestring);
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('load', () => {
          const xhr2 = JSON.parse(xhr.responseText);
          console.log(xhr2);
          const x_date = new Date();
          const x_date2 = new Date();
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          x_date2.setDate(x_date.getDate() - 7);
          for (let i = 0; i < 7; i++){
            var newstringdate = x_date2.getDate().toString() + " " + monthNames[x_date2.getMonth()];
            this.setState(prev => ({
              date: [...prev.date, newstringdate]
            }))
            x_date2.setDate(x_date2.getDate() + 1);
            this.setState(prev => ({
              NewRecovered: [...prev.NewRecovered, xhr2[i].NewRecovered]
            }))
            this.setState(prev => ({
              NewDeaths: [...prev.NewDeaths, xhr2[i].NewDeaths]
            }))
            this.setState(prev => ({
              NewCases: [...prev.NewCases, xhr2[i].NewConfirmed]
            }))
          }   
          var newstringdate = x_date2.getDate().toString() +  " " + monthNames[x_date2.getMonth()];
          this.setState(prev => ({
            date: [...prev.date, newstringdate]
          }))
          x_date2.setDate(x_date2.getDate() + 1);
      })
      xhr.open('GET', datestring);
      xhr.send();
    }

    render(){
      
        return(
            <div className="Bar">
                <Bar  data={{
      labels: this.state.date,
      datasets: [
        {
          label: "Daily New Cases",
          data: this.state.NewCases,
          backgroundColor: [
              "rgba(255, 177, 101,0.4)",
              "rgba(255, 177, 101,0.4)",
              "rgba(255, 177, 101,0.4)",
              "rgba(255, 177, 101,0.4)",
              "rgba(255, 177, 101,0.4)",
              "rgba(255, 177, 101,0.4)",
              "rgba(255, 177, 101,0.4)",
              "rgba(255, 177, 101,0.4)",
          ],
          borderWidth: 2,
          borderColor: [
              "rgba(255, 177, 101, 1)",
              "rgba(255, 177, 101, 1)",
              "rgba(255, 177, 101, 1)",
              "rgba(255, 177, 101, 1)",
              "rgba(255, 177, 101, 1)",
              "rgba(255, 177, 101, 1)",
              "rgba(255, 177, 101, 1)",
              "rgba(255, 177, 101, 1)",
          ]
        },
        {
            label: "Daily Recovered",
            data: this.state.NewRecovered,
            backgroundColor: [
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
            ],
            borderWidth: 2,
            borderColor: [
                "rgba(98,  182, 239, 1)",
                "rgba(98,  182, 239, 1)",
                "rgba(98,  182, 239, 1)",
                "rgba(98,  182, 239, 1)",
                "rgba(98,  182, 239, 1)",
                "rgba(98,  182, 239, 1)",
                "rgba(98,  182, 239, 1)",
                "rgba(98,  182, 239, 1)",
            ]
          },
          {
            label: "Daily Deaths",
            data: this.state.NewDeaths,
            backgroundColor: [
              "rgba(255, 134,159,0.4)",
              "rgba(255, 134,159,0.4)",
              "rgba(255, 134,159,0.4)",
              "rgba(255, 134,159,0.4)",
              "rgba(255, 134,159,0.4)",
              "rgba(255, 134,159,0.4)",
              "rgba(255, 134,159,0.4)",
              "rgba(255, 134,159,0.4)",
            ],
            borderWidth: 2,
            borderColor: [
              "rgba(255, 134, 159, 1)",
              "rgba(255, 134, 159, 1)",
              "rgba(255, 134, 159, 1)",
              "rgba(255, 134, 159, 1)",
              "rgba(255, 134, 159, 1)",
              "rgba(255, 134, 159, 1)",
              "rgba(255, 134, 159, 1)",
              "rgba(255, 134, 159, 1)",
            ]
          },
      ]
    }}
                options={{
                        responsive: true,
                        legend: {
                          labels: {
                             fontColor: 'white'
                          }
                        },
                        title: {
                            display: true,
                            text: 'Worldwide Daily Cases',
                            fontColor: "white",
                            fontSize: 25,
                        },
                        maintainAspectRatio: false,
                        scales: {
                          xAxes: [
                            {
                              barPercentage: 1,
                              gridLines: {
                                display: true,
                                color: "rgba(0, 0, 0, 0.1)"
                              }
                            }
                          ],
                          yAxes: [
                            {
                              gridLines: {
                                display: true,
                                color: "rgba(0, 0, 0, 0.1)",
                              },
                              ticks: {
                                beginAtZero: true
                              }
                            }
                          ]
                        }, 
                      }} />
            </div>   
        );
    }
}
