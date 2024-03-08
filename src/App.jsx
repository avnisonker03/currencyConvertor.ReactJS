import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [showPopup, setShowPopup] = useState(false);
  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
   
    setFrom(to)
    setTo(from)
    setConvertedAmount(0)
    setAmount(0);}
  
  const convert = () => {
    if(!amount){
      setShowPopup(true);
    }
    else{
    setConvertedAmount(amount * currencyInfo[to])}
  }

  const clear=()=>{
    if(!amount){
      setShowPopup(true);
    }
    else{
    setConvertedAmount(0)
    setAmount(0);}
  }

  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-vector/global-currency-background_115579-800.jpg')`,
        }}
      >
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert()
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency)=>setFrom(currency)}
                  selectCurrency={from}
                  onAmountChange={(amount) => setAmount(amount)}
                  

                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/4 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5  hover:bg-blue-400"
                  onClick={swap}
                >
                  swap
                </button>
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute right-1/4 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5  hover:bg-blue-400"
                  onClick={clear}
                >
                  clear
                </button>
              </div>

              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency)=>setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                  

                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg  hover:bg-blue-400">
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
              {showPopup && (
             <div className="popup w-full px-4 py-3 rounded-lg">
             <div className="popup-content">
             <h1>Please enter a value</h1>
             <button className='bg-blue-600 px-4 py-3 rounded-lg text-center mt-2 hover:bg-blue-300' onClick={() => setShowPopup(false)} >Close</button>
          </div>
        </div>
      )}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
