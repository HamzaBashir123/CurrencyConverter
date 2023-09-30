import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  let [country1 ,setCountry1]= useState('USD')
  let [country2 ,setCountry2]= useState('GBP')
  let [result ,setResult]= useState('')
  const countries = [
    "USD", "JPY", "BGN", "CZK", "DKK", "GBP", "HUF", "PLN", "RON", "SEK", "CHF", "ISK", "NOK", "TRY", "AUD", "BRL", "CAD", "CNY", "HKD", "IDR", "ILS", "INR", "KRW", "MXN", "MYR", "NZD", "PHP", "SGD", "THB", "ZAR",
  ]
 const controller = new AbortController();
 useEffect(()=>{
  async function converter(){
    try {
      let api = await fetch(`https://api.frankfurter.app/latest?amount=${count}&from=${country1}&to=${country2}`, { signal: controller.signal });
      let data = await api.json();
      let values = Object.values(data.rates)
      setResult(values[0]);
      console.log(values)
    } catch (error) {
      console.log(error)
    }
  }
    count && converter()
 },[count , country1 ,  country2])
  return (
   <div className='main'>
    <h1>Currency Converter</h1>
    <div className='inputCountrySelect'>
    <input style={{padding:'10px', borderRadius:'10px', margin:'10px'}} type="number" placeholder='Enter Amount' onChange={(e) => {
            setCount(e.target.value)
          }} value={count} />

          {/* Select Button */}
            <select style={{padding:'10px', borderRadius:'10px', margin:'10px'}} value={country1} onChange={(e) => {
            setCountry1(e.target.value)
          }}>
            {countries.map((x, i) => <option key={i}>{x}</option>)}
          </select>
          <select style={{padding:'10px', borderRadius:'10px', margin:'10px'}} value={country2} onChange={(e) => {
            setCountry2(e.target.value)
          }}>
            {countries.map((x, i) => <option key={i}>{x}</option>)}
          </select>
    </div>
    <h1>{count === 0 ? 0 :country1 === country2 ? count  : result}</h1>
   </div>
  )
}


export default App
