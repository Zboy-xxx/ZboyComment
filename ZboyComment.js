$(document).ready(function () {
  // 最新のファイル内容を保持
  let lastFileContent = "";

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
          var displayCount = 5; // 表示するコメントの数

          comments
            .slice(0, displayCount)
            .reverse()
            .forEach(function (comment, index) {
              var no = $(comment).attr("no");
              var handle = $(comment).attr("handle") || no + "コメ";
              var text = $(comment).text();
              var service = $(comment).attr("service");

              // 最新のコメントにだけアニメーションを適用
              var animationClass = index === 4 ? "animate" : "";

              const firstMenber = new Set([
                "(๑╹ω╹๑ )",
                "ハスハスタイム",
                "ROM専",
                "SHIN",
                "ダッティワイフ",
              ]);
              var glove =
                "https://img3.imepic.jp/image/20250128/639210.png?6c62fa730099d51c7aaade3e0a9f167d";
              var Zboy =
                "https://img3.imepic.jp/image/20250210/837740.png?b33ac9d3b154d60a2b9308f4e293df2a";

              var img = firstMenber.has(handle) ? Zboy : glove;

              switch (service) {
                case "openrec":
                  var commentHtml =
                    '<div class="comment">' +
                    '<div class="name_img">' +
                    '<div class="name_openrec">' +
                    handle +
                    "</div>" +
                    '<div class="text_openrec">' +
                    text +
                    "</div>" +
                    "</div>" +
                    "</div>";
                  break;
                case "twitch":
                  var commentHtml =
                    '<div class="comment ' +
                    animationClass +
                    '">' +
                    '<div class="name">' +
                    handle +
                    "</div>" +
                    '<div class="text">' +
                    text +
                    "</div>" +
                    "</div>";
                  break;
                case "youtubelive":
                  var commentHtml =
                    '<div class="comment_youtube ' +
                    animationClass +
                    '">' +
                    '<div class="name_youtube">' +
                    handle +
                    "</div>" +
                    '<div class="text_youtube">' +
                    text +
                    "</div>" +
                    "</div>";
                  break;
              }
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

  // 初回のコメント取得
  fetchComments();
});
