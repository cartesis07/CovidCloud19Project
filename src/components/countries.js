import { Country1 } from "./country1"
import { Country2 } from "./country2"
import { Country3 } from "./country3"

import React from 'react';
import { Router } from "react-router-dom"

import ReactCountryFlag from "react-country-flag"

import "../components/table.css"

export class Countries extends React.Component {

    constructor(){
        super();
        this.state = {
            countrycode: ""
        }
    }

    componentDidMount(){
        this.setState({
            countrycode: window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
        })
    }

    render(){
        return(
            <div className="Content">
                <ReactCountryFlag
                className="emojiFlag"
                countryCode={this.state.countrycode}
                style={{
                    fontSize: '5em',
                    lineHeight: '1em',
                }}
                aria-label="United States"
                 />
                <Country1/>
                <Country2/>
                <Country3/>
            </div>
        );
    }
}