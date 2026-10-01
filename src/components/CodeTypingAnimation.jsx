import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Sparkles, RefreshCw, Check } from 'lucide-react';

const codeSnippets = [
  {
    fileName: 'Experience.ts',
    language: 'TypeScript',
    lines: [
      [
        { type: 'comment', text: '// Crafting digital products with soul' }
      ],
      [
        { type: 'keyword', text: 'import' },
        { type: 'plain', text: ' { ' },
        { type: 'variable', text: 'PixaStudio' },
        { type: 'plain', text: ' } ' },
        { type: 'keyword', text: 'from' },
        { type: 'plain', text: ' ' },
        { type: 'string', text: '"@pixa/core"' },
        { type: 'plain', text: ';' }
      ],
      [],
      [
        { type: 'keyword', text: 'const' },
        { type: 'plain', text: ' ' },
        { type: 'variable', text: 'studio' },
        { type: 'plain', text: ' = ' },
        { type: 'keyword', text: 'new' },
        { type: 'plain', text: ' ' },
        { type: 'function', text: 'PixaStudio' },
        { type: 'plain', text: '({' }
      ],
      [
        { type: 'plain', text: '  ' },
        { type: 'property', text: 'vision' },
        { type: 'plain', text: ': ' },
        { type: 'string', text: '"Build what should exist"' },
        { type: 'plain', text: ',' }
      ],
      [
        { type: 'plain', text: '  ' },
        { type: 'property', text: 'precision' },
        { type: 'plain', text: ': ' },
        { type: 'number', text: '1.0' },
        { type: 'plain', text: ',' }
      ],
      [
        { type: 'plain', text: '  ' },
        { type: 'property', text: 'stack' },
        { type: 'plain', text: ': [' },
        { type: 'string', text: '"React"' },
        { type: 'plain', text: ', ' },
        { type: 'string', text: '"Three.js"' },
        { type: 'plain', text: ', ' },
        { type: 'string', text: '"WebGL"' },
        { type: 'plain', text: ']' }
      ],
      [
        { type: 'plain', text: '});' }
      ],
      [],
      [
        { type: 'keyword', text: 'async' },
        { type: 'plain', text: ' ' },
        { type: 'keyword', text: 'function' },
        { type: 'plain', text: ' ' },
        { type: 'function', text: 'ignite' },
        { type: 'plain', text: '() {' }
      ],
      [
        { type: 'plain', text: '  ' },
        { type: 'keyword', text: 'const' },
        { type: 'plain', text: ' ' },
        { type: 'variable', text: 'build' },
        { type: 'plain', text: ' = ' },
        { type: 'keyword', text: 'await' },
        { type: 'plain', text: ' ' },
        { type: 'variable', text: 'studio' },
        { type: 'plain', text: '.' },
        { type: 'function', text: 'render' },
        { type: 'plain', text: '();' }
      ],
      [
        { type: 'plain', text: '  ' },
        { type: 'keyword', text: 'return' },
        { type: 'plain', text: ' ' },
        { type: 'variable', text: 'build' },
        { type: 'plain', text: '.' },
        { type: 'function', text: 'unfold' },
        { type: 'plain', text: '({ ' },
        { type: 'property', text: 'impact' },
        { type: 'plain', text: ': ' },
        { type: 'string', text: '"Unforgettable"' },
        { type: 'plain', text: ' });' }
      ],
      [
        { type: 'plain', text: '}' }
      ],
      [],
      [
        { type: 'comment', text: '// Status: Active & Compiling' }
      ],
      [
        { type: 'function', text: 'ignite' },
        { type: 'plain', text: '();' }
      ]
    ]
  },
  {
    fileName: 'Shader.glsl',
    language: 'GLSL',
    lines: [
      [
        { type: 'comment', text: '// Fluid dynamic generative mesh' }
      ],
      [
        { type: 'keyword', text: 'uniform' },
        { type: 'plain', text: ' ' },
        { type: 'variable', text: 'float' },
        { type: 'plain', text: ' ' },
        { type: 'property', text: 'u_time' },
        { type: 'plain', text: ';' }
      ],
      [
        { type: 'keyword', text: 'uniform' },
        { type: 'plain', text: ' ' },
        { type: 'variable', text: 'vec2' },
        { type: 'plain', text: '  ' },
        { type: 'property', text: 'u_resolution' },
        { type: 'plain', text: ';' }
      ],
      [],
      [
        { type: 'keyword', text: 'void' },
        { type: 'plain', text: ' ' },
        { type: 'function', text: 'main' },
        { type: 'plain', text: '() {' }
      ],
      [
        { type: 'plain', text: '  ' },
        { type: 'variable', text: 'vec2' },
        { type: 'plain', text: ' ' },
        { type: 'variable', text: 'st' },
        { type: 'plain', text: ' = ' },
        { type: 'variable', text: 'gl_FragCoord' },
        { type: 'plain', text: '.' },
        { type: 'property', text: 'xy' },
        { type: 'plain', text: ' / ' },
        { type: 'property', text: 'u_resolution' },
        { type: 'plain', text: ';' }
      ],
      [
        { type: 'plain', text: '  ' },
        { type: 'variable', text: 'float' },
        { type: 'plain', text: ' ' },
        { type: 'variable', text: 'flow' },
        { type: 'plain', text: ' = ' },
        { type: 'function', text: 'sin' },
        { type: 'plain', text: '(' },
        { type: 'variable', text: 'st' },
        { type: 'plain', text: '.' },
        { type: 'property', text: 'x' },
        { type: 'plain', text: ' * ' },
        { type: 'number', text: '6.28' },
        { type: 'plain', text: ' + ' },
        { type: 'property', text: 'u_time' },
        { type: 'plain', text: ');' }
      ],
      [
        { type: 'plain', text: '  ' },
        { type: 'variable', text: 'vec3' },
        { type: 'plain', text: ' ' },
        { type: 'variable', text: 'color' },
        { type: 'plain', text: ' = ' },
        { type: 'function', text: 'mix' },
        { type: 'plain', text: '(' }
      ],
      [
        { type: 'plain', text: '    ' },
        { type: 'variable', text: 'vec3' },
        { type: 'plain', text: '(' },
        { type: 'number', text: '0.04' },
        { type: 'plain', text: ', ' },
        { type: 'number', text: '0.04' },
        { type: 'plain', text: ', ' },
        { type: 'number', text: '0.05' },
        { type: 'plain', text: '),' }
      ],
      [
        { type: 'plain', text: '    ' },
        { type: 'variable', text: 'vec3' },
        { type: 'plain', text: '(' },
        { type: 'number', text: '0.88' },
        { type: 'plain', text: ', ' },
        { type: 'number', text: '0.48' },
        { type: 'plain', text: ', ' },
        { type: 'number', text: '0.37' },
        { type: 'plain', text: '),' }
      ],
      [
        { type: 'plain', text: '    ' },
        { type: 'variable', text: 'flow' }
      ],
      [
        { type: 'plain', text: '  );' }
      ],
      [
        { type: 'plain', text: '  ' },
        { type: 'variable', text: 'gl_FragColor' },
        { type: 'plain', text: ' = ' },
        { type: 'variable', text: 'vec4' },
        { type: 'plain', text: '(' },
        { type: 'variable', text: 'color' },
        { type: 'plain', text: ', ' },
        { type: 'number', text: '1.0' },
        { type: 'plain', text: ');' }
      ],
      [
        { type: 'plain', text: '}' }
      ]
    ]
  }
];

// Helper to compute total character length of a snippet
function getTotalCharCount(snippet) {
  let count = 0;
  for (const line of snippet.lines) {
    if (line.length === 0) {
      count += 1; // newline
    } else {
      for (const token of line) {
        count += token.text.length;
      }
      count += 1; // newline
    }
  }
  return count;
}

export default function CodeTypingAnimation() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const timerRef = useRef(null);

  const currentSnippet = codeSnippets[snippetIndex];
  const totalChars = getTotalCharCount(currentSnippet);

  // Typing effect loop
  useEffect(() => {
    setVisibleChars(0);
    setIsTypingComplete(false);

    let current = 0;
    const typeNextChar = () => {
      if (current < totalChars) {
        // Humanized typing speed variations
        const speed = Math.floor(Math.random() * 22) + 14;
        current++;
        setVisibleChars(current);
        timerRef.current = setTimeout(typeNextChar, speed);
      } else {
        setIsTypingComplete(true);
        // After finishing, pause for 6 seconds then switch snippet
        timerRef.current = setTimeout(() => {
          setSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
        }, 6000);
      }
    };

    timerRef.current = setTimeout(typeNextChar, 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [snippetIndex, totalChars]);

  const handleManualReplay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisibleChars(0);
    setIsTypingComplete(false);
    setSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
  };

  const handleCopyCode = () => {
    const rawText = currentSnippet.lines
      .map((line) => line.map((t) => t.text).join(''))
      .join('\n');
    navigator.clipboard.writeText(rawText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Render tokens up to visibleChars
  let charsRemaining = visibleChars;

  return (
    <div className="code-typing-container">
      {/* Background Animated Ambient Mesh Orbs */}
      <div className="code-ambient-glow" />
      <div className="code-ambient-glow-secondary" />

      {/* Code Editor Window Card */}
      <div className="code-terminal-card">
        {/* Terminal Header */}
        <div className="code-terminal-header">
          <div className="terminal-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>

          <div className="terminal-tabs">
            {codeSnippets.map((snip, idx) => (
              <button
                key={snip.fileName}
                className={`terminal-tab ${idx === snippetIndex ? 'active' : ''}`}
                onClick={() => setSnippetIndex(idx)}
              >
                <Terminal size={12} className="tab-icon" />
                <span>{snip.fileName}</span>
              </button>
            ))}
          </div>

          <div className="terminal-actions">
            <button 
              className="terminal-action-btn"
              onClick={handleCopyCode}
              title="Copy code"
            >
              {isCopied ? <Check size={13} color="#27C93F" /> : <Sparkles size={13} />}
            </button>
            <button 
              className="terminal-action-btn"
              onClick={handleManualReplay}
              title="Re-run animation"
            >
              <RefreshCw size={13} />
            </button>
          </div>
        </div>

        {/* Code Content Area */}
        <div className="code-terminal-body">
          <div className="code-lines">
            {currentSnippet.lines.map((line, lineIdx) => {
              if (charsRemaining <= 0 && lineIdx > 0) {
                return null;
              }

              return (
                <div key={lineIdx} className="code-line">
                  {/* Line Number */}
                  <span className="line-num">{lineIdx + 1}</span>

                  {/* Line Content */}
                  <span className="line-tokens">
                    {line.length === 0 ? (
                      <span className="token-empty">&nbsp;</span>
                    ) : (
                      line.map((token, tokenIdx) => {
                        if (charsRemaining <= 0) return null;

                        const textToTake = Math.min(charsRemaining, token.text.length);
                        charsRemaining -= textToTake;
                        const visibleTokenText = token.text.slice(0, textToTake);

                        return (
                          <span 
                            key={tokenIdx} 
                            className={`code-token token-${token.type}`}
                          >
                            {visibleTokenText}
                          </span>
                        );
                      })
                    )}

                    {/* Blinking Cursor at the current typing position */}
                    {charsRemaining <= 0 && !isTypingComplete && (
                      <span className="typing-cursor" aria-hidden="true" />
                    )}
                  </span>
                </div>
              );
            })}

            {/* Persistent Blinking Cursor when complete */}
            {isTypingComplete && (
              <div className="code-line">
                <span className="line-num">
                  {currentSnippet.lines.length + 1}
                </span>
                <span className="line-tokens">
                  <span className="typing-cursor" aria-hidden="true" />
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Terminal Footer Bar */}
        <div className="code-terminal-footer">
          <div className="terminal-status">
            <span className="status-indicator-dot" />
            <span className="status-label">
              {isTypingComplete ? 'Compiled successfully' : 'Compiling creative runtime...'}
            </span>
          </div>

          <div className="terminal-meta">
            <span className="meta-lang">{currentSnippet.language}</span>
            <span className="meta-speed">60 FPS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
