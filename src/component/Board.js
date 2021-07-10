import Square from "./Square";
function Board(){
    return (
        <div className="board">
            {new Array(400).fill(null).map((ele,idx)=>(
                <Square key={idx}/>
            ))}
        </div>
    )
}
export default Board;