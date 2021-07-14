function InfoWrapper({time,score,hs,gs,level}){
    let level_=level===100?"Hell":level===150?"Hard":level===180?"Normal":"Easy";
    return (
        <div className="info">
            <div className="socre">Score: {score}</div>
            <div className="level">Level: {level_}</div>
            <div className="time">Time: {time}</div>
            <div className="status">Status: {gs.toUpperCase()} </div>
            <div className="high-socre">High Score: {hs}</div>
          </div>
    )
}
export default InfoWrapper;