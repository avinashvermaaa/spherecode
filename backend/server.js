const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const TEMP_DIR = path.join(__dirname, "temp");
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

const languageConfigs = {
  cpp: {
    extension: "cpp",
    compile: "g++ {file} -o {outfile}",
    run: "{outfile}",
    inputFlag: true,
  },
  c: {
    extension: "c",
    compile: "gcc {file} -o {outfile}",
    run: "{outfile}",
    inputFlag: true,
  },
  python: {
    extension: "py",
    run: "python3 {file}",
    inputFlag: true,
  },
  java: {
    extension: "java",
    compile: "javac {file}",
    run: "java -cp {dir} {classname}",
    inputFlag: true,
  },
  javascript: {
    extension: "js",
    run: "node {file}",
    inputFlag: false,
  },
};

// Utility function to execute a command
const executeCommand = (command, input = "") =>
  new Promise((resolve, reject) => {
    console.log(`Executing: ${command}`); // ✅ Log command execution
    const process = exec(
      command,
      { timeout: 5000 },
      (error, stdout, stderr) => {
        console.log("STDOUT:", stdout); // ✅ Log output
        console.log("STDERR:", stderr); // ✅ Log errors

        if (error) reject(stderr || error.message);
        else resolve(stdout);
      }
    );

    if (input) {
      process.stdin.write(input + "\n");
      process.stdin.end();
    }
  });


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
    fs.writeFileSync(filepath, code);

    let compileCmd = languageConfigs[language].compile
      ? languageConfigs[language].compile
          .replace("{file}", filepath)
          .replace("{outfile}", outputFile)
      : "";

    let runCmd = languageConfigs[language].run
      .replace("{file}", filepath)
      .replace("{outfile}", outputFile)
      .replace("{dir}", TEMP_DIR);

    // Special case for Java (Extract Class Name)
    if (language === "java") {
      const classNameMatch = code.match(/class\s+([A-Za-z_][A-Za-z0-9_]*)/);
      if (!classNameMatch) {
        throw new Error("Error: Java class name not found.");
      }
      const className = classNameMatch[1];
      runCmd = runCmd.replace("{classname}", className);
    }

    // Compile if necessary
    if (compileCmd) await executeCommand(compileCmd);

    // Run program (with input if applicable)
    const executionResult = await executeCommand(runCmd, input);

    res.json({ output: executionResult || "No output" });
  } catch (error) {
    res.status(500).json({ output: error.message });
  } finally {
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
