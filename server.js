const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ルートハンドラを追加
// app.get("/", (_, res) => {
//   res.sendFile(path.join(__dirname, "public", "setting.html"));
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "setting.html"));
});
console.log("Resolved Path:", path.join(__dirname, "public", "setting.html"));

// CSSファイル更新エンドポイント
app.post("/update-css", (req, res) => {
  const {
    noUsername,
    margin_comment,
    width_comment,
    redius_comment,
    bgColor,
    selectBorder,
    bdColor,
    bdWeight,
  } = req.body;
  const cssContent = `
  .comment {
      margin-bottom: ${margin_comment}px;
      padding: 5px;
      overflow-wrap: normal;
      width: ${width_comment}px;
      height: auto;
      background: ${bgColor};
      border: ${bdWeight}px ${selectBorder} ${bdColor};
      border-radius: ${redius_comment}px;
      position: relative;
      display: flex;
      flex-direction: column;
    }

  .name {
    height: auto;
    width: auto;
    font-weight: bold;
    font-size: 18px;
    font-family: "Noto Sans JP";
    color: #d321ff;
  }

  .text {
    margin-left: 15px;
    height: auto;
    /* width: 95%; */
    width: auto;
    overflow-wrap: normal;
    font-weight: bold;
    font-size: 20px;
    color: #524f4f;
    font-family: "Noto Sans JP";
  }
  `;
  const filePath = path.join(__dirname, "public", "ZboyComment.css");

  fs.writeFile(filePath, cssContent, "utf8", (err) => {
    if (err) {
      console.error("ファイルの書き込みエラー:", err);
      res.status(500).send("ファイルの更新に失敗しました。");
      return;
    }
    res.send("CSSファイルが更新されました。");
  });
});

app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動しました`);
});
