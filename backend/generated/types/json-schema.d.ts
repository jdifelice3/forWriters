export interface JsonSchema {
  appFile?: AppFile;
  reading?: Reading;
  readingAuthor?: ReadingAuthor;
  readingFeedback?: ReadingFeedback;
  readingManuscript?: ReadingManuscript;
  group?: Group;
  groupAddress?: GroupAddress;
  groupNews?: GroupNews;
  groupUser?: GroupUser;
  groupUrl?: GroupUrl;
  user?: User;
  userProfile?: UserProfile;
  userUrl?: UserUrl;
  [k: string]: unknown;
}
export interface AppFile {
  id?: string;
  title?: string;
  description?: string | null;
  filename?: string;
  documentType?: "MANUSCRIPT" | "FEEDBACK";
  mimetype?: "DOCX" | "PDF";
  url?: string;
  uploadedAt?: string;
  workType?:
    | ("FLASHFICTION" | "NOVEL" | "NOVELLA" | "NOVELETTE" | "PLAY" | "SCREENPLAY" | "SERIALIZEDFICTION" | "SHORTSTORY")
    | null;
  wordCount?: number | null;
  pageCount?: number | null;
  genre?: ("FANTASY" | "HISTORICAL" | "HORROR" | "LITERARY" | "MYSTERY" | "POEM" | "ROMANCE" | "SCIENCEFICTION") | null;
  manuscriptIsVisible?: boolean;
  user?: User;
  readingManuscripts?: ReadingManuscript[];
  readingFeedback?: ReadingFeedback[];
  [k: string]: unknown;
}
export interface User {
  id?: string;
  superTokensId?: string;
  email?: string;
  role?: "ADMIN" | "EDITOR" | "READER";
  username?: string;
  createdAt?: string;
  updatedAt?: string;
  groupUser?: GroupUser[];
  group?: Group[];
  reading?: Reading[];
  userProfile?: UserProfile | null;
  appFiles?: AppFile[];
  urls?: UserUrl[];
  readingAuthor?: ReadingAuthor[];
  readingFeedback?: ReadingFeedback[];
  [k: string]: unknown;
}
export interface GroupUser {
  id?: string;
  isAdmin?: boolean;
  invitedBy?: string | null;
  createdAt?: string;
  user?: User;
  group?: Group;
  [k: string]: unknown;
}
export interface Group {
  id?: string;
  groupType?: "WRITING";
  name?: string;
  description?: string | null;
  imageUrl?: string | null;
  websiteUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
  groupAddress?: GroupAddress[];
  groupUser?: GroupUser[];
  groupNews?: GroupNews[];
  reading?: Reading[];
  groupUrl?: GroupUrl[];
  user?: User;
  [k: string]: unknown;
}
export interface GroupAddress {
  id?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  group?: Group | null;
  reading?: Reading | null;
  [k: string]: unknown;
}
export interface Reading {
  id?: string;
  name?: string;
  createdAt?: string;
  readingDate?: string;
  readingStartTime?: string;
  readingEndTime?: string;
  submissionDeadline?: string;
  description?: string;
  minDaysBetweenReads?: number;
  maxConsecutiveReads?: number;
  user?: User;
  readingAuthor?: ReadingAuthor[];
  group?: Group;
  groupAddress?: GroupAddress | null;
  [k: string]: unknown;
}
export interface ReadingAuthor {
  id?: string;
  joinedAt?: string;
  reading?: Reading;
  user?: User;
  readingManuscript?: ReadingManuscript[];
  [k: string]: unknown;
}
export interface ReadingManuscript {
  id?: string;
  readingAuthorId?: string;
  readingFeedback?: ReadingFeedback[];
  readingAuthor?: ReadingAuthor;
  appFile?: AppFile;
  [k: string]: unknown;
}
export interface ReadingFeedback {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  appFile?: AppFile;
  user?: User;
  readingManuscript?: ReadingManuscript;
  [k: string]: unknown;
}
export interface GroupNews {
  id?: string;
  title?: string;
  content?: string | null;
  postedAt?: string;
  archived?: boolean;
  group?: Group;
  [k: string]: unknown;
}
export interface GroupUrl {
  id?: string;
  url?: string;
  urlType?: "AUDIO" | "FACEBOOK" | "IMAGE" | "LINKEDIN" | "MEETUP" | "SUBSTACK" | "WEBSITE" | "YOUTUBE";
  createdAt?: string;
  group?: Group | null;
  [k: string]: unknown;
}
export interface UserProfile {
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  bio?: string | null;
  user?: User;
  [k: string]: unknown;
}
export interface UserUrl {
  id?: string;
  url?: string;
  urlType?: "AUDIO" | "FACEBOOK" | "IMAGE" | "LINKEDIN" | "MEETUP" | "SUBSTACK" | "WEBSITE" | "YOUTUBE";
  createdAt?: string;
  user?: User | null;
  [k: string]: unknown;
}
