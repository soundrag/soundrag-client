import { expect } from "@playwright/test";

import * as path from "path";
import { fileURLToPath } from "url";

import type { Page, Locator } from "@playwright/test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class StudioPage {
  readonly page: Page;
  readonly navHeader: Locator;
  readonly mainLogo: Locator;
  readonly audioPlayer: Locator;
  readonly resetButton: Locator;
  readonly uploadButton: Locator;
  readonly controlButton: Locator;
  readonly authPanel: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  readonly canvas: Locator;
  readonly shortcuts: Locator;
  readonly tutorial: Locator;
  readonly versionText: Locator;
  readonly showButton: Locator;
  readonly saveButton: Locator;

  readonly audio: Locator;
  readonly audioModal: Locator;
  readonly uploadInput: Locator;
  readonly cancelButton: Locator;
  readonly confirmButton: Locator;
  readonly fileNameText: Locator;
  readonly rangeSlider: Locator;

  readonly modeSwitch: Locator;
  readonly viewButton: Locator;
  readonly dragButton: Locator;
  readonly rotateButton: Locator;

  readonly firstSpeaker: Locator;
  readonly secondSpeaker: Locator;
  readonly listener: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navHeader = page.getByTestId("nav-header");
    this.mainLogo = page.getByTestId("soundrag-logo");
    this.audioPlayer = page.getByTestId("audio-player");
    this.resetButton = page.getByTestId("reset-button");
    this.uploadButton = page.getByTestId("upload-button");
    this.controlButton = page.getByTestId("control-button");
    this.authPanel = page.getByTestId("auth-panel");
    this.loginButton = page.getByTestId("login-button");
    this.logoutButton = page.getByTestId("logout-button");

    this.canvas = page.getByTestId("canvas");
    this.shortcuts = page.getByTestId("shortcuts");
    this.tutorial = page.getByTestId("tutorial");
    this.versionText = page.getByTestId("version-text");
    this.showButton = page.getByTestId("show-button");
    this.saveButton = page.getByTestId("save-button");

    this.audio = page.getByTestId("audio");
    this.audioModal = page.getByTestId("audio-modal");
    this.uploadInput = page.getByTestId("upload-input");
    this.cancelButton = page.getByTestId("cancel-button");
    this.confirmButton = page.getByTestId("confirm-button");
    this.fileNameText = page.getByTestId("file-name-text");
    this.rangeSlider = page.getByTestId("range-slider");

    this.modeSwitch = page.getByTestId("mode-switch");
    this.viewButton = page.getByTestId("view-button");
    this.dragButton = page.getByTestId("drag-button");
    this.rotateButton = page.getByTestId("rotate-button");
  }

  async renderPage(): Promise<void> {
    await this.page.goto("/studio");
  }

  async renderHeaderElements(): Promise<void> {
    await expect(this.navHeader).toBeVisible();
    await expect(this.mainLogo).toBeVisible();
    await expect(this.audioPlayer).toBeVisible();
    await expect(this.resetButton).toBeVisible();
    await expect(this.uploadButton).toBeVisible();
    await expect(this.controlButton).toBeVisible();
    await expect(this.authPanel).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async renderStudioElements(): Promise<void> {
    await expect(this.canvas).toBeVisible();
    await expect(this.shortcuts).toBeVisible();
    await expect(this.tutorial).toBeVisible();
    await expect(this.modeSwitch).toBeVisible();
    await expect(this.versionText).toBeVisible();
    await expect(this.showButton).toBeVisible();
    await expect(this.saveButton).toBeVisible();
  }

  async uploadAudioFile(): Promise<void> {
    await this.uploadButton.click();
    await expect(this.audioModal).toBeVisible({ timeout: 10000 });

    await this.cancelButton.click();
    await expect(this.audioModal).not.toBeVisible({ timeout: 10000 });

    await this.uploadButton.click();

    const audioFilePath = path.resolve(
      __dirname,
      "../public/sounds/sample.mp3",
    );

    await this.uploadInput.setInputFiles(audioFilePath);
    await this.confirmButton.click();

    await expect(this.fileNameText).toHaveText("sample.mp3");
    await expect(this.audioModal).not.toBeVisible({ timeout: 10000 });
  }

  async controlAudio(): Promise<void> {
    await this.controlButton.click();

    await expect(this.audio).toHaveJSProperty("paused", false);

    await this.controlButton.click();

    await expect(this.audio).toHaveJSProperty("paused", true);
  }

  async controlSlider(): Promise<void> {
    await this.rangeSlider.evaluate((slider, value) => {
      const input = slider as HTMLInputElement;
      input.value = value.toString();
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }, 50);

    const updatedValue = await this.rangeSlider.getAttribute("value");

    expect(Number(updatedValue)).toBeCloseTo(50, 0);
  }

  async switchMode(): Promise<void> {
    await this.viewButton.click();
    await expect(this.viewButton).toHaveAttribute("data-active", "true");

    await this.dragButton.click();
    await expect(this.dragButton).toHaveAttribute("data-active", "true");

    await this.rotateButton.click();
    await expect(this.rotateButton).toHaveAttribute("data-active", "true");

    await this.page.keyboard.press("1");
    await expect(this.viewButton).toHaveAttribute("data-active", "true");

    await this.page.keyboard.press("2");
    await expect(this.dragButton).toHaveAttribute("data-active", "true");

    await this.page.keyboard.press("3");
    await expect(this.rotateButton).toHaveAttribute("data-active", "true");
  }
}
