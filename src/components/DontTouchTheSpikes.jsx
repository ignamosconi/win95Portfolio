import UseContext from '../Context'
import { useContext } from "react";
import Draggable from 'react-draggable'

function DontTouchTheSpikes() {

  const {
    themeDragBar,
    isTouchDevice,
    StyleHide,
    deleteTap,
    handleSetFocusItemTrue,
    inlineStyle,
  } = useContext(UseContext);

  return (
    <Draggable
      handle=".folder_dragbar"
      defaultPosition={{ x: 150, y: 150 }}
    >
      <div
        className="folder_folder-open-project"
        onClick={() => handleSetFocusItemTrue('DontTouchTheSpikes')}
        style={inlineStyle('DontTouchTheSpikes')}
      >

        <div
          className="folder_dragbar"
          style={{ background: themeDragBar }}
        >

          <div className="folder_barname">
            <span>Don't touch the spikes by Igna</span>
          </div>

          <div className="folder_barbtn">

            <div
              onClick={!isTouchDevice ? () => {
                StyleHide('DontTouchTheSpikes')
              } : undefined}
            >
              <p className='dash'></p>
            </div>

            <div>
              <p
                className='x'
                onClick={!isTouchDevice ? () => {
                  deleteTap('DontTouchTheSpikes')
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

export default DontTouchTheSpikes