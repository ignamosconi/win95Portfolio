import { useContext, useState, useEffect, useRef } from "react";
import Draggable from 'react-draggable';
import UseContext from '../Context';
import { DICT_ENG } from '../wordleDicts';
import '../css/Wordle.css';
import wordle_icon from '../assets/wordle_icon.png'

function getRandomWord(dict) {
  return dict[Math.floor(Math.random() * dict.length)];
}

function normalizeChar(c) {
  return c.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function normalizeWord(w) {
  return w.split('').map(normalizeChar).join('');
}

function priVerifClavadas(palabraUsuario, palabraAdivinar) {
  const userArr = palabraUsuario.split('');
  const targetArr = palabraAdivinar.split('');
  const result = userArr.map((c, i) =>
    normalizeChar(c) === normalizeChar(targetArr[i]) ? `[${c}]` : c
  );
  return result.join('');
}

function segVerifExistentes(palabraUsuario, palabraAdivinar) {
  const tokens = [];
  let i = 0;
  while (i < palabraUsuario.length) {
    if (palabraUsuario[i] === '[') {
      tokens.push({ char: palabraUsuario[i + 1], type: 'clavada' });
      i += 3;
    } else {
      tokens.push({ char: palabraUsuario[i], type: 'libre' });
      i++;
    }
  }
  const disponibles = palabraAdivinar.split('').map(normalizeChar);
  tokens.forEach(t => {
    if (t.type === 'clavada') {
      const idx = disponibles.indexOf(normalizeChar(t.char));
      if (idx !== -1) disponibles.splice(idx, 1);
    }
  });
  const resultTokens = tokens.map(t => {
    if (t.type === 'clavada') return { char: t.char, result: 'correct' };
    const idx = disponibles.indexOf(normalizeChar(t.char));
    if (idx !== -1) {
      disponibles.splice(idx, 1);
      return { char: t.char, result: 'present' };
    }
    return { char: t.char, result: 'absent' };
  });
  return resultTokens;
}

function isWordGuessed(tokens) {
  return tokens.every(t => t.result === 'correct');
}

function ConsoleLine({ tokens, index }) {
  return (
    <div className="wordle_line">
      <span className="wordle_prompt">&gt; </span>
      <span className="wordle_attempt_num">[{index + 1}] </span>
      {tokens.map((t, i) => (
        <span key={i} className={`wordle_char wordle_char_${t.result}`}>
          {t.result === 'correct' ? `[${t.char}]` : t.result === 'present' ? `(${t.char})` : `-${t.char}-`}
        </span>
      ))}
    </div>
  );
}

function Wordle() {
  const {
    themeDragBar,
    isTouchDevice,
    deleteTap,
    handleSetFocusItemTrue,
    inlineStyle,
    WordleExpand,
  } = useContext(UseContext);

  const [phase, setPhase] = useState('start'); // 'start' | 'playing' | 'won' | 'lost'
  const [targetWord, setTargetWord] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [lines, setLines] = useState([]);
  const inputRef = useRef(null);
  const consoleRef = useRef(null);
  const MAX_ATTEMPTS = 6;

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (phase === 'playing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase]);

  function startGame() {
    const word = getRandomWord(DICT_ENG);
    setTargetWord(word);
    setAttempts([]);
    setInputVal('');
    setErrorMsg('');
    setLines([
      { type: 'system', text: '> Word selected. You have 6 attempts!' },
      { type: 'system', text: '> Enter a 5-letter word:' },
    ]);
    setPhase('playing');
  }

  function handleSubmit() {
    if (phase !== 'playing') return;
    const word = inputVal.trim().toLowerCase();
    if (word.length !== 5) {
      setErrorMsg('ERROR - Word must be 5 letters.');
      setInputVal('');
      return;
    }
    const normalizedInput = normalizeWord(word);
    const normalizedDict = DICT_ENG.map(normalizeWord);
    if (!normalizedDict.includes(normalizedInput)) {
      setErrorMsg('ERROR - Word not found in dictionary.');
      setInputVal('');
      return;
    }
    setErrorMsg('');
    const step1 = priVerifClavadas(word, targetWord);
    const tokens = segVerifExistentes(step1, targetWord);
    const newAttempts = [...attempts, tokens];
    setAttempts(newAttempts);
    setInputVal('');

    if (isWordGuessed(tokens)) {
      setPhase('won');
      setLines(prev => [...prev,
        { type: 'result', tokens, index: newAttempts.length - 1 },
        { type: 'system', text: `> Word guessed! It took you ${newAttempts.length} attempt${newAttempts.length > 1 ? 's' : ''}.` },
      ]);
      return;
    }

    const remaining = MAX_ATTEMPTS - newAttempts.length;
    const newLines = [...lines, { type: 'result', tokens, index: newAttempts.length - 1 }];

    if (newAttempts.length >= MAX_ATTEMPTS) {
      setPhase('lost');
      newLines.push({ type: 'system', text: `> Game over. The word was: ${targetWord.toUpperCase()}` });
    } else {
      newLines.push({ type: 'system', text: `> ${remaining} attempt${remaining > 1 ? 's' : ''} left. Enter another word:` });
    }
    setLines(newLines);
  }

  function handleRestart() {
    setPhase('start');
    setAttempts([]);
    setLines([]);
    setInputVal('');
    setErrorMsg('');
    setTargetWord('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubmit();
  }

  return (
    <Draggable
      handle=".folder_dragbar"
      defaultPosition={{ x: 120, y: 100 }}
    >
      <div
        className="folder_folder-open-project"
        onClick={() => handleSetFocusItemTrue('Wordle')}
        style={inlineStyle('Wordle')}
      >
        <div
          className="folder_dragbar"
          style={{ background: WordleExpand?.focusItem ? themeDragBar : '#808080' }}
        >
          <div className="folder_barname">
            <img src={wordle_icon} alt="Wordle" />
            <span>Wordle by Igna :)</span>
          </div>
          <div className="folder_barbtn">
            <div>
              <p
                className="x"
                onClick={!isTouchDevice ? () => deleteTap('Wordle') : undefined}
              >
                ×
              </p>
            </div>
          </div>
        </div>

        {/* Console body — fixed height so it's always black */}
        <div className="wordle_console" ref={consoleRef} onClick={() => inputRef.current?.focus()}>

          <div className="wordle_header_lines">
            <p className="wordle_title_line">&gt; W O R D L E</p>
            <p className="wordle_sys_line">&gt; ─────────────────────────</p>
          </div>

          {/* Start screen */}
          {phase === 'start' && (
            <div className="wordle_lang_select">
              <p className="wordle_sys_line">&gt; Guess the 5-letter word in 6 tries.</p>
              <div className="wordle_lang_btns">
                <button className="wordle_lang_btn" onClick={startGame}>
                  &gt; PLAY
                </button>
              </div>
            </div>
          )}

          {/* Console output */}
          {lines.map((line, i) => (
            <div key={i}>
              {line.type === 'system' && <p className="wordle_sys_line">{line.text}</p>}
              {line.type === 'result' && <ConsoleLine tokens={line.tokens} index={line.index} />}
            </div>
          ))}

          {errorMsg && <p className="wordle_error_line">&gt; {errorMsg}</p>}

          {phase === 'playing' && (
            <div className="wordle_input_row">
              <span className="wordle_prompt">&gt; </span>
              <input
                ref={inputRef}
                className="wordle_input"
                value={inputVal}
                onChange={e => setInputVal(e.target.value.toLowerCase())}
                onKeyDown={handleKeyDown}
                maxLength={5}
                autoComplete="off"
                spellCheck={false}
              />
              <span className="wordle_cursor">█</span>
            </div>
          )}

          {(phase === 'won' || phase === 'lost') && (
            <div className="wordle_restart_row">
              <button className="wordle_restart_btn" onClick={handleRestart}>
                &gt; Play again
              </button>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="wordle_legend">
          <span className="wordle_char_correct">[x]</span>&nbsp;correct
          &nbsp;&nbsp;
          <span className="wordle_char_present">(x)</span>&nbsp;present
          &nbsp;&nbsp;
          <span className="wordle_char_absent">-x-</span>&nbsp;absent
        </div>
      </div>
    </Draggable>
  );
}

export default Wordle;
