import { useState } from 'react';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const specialCharacters = "@#$%&_.";

function ChoiceComponent({text, state, setState}){
  return (
    <div className='choice'>
      <label>{text}</label>
      <input type='checkbox' onChange={()=>setState(!state)}/>
    </div>
  );
}

function App() {
  let [isLower, setIsLower] = useState(false);
  let [isUpper, setIsUpper] = useState(false);
  let [isDigit, setIsDigit] = useState(false);
  let [isSpecialChar, setIsSpecialChar] = useState(false);
  let [length, setLength] = useState(10);
  let [password, setPassword] = useState('');

  let generatePass = ()=>{
    if (isLower || isUpper || isDigit || isSpecialChar){
      let s = "";
      let newPass = ""

      if (isLower)
        s += lowercaseLetters;
      if (isUpper)
        s += uppercaseLetters;
      if (isDigit)
        s += numbers;
      if (isSpecialChar)
        s += specialCharacters;

      for (let i=0; i<length; i++){
        newPass += s[Math.floor(Math.random()*s.length)];
      }
      setPassword(newPass);
    }
    else{
      toast.error("Check atleast one checkbox to generate a password.");
    }
  }

  let copyToClipboard = ()=>{
    navigator.clipboard.writeText(password)
    .then(()=>{
      if (password)
        toast.success("Password copied to clipboard");
      else
        toast.error("No password to copy");
    })
    .catch((err)=>{
      toast.error("Could not copy password: ", err);
    })
    setPassword('');
  }

  return (
    <div className='generator'>
      <ToastContainer />
      <div className='password'>
        <input type='text' readOnly value={password}/>
        <button id='copy-pass' onClick={copyToClipboard}>Copy</button>
      </div>

      <div className='pass-length'>
        <label>Password length</label>
        <input type='number' min={10} max={20} value={length} onChange={(e)=>setLength(e.target.value)}/>
      </div>

      <div className='choices'>
        <ChoiceComponent text={"Include lowercase letters"} state={isLower} setState={setIsLower}/>
        <ChoiceComponent text={"Include uppercase letters"} state={isUpper} setState={setIsUpper}/>
        <ChoiceComponent text={"Include numbers"} state={isDigit} setState={setIsDigit}/>
        <ChoiceComponent text={"Include special characters"} state={isSpecialChar} setState={setIsSpecialChar}/>
      </div>
      <button id='generate' onClick={generatePass}>Generate Password</button>
    </div>
  );
}

export default App;
