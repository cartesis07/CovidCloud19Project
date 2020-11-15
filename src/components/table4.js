import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Table } from 'reactstrap';

import "./table.css"

export class Table4 extends React.Component {

    constructor(){
        super();
        this.state={
            countries: []
        }
    }

    componentDidMount(){
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            const xhr2 = JSON.parse(xhr.responseText);
            console.log(xhr2);
            var length = Object.keys(xhr2.Countries).length;
            for (let i = 0; i < length; i++){
                var tmpjson = {country: xhr2.Countries[i].Country,
                               newcases: xhr2.Countries[i].NewConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 
                               totalcases: xhr2.Countries[i].TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 
                               newrecoveries: xhr2.Countries[i].NewRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 
                               totalrecoveries: xhr2.Countries[i].TotalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                               newdeaths: xhr2.Countries[i].NewDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 
                               totaldeaths: xhr2.Countries[i].TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                this.setState(prev => ({
                    countries: [...prev.countries, tmpjson]
                }))
            }
            console.log(this.state.countries);
        });
        xhr.open('GET', "https://api.covid19api.com/summary");
        xhr.send();
    }

    renderTableData(){
        return this.state.countries.map((Country, index) => {
            const { country, newcases, totalcases, newrecoveries, totalrecoveries, newdeaths, totaldeaths } = Country //destructuring
            return (
               <tr key={country}>
                  <td class="table-secondary">{country}</td>
                  <td class="table-warning">{newcases}</td>
                  <td class="table-warning">{totalcases}</td>
                  <td class="table-primary">{newrecoveries}</td>
                  <td class="table-primary">{totalrecoveries}</td>
                  <td class="table-danger">{newdeaths}</td>
                  <td class="table-danger">{totaldeaths}</td>
               </tr>
            )
         })
    }

    render(){
        return(
            <div className = "CountriesTable">
            <Table borderless hover>
                <thead>
                    <tr className="table-secondary">
                        <th colspan="7" class="text-center">Cases, Recoveries and Deaths by Country</th>
                    </tr>
                </thead>
                <tbody className="table-secondary">
                    <th className = "stickyhead">Country</th>
                    <th className = "stickyhead">New Cases</th>
                    <th className = "stickyhead">Total Cases</th>
                    <th className = "stickyhead">New Recoveries</th>
                    <th className = "stickyhead">Total Recoveries</th>
                    <th className = "stickyhead">New Deaths</th>
                    <th className = "stickyhead">Total Deaths</th>
                </tbody>
                <tbody>
                    {this.renderTableData()}
                </tbody>
            </Table>
            </div>
        );
    }
}