import { GroupRole } from "./domain-types";

export type DashboardResponse = {
  group: { id: string; name: string; role: GroupRole } | null;
  attention: DashboardAttentionItem[];
  upcoming: DashboardUpcomingItem[];
  resume: DashboardResumeItem[];
};

export type DashboardAttentionItem = {
  id: string;
  type: "GROUP_JOIN_REQUEST" | "COLLAB_REQUEST" | "FEEDBACK_REQUIRED" | "READING_RSVP_REQUIRED";
  title: string;
  description?: string;
  ctaLabel: string;
  href: string;
};

export type DashboardUpcomingItem = {
  id: string;
  type: "READING" | "DEADLINE" | "FEEDBACK_WINDOW";
  title: string;
  occursAt: string; // ISO
  subtitle?: string;
  href: string;
};

export type DashboardResumeItem = {
  id: string;
  type: "FILE" | "FEEDBACK" | "GROUP";
  title: string;
  subtitle?: string;
  href: string;
};
