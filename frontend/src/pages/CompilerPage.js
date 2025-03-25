import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { sql } from "@codemirror/lang-sql";
import { php } from "@codemirror/lang-php";
import { dracula } from "@uiw/codemirror-theme-dracula";
import "./CompilerPage.css";

const BACKEND_URL = "https://spherecode.onrender.com";

const languageModes = {
  cpp: cpp(),
  python: python(),
  java: java(),
  javascript: javascript(),
  sql: sql(),
  php: php(),
};

const languageExtensions = {
  html: "html",
  python: "py",
  cpp: "cpp",
  c: "c",
  java: "java",
  javascript: "js",
  sql: "sql",
  php: "php",
};

function CompilerPage() {
  const { language } = useParams();
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const defaultExtension = languageExtensions[language?.toLowerCase()] || "txt";
  const [fileName, setFileName] = useState(
    `${language}_code.${defaultExtension}`
  );
  const languageMode = languageModes[language?.toLowerCase()] || cpp();

  const runCode = async () => {
    setOutput("Running...");
    try {
      const response = await fetch(`${BACKEND_URL}/compile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code, input }),
      });
      const data = await response.json();
      setOutput(data.output || "Error: No output received.");
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const renameCode = () => {
    const newName = prompt("Enter new file name (without extension):");
    if (newName) setFileName(`${newName}.${defaultExtension}`);
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="compiler-page">
      <div className="header">
        <h2>CodeSphere: {language} Compiler</h2>
        <div className="header-buttons">
          <button className="header-button" onClick={renameCode}>
            Rename
          </button>
          <button className="header-button" onClick={downloadCode}>
            Download
          </button>
          <button className="header-button" onClick={runCode}>
            Run Code
          </button>
        </div>
      </div>

      <div className="compiler-container">
        <div className="code-editor">
          <h3 className="code-editor-title">Code Editor :- {language}</h3>
          <CodeMirror
            value={code}
            onChange={(value) => setCode(value)}
            placeholder={`Write your ${language} code here...`}
            className="code-mirror"
            theme={dracula}
            extensions={[languageMode]}
            style={{
              height: "100%", // Ensures it fills the editor area
              overflow: "auto", // Enables scrollbar for overflow content
            }}
          />
        </div>

        <div className="input-output-container">
          <div className="input-box">
            <h3>Input</h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input for your code..."
            />
          </div>

          <div className="output-box">
            <h3>Output</h3>
            <textarea
              value={output}
              readOnly
              placeholder="Output of your code..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompilerPage;
