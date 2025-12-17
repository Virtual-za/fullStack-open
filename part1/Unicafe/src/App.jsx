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

const StatisticLine = ({text,value}) => {
  return (
    <div> {text} {value}</div>
   
  )
} 


  const Statistics= (props) => {

    const all = props.good + props.bad + props.neutral
    const average = (props.good - props.bad) / (all) 
    const positive = (props.good / all) * 100 + "%"
    if (props.good || props.bad || props.neutral )
      return (
   
        <div>
          <StatisticLine text={"Good"} value={props.good}/>
          <StatisticLine text={"Neutral"} value={props.neutral}/>
          <StatisticLine text={"Bad"} value={props.bad}/>
          <StatisticLine text={"Average"} value={average}/>
          <StatisticLine text={"Positive"} value={positive}/>
        </div>


      )
    return (
        <p>No feedback given</p>
      );
    
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



  
  return (
    <div>
      <Header text="give feedback" size="2em"/>

      <Button text="good" onClick={handleGoodClick}></Button>
      <Button text="neutral" onClick={handleNeutralClick}></Button>
      <Button text="bad" onClick={handleBadClick}></Button>
     <Header text="statistics" size="2em"/>
     <Statistics fontSize={"1em"} good={good} bad={bad} neutral={neutral}/>
    


    </div>
  )
}

export default App