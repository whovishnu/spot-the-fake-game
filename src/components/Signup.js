import { useState } from "react";

function Signup({ playerScore, handleRetry }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isSubmit, setSubmit] = useState(false)
  const [HighestScore, setHighestScore] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isValid()){
      let AllPlayerScores = JSON.parse(sessionStorage.getItem('AllPlayerScores'))
      if(AllPlayerScores){
        AllPlayerScores.push({ name: firstName + ' ' + lastName, score : playerScore })
      }else{
        AllPlayerScores = [{ name: firstName + ' ' + lastName, score : playerScore }]
      }
      sessionStorage.setItem('AllPlayerScores', JSON.stringify(AllPlayerScores))
      setHighestScore(AllPlayerScores)
      setSubmit(true)
      setFirstName('')
      setLastName('')
      setEmail('')
    }else{
      setErrorMsg('All Field are Required!')
    }
  }

  const isValid = () => {
    if(firstName.trim().length === 0 || lastName.trim().length === 0 || email.trim().length === 0)
      return false

    if(email.lastIndexOf('@') + 2 > email.lastIndexOf('.') ){
      setErrorMsg('Please enter valid email!')
      return false
    } 
    
    return true
  }

    return isSubmit ? 
          <div>
            <h1>Highest Score</h1>
            {HighestScore.map(player => <div className="scoreCard">
                  <div className="cardName">{player.name}</div>
                  <div className="cardName">{player.score}</div>
                </div>)}
                <button onClick={handleRetry}>Retry</button>
          </div>
        : <div className="Signup">
            <h1>Submit Your Score</h1>
            <h2>Your Score is {playerScore}</h2>

            <form>
              <input type="text" value={firstName} onChange={(e)=> setFirstName(e.target.value)} placeholder="Enter First Name"/>
              <input type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)} placeholder="Enter Last Name"/>
              <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter Email Address"/>
              <p className="error">{errorMsg}</p>
              <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>;
  }
  
  export default Signup;
  