import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import "./table.css"

import { Bar } from "react-chartjs-2";

export class Country2 extends React.Component {
    constructor(){
        super();
        this.state = {
            NewRecovered: [],
            NewDeaths: [],
            NewCases: [],
            date: [],
            name: "",
            }
    }

    componentDidMount(){

        let countryref = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)

        function minTwoDigits(n) {
            return (n < 10 ? '0' : '') + n;
          }
    
          var datestring1 = "https://api.covid19api.com/total/country/" + countryref + "/status/confirmed?from=";
          var datestring2 = "https://api.covid19api.com/total/country/" + countryref + "/status/recovered?from=";
          var datestring3 = "https://api.covid19api.com/total/country/" + countryref + "/status/deaths?from=";

          const date = new Date();
          const date2 = new Date();
          date.setDate(date.getDate());
          date2.setDate(date.getDate() - 7);
          datestring1 = datestring1 + date2.getFullYear().toString() + "-" + minTwoDigits(date2.getMonth()).toString() + "-" + minTwoDigits(date2.getDate()).toString() + "T00:00:00Z&to=";
          datestring1 = datestring1 + date.getFullYear().toString() + "-" + minTwoDigits(date.getMonth()).toString() + "-" + minTwoDigits(date.getDate()).toString() + "T00:00:00Z";

          datestring2 = datestring2 + date2.getFullYear().toString() + "-" + minTwoDigits(date2.getMonth()).toString() + "-" + minTwoDigits(date2.getDate()).toString() + "T00:00:00Z&to=";
          datestring2 = datestring2 + date.getFullYear().toString() + "-" + minTwoDigits(date.getMonth()).toString() + "-" + minTwoDigits(date.getDate()).toString() + "T00:00:00Z";

          datestring3 = datestring3 + date2.getFullYear().toString() + "-" + minTwoDigits(date2.getMonth()).toString() + "-" + minTwoDigits(date2.getDate()).toString() + "T00:00:00Z&to=";
          datestring3 = datestring3 + date.getFullYear().toString() + "-" + minTwoDigits(date.getMonth()).toString() + "-" + minTwoDigits(date.getDate()).toString() + "T00:00:00Z";
          
          const xhr1 = new XMLHttpRequest();
          const xhr2 = new XMLHttpRequest();
          const xhr3 = new XMLHttpRequest();
          xhr1.addEventListener('load', () => {
              const xhrjson1 = JSON.parse(xhr1.responseText);
              
              this.setState({name: xhrjson1[0].Country + " Daily Cases"})

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
                  NewCases: [...prev.NewCases, xhrjson1[i].Cases]
                }))
              }   
              var newstringdate = x_date2.getDate().toString() +  " " + monthNames[x_date2.getMonth()];
              this.setState(prev => ({
                date: [...prev.date, newstringdate]
              }))
              x_date2.setDate(x_date2.getDate() + 1);
          })
        xhr2.addEventListener('load', () => {
            const xhrjson2 = JSON.parse(xhr2.responseText);
            for (let i = 0; i < 7; i++){
              this.setState(prev => ({
                NewRecovered: [...prev.NewRecovered, xhrjson2[i].Cases]
              }))
            }   
        })
        xhr3.addEventListener('load', () => {
            const xhrjson3 = JSON.parse(xhr3.responseText);
            for (let i = 0; i < 7; i++){
              this.setState(prev => ({
                NewDeaths: [...prev.NewDeaths, xhrjson3[i].Cases]
              }))
            }   
        })
          xhr1.open('GET', datestring1);
          xhr1.send();
          xhr2.open('GET', datestring2);
          xhr2.send();
          xhr3.open('GET', datestring3);
          xhr3.send();

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
                            text: this.state.name,
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