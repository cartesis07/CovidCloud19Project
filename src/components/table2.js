import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import { Bar } from "react-chartjs-2";

import "./table.css"

import { Spinner, Alert } from 'reactstrap';

export class Table2 extends React.Component {

    constructor(){
        super();
        this.state = {
        NewRecovered: [],
        NewDeaths: [],
        NewCases: [],
        date: [],
        loaded: false,
        error: false
        }
    }

    async fetchCall(datestring){
      var response = await fetch("https://corona.lmao.ninja/v2/historical/all?lastdays=8")
      if (response.ok){
          const data = await response.json()

          var previous = data.deaths[0]
          for (var element in data.deaths){
              this.setState({ NewDeaths: this.state.NewDeaths.concat(data.deaths[element]  - data.deaths[previous])})
              this.setState({ NewRecovered: this.state.NewRecovered.concat(data.recovered[element] - data.recovered[previous])})
              this.setState({ NewCases: this.state.NewCases.concat(data.cases[element] - data.cases[previous])})
              this.setState({ date: this.state.date.concat(element)})
              previous = element
          }

          console.log(this.state.NewDeaths)
          console.log(this.state.NewRecovered)
          console.log(this.state.NewCases)

          this.setState({loaded: true})
      }   
      else{
        this.setState({error : true})
      }
    }

    componentDidMount(){
      this.fetchCall();
    }

    render(){
        return(
            <div className="Bar">
                {!this.state.loaded && !this.state.error ? <Spinner className="Spinner" color="primary"/> : null}        
                {this.state.loaded ? <Bar  data={{
      labels: this.state.date.slice(1),
      datasets: [
        {
          label: "Daily New Cases",
          data: this.state.NewCases.slice(1),
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
            data: this.state.NewRecovered.slice(1),
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
            data: this.state.NewDeaths.slice(1),
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
                      }} /> : null }
            </div>   
        );
    }
}
