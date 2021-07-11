import { DIRECTIONS } from "../constants";

function Control({handleControl,handleProcess}){
    return (
        <div className="control">
            <div className="btns">
              <button className="pause" name="pause" onClick={handleProcess}><span className="iconfont icon-ic_suspend"></span></button>
              <button className="restart" name="restart" onClick={handleProcess}><span className="iconfont icon-ic_refresh"></span></button>
              <button className="start" name="start" onClick={handleProcess}><span className="iconfont icon-ic_play"></span></button>
            </div>
            <div className="operate">
              <button className="up" name={DIRECTIONS.UP} onClick={handleControl}><span className="iconfont icon-ic_arrow_up"></span></button>
              <button className="down" name={DIRECTIONS.BOTTOM} onClick={handleControl}><span className="iconfont icon-ic_arrow_down"></span></button>
              <button className="left" name={DIRECTIONS.LEFT} onClick={handleControl}><span className="iconfont icon-ic_arrow_left"></span></button>
              <button className="right" name={DIRECTIONS.RIGHT} onClick={handleControl}><span className="iconfont icon-ic_arrow_right"></span></button>
            </div>
        </div>
    );
}
export default Control;