import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './arrow.png'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const passwordGen = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHOJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str += "0123456789" 
    if (charAllowed) str += "!@#$%^&*(){}:=<?"

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random()* str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(()=>{
    passwordGen()
  },[length, numAllowed, charAllowed, passwordGen])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-red-800 text-orange-500">
      <h1 className='text-white text-center my-3' >Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4' ><input 
         type="text"
         value={password}
         className="outline-none w-full py-1 px-3"
         placeholder="Password"
         ref={passwordRef}
         readOnly
       />
       <button
       onClick={copyPasswordToClipBoard} 
       className= "bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" >Copy
       </button>
       <button
       onClick={passwordGen} 
       className= "bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" >New
       </button>
       </div>
       <div className='flex text-sm gap-x-2'>
           <div className='text-white flex items-center gap-x-1' >
            <input type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange= {(e) => {setLength(e.target.value)}} />
            <label>Length: {length}</label>
            </div>  
            <div className='text-white flex items-center gap-x-1' >
            <input 
            type="checkbox"
            id='numberInput' 
            defaultChecked={numAllowed}
            onChange= {() => {
              setNumAllowed((prev) => !prev);
            }} 
              /> <label>Numbers</label>
            </div>  
            <div className='text-white flex items-center gap-x-1' >
            <input 
            type="checkbox"
            id='charInput' 
            defaultChecked={charAllowed}
            onChange= {() => {
              setCharAllowed((prev) => !prev);
            }} 
              /> <label >Characters</label>
            </div>  
       </div>
    </div>
  )
}
export default App
