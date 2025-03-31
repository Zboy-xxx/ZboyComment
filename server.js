const { error } = require("console");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

// ルートハンドラを追加
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "setting.html"));
});

// CSSファイル更新エンドポイント
app.post("/update-css", (req, res) => {
  const {
    // 見た目の値
    enableBorder,
    margin_comment,
    width_comment,
    redius_comment,
    bgColor,
    selectBorder,
    bdColor,
    bdWeight,

    // ユーザー名の値
    enableUsername,
    topUsername,
    fontUsername,
    fontSize_Username,
    color_Username,

    // コメントの値
    fontComment,
    fontSize_comment,
    color_comment,
  } = req.body;

  console.log("enableUsername=", enableUsername);
  console.log("fontComment=", fontComment);
  console.log("fontSize_comment=", fontSize_comment);
  console.log("color_comment=", color_comment);

  const commentCss = enableBorder
    ? `.comment {
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
    }`
    : `.comment {
      margin-bottom: ${margin_comment}px;
      padding: 5px;
      overflow-wrap: normal;
      width: ${width_comment}px;
      height: auto;
      background: ${bgColor};
      border: 0px ${selectBorder} ${bdColor};
      border-radius: ${redius_comment}px;
      position: relative;
      display: flex;
      flex-direction: column;
    }`;

  let nameCss = "";
  if (enableUsername) {
    if (topUsername) {
      nameCss = `
      .name{
        height: auto;
        width: auto;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        font-size: ${fontSize_Username}px;
        font-family: ${fontUsername};
        color: ${color_Username};
      }`;
    } else {
      nameCss = `
      .name{
        height: auto;
        width: auto;
        font-weight: bold;
        font-size: ${fontSize_Username}px;
        font-family: ${fontUsername};
        color: ${color_Username};
      }`;
    }
  } else {
    nameCss = `
    .name{display:none;}
    `;
  }

  const cssContent = `
  ${commentCss}
  ${nameCss}
  .text {
    margin-left: 10px;
    height: auto;
    width: auto;
    overflow-wrap: normal;
    font-weight: bold;
    font-size: ${fontSize_comment}px;
    color: ${color_comment};
    font-family: ${fontComment};
  }
  `;
  const filePath = path.join(process.cwd(), "public", "ZboyComment.css");

  fs.writeFile(filePath, cssContent, "utf8", (err) => {
    if (err) {
      console.error("ファイルの書き込みエラー:", err);
      res.status(500).send("ファイルの更新に失敗しました。");
      return;
    }
    res.send("CSSファイルが更新されました。");
  });
});

// JSONファイル更新エンドポイント
app.post("/update-json", (req, res) => {
  const { selectCommentCnt } = req.body;
  const CommentCnt = `{"CommentCnt":${selectCommentCnt}}`;
  const filePath = path.join(process.cwd(), "data.json");

  fs.writeFile(filePath, CommentCnt, "utf8", (err) => {
    if (err) {
      console.error("ファイルの書き込みエラー:", err);
      res.status(500).send("ファイルの更新に失敗しました。");
      return;
    }
    console.log("JSONファイル書き込み成功");
    res.send("JSONファイルが更新されました。");
  });
});

app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動しました`);
});
