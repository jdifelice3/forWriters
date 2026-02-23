import { useEffect, useState } from "react";
import { apiFetch } from "../../api/client";

export interface FileDiffMetric {
  version: number;
  wordCount: number | null;
  paragraphCount: number | null;
  sentenceCount: number | null;
  createdAt: string;
}

export interface FileDiffMetricWithDelta {
  version: number;
  wordCount: number | null;
  paragraphCount: number | null;
  sentenceCount: number | null;

  wordDelta: number | null;
  paragraphDelta: number | null;
  sentenceDelta: number | null;
}

export function useRevisionMetrics(appFileMetaId: string) {
  const [data, setData] = useState<FileDiffMetricWithDelta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!appFileMetaId) return;

    async function load() {
      setLoading(true);
      const res = await apiFetch<FileDiffMetricWithDelta[]>(`/files/${appFileMetaId}/revision-metrics`);

      const withDeltas = res.map((item: any, index: number) => {
        if (index === 0) {
          return {
            ...item,
            wordDelta: null,
            paragraphDelta: null,
            sentenceDelta: null,
          };
        }

        const prev = res[index - 1];

        return {
          ...item,
          wordDelta:
            item.wordCount != null && prev.wordCount != null
              ? item.wordCount - prev.wordCount
              : null,
          paragraphDelta:
            item.paragraphCount != null && prev.paragraphCount != null
              ? item.paragraphCount - prev.paragraphCount
              : null,
          sentenceDelta:
            item.sentenceCount != null && prev.sentenceCount != null
              ? item.sentenceCount - prev.sentenceCount
              : null,
        };
      });

      setData(withDeltas);
      setLoading(false);
    }

    load();
  }, [appFileMetaId]);

  return { data, loading };
}