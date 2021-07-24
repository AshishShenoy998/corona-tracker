import React, { Component} from 'react'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import ArraySort from 'array-sort'

import './Countries.css'

import HeadingNames from '../../components/HeadingNames/HeadingNames'
import CountryDetails from '../../components/CountryDetails/CountryDetails'
import Spinner from '../../components/Spinner/Spinner'

export default class Countries extends Component {

    state = {
        CountryDetails: [],
        searchedCountries: []
    }

    async componentDidMount() {

        var data = await axios.get("https://api.covid19api.com/summary")
        var CountryDetails = data.data.Countries
        CountryDetails = ArraySort(CountryDetails, 'TotalConfirmed', {reverse: true});

        this.setState({CountryDetails: CountryDetails, status: true, selectedData: CountryDetails})
    }

    ChangeSortValue = e => {
        const value = e.target.value
        let sortByReverse = true;

        if(value == "Highest") {
            sortByReverse = true
        } else {
            sortByReverse = false;
        }

        let CountryDetails = ArraySort(this.state.CountryDetails, 'TotalConfirmed', {reverse: sortByReverse})

        this.setState({CountryDetails: CountryDetails, status: true})
    }


    searchCountry = e => {

        const value = e.target.value

        const CountryDetails = this.state.CountryDetails

        var FindSpecificCountry = []

        if(value) {
            CountryDetails.map(function(cur, index) {
                const finder = cur.Country.toLowerCase().search(value.toLowerCase())

                if(finder !== -1) {
                    FindSpecificCountry.push(CountryDetails[index])
                }

            })

            FindSpecificCountry = ArraySort(FindSpecificCountry, 'TotalConfirmed', {reverse: true})
            this.setState({searchedCountries: FindSpecificCountry})
        } else {
            this.setState({CountryDetails: CountryDetails})
        }

        if(value === 0) {
            this.setState({selectedData: this.state.CountryDetails})
        } else {
            this.setState({selectedData: this.state.searchedCountries})
        }
    }

    render () {
        const ChangeNumbertoFormat = function(val) {
            return <NumberFormat value={val} thousandSeparator={true} displayType="text"/>
        }

        var countriesList = this.state.CountryDetails.length > 0 ?

        this.state.selectedData.map(function(cur,index){
            return   <CountryDetails
                        key={index}
                        countryCode={cur.CountryCode}

                        totalCases={ChangeNumbertoFormat(cur.TotalConfirmed)}
                        newCase={ChangeNumbertoFormat(cur.NewConfirmed)}

                        totalDeaths={ChangeNumbertoFormat(cur.TotalDeaths)}
                        newDeaths={ChangeNumbertoFormat(cur.NewDeaths)}

                        totalRecovered={ChangeNumbertoFormat(cur.TotalRecovered)}
                        newRecovered={ChangeNumbertoFormat(cur.NewRecovered)}
                    />
        }) : null;

        
        return (
            <div className="countries-stats">
                
                <h2 className="countries-stats-heading">Countries Stats</h2>
                <div className="Filtering">
                    <input type="text" placeholder="Enter Country Name" onChange={this.searchCountry}/>
                    <select className="sort-by" onChange={this.ChangeSortValue}>
                        <option>Highest</option>
                        <option>Lowest</option>
                    </select>
                </div>
                <HeadingNames />


                {this.state.CountryDetails.length < 1 ? <Spinner /> : null}
                {countriesList}
    
            </div>
        )
    }
}