function InfoWrapper({time,score,hs,gs}){
    return (
        <div className="info">
            <div className="socre">Score: {score}</div>
            <div className="time">Time: {time}</div>
            <div className="status">Status: {gs.toUpperCase()} </div>
            <div className="high-socre">High Score: {hs}</div>
          </div>
    )
}
export default InfoWrapper;