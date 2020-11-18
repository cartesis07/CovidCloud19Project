import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Table, Spinner, Alert } from 'reactstrap';

import "./table.css"

import { Pie } from "react-chartjs-2";

//summary of worldwide cases, recoveries and deaths.
//not all values are found in the API call

// finally we use react-chartjs-2
// and chart.js

export class Table1 extends React.Component {

    constructor(){
        super();
        this.state = {NewConfirmed: "",
                    TotalConfirmed: "",
                    NewDeaths: "",
                    TotalDeaths: "",
                    NewRecovered: "",
                    TotalRecovered: "",
                    ActiveCases: "",
                    loaded: false,
                    error: false,
                    }
    }

    async fetchCall(){
        var response = await fetch("https://api.covid19api.com/summary")
        if (response.ok){
            const data = await response.json()
            this.setState({NewConfirmed: data.Global.NewConfirmed})
            this.setState({TotalConfirmed: data.Global.TotalConfirmed})
            this.setState({NewDeaths: data.Global.NewDeaths})
            this.setState({NewRecovered: data.Global.NewRecovered})
            this.setState({TotalRecovered: data.Global.TotalRecovered})
            this.setState({TotalDeaths: data.Global.TotalDeaths})
            this.setState({ActiveCases: this.state.TotalConfirmed - this.state.TotalDeaths - this.state.TotalRecovered})
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
            <div>
        {this.state.error ? <Alert className="block1" color="danger">
        <h4 className="alert-heading">Oops, API call error</h4>
        <p>
          This website is running with the free version of <a href="https://covid19api.com" target="_blank">COVID19API</a>, so it is unfortunately rate-limited.
        </p>
        <hr />
        <p className="mb-0">
          Please, try to refresh this page to display data !
        </p>
        </Alert> : null}
                <div className="block1">
                {!this.state.loaded && !this.state.error ? <Spinner className="Spinner" color="primary"/> : null}        
                {this.state.loaded ? <Table borderless hover>
                <thead>
                    <tr class="table-warning">
                        <th colspan="2" className="text-center">Worldwide cases</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-warning">
                        <th scope="row">Total Cases</th>
                        <td>{this.state.TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                    <tr class="table-warning">
                        <th scope="row">New Cases</th>
                        <td>{this.state.NewConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                    <tr class="table-warning">
                        <th scope="row">Active Cases</th>
                        <td>{this.state.ActiveCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                </tbody>
                <thead>
                    <tr class="table-primary">
                        <th colspan="2" className="text-center">Worldwide recoveries</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-primary">
                        <th scope="row">Total Recovered</th>
                        <td>{this.state.TotalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                    <tr class="table-primary">
                        <th scope="row">New Recovered</th>
                        <td>{this.state.NewRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                    <tr class="table-primary">
                        <th scope="row">Recovery Rate</th>
                        <td>{Math.round(this.state.TotalRecovered/this.state.TotalConfirmed * 10000) / 100} %</td>
                    </tr>
          </tbody>
                <thead>
                    <tr class="table-danger">
                        <th colspan="2" className="text-center">Worldwide deaths</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-danger">
                        <th scope="row">Total Deaths</th>
                        <td>{this.state.TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                    <tr class="table-danger">
                        <th scope="row">New Deaths</th>
                        <td>{this.state.NewDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                    <tr class="table-danger">
                        <th scope="row">Mortality Rate</th>
                        <td>{Math.round(this.state.TotalDeaths/this.state.TotalConfirmed * 10000) / 100} %</td>
                    </tr>
          </tbody>
            </Table> : null} 
            </div>
            <div className="Pie">
            {!this.state.loaded && !this.state.error ? <Spinner className="Spinner" color="primary"/> : null}        
            {this.state.loaded ? <Pie data={{
            labels: ["Active Cases", "Recovered Cases", "Dead Cases"],
            datasets: [
              {
                data: [Math.round((this.state.ActiveCases/(this.state.ActiveCases+this.state.TotalRecovered+this.state.TotalDeaths) * 10000)) / 100, 
                       Math.round((this.state.TotalRecovered/(this.state.ActiveCases+this.state.TotalRecovered+this.state.TotalDeaths) * 10000 ))/ 100, 
                       Math.round((this.state.TotalDeaths/(this.state.ActiveCases+this.state.TotalRecovered+this.state.TotalDeaths)* 10000 ))/ 100],
                backgroundColor: [
                "rgba(255, 177, 101,0.8)",
                "rgba(98,  182, 239,0.8)",
                "rgba(255, 134,159,0.8)",
                ],
                hoverBackgroundColor: [
                  "#FFC870",
                  "#5AD3D1",
                  "#FF5A5E",
                ],
                borderColor: "#282c34",
                borderWidth: "5",
              }
            ]
          }} options={{responsive: true, title: {
            display: true,
            text: 'Worldwide Cases Distribution',
            fontColor: "white",
            fontSize: 25,
        }, legend: {
            labels: {
               fontColor: 'white'
            }
         }}} /> : null} 
          </div>
        </div>
        );
    }
}