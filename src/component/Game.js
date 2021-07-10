import Board from "./Board";
import InfoWrapper from "./InfoWrapper";
import Control from "./Control";
function Game(){
    return (
        <div className="box">
            <main>
                <h1>Snake Game in React</h1>
                <Board />
                <div className="side">
                    <InfoWrapper />
                    <Control />
                </div>
            </main>
        </div>
    );
}

export default Game;