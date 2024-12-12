import { expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";

export class SplashPage {
  readonly page: Page;
  readonly titleText: Locator;
  readonly logoImage: Locator;
  readonly skipButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleText = page.getByTestId("title-text");
    this.logoImage = page.getByTestId("logo-image");
    this.skipButton = page.getByTestId("skip-button");
  }

  async renderPage(): Promise<void> {
    await this.page.goto("/");
  }

  async renderTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(/Soundrag/);
  }

  async renderElements(browserName: string): Promise<void> {
    if (browserName === "firefox") {
      await expect(this.titleText).toBeVisible({ timeout: 7000 });
    }

    await expect(this.titleText).toBeVisible();
    await expect(this.logoImage).toBeVisible();
    await expect(this.skipButton).toBeVisible();
  }

  async clickSkipButton(): Promise<void> {
    await this.skipButton.click();
    await expect(this.page).toHaveURL("/studio");
  }
}
