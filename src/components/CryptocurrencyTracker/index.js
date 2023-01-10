// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

class CryptocurrencyTracker extends Component {
  state = {cryptoList: [], isLoading: true}

  componentDidMount() {
    this.getApiCrypto()
  }

  getApiCrypto = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const data = await response.json()
    const newData = data.map(each => ({
      currencyName: each.currency_name,
      usdValue: each.usd_value,
      euroValue: each.euro_value,
      id: each.id,
      currencyLogo: each.currency_logo,
    }))
    this.setState({cryptoList: newData, isLoading: false})
  }

  render() {
    const {cryptoList, isLoading} = this.state
    return (
      <div className="bgcolor">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Rings" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          <div>
            <h1>Cryptocurrency Tracker</h1>
            <img
              alt="cryptocurrency"
              src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
            />
            <div className="table">
              <p>Coin Type</p>
              <p>USD</p>
              <p>EURO</p>
            </div>
            <ul>
              {cryptoList.map(each => (
                <li className="table" key={each.id}>
                  <div>
                    <img alt={each.currencyName} src={each.currencyLogo} />
                    <p>{each.currencyName}</p>
                  </div>
                  <p>{each.usdValue}</p>
                  <p>{each.euroValue}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default CryptocurrencyTracker
