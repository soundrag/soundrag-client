import { test } from "@playwright/test";
import { SplashPage } from "./SplashPage";
import { StudioPage } from "./StudioPage";

test.describe("Splash Page", () => {
  test.beforeEach(async ({ page }) => {
    const splashPage = new SplashPage(page);

    await splashPage.renderPage();
  });

  test("should display splash page elements correctly", async ({
    page,
    browserName,
  }) => {
    const splashPage = new SplashPage(page);

    await splashPage.renderTitle();
    await splashPage.renderElements(browserName);
    await splashPage.clickSkipButton();
  });
});

test.describe("Studio Page", () => {
  test.beforeEach(async ({ page }) => {
    const studioPage = new StudioPage(page);

    await studioPage.renderPage();
  });

  test("should render header and studio elements", async ({ page }) => {
    const studioPage = new StudioPage(page);

    await studioPage.renderHeaderElements();
    await studioPage.renderStudioElements();
  });

  test("should handle audio file upload and playback controls", async ({
    page,
  }) => {
    const studioPage = new StudioPage(page);

    await studioPage.uploadAudioFile();
    await studioPage.controlAudio();
    await studioPage.controlSlider();
  });

  test("should switch between different interaction modes", async ({
    page,
  }) => {
    const studioPage = new StudioPage(page);

    await studioPage.switchMode();
  });
});
