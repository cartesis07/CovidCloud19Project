import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Table } from 'reactstrap';

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
                    }
    }

    componentDidMount(){
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            const xhr2 = JSON.parse(xhr.responseText);
            this.setState({NewConfirmed: xhr2.Global.NewConfirmed})
            this.setState({TotalConfirmed: xhr2.Global.TotalConfirmed})
            this.setState({NewDeaths: xhr2.Global.NewDeaths})
            this.setState({NewRecovered: xhr2.Global.NewRecovered})
            this.setState({TotalRecovered: xhr2.Global.TotalRecovered})
            this.setState({TotalDeaths: xhr2.Global.TotalDeaths})
            this.setState({ActiveCases: this.state.TotalConfirmed - this.state.TotalDeaths - this.state.TotalRecovered})
        })
        xhr.open('GET', 'https://api.covid19api.com/summary');
        xhr.send();
    }
    render(){
        return(
            <div>
                <div className="block1">
                <Table borderless hover>
                <thead>
                    <tr class="table-warning">
                        <th colspan="2" className="text-center">Worldwide cases</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-warning">
                        <th scope="row">Total Cases &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th>
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
            </Table>
            </div>
            <div className="block1">
            <Table borderless hover>
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
            </Table>
            </div>
            <div className="block1">
            <Table borderless hover>
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
            </Table> 
            </div>
            <div className="Pie">
            <Pie data={{
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
         }}} />
          </div>
        </div>
        );
    }
}