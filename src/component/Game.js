import Board from "./Board";
import InfoWrapper from "./InfoWrapper";
import Control from "./Control";
import { useEffect, useState } from "react";
import { eatFood, eatSelf, getCurTime, getHighest, updateHighest } from "../tools";
import { DIRECTIONS, DIRECTION_TICKS, GAMESTATE, KEY_CODES_MAPPER } from "../constants";
import { getRandomCoordinate, getRandomFood, getSnakeHead, hitBorder } from "../tools";

function Game(){
    const [time,setTime]=useState(getCurTime());
    const [highScore,setHighScore]=useState(getHighest());

    const [snake,setSnake]=useState([getRandomCoordinate()]);
    const [food,setFood]=useState(getRandomFood(snake));
    const [score,setScore]=useState(0);
    const [direction,setDirection]=useState(DIRECTIONS.UP);
    const [gameState,setGameState]=useState(GAMESTATE.READY);


    const restart=()=>{
        setSnake([getRandomCoordinate()]);
        setFood(getRandomFood(snake));
        setScore(0);
        setDirection(DIRECTIONS.UP);
    }

    //控制方向 
    const handleControl=({target})=>{
        let {name}=target;
        setDirection(name);
    }

    //控制开始/暂停/重开 
    const handleProcess=({target})=>{
        let {name}=target;
        switch(name){
            case "start":
                if(gameState!==GAMESTATE.OVER)
                    setGameState(GAMESTATE.RUN);
                break;
            case "pause": 
                if(gameState!==GAMESTATE.OVER)
                    setGameState(GAMESTATE.PAUSE);
                break;
            case "restart": setGameState(GAMESTATE.READY);restart();break;
            default: setGameState(GAMESTATE.READY);break;
        }
    }
    // 键盘控制方向
    const handleKeyBoardControl=({keyCode})=>{
        setDirection(KEY_CODES_MAPPER[keyCode]);
    
    }
    useEffect(()=>{
        window.addEventListener("keyup",handleKeyBoardControl,false);

        return ()=>{
            window.removeEventListener("keyup",handleKeyBoardControl,false);
        }
    },[]);

    //蛇定时前进
    useEffect(()=>{
        let timer=null;
        if(gameState===GAMESTATE.RUN){
            timer=setInterval(()=>{

                let cur=getSnakeHead(snake);
                let new_head=DIRECTION_TICKS[direction](cur.x,cur.y);
                let new_snake=[...snake];
                new_snake.unshift(new_head);
                
                if(hitBorder(new_snake)){
                    setGameState(GAMESTATE.OVER);
                    updateHighest(score,highScore);
                    setHighScore(getHighest());
                    clearInterval(timer);
                    return;
                }else{
                    let eatSelfIdx=eatSelf(new_snake);
                    if(eatSelfIdx!==-1){ //吃到寄几，截掉，扣分
                        setScore(prev=>Math.max(0,prev-2*(new_snake.length-eatSelfIdx)));
                        new_snake=new_snake.slice(0,eatSelfIdx);
                        
                    }else{
                        if(eatFood(new_snake,food)) { //吃到食物，加分，重新生成食物
                            setFood(getRandomFood(new_snake));
                            setScore(prev=>prev+new_snake.length);
                        }else{
                            new_snake.pop();
                        }
                    }
                } 
                setSnake(new_snake);
                
            },200);
        }
        
        return ()=>{
            clearInterval(timer);
        }
    });

    //更新当前时间
    useEffect(()=>{
        let timer=setInterval(()=>{
            let now=getCurTime();
            setTime(now);
            
        },1000);
        return ()=>{
            clearInterval(timer);
        }
    });
    return (
        <div className="box">
            <main>
                <h1>Snake Game in React</h1>
                <Board 
                    snake={snake}
                    food={food}
                />
                <div className="side">
                    <InfoWrapper 
                        time={time}
                        score={score}
                        hs={highScore}
                        gs={gameState}
                    />
                    <Control 
                        handleControl={handleControl}
                        handleProcess={handleProcess}
                    />
                </div>
            </main>
        </div>
    );
}

export default Game;