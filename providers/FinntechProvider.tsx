import React, { PropsWithChildren } from "react";
import { useAuth } from "./AuthProvider";

interface NewsResponse {
  success: boolean;
  data: MarketNewsArticle[];
  count: number;
}

interface StockSearchResponse {
  success: boolean;
  data: StockWithWatchlistStatus[];
  count: number;
}

interface BatchStockSearchResponse {
  success: boolean;
  data: StockWithWatchlistStatus[][];
}

interface FinntechContextType {
  getNews: (symbols?: string[]) => Promise<NewsResponse>;
  searchStocks: (query?: string) => Promise<StockSearchResponse>;
  batchSearchStocks: (queries: string[]) => Promise<BatchStockSearchResponse>;
}

interface MarketNewsArticle {
  id: number;
  category: string;
  datetime: number;
  headline: string;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

interface StockWithWatchlistStatus {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
  isInWatchlist: boolean;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const FinntechContext = React.createContext<FinntechContextType | null>(null);

export function useFinntech() {
  const value = React.useContext(FinntechContext);
  if (!value) {
    throw new Error("useFinntech must be wrapped in a <FinntechProvider />");
  }
  return value;
}

export function FinntechProvider(props: PropsWithChildren) {
  const { session } = useAuth();

  const getNews = async (symbols?: string[]): Promise<NewsResponse> => {
    try {
      const params = new URLSearchParams();
      if (symbols && symbols.length > 0) {
        params.append("symbols", symbols.join(","));
      }

      const url = `${API_URL}/news${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(session && { Authorization: `Bearer ${session}` }),
        },
      });

      // Check if response has content before parsing
      const text = await response.text();

      if (!text) {
        throw new Error("Empty response from server");
      }

      const data = JSON.parse(text);

      if (!response.ok) {
        throw new Error(data.error || `HTTP error ${response.status}`);
      }

      return {
        success: data.success,
        data: data.data || [],
        count: data.count || 0,
      };
    } catch (error) {
      console.error("Get News Error:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      throw error;
    }
  };

  const searchStocks = async (query?: string): Promise<StockSearchResponse> => {
    try {
      const params = new URLSearchParams();
      if (query) {
        params.append("q", query);
      }

      const url = `${API_URL}/stocks/search${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(session && { Authorization: `Bearer ${session}` }),
        },
      });

      // Check if response has content before parsing
      const text = await response.text();

      if (!text) {
        throw new Error("Empty response from server");
      }

      // Check if response is HTML (error page)
      if (text.trim().startsWith("<")) {
        console.error("Received HTML instead of JSON. Full response:", text);
        throw new Error(
          `Server returned HTML error page. Status: ${response.status}`
        );
      }

      const data = JSON.parse(text);

      if (!response.ok) {
        throw new Error(data.error || `HTTP error ${response.status}`);
      }

      return {
        success: data.success,
        data: data.data || [],
        count: data.count || 0,
      };
    } catch (error) {
      console.error("Search Stocks Error:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      throw error;
    }
  };

  const batchSearchStocks = async (
    queries: string[]
  ): Promise<BatchStockSearchResponse> => {
    try {
      const url = `${API_URL}/stocks/search`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session && { Authorization: `Bearer ${session}` }),
        },
        body: JSON.stringify({ queries }),
      });

      const text = await response.text();

      if (!text) {
        throw new Error("Empty response from server");
      }

      const data = JSON.parse(text);

      if (!response.ok) {
        throw new Error(data.error || `HTTP error ${response.status}`);
      }

      return {
        success: data.success,
        data: data.data || [],
      };
    } catch (error) {
      console.error("Batch Search Stocks Error:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      throw error;
    }
  };

  return (
    <FinntechContext.Provider
      value={{
        getNews,
        searchStocks,
        batchSearchStocks,
      }}
    >
      {props.children}
    </FinntechContext.Provider>
  );
}
