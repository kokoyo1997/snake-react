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

    const [count,setCount]=useState(0);//����ָʾ�ߵĸ���
    
    //ʵʱ��Ϸ״̬
    const statusRef=useRef(GAMESTATE.READY);
    useEffect(()=>{
        statusRef.current=gameState;
    },[gameState]);

    //�ؿ�
    const restart=()=>{
        setSnake([getRandomCoordinate()]);
        setFood(getRandomFood(snake));
        setScore(0);
        setDirection(DIRECTIONS.UP);
    }

    //���Ʒ��� 
    const handleControl=({target})=>{
        if(gameState!==GAMESTATE.RUN) return;
        let {name}=target;
        setDirection(name);
    }

    //���ƿ�ʼ/��ͣ/�ؿ� 
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
    // ���̿��Ʒ������ͣ
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

    //��ֹ�ֶ������ť����space���������ð�ť
    useEffect(()=>{
        window.addEventListener("click",(e)=>{
            e.target.blur();
        });
    });

    // ���ƶ���ʱ��
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

    
    // ���ƶ������¸���״̬
    // ����ط����ǲ��ã�������lie������ֻ����useReducer��(ɾ������)
    // ��useReducer����һ�飬�о�������Ŀǰ�����أ��ο��ı��˵Ĵ��룬��ʱ���������ؽ�����
    // ����useReducer���������ӵ�״̬��ȷʵ����
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
            if(eatSelfIdx!==-1){ //�Ե��ļ����ص����۷�
                setScore(prev=>Math.max(0,prev-2*(new_snake.length-eatSelfIdx)));
                new_snake=new_snake.slice(0,eatSelfIdx);
                
            }else{
                if(eatFood(new_snake,food)) { //�Ե�ʳ��ӷ֣���������ʳ��
                    setFood(getRandomFood(new_snake));
                    setScore(prev=>prev+new_snake.length);
                }else{
                    new_snake.pop();
                }
            }
        } 
        setSnake(new_snake);
    },[count]);


    //���µ�ǰʱ��
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