import { Country1 } from "./country1"
import { Country2 } from "./country2"
import { Country3 } from "./country3"
import { CountryNews } from "./countrynews"

import React from 'react';
import { Router } from "react-router-dom"

import "../components/table.css"

export class Countries extends React.Component {

    constructor(){
        super();
    }

    componentDidMount(){
    }

    render(){
        return(
            <div className="Content">
                <Country1/>
                <CountryNews/>
                <Country2/>
                <Country3/>
            </div>
        );
    }
}