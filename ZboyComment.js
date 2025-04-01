$(document).ready(function () {
  // 最新のファイル内容を保持
  let lastFileContent = "";
  let displayCount = 5; // デフォルトの表示するコメントの数

  // 初期設定を読み込む
  function fetchSettings() {
    $.ajax({
      url: "data.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        displayCount = data.CommentCnt;
        fetchComments(); // 初回のコメント取得を設定取得後に実行
      },
      error: function () {
        console.error("設定のロードに失敗しました");
      },
    });
  }

  function fetchComments() {
    $.ajax({
      url: "comment.xml",
      type: "GET",
      dataType: "xml",
      success: function (xml) {
        const xmlContent = new XMLSerializer().serializeToString(xml);

        if (xmlContent !== lastFileContent) {
          lastFileContent = xmlContent;
          $("#comments").empty(); // 以前のコメントをクリア

          var comments = $(xml).find("comment").toArray().reverse();

          comments
            .slice(0, displayCount)
            .reverse()
            .forEach(function (comment, index) {
              var no = $(comment).attr("no");
              var handle = $(comment).attr("handle") || no + "コメ";
              var text = $(comment).text();

              var commentHtml =
                '<div class="comment" id="comment" name="comment">' +
                '<span class="name" id="name" name="name">' +
                handle +
                "</span>" +
                '<span class="text" id="text" name="text">' +
                text +
                "</span>" +
                "</div>";

              $("#comments").append(commentHtml);
            });
        }
      },
      error: function () {
        console.error("コメントのロードに失敗しました");
      },
    });
  }

  // 1秒ごとにコメントを取得
  setInterval(fetchComments, 1000);

  // 初回の設定およびコメント取得
  fetchSettings();
});
