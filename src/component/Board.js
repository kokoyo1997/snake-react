import Square from "./Square";
function Board({snake,food}){
    return (
        <div className="board">
            {new Array(400).fill(null).map((ele,idx)=>(
                <Square 
                    key={idx}
                    snake={snake}
                    food={food}
                    idx={idx}
                />
            ))}
        </div>
    )
}
export default Board;