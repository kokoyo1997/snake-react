import { isSnake, isFood } from "../tools";

function Square({snake,food,idx}){
    let squareType="square";
    if(isSnake(idx,snake)) squareType+=" snake";
    else if(isFood(idx,food)) squareType+=" food";
    return (
        <div className={squareType}></div>
    )
}
export default Square;