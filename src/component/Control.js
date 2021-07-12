import { DIRECTIONS } from "../constants";

function Control({handleControl,handleProcess}){
    return (
        <div className="control">
            <div className="btns">
              <button className="pause iconfont icon-ic_suspend" name="pause" onClick={handleProcess}></button>
              <button className="restart iconfont icon-ic_refresh" name="restart" onClick={handleProcess}></button>
              <button className="start iconfont icon-ic_play" name="start" onClick={handleProcess}></button>
            </div>
            <div className="operate">
              <button className="up iconfont icon-ic_arrow_up" name={DIRECTIONS.UP} onClick={handleControl}></button>
              <button className="down iconfont icon-ic_arrow_down" name={DIRECTIONS.BOTTOM} onClick={handleControl}></button>
              <button className="left iconfont icon-ic_arrow_left" name={DIRECTIONS.LEFT} onClick={handleControl}></button>
              <button className="right iconfont icon-ic_arrow_right" name={DIRECTIONS.RIGHT} onClick={handleControl}></button>
            </div>
        </div>
    );
}
export default Control;