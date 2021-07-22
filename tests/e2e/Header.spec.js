describe("ヘッダーのテスト", () => {
  beforeAll(async () => {
    await page.setViewport({
      width: 375,
      height: 812,
    });
    await page.goto("http://localhost:8080/lemon_sours");
  });

  // ここでもAPIがからむテスト（ユーザー登録等）が通らないためオミット。
  describe("ユーザー登録（ログイン）していない場合", () => {
    it("レモンアイコンをクリックすると、ホームに遷移する", async () => {
      await expect(page).toClick(".unauthenticated-header-icon1");
      await page.waitForNavigation({ waitUntil: ["load", "networkidle2"] });
      await expect(page.url()).toBe("http://localhost:8080/");
    });

    it("ユーザーアイコンをクリックするとリストが表示され、最初の項目をクリックするとユーザー登録モーダルが表示される。×ボタンをクリックすると閉じる", async () => {
      await expect(page).toClick(".unauthenticated-header-icon2");
      await expect(page).toMatchElement(".isActive");
      await expect(page).toClick(".unauthenticated-header-icon-dropdown-list");
      await expect(page).toMatchElement(".modal-user-title", "ユーザー登録");
      await expect(page).toClick(".modal-user-button-close");
      await expect(page).not.toBe(".modal-user-title");
    });
  });
});
