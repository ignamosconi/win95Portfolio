import UseContext from '../Context'
import { useContext } from "react";
import Draggable from 'react-draggable'
import dtts_icon from '../assets/dtts_icon.png'

//Don't Touch the Spikes - PICO8 game
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

  return (
    <Draggable
      handle=".folder_dragbar"
      defaultPosition={{ x: 150, y: 150 }}
    >
      <div
        className="folder_folder-open-project"
        onClick={() => handleSetFocusItemTrue('DTtS')}
        style={inlineStyle('DTtS')}
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
                onClick={!isTouchDevice ? () => {
                  deleteTap('DTtS')
                } : undefined}
              >
                ×
              </p>
            </div>

          </div>
        </div>

        <div
          className="openproject_content"
          style={{ height: '513px' }}
        >
          <iframe
            src="https://www.lexaloffle.com/bbs/widget.php?pid=dtts_pico8"
            allowFullScreen
            width="100%"
            height="100%"
            style={{
              border: 'none',
              overflow: 'hidden'
            }}
          />
        </div>

      </div>
    </Draggable>
  )
}

export default DTtS