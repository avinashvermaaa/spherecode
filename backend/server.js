const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow frontend to connect
app.use(express.json());

const TEMP_DIR = path.join(__dirname, "temp");
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

const languageConfigs = {
  cpp: {
    extension: "cpp",
    compile: "g++ {file} -o {outfile}",
    run: "{outfile}",
  },
  c: { extension: "c", compile: "gcc {file} -o {outfile}", run: "{outfile}" },
  python: { extension: "py", run: "python3 {file}" },
  java: { extension: "java", compile: "javac {file}", run: "java {classname}" },
  javascript: { extension: "js", run: "node {file}" },
};

app.post("/compile", async (req, res) => {
  const { language, code, input } = req.body;

  if (!languageConfigs[language]) {
    return res.status(400).json({ output: "Error: Unsupported language" });
  }

  const ext = languageConfigs[language].extension;
  const filename = `temp_code.${ext}`;
  const filepath = path.join(TEMP_DIR, filename);
  const outputFile = path.join(TEMP_DIR, "output");

  try {
    fs.writeFileSync(filepath, code); // Save code to a file

    let compileCmd = languageConfigs[language].compile
      ? languageConfigs[language].compile
          .replace("{file}", filepath)
          .replace("{outfile}", outputFile)
      : "";

    let runCmd = languageConfigs[language].run
      .replace("{file}", filepath)
      .replace("{outfile}", outputFile);

    const executeCommand = (command) =>
      new Promise((resolve, reject) => {
        exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
          if (error) reject(stderr || error.message);
          else resolve(stdout);
        });
      });

    if (compileCmd) {
      const compileResult = await executeCommand(compileCmd).catch((err) => {
        throw new Error(`Compilation Error:\n${err}`);
      });
    }

    const executionResult = await executeCommand(runCmd).catch((err) => {
      throw new Error(`Runtime Error:\n${err}`);
    });

    res.json({ output: executionResult || "No output" });
  } catch (error) {
    res.status(500).json({ output: error.message });
  } finally {
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
