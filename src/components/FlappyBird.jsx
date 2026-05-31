import UseContext from '../Context'
import { useContext } from "react";
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

        <div
          className="game_content"
        >
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