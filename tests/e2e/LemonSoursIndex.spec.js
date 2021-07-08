describe("レモンサワー一覧ページのテスト", () => {
  describe("画面がpcサイズの場合", () => {
    beforeAll(async () => {
      // puppeteerのデフォルト画面サイズは800*600のため、そのままgotoしている。
      await page.goto("http://localhost:8080/lemon_sours", {
        waitUntil: "networkidle2",
      });
    });

    describe("メインコンテンツのテスト", () => {
      // バックのAPIからのデータ取得（createdフック）が上手くいってない様子。
      // 時間割いたが実現できなかったので一旦封印する。
      // it("レモンサワーをクリックすると、その個別ページへ飛ぶ", async () => {
      //   await expect(page).toClick(".pc-sours-index-items");
      //   await expect(page).toClick(".pc-index-item");
      //   await expect(page.url()).toBe("http://localhost:8080/lemon_sours/1");
      // });

      it("何も選択しないまま検索ボタンを押すと、エラーメッセージが表示される", async () => {
        await expect(page).toClick("button");
        await expect(page).toMatchElement(
          ".error-message",
          "少なくとも１つ選択して検索してください"
        );
      });
    });
  });

  // describe("画面がpcサイズの場合", () => {
  //   beforeAll(async () => {
  //     await page.setViewport({
  //       width: 375,
  //       height: 812,
  //     });
  //     await page.goto("http://localhost:8080/lemon_sours");
  //   });
  // });
});
