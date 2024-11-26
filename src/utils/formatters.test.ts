import { describe, it, expect } from "vitest";

import {
  formatTime,
  formatDuration,
  formatDate,
  formatFileName,
} from "../utils/formatters";

describe("formatTime function", () => {
  it("should format time in MM:SS", () => {
    expect(formatTime(0)).toBe("0:00");
    expect(formatTime(59)).toBe("0:59");
    expect(formatTime(60)).toBe("1:00");
    expect(formatTime(3599)).toBe("59:59");
  });
});

describe("formatDuration function", () => {
  it("should format current time and duration", () => {
    expect(formatDuration(0, 0)).toBe("0:00 / 0:00");
    expect(formatDuration(60, 120)).toBe("1:00 / 2:00");
    expect(formatDuration(59, 3600)).toBe("0:59 / 60:00");
  });
});

describe("formatDate function", () => {
  it("should format ISO date to readable date", () => {
    expect(formatDate("2024-11-26T15:30:45Z")).toBe("2024-11-26 15:30:45");
    expect(formatDate("2024-11-26T15:30:45")).toBe("2024-11-26 15:30:45");
  });

  it("should format ISO date except time to readable date", () => {
    expect(formatDate("2024-11-26")).toBe("2024-11-26");
  });
});

describe("formatFileName function", () => {
  it("should truncate long file names when showFullFileName is false", () => {
    const longFileName = "verylongfilename_exceeding_30_characters.txt";

    expect(formatFileName(longFileName, false)).toBe(
      "verylongfilename_exceeding_30_...",
    );
  });

  it("should outspread long file names when showFullFileName is true", () => {
    const longFileName = "verylongfilename_exceeding_30_characters.txt";

    expect(formatFileName(longFileName, true)).toBe(longFileName);
  });

  it("should not truncate short file names", () => {
    const shortFileName = "shortname.txt";

    expect(formatFileName(shortFileName, false)).toBe(shortFileName);
    expect(formatFileName(shortFileName, true)).toBe(shortFileName);
  });
});
