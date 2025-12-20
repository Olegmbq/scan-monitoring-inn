import api from "./api";
import type { DocumentItem } from "../types/documents";

/* =========================
   DEMO MODE
========================= */

function isDemoMode() {
  return localStorage.getItem("authMode") === "demo";
}

/* =========================
   TYPES
========================= */

export type ScanResult = {
  inn: string;
  name: string;
  status: string;
  region: string;
};

type ScanObjectSearchItem = {
  encodedId: string;
};

type ScanDocumentOk = {
  id: string;
  issueDate?: string;
  source?: { name?: string };
  title?: { text?: string };
  content?: { markup?: string };
  attributes?: { wordCount?: number; theme?: string };
};

type ScanDocumentWrapper = {
  ok?: ScanDocumentOk;
  fail?: unknown;
};

/* =========================
   AUTH
========================= */

type ScanLoginResponse = {
  accessToken: string;
  expire: string;
};

export async function loginScan(login: string, password: string) {
  const res = await api.post<ScanLoginResponse>("/account/login", {
    login,
    password,
  });

  const { accessToken, expire } = res.data;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("expire", expire);

  return res.data;
}

/* =========================
   SEARCH (RESULT HEADER)
========================= */

export async function searchByInn(inn: string): Promise<ScanResult> {
  if (isDemoMode()) {
    return {
      inn,
      name: "Demo организация",
      status: "Demo mode",
      region: "—",
    };
  }

  return {
    inn,
    name: "Организация найдена",
    status: "Данные получены",
    region: "—",
  };
}

/* =========================
   DOCUMENTS
========================= */

export async function fetchDocumentsByInn(
  inn: string
): Promise<DocumentItem[]> {
  if (isDemoMode()) return mockDocuments();

  try {
    const searchRes = await api.post("/objectsearch", {
      issueDateInterval: {
        startDate: "2020-01-01",
        endDate: new Date().toISOString().slice(0, 10),
      },
      searchContext: {
        targetSearchEntitiesContext: {
          targetSearchEntities: [
            {
              type: "company",
              inn,
              maxFullness: true,
              inBusinessNews: true,
            },
          ],
          onlyMainRole: true,
        },
      },
      limit: 10,
      sortType: "issueDate",
      sortDirectionType: "desc",
    });

    const ids: string[] =
      searchRes.data?.items?.map(
        (item: ScanObjectSearchItem) => item.encodedId
      ) ?? [];

    if (!ids.length) return [];

    const docsRes = await api.post("/documents", { ids });

    const docs: ScanDocumentOk[] = (
      (docsRes.data as ScanDocumentWrapper[]) ?? []
    )
      .map((d) => d.ok)
      .filter((d): d is ScanDocumentOk => Boolean(d));

    return mapScanDocuments(docs);
  } catch {
    return mockDocuments();
  }
}

/* =========================
   MAPPER
========================= */

function mapScanDocuments(items: ScanDocumentOk[]): DocumentItem[] {
  return items.map((item, index) => ({
    id: index,
    date: item.issueDate?.slice(0, 10) ?? "—",
    source: item.source?.name ?? "Источник",
    title: item.title?.text ?? "Без названия",
    text: item.content?.markup?.slice(0, 200) ?? "Текст недоступен",
    words: item.attributes?.wordCount ?? 0,
    category: item.attributes?.theme ?? "Документ",
    url: "#",
  }));
}

/* =========================
   MOCK
========================= */

function mockDocuments(): DocumentItem[] {
  return Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    date: "2021-09-13",
    source: "Habr",
    title: `Мок-документ №${i + 1}`,
    text: "Пример документа для демонстрационного режима…",
    words: 800 + i * 10,
    category: "Бизнес",
    url: "#",
  }));
}

/* =========================
   HISTOGRAMS (SUMMARY)
========================= */

type ScanHistogramItem = {
  date: string;
  value: number;
};

type ScanHistogramResponse = {
  data: Array<{
    histogramType: "totalDocuments" | "riskFactors";
    data: ScanHistogramItem[];
  }>;
};

export async function fetchHistogramsByInn(inn: string) {
  if (isDemoMode()) {
    return {
      totalFound: 4221,
      rows: [
        { date: "2021-09-10", total: 5, risk: 0 },
        { date: "2021-09-13", total: 2, risk: 0 },
        { date: "2021-09-17", total: 6, risk: 0 },
        { date: "2021-09-20", total: 8, risk: 2 },
      ],
    };
  }

  const res = await api.post<ScanHistogramResponse>(
    "/objectsearch/histograms",
    {
      issueDateInterval: {
        startDate: "2020-01-01",
        endDate: new Date().toISOString().slice(0, 10),
      },
      searchContext: {
        targetSearchEntitiesContext: {
          targetSearchEntities: [
            {
              type: "company",
              inn,
              maxFullness: true,
              inBusinessNews: true,
            },
          ],
          onlyMainRole: true,
        },
      },
      intervalType: "month",
      histogramTypes: ["totalDocuments", "riskFactors"],
      limit: 100,
    }
  );

  const total =
    res.data.data.find((h) => h.histogramType === "totalDocuments")?.data ?? [];
  const risk =
    res.data.data.find((h) => h.histogramType === "riskFactors")?.data ?? [];

  const map = new Map<string, { total: number; risk: number }>();

  total.forEach((i) => map.set(i.date, { total: i.value, risk: 0 }));
  risk.forEach((i) => {
    const row = map.get(i.date) ?? { total: 0, risk: 0 };
    row.risk = i.value;
    map.set(i.date, row);
  });

  return {
    totalFound: total.reduce((s, i) => s + i.value, 0),
    rows: Array.from(map.entries()).map(([date, v]) => ({
      date: date.slice(0, 10),
      total: v.total,
      risk: v.risk,
    })),
  };
}
