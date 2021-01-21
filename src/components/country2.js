import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import "./table.css"

import { Bar } from "react-chartjs-2";

import { Spinner, Alert} from 'reactstrap';

export class Country2 extends React.Component {
    constructor(){
        super();
        this.state = {
            NewRecovered: [],
            NewDeaths: [],
            NewCases: [],
            date: [],
            name: "",
            loaded: 0,
            error: false
            }
    }

    async fetchCall1(datestring1){
        var response = await fetch(datestring1)
        if (response.ok){
          const data = await response.json()
          this.setState({name: data[0].Country + " Daily Cases"})

            const x_date = new Date();
            const x_date2 = new Date();
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            x_date2.setDate(x_date.getDate() - 7);
            for (let i = 0; i < 8; i++){
              var newstringdate = x_date2.getDate().toString() + " " + monthNames[x_date2.getMonth()];
              this.setState(prev => ({
                date: [...prev.date, newstringdate]
              }))
              x_date2.setDate(x_date2.getDate() + 1);

              if (i !== 0){
                this.setState(prev => ({
                  NewCases: [...prev.NewCases, data[i].Cases - data[i-1].Cases]
                }))
              }
            }
            this.setState({loaded: this.state.loaded + 1})
        }
        else {
          this.setState({error: true})
        }
    }

    async fetchCall2(datestring2){
      var response = await fetch(datestring2)
      if (response.ok){
        const data = await response.json()
        for (let i = 0; i < 8; i++){
          if(i !== 0){
            this.setState(prev => ({
              NewRecovered: [...prev.NewRecovered, data[i].Cases - data[i-1].Cases]
            }))
          }
        }
        this.setState({loaded: this.state.loaded + 1})  
      }
      else {
        this.setState({error: true})
        console.log("error")
      }
  }

      async fetchCall3(datestring3){
      var response = await fetch(datestring3)
      if (response.ok){
        const data = await response.json()
        for (let i = 0; i < 8; i++){
          if (i !== 0){
            this.setState(prev => ({
              NewDeaths: [...prev.NewDeaths, data[i].Cases - data[i-1].Cases]
            }))
          }
        }
        this.setState({loaded: this.state.loaded + 1})  
      }
      else {
        this.setState({error: true})
        console.log("error")
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
          date.setDate(date.getDate()-1);
          date2.setDate(date.getDate()-8);


          console.log(date2.getMonth().toString())

          datestring1 = datestring1 + date2.getFullYear().toString() + "-" + minTwoDigits(date2.getMonth()+1).toString() + "-" + minTwoDigits(date2.getDate()+1).toString() + "T00:00:00Z&to=";
          datestring1 = datestring1 + date.getFullYear().toString() + "-" + minTwoDigits(date.getMonth()+1).toString() + "-" + minTwoDigits(date.getDate()+1).toString() + "T00:00:00Z";

          datestring2 = datestring2 + date2.getFullYear().toString() + "-" + minTwoDigits(date2.getMonth()+1).toString() + "-" + minTwoDigits(date2.getDate()+1).toString() + "T00:00:00Z&to=";
          datestring2 = datestring2 + date.getFullYear().toString() + "-" + minTwoDigits(date.getMonth()+1).toString() + "-" + minTwoDigits(date.getDate()+1).toString() + "T00:00:00Z";

          datestring3 = datestring3 + date2.getFullYear().toString() + "-" + minTwoDigits(date2.getMonth()+1).toString() + "-" + minTwoDigits(date2.getDate()+1).toString() + "T00:00:00Z&to=";
          datestring3 = datestring3 + date.getFullYear().toString() + "-" + minTwoDigits(date.getMonth()+1).toString() + "-" + minTwoDigits(date.getDate()+1).toString() + "T00:00:00Z";
          

          console.log(datestring1);
          console.log(datestring2);
          console.log(datestring3);

          this.fetchCall1(datestring1);
          this.fetchCall2(datestring2);
          this.fetchCall3(datestring3);
    }

    render(){ 
        return(
            <div className="Bar">
                          {this.state.error ? <Alert className="block1" color="danger">
        <h4 className="alert-heading">Oops, API call error</h4>
        <p>
          This website is running with the free version of <a href="https://covid19api.com" target="_blank">COVID19API</a>, so it is unfortunately rate-limited.
        </p>
        <hr />
        <p className="mb-0">
          Please, try to <a href="javascript:window.location.href=window.location.href">refresh</a> this page to display this data !
        </p>
        </Alert> : null}
                {!(this.state.loaded==3) && !this.state.error ? <Spinner className="Spinner" color="primary"/> : null}        
                {this.state.loaded==3 ? <Bar  data={{
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
                      }} /> : null}
            </div>   
        );
    }
}