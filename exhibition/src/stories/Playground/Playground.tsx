import React, { useState, useEffect } from 'react';
import WriteFile from './WriteFile';
import Markdown from 'react-markdown';

const Playground = ({
    initialCode = `
const HI = () => <p>hi</p>

export default HI
`,
    markdown = '## Default Example' }) => {
  const [code, setCode] = useState(initialCode);
  const [Component, setComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const saveCode = async () => {
      await WriteFile(code, "src/stories/Playground/tempCode.tsx");
    };
    saveCode();
  }, [code]);

  const runCode = async () => {
    try {
      const tempCode = await import('./tempCode');
      const tempComponent = tempCode.default;
      setComponent(() => tempComponent);
    } catch (error) {
      console.error('Error loading component:', error);
      WriteFile("", "src/stories/Playground/tempCode.tsx");
    }
  };

  return (
    <div>
      <Markdown>{markdown}</Markdown>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ width: '100%', height: '100px' }}
      />
      <button onClick={runCode}>Run Code</button>
      <div>
        <strong>Console Output:</strong>
        {Component && <Component />}
      </div>
    </div>
  );
};

export default Playground;
