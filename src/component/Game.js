import Board from "./Board";
import InfoWrapper from "./InfoWrapper";
import Control from "./Control";
import {useEffect, useRef, useState } from "react";
import { eatFood, eatSelf, getCurTime, getHighest, updateHighest } from "../tools";
import { DIRECTIONS, DIRECTION_TICKS, FREQ, GAMESTATE, KEY_CODES_MAPPER } from "../constants";
import { getRandomCoordinate, getRandomFood, getSnakeHead, hitBorder } from "../tools";

function Game(){
    const [time,setTime]=useState(getCurTime());

    const [snake,setSnake]=useState([getRandomCoordinate()]);
    const [food,setFood]=useState(getRandomFood(snake));
    const [score,setScore]=useState(0);
    const [direction,setDirection]=useState(DIRECTIONS.UP);
    const [gameState,setGameState]=useState(GAMESTATE.READY);

    const [count,setCount]=useState(0);//用来指示蛇的更新
    
    //实时游戏状态
    const statusRef=useRef(GAMESTATE.READY);
    useEffect(()=>{
        statusRef.current=gameState;
    },[gameState]);

    //重开
    const restart=()=>{
        setSnake([getRandomCoordinate()]);
        setFood(getRandomFood(snake));
        setScore(0);
        setDirection(DIRECTIONS.UP);
    }

    //控制方向 
    const handleControl=({target})=>{
        if(gameState!==GAMESTATE.RUN) return;
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
                if(gameState!==GAMESTATE.OVER&&gameState!==GAMESTATE.READY)
                    setGameState(GAMESTATE.PAUSE);
                break;
            case "restart": setGameState(GAMESTATE.READY);restart();break;
            default: setGameState(GAMESTATE.READY);break;
        }
    }
    // 键盘控制方向和暂停
    const handleKeyBoardControl=({keyCode})=>{
        let cur_gameState=statusRef.current;
        if(keyCode===32){
            if(cur_gameState===GAMESTATE.PAUSE||cur_gameState===GAMESTATE.READY) setGameState(GAMESTATE.RUN);
            else if(cur_gameState===GAMESTATE.RUN) setGameState(GAMESTATE.PAUSE);
            else if(cur_gameState===GAMESTATE.OVER) {
                setGameState(GAMESTATE.READY);
                restart();
            }
            
        }else if(cur_gameState===GAMESTATE.RUN&&KEY_CODES_MAPPER[keyCode]){
            setDirection(KEY_CODES_MAPPER[keyCode]);
        }
            
    }
    useEffect(()=>{
        window.addEventListener("keyup",handleKeyBoardControl,false);
        return ()=>{
            window.removeEventListener("keyup",handleKeyBoardControl,false);
        }
    },[]);

    //防止手动点击按钮后再space会继续点击该按钮
    useEffect(()=>{
        window.addEventListener("click",(e)=>{
            e.target.blur();
        });
    });

    // 蛇移动定时器
    useEffect(()=>{
        if(gameState===GAMESTATE.RUN){
            let timer=setInterval(()=>{
                setCount(c=>c+1);
            },FREQ);
            return ()=>{
                clearInterval(timer);
            }
        }
    },[gameState]);

    
    // 蛇移动，更新各类状态
    // 这个地方还是不好，依赖项lie，看来只能用useReducer了(删除该行)
    // 用useReducer改了一遍，感觉还不如目前这样呢，参考的别人的代码，定时器疯狂清除重建。。
    // 但是useReducer用来管理复杂的状态，确实更简单
    useEffect(()=>{
        let cur=getSnakeHead(snake);
        let new_head=DIRECTION_TICKS[direction](cur.x,cur.y);
        let new_snake=[...snake];
        new_snake.unshift(new_head);
        
        if(hitBorder(new_snake)){
            setGameState(GAMESTATE.OVER);
            updateHighest(score,getHighest());
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
    },[count]);


    //更新当前时间
    useEffect(()=>{
        let timer=setInterval(()=>{
            let now=getCurTime();
            setTime(now);
            
        },1000);
        return ()=>{
            clearInterval(timer);
        }
    },[]);
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
                        hs={getHighest()}
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