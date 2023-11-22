const Dice = (props) => {

    const diceStyle = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div className="dice" style={diceStyle}>
            <p>{props.number}</p>
        </div>
    )
}

export default Dice;