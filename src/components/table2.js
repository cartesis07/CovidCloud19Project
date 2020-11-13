import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import { Bar } from "react-chartjs-2";

import "./table.css"

export class Table2 extends React.Component {

    constructor(){
        super();
    }

    componentDidMount(){

      function minTwoDigits(n) {
        return (n < 10 ? '0' : '') + n;
      }

      var datestring = "https://api.covid19api.com/world?from=";
      const date = new Date();
      const date2 = new Date();
      date2.setDate(date.getDate() - 7);
      datestring = datestring + date2.getFullYear().toString() + "-" + minTwoDigits(date2.getMonth()).toString() + "-" + minTwoDigits(date2.getDate()).toString() + "T00:00:00Z&to=";
      datestring = datestring + date.getFullYear().toString() + "-" + minTwoDigits(date.getMonth()).toString() + "-" + minTwoDigits(date.getDate()).toString() + "T00:00:00Z";
      console.log(datestring);
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('load', () => {
          const xhr2 = JSON.parse(xhr.responseText);
          console.log(xhr2);
      })
      xhr.open('GET', datestring);
      xhr.send();
    }

    render(){
        return(
            <div className="Bar">
                <Bar  data={{
      labels: ["1", "2", "3", "4", "5", "6"],
      datasets: [
        {
          label: "Daily New Cases",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
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
          ]
        },
        {
            label: "Daily Recovered",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
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
            ]
          },
          {
            label: "Daily Deaths",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
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
