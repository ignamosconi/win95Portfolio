import UseContext from '../Context'
import { useContext, useState, useEffect, useRef } from "react";
import Draggable from 'react-draggable'
import flappyBirdIcon from '../assets/flappy_bird_icon.png'

function FlappyBird() {
  const {
    themeDragBar,
    isTouchDevice,
    StyleHide,
    deleteTap,
    handleSetFocusItemTrue,
    inlineStyle,
    FlappyBirdExpand,
  } = useContext(UseContext);

  const [focused, setFocused] = useState(false);
  const touchStartTime = useRef(null)

  useEffect(() => {
    if (!FlappyBirdExpand.focusItem) {
      setFocused(false);
    }
  }, [FlappyBirdExpand.focusItem]);

  return (
    <Draggable
      handle=".folder_dragbar"
      defaultPosition={{ x: 120, y: 120 }}
    >
      <div
        className="folder_folder-open-project"
        onClick={() => handleSetFocusItemTrue('FlappyBird')}
        style={{
          ...inlineStyle('FlappyBird'), 
          width: window.innerWidth <= 450 ? '95%' : '525px', 
          height: window.innerWidth <= 450 ? '400px' : '512px'
        }}
      >
        <div
          className="folder_dragbar"
          style={{ background: FlappyBirdExpand.focusItem ? themeDragBar : '#808080' }}
        >
          <div className="folder_barname">
            <img src={flappyBirdIcon} alt="FlappyBird" />
            <span>Flappy Bird by Igna :) - ↑ to flap</span>
          </div>
          <div className="folder_barbtn">
            <div>
              <p
                className='x'
                onClick={!isTouchDevice ? () => deleteTap('FlappyBird') : undefined}
                onTouchEnd={() => deleteTap('FlappyBird')}
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
                  handleSetFocusItemTrue('FlappyBird');
                  setFocused(true);
                }
              }}
            />
          )}
          <iframe
            src="https://www.lexaloffle.com/bbs/widget.php?pid=flappico_bird"
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

export default FlappyBird