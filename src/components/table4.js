import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Table } from 'reactstrap';

import { Spinner, Alert } from 'reactstrap';
 
import "./table.css"

import ReactCountryFlag from "react-country-flag"

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

export class Table4 extends React.Component {

    constructor(){
        super();
        this.state={
            countries: [],
            loaded: false,
            selected: 2,
            error: false,
        }
    }

    async fetchCall(){
        var response = await fetch("https://api.covid19api.com/summary")
        if(response.ok){
            const data = await response.json()
            var length = Object.keys(data.Countries).length;
            for (let i = 0; i < length; i++){
                var tmpjson = {country: data.Countries[i].Country,
                               newcases: data.Countries[i].NewConfirmed, 
                               totalcases: data.Countries[i].TotalConfirmed, 
                               newrecoveries: data.Countries[i].NewRecovered, 
                               totalrecoveries: data.Countries[i].TotalRecovered,
                               newdeaths: data.Countries[i].NewDeaths, 
                               totaldeaths: data.Countries[i].TotalDeaths,
                               countrycode: data.Countries[i].CountryCode}
                this.setState(prev => ({
                    countries: [...prev.countries, tmpjson]
                }))
            }
            this.setState({loaded: true})
        }
        else{
            this.setState({error: true})
        }
    }

    componentDidMount(){
        this.fetchCall()
    }

    onSort(event, sortKey){
        if (sortKey === "country"){
            const data = this.state.countries;
            data.sort(function(a,b){if(a.country.toLowerCase() < b.country.toLowerCase()) return -1;
            if(a.country.toLowerCase() > b.country.toLowerCase()) return 1;
            return 0;});
            this.setState({countries: data})
        }
        else{
            const data = this.state.countries;
            data.sort(function(a, b){return - a[sortKey] + b[sortKey]})
            this.setState({countries: data})
        }
      }

      onReverseSort(event, sortKey){
        if (sortKey === "country"){
            const data = this.state.countries;
            data.sort(function(a,b){if(a.country.toLowerCase() < b.country.toLowerCase()) return 1;
            if(a.country.toLowerCase() > b.country.toLowerCase()) return -1;
            return 0;});
            this.setState({countries: data})
        }
        else{
            const data = this.state.countries;
            data.sort(function(a, b){return a[sortKey] - b[sortKey]})
            this.setState({countries: data})
        }
      }

    renderTableData(){
        return this.state.countries.map((Country, index) => {
            var string = "/countries/"
            const { country, newcases, totalcases, newrecoveries, totalrecoveries, newdeaths, totaldeaths, countrycode } = Country //destructuring
            return (
               <tr key={country}>
                  <td class="table-secondary"><ReactCountryFlag countryCode={countrycode} />&nbsp;&nbsp;&nbsp;<a outline class="btn btn-outline-dark" href={"countries/" + countrycode}>{country.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</a></td>
                  <td class="table-warning">{newcases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  <td class="table-warning">{totalcases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  <td class="table-primary">{newrecoveries.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  <td class="table-primary">{totalrecoveries.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  <td class="table-danger">{newdeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  <td class="table-danger">{totaldeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
               </tr>
            )
         })
    }

    change(e,i,sortKey,reverse){
        this.setState({selected: i})
        if(reverse){
            this.onSort(e,sortKey)
        }
        else{
            this.onReverseSort(e,sortKey)
        }
    }

    render(){
        return(
            <div className = "CountriesTable">
            {!this.state.loaded && !this.state.error ? <Spinner className="Spinner" color="primary"/> : null}        
            {this.state.loaded ? <Table borderless hover> 
                <thead>
                    <tr className="table-secondary">
                        <th colspan="7" class="text-center">Cases, Recoveries and Deaths by Country</th>
                    </tr> 
                </thead>
                <tbody className="table-secondary">
                    <th className = "stickyhead">Country<br/>
                    {!(this.state.selected === 1) ? <ArrowDropUpIcon onClick={(e) => this.change(e,1,"country",false)}/> : null}
                    {this.state.selected === 1 ? <ArrowDropDownCircleIcon className="flip"/> : null}
                    {!(this.state.selected === 2) ?<ArrowDropDownIcon onClick={(e) => this.change(e,2,"country",true)}/> : null}
                    {this.state.selected === 2 ? <ArrowDropDownCircleIcon/> : null}
                    </th>
                    <th className = "stickyhead">New Cases<br/>
                    {!(this.state.selected === 3) ? <ArrowDropUpIcon onClick={(e) => this.change(e,3,"newcases",false)}/> : null}
                    {this.state.selected === 3 ? <ArrowDropDownCircleIcon className="flip"/> : null}
                    {!(this.state.selected === 4) ?<ArrowDropDownIcon onClick={(e) => this.change(e,4,"newcases",true)}/> : null}
                    {this.state.selected === 4 ? <ArrowDropDownCircleIcon/> : null}
                    </th>
                    <th className = "stickyhead">Total Cases<br/>
                    {!(this.state.selected === 5) ? <ArrowDropUpIcon onClick={(e) => this.change(e,5,"totalcases",false)}/> : null}
                    {this.state.selected === 5 ? <ArrowDropDownCircleIcon className="flip"/> : null}
                    {!(this.state.selected === 6) ?<ArrowDropDownIcon onClick={(e) => this.change(e,6,"totalcases",true)}/> : null}
                    {this.state.selected === 6 ? <ArrowDropDownCircleIcon/> : null}
                    </th>
                    <th className = "stickyhead">New Recoveries<br/>
                    {!(this.state.selected === 7) ? <ArrowDropUpIcon onClick={(e) => this.change(e,7,"newrecoveries",false)}/> : null}
                    {this.state.selected === 7 ? <ArrowDropDownCircleIcon className="flip"/> : null}
                    {!(this.state.selected === 8) ?<ArrowDropDownIcon onClick={(e) => this.change(e,8,"newrecoveries",true)}/> : null}
                    {this.state.selected === 8 ? <ArrowDropDownCircleIcon/> : null}
                    </th>
                    <th className = "stickyhead">Total Recoveries<br/>
                    {!(this.state.selected === 9) ? <ArrowDropUpIcon onClick={(e) => this.change(e,9,"totalrecoveries",false)}/> : null}
                    {this.state.selected === 9 ? <ArrowDropDownCircleIcon className="flip"/> : null}
                    {!(this.state.selected === 10) ?<ArrowDropDownIcon onClick={(e) => this.change(e,10,"totalrecoveries",true)}/> : null}
                    {this.state.selected === 10 ? <ArrowDropDownCircleIcon/> : null}
                    </th>
                    <th className = "stickyhead">New Deaths<br/>
                    {!(this.state.selected === 11) ? <ArrowDropUpIcon onClick={(e) => this.change(e,11,"newdeaths",false)}/> : null}
                    {this.state.selected === 11 ? <ArrowDropDownCircleIcon className="flip"/> : null}
                    {!(this.state.selected === 12) ?<ArrowDropDownIcon onClick={(e) => this.change(e,12,"newdeaths",true)}/> : null}
                    {this.state.selected === 12 ? <ArrowDropDownCircleIcon/> : null}
                    </th>
                    <th className = "stickyhead">Total Deaths<br/>
                    {!(this.state.selected === 13) ? <ArrowDropUpIcon onClick={(e) => this.change(e,13,"totaldeaths",false)}/> : null}
                    {this.state.selected === 13 ? <ArrowDropDownCircleIcon className="flip"/> : null}
                    {!(this.state.selected === 14) ?<ArrowDropDownIcon onClick={(e) => this.change(e,14,"totaldeaths",true)}/> : null}
                    {this.state.selected === 14 ? <ArrowDropDownCircleIcon/> : null}
                    </th>
                </tbody>
                <tbody>
                    {this.renderTableData()}
                </tbody>
            </Table> : null}
            </div>
        );
    }
}