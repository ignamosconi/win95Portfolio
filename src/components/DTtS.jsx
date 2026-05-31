import UseContext from '../Context'
import { useContext, useState, useEffect, useRef } from "react";
import Draggable from 'react-draggable'
import dtts_icon from '../assets/dtts_icon.png'

function DTtS() {
  const {
    themeDragBar,
    isTouchDevice,
    StyleHide,
    deleteTap,
    handleSetFocusItemTrue,
    inlineStyle,
    DTtSExpand,
  } = useContext(UseContext);

  const [focused, setFocused] = useState(false);
  const touchStartTime = useRef(null);

  useEffect(() => {
    if (!DTtSExpand.focusItem) {
      setFocused(false);
    }
  }, [DTtSExpand.focusItem]);

  return (
    <Draggable
      handle=".folder_dragbar"
      defaultPosition={{ x: 150, y: 150 }}
    >
      <div
        className="folder_folder-open-project"
        onClick={() => handleSetFocusItemTrue('DTtS')}
        style={{
          ...inlineStyle('DTtS'), 
          width: window.innerWidth <= 450 ? '95%' : '525px', 
          height: window.innerWidth <= 450 ? '400px' : '512px'
        }}
      >
        <div
          className="folder_dragbar"
          style={{ background: DTtSExpand.focusItem ? themeDragBar : '#808080' }}
        >
          <div className="folder_barname">
            <img src={dtts_icon} alt="DTtS" />
            <span>Don't touch the spikes by Igna :) - ↑ to flap</span>
          </div>
          <div className="folder_barbtn">
            <div>
              <p
                className='x'
                onClick={!isTouchDevice ? () => deleteTap('DTtS') : undefined}
                onTouchEnd={() => deleteTap('DTtS')}
              >×</p>
            </div>
          </div>
        </div>
        <div className="game_content" style={{position: 'relative'}}>
          {isTouchDevice && !focused && (
            <div
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%', height: '100%',
                zIndex: 1,
              }}
              onTouchStart={() => {
                touchStartTime.current = Date.now();
              }}
              onTouchEnd={() => {
                if (Date.now() - touchStartTime.current < 500) {
                  handleSetFocusItemTrue('DTtS');
                  setFocused(true);
                }
              }}
            />
          )}
          <iframe
            src="https://www.lexaloffle.com/bbs/widget.php?pid=dtts_pico8"
            allowFullScreen
            width="100%"
            height="100%"
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </Draggable>
  )
}

export default DTtS