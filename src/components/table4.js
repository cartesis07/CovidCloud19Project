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
            const { country, newcases, totalcases, newrecoveries, totalrecoveries, newdeaths, totaldeaths, countrycode } = Country //destructuring
            return (
               <tr className="beautiful-table" key={country}>
                  <td class="bg-light"><ReactCountryFlag countryCode={countrycode} />&nbsp;&nbsp;&nbsp;<a outline class="btn btn-outline-dark" href={"countries/" + countrycode}>{country.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</a></td>
                  <td class="bg-light">{newcases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  <td class="bg-light">{totalcases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  <td class="bg-light">{newrecoveries.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  <td class="bg-light">{totalrecoveries.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  <td class="bg-light">{newdeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  <td class="bg-light">{totaldeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
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
        <section class="jumbotron text-center" className="jumbotron">
        <div class="container">
          <h1 class="jumbotron-heading">Worldwide Covid19 Statistics By Country</h1>
          <p class="lead">These are the last worldwide statistics about Covid19 classified by country.<br/>
          Do not hesitate to access a news and country data by clicking on it.<br/>
          You can also sort the data by any column and any order.
          </p>
          <p>
            <a href="/add-news" class="btn btn-primary my-2">Add News</a>
          </p>
        </div>
      </section>
        {this.state.error ? <Alert className="block1" color="danger">
        <h4 className="alert-heading">Oops, API call error</h4>
        <p>
          This website is running with the free version of <a href="https://covid19api.com" target="_blank" rel="noreferrer">COVID19API</a>, so it is unfortunately rate-limited.
        </p>
        <hr />
        <p className="mb-0">
          Please, try to <a href="javascript:window.location.href=window.location.href">refresh</a> this page to display this data !
        </p>
        </Alert> : null}
            {!this.state.loaded && !this.state.error ? <Spinner className="Spinner" color="primary"/> : null}        
            {this.state.loaded ? <Table borderless hover> 
                <thead>
                    <tr className="thead-light">
                        <th colSpan="7" class="text-center">Cases, Recoveries and Deaths by Country</th>
                    </tr> 
                </thead>
                <tbody className="thead-light">
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