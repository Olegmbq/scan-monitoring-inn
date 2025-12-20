/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { ScanResult } from "../services/scan";
import type { DocumentItem } from "../types/documents";
import type { SummaryData } from "../types/summary";
import { fetchDocumentsByInn, fetchHistogramsByInn } from "../services/scan";

/* =========================
   TYPES
========================= */

export type SearchStatus = "idle" | "loading" | "success" | "error";

type SearchContextType = {
  status: SearchStatus;
  result: ScanResult | null;
  error: string | null;
  documents: DocumentItem[];
  summary: SummaryData | null;

  startSearch: () => void;
  setSuccess: (data: ScanResult) => Promise<void>;
  setError: (message: string) => void;
  reset: () => void;
};

/* =========================
   CONTEXT
========================= */

const SearchContext = createContext<SearchContextType | undefined>(undefined);

/* =========================
   PROVIDER
========================= */

export function SearchProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setErrorState] = useState<string | null>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [summary, setSummary] = useState<SummaryData | null>(null);

  const startSearch = () => {
    setStatus("loading");
    setResult(null);
    setErrorState(null);
    setDocuments([]);
  };

  const setSuccess = async (data: ScanResult) => {
    setStatus("loading");
    setResult(data);
    setErrorState(null);

    try {
      const [docs, summaryData] = await Promise.all([
        fetchDocumentsByInn(data.inn),
        fetchHistogramsByInn(data.inn),
      ]);

      setDocuments(docs);
      setSummary(summaryData);
      setStatus("success");
    } catch (e) {
      console.error(e);
      setErrorState("Ошибка загрузки данных");
      setDocuments([]);
      setSummary(null);
      setStatus("error");
    }
  };

  const setError = (message: string) => {
    setStatus("error");
    setErrorState(message);
    setDocuments([]);
    setSummary(null);
  };

  const reset = () => {
    setStatus("idle");
    setResult(null);
    setErrorState(null);
    setDocuments([]);
    setSummary(null);
  };

  return (
    <SearchContext.Provider
      value={{
        status,
        result,
        error,
        documents,
        startSearch,
        setSuccess,
        setError,
        reset,
        summary,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

/* =========================
   HOOK
========================= */

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used inside SearchProvider");
  }
  return context;
}
