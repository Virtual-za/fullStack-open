import { useState } from 'react'

const handleClick = () => {
  return (
    console.log('Clicked')
  )
}
const Header = ({size,text}) => {
  return (
    <h1 style={{fontSize: size}}>{text}</h1>
  )
}
const Button =(props)=> {
  return (
    <button onClick={props.onClick}   style={{width: '70px', height: '20px',fontSize:'0.5em'}}>{props.text}</button>
  )
}

 
  
 


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)

  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  //eventHandlers
  const handleGoodClick =()=> {
    console.log("good clicked","prev good", good)
    setGood(good+1) 
  }
    const handleNeutralClick =()=> {
    console.log("Neutral clicked","prev neutral", neutral)
    setNeutral(neutral+1) 
  }
  const handleBadClick =()=> {
    console.log("Bad clicked","prev bad", bad)
    setBad(bad+1) 
  }

  const StatDisplay = ({text,stat,fontSize}) => {

    const all = good + bad + neutral
    return (
      <p style={{fontSize:"1em"}}>Good {good} <br></br> Neutral {neutral}
       <br></br>Bad {bad} <br></br>All {all}<br></br>
       Average {(good - bad) / (all) } <br></br>
       Positive {(good / all) * 100} %
       
       </p>
    )
  }

  return (
    <div>
      <Header text="give feedback" size="2em"/>

      <Button text="good" onClick={handleGoodClick}></Button>
      <Button text="neutral" onClick={handleNeutralClick}></Button>
      <Button text="bad" onClick={handleBadClick}></Button>
     <Header text="statistics" size="2em"/>
     <StatDisplay />
    


    </div>
  )
}

export default App