describe("サイドバーのテスト", () => {
  // ここでもAPIがからむテスト（ユーザー登録等）が通らないためオミット。
  describe("ログインしていない場合", () => {
    it("タイトルをクリックすると、ホームに遷移する", async () => {
      await page.goto("http://localhost:8080/lemon_sours");
      await expect(page).toClick(".app-title");
      await page.waitForNavigation({ waitUntil: ["load", "networkidle2"] });
      await expect(page.url()).toBe("http://localhost:8080/");
    });

    it("サイドバーメニューの一つ目をクリックすると、レモンサワーデータベースのページに遷移する", async () => {
      await page.goto("http://localhost:8080");
      await expect(page).toClick(".sidebar-menu", {
        text: "市販レモンサワーデータベース",
      });
      await page.waitForNavigation({ waitUntil: ["load", "networkidle2"] });
      await expect(page.url()).toBe("http://localhost:8080/lemon_sours");
    });

    it("サイドバーのユーザーメニューをクリックするとリストが表示され、最初の項目をクリックするとユーザー登録モーダルが表示される。×ボタンをクリックすると閉じる", async () => {
      await page.goto("http://localhost:8080");
      await expect(page).toClick(".unauthenticated-menu-with-dropdown");
      await expect(page).toMatchElement(".isActive");
      await expect(page).toClick(".unauthenticated-menu-dropdown-list");
      await expect(page).toMatchElement(".modal-user-title", "ユーザー登録");
      await expect(page).toClick(".modal-user-button-close");
      await expect(page).not.toBe(".modal-user-title");
    });
  });

  describe("ログイン済みの場合", () => {});
});
