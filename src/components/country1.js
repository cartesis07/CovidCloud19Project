import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Table, Alert } from 'reactstrap';
import { Pie } from "react-chartjs-2";

import "./table.css"

export class Country1 extends React.Component {

    constructor(){
        super();
        this.state = {NewConfirmed: "",
                      TotalConfirmed: "",
                      NewDeaths: "",
                      TotalDeaths: "",
                      NewRecovered: "",
                      TotalRecovered: "",
                      ActiveCases: "",
                      countryref: "",
                      name:"",
        }
    }

    componentDidMount(){

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {

            let countryref = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)

            const xhr2 = JSON.parse(xhr.responseText);

            var getObjectByValue = function (array, key, value) {
                return array.filter(function (object) {
                    return object[key] === value;
                });
            };

            let country  = getObjectByValue(xhr2.Countries, "CountryCode", countryref )
            this.setState({name: country[0].Country})
            this.setState({NewConfirmed: country[0].NewConfirmed})
            this.setState({TotalConfirmed: country[0].TotalConfirmed})
            this.setState({NewDeaths: country[0].NewDeaths})
            this.setState({NewRecovered: country[0].NewRecovered})
            this.setState({TotalRecovered: country[0].TotalRecovered})
            this.setState({TotalDeaths: country[0].TotalDeaths})
            this.setState({ActiveCases: this.state.TotalConfirmed - this.state.TotalDeaths - this.state.TotalRecovered})
        })
        xhr.open('GET', 'https://api.covid19api.com/summary');
        xhr.send();
    }



    render() {
        return(
            <div>
                <div className="block1">
                <Table borderless hover>
                <thead>
                    <tr class="table-warning">
                        <th colspan="2" className="text-center">{this.state.name} cases</th>
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
                        <th colspan="2" className="text-center">{this.state.name} recoveries</th>
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
                        <th colspan="2" className="text-center">{this.state.name} deaths</th>
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
            text: this.state.name + ' Cases Distribution',
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