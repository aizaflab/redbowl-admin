export function formatAndTruncateCell(value, charCount = null) {
  let formattedValue =
    value !== null && value !== undefined && value !== "" ? value : "N/A";

  if (
    charCount !== null &&
    typeof formattedValue === "string" &&
    charCount > 0
  ) {
    formattedValue =
      formattedValue.length > charCount
        ? formattedValue.slice(0, charCount) + ".."
        : formattedValue;
  }

  return formattedValue;
}

export function showTooltip(value, charCount) {
  return value && typeof value === "string" && value.length > charCount
    ? value
    : "";
}

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
