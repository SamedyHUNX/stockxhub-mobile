import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFlagEmoji = (countryCode: string) => {
  if (!countryCode) return "";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export function scriptUrlHelper(chartType: string) {
  return `https://s3.tradingview.com/external-embedding/embed-widget-${chartType}.js`;
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getStockLogoUrl = (symbol: string) => {
  // Try multiple services in order of reliability
  // return `https://logo.clearbit.com/${symbol.toLowerCase()}.com`;
  // Alternatives:
  return `https://financialmodelingprep.com/image-stock/${symbol}.png`;
  // return `https://assets.parqet.com/logos/symbol/${symbol}`;
};
