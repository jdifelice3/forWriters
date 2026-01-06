export type DashboardResponse = {
  group: {
    id: string;
    name: string;
    role: "ADMIN" | "MEMBER";
  } | null;

  attention: DashboardAttentionItem[];
  upcoming: DashboardUpcomingItem[];
  resume: DashboardResumeItem[];
};

export type DashboardAttentionItem = {
  id: string;              // stable key
  type:
    | "GROUP_JOIN_REQUEST"
    | "COLLAB_REQUEST"
    | "FEEDBACK_REQUIRED"
    | "READING_RSVP_REQUIRED";

  title: string;           // human-readable
  description?: string;   // optional context
  ctaLabel: string;       // verb
  href: string;           // where action happens
};

export type DashboardUpcomingItem = {
  id: string;
  type: "READING" | "DEADLINE" | "FEEDBACK_WINDOW";

  title: string;
  occursAt: string;       // ISO datetime
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