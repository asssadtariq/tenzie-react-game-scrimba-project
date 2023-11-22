import logo from './logo.svg';
import './App.css';
import Dice from './Components/Dice';
import { useState } from 'react';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {
  const [randomNumbers, setRandomNumbers] = useState([{}]);
  const [tenzie, setTenzie] = useState(false);

  // funtion to get the random numbers
  function getRandomNumbers() {
    let numbers = []

    for (let i = 0; i < 10; i++) {
      let num = Math.floor(Math.random() * 100) % 6;
      let myobj = { "number": num, "isHeld": false, "id": nanoid() }
      numbers.push(
        myobj
      )
    }

    setRandomNumbers(numbers)
  }

  // roll dice and change the not hold numbers
  function handleRoll(event) {
    if (event.target.value === "false") {
      let tempNumbers = []
      for (let i = 0; i < 10; i++) {

        let num = randomNumbers[i]['number'];
        if (!randomNumbers[i].isHeld) {
          num = Math.floor(Math.random() * 100) % 6;
        }

        const myobj = { "number": num, "isHeld": randomNumbers[i]['isHeld'], "id": randomNumbers[i]['id'] }

        tempNumbers.push(myobj);
      }

      setRandomNumbers(tempNumbers);
    } else {
      getRandomNumbers()
    }
  }

  function handleDiceHold(id) {
    setRandomNumbers(
      oldValues => oldValues.map(val => {
        return val.id === id ? { ...val, isHeld: !val.isHeld } : val
      })
    )

    // let tempArr = []

    // randomNumbers?.map((numb) => {
    //   if (numb.id === id) {
    //     numb.isHeld = !numb.isHeld
    //   }

    //   tempArr.push(numb)
    // })

    // setRandomNumbers(tempArr)
  }

  useEffect(() => {
    getRandomNumbers()
  }, [])

  useEffect(() => {
    let flag = true
    for (let i = 1; i < randomNumbers.length; i++) {
      if (randomNumbers[i - 1]['number'] != randomNumbers[i]['number'] || !randomNumbers[i - 1]['isHeld'] || !randomNumbers[i]['isHeld']) {
        flag = false
        break
      }
    }

    if (randomNumbers.length > 0) {
      setTenzie(flag);
    }

    if (flag) {
      alert("You Won")
    }

  }, [randomNumbers])

  return (
    <div className="App">
      {
        tenzie ?
          <Confetti className='confetti' />
          :
          <div className="container">
            {
              randomNumbers?.map((numb) => {
                return (
                  <button className='dice--btn' onClick={() => handleDiceHold(numb.id)}>

                    <Dice key={numb.id} isHeld={numb.isHeld} number={numb.number} />
                  </button>
                )
              })
            }

          </div>
      }
      <button className='roll-dice' onClick={(event) => handleRoll(event)} value={tenzie}>
        {tenzie ? "New Game" : "Roll"}
      </button>
    </div>
  );
}

export default App;
