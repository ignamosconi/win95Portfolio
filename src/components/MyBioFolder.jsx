import UseContext from '../Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import About from '../assets/ipng.png'
import bioPC from '../assets/bio_pc.png'
import tech from '../assets/tech.png'
import hobby from '../assets/hobby.png'
import '../css/MyBioFolder.css'


function MyBioFolder() {

  const [generalTap, setGenerapTap] = useState(true)
  const [technologyTap, setTechnologyTap] = useState(false)
  const [hobbTap, setHobbTap] = useState(false)

  const { 
    themeDragBar,
    MybioExpand, setMybioExpand,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
   } = useContext(UseContext);

   const technologyText = ( // don't have to use DangerousHTML
    <>
      I mainly use <span>TypeScript</span>, <span>Python</span>, <span>Java</span>, <span>JavaScript</span> and <span>Lua</span> to
      build full-stack apps with <span>Angular</span>, <span>Next.js</span>, <span>Vite</span>, <span>NestJS</span>, <span>Node.js</span>, <span>PostgreSQL</span> and <span>MongoDB</span>.

      I work as an educator and mentor in programming, while also developing creative projects like <span>PICO-8</span> video games, board-games and competitive programming challenges.

      I’m passionate about designing games and creating better user experiences through clean, intuitive and engaging apps.
    </>
  );

  const bioText = ( // don't have to use DangerousHTML
    <>
        <strong>Objective:</strong>
        <br />
        <span style={{ display: "block" }}>Learning while</span>
        <span style={{ display: "block" }}>having fun :)</span>
        <br />
        <strong>Information:</strong>
        <br />
        <span style={{ display: "block" }}>Ignacio M. Mosconi.</span>
        <span>Full-stack developer.</span>
        <br />
        <span>ignamosconi@gmail.com</span>
        <br />
        <br />
        <strong>Location: </strong>
        <br />
        <span>Villa María, Córdoba.</span>
        <br />
        <span>Open to work.</span>
        <br />
        <span>On Site / Remote.</span>
    </>
  );

  const hobbyText = ( // don't have to use DangerousHTML
    <>
        I can't stop learning. In my free time I learn new 
        songs in my guitar, new chess oppenings, new 
        skateboarding tricks, new tactics for Counter-Strike,
        new facts about astronomy...
        <br></br>
        <br></br>
        I love to run and hike (like, a lot), play fútbol, connect with
        people and work with my hands: I will take any chance I 
        get to use a lathe, do carpentry, tinker with electronics 
        or even build PCs (check the pictures on the C drive haha). 
        <br></br>
        <br></br>
        When a project picks my interest, I put 110% of my energy
        onto it, and can't stop thinking about it utill it's done.
    </>
  );

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setMybioExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }


  function handleBiotap(name) {
    setGenerapTap(name === 'general');
    setTechnologyTap(name === 'technology');
    setHobbTap(name === 'hobby');
  }

  const activeBtnStyle = {
    bottom: '2px',
    outline: '1px dotted black',
    outlineOffset: '-5px',
    borderBottomColor: '#c5c4c4',
    zIndex: '3'
  };


  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar'}
        grid={[1, 1]}
        scale={1}
        disabled={MybioExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 35 : 70,
          y: window.innerWidth <= 500 ? 35 : 40,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('About')}
      >
        <motion.div className='bio_folder' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('About');
            }}
            style={ MybioExpand.expand ? inlineStyleExpand('About') : inlineStyle('About')}>
          <div className="folder_dragbar"
             style={{ background: MybioExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="bio_barname">
              <img src={About} alt="About" />
              <span>About</span>
            </div>
            <div className="bio_barbtn">
              <div onClick={ !isTouchDevice ? (e) => {
                e.stopPropagation()
                setMybioExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('About')
              } : undefined
              }   
                onTouchEnd={(e) => {
                e.stopPropagation()
                setMybioExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('About')
              }}
              onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash'></p>
              </div>

                <div>
                <p className='x'
                  onClick={!isTouchDevice ? () => {
                    deleteTap('About')
                    handleBiotap('general')
                  }: undefined}
                  onTouchEnd={() => {
                    deleteTap('About')
                    handleBiotap('general')
                  }}
                >×
                </p>
              </div>
            </div>
          </div>
          <div className="file_tap_container-bio">
          <p  onClick={() => handleBiotap('general')}
              style={generalTap ? activeBtnStyle : {}}
          >General
          </p>
          <p onClick={() => handleBiotap('technology')}
              style={technologyTap ? activeBtnStyle : {}}
          >Technologies
          </p>
          <p onClick={() => handleBiotap('hobby')}
                  style={hobbTap ? activeBtnStyle : {}}
          >Me
          </p>
          </div>
          <div className="folder_content">
            <div className="folder_content-bio"
              style={{ display: generalTap ? 'grid' : 'block' }}
            >
            <img
              alt="bioPC"
              className={generalTap ? 'bio_img' : 'bio_img_other'}
              src={generalTap? bioPC : (technologyTap ? tech : hobby)}
            />
            <div
              className="biotext_container">

              <p className={generalTap? 'bio_text_1' : 'bio_text_1_other'}>
                {generalTap? bioText : technologyTap? technologyText : hobbyText}
              </p>   
            </div>
              
            </div>
            <div className="bio_btn_container">
              <div className="bio_btn_ok"
              onClick={!isTouchDevice ? () => {
                deleteTap('About')
                handleBiotap('general')
              } : undefined}
              onTouchEnd={() => {
                deleteTap('About')
                handleBiotap('general')
              }}
              >
                <span>
                  OK
                </span>
              </div>
              <div className="bio_btn_cancel"
              onClick={!isTouchDevice ? () => {
                deleteTap('About')
                handleBiotap('general')
              } : undefined}
              onTouchEnd={() => {
                deleteTap('About')
                handleBiotap('general')
              }}
              ><span>Cancel</span></div>
            </div>
          </div>
        </motion.div>
      </Draggable>
    </>
  )
}          

export default MyBioFolder
