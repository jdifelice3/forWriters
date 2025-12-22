// AUTO-GENERATED — DO NOT EDIT
// Generated via parsePrismaSchema()

export type CommentSource = "DOCX" | "MANUAL";

export type DocumentType = "MANUSCRIPT" | "FEEDBACK";

export type ParticipantType = "AUTHOR" | "REVIEWER";

export type EventType = "READING" | "RETREAT";

export type Genre = "FANTASY" | "HISTORICAL" | "HORROR" | "LITERARY" | "MYSTERY" | "POEM" | "ROMANCE" | "SCIENCEFICTION";

export type FileType = "DOCX" | "PDF";

export type GroupType = "WRITING" | "PERSONAL";

export type JoinRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export type GroupMemberRole = "MEMBER" | "ADMIN";

export type ReadingScheduleType = "SCHEDULED" | "UNSCHEDULED";

export type Role = "ADMIN" | "AUTHOR" | "EDITOR" | "READER";

export type UrlOwnerType = "USER" | "WRITINGGROUP";

export type UrlType = "AUDIO" | "FACEBOOK" | "IMAGE" | "LINKEDIN" | "MEETUP" | "SUBSTACK" | "WEBSITE" | "YOUTUBE";

export type WorkType = "FLASHFICTION" | "NOVEL" | "NOVELLA" | "NOVELETTE" | "PLAY" | "SCREENPLAY" | "SERIALIZEDFICTION" | "SHORTSTORY";

export interface AppFile {
  id: string;
  appFileMetaId: string;
  version: number;
  userId: string;
  filename: string;
  documentType: DocumentType;
  mimetype: FileType;
  url: string;
  uploadedAt: string;
  workType?: WorkType;
  wordCount?: number;
  pageCount?: number;
  genre?: Genre;
  manuscriptIsVisible: boolean;
  versionComment?: string;
  appFileMeta: AppFileMeta;
}

export interface AppFileMeta {
  id: string;
  userId: string;
  title: string;
  description: string;
  documentType: DocumentType;
  currentVersionId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  user: User;
  appFile: AppFile[];
  readingFeedback: ReadingFeedback[];
  authorAppFileMeta: AuthorAppFileMeta[];
}

export interface AuthorAppFileMeta {
  id: string;
  readingAuthorId: string;
  appFileMetaId: string;
  createdAt: string;
  readingAuthor: ReadingAuthor;
  appFileMeta: AppFileMeta;
}

export interface CollaboratorRequest {
  id: string;
  userId: string;
  collaboratorId: string;
  status: JoinRequestStatus;
  createdAt: string;
  updatedAt: string;
  user: User;
  collaboratorUser: User;
}

export interface Group {
  id: string;
  creatorUserId: string;
  groupType: GroupType;
  name: string;
  description?: string;
  imageUrl?: string;
  websiteUrl?: string;
  createdAt: string;
  updatedAt: string;
  groupAddress: GroupAddress[];
  groupUser: GroupUser[];
  groupNews: GroupNews[];
  reading: Reading[];
  groupUrl: GroupUrl[];
  user: User;
  joinRequests: JoinRequest[];
}

export interface GroupAddress {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  groupId: string;
  group?: Group;
  reading?: Reading;
}

export interface GroupNews {
  id: string;
  groupId: string;
  title: string;
  content?: string;
  postedAt: string;
  archived: boolean;
  group: Group;
}

export interface GroupUser {
  id: string;
  userId: string;
  groupId: string;
  isAdmin: boolean;
  invitedBy?: string;
  createdAt: string;
  user: User;
  group: Group;
}

export interface GroupUrl {
  id: string;
  url: string;
  groupId: string;
  urlType: UrlType;
  createdAt: string;
  group?: Group;
}

export interface JoinRequest {
  id: string;
  userId: string;
  groupId: string;
  status: JoinRequestStatus;
  createdAt: string;
  updatedAt: string;
  user: User;
  group: Group;
}

export interface Reading {
  id: string;
  name: string;
  groupId: string;
  createdAt: string;
  createdUserId: string;
  readingDate?: string;
  readingStartTime?: string;
  readingEndTime?: string;
  readingAddressId?: string;
  submissionDeadline?: string;
  spotsOpen: number;
  description: string;
  minDaysBetweenReads: number;
  maxConsecutiveReads: number;
  scheduledType: ReadingScheduleType;
  user: User;
  readingAuthor: ReadingAuthor[];
  group: Group;
  groupAddress?: GroupAddress;
}

export interface ReadingAuthor {
  id: string;
  readingId: string;
  authorId: string;
  joinedAt: string;
  reading: Reading;
  user: User;
  authorAppFileMeta?: AuthorAppFileMeta;
  readingFeedback: ReadingFeedback[];
}

export interface ReadingFeedback {
  id: string;
  readingAuthorId: string;
  feedbackUserId: string;
  feedbackFileId: string;
  createdAt: string;
  updatedAt: string;
  readingAuthor: ReadingAuthor;
  readingFeedbackComment: ReadingFeedbackComment[];
  appFile: AppFileMeta;
  user: User;
}

export interface ReadingFeedbackComment {
  id: string;
  readingAuthorId: string;
  readingFeedbackId: string;
  source: CommentSource;
  commentText: string;
  targetText: string;
  readingFeedback: ReadingFeedback;
}

export interface User {
  id: string;
  superTokensId: string;
  email: string;
  role: Role;
  username: string;
  createdAt: string;
  updatedAt: string;
  userProfile?: UserProfile;
  groupUser: GroupUser[];
  group: Group[];
  reading: Reading[];
  appFileMetas: AppFileMeta[];
  urls: UserUrl[];
  joinRequests: JoinRequest[];
  readingFeedback: ReadingFeedback[];
  readingAuthor: ReadingAuthor[];
  userInviter: UserCollaborator[];
  userCollaborator: UserCollaborator[];
  userRequestor: CollaboratorRequest[];
  collaboratorUserRequestor: CollaboratorRequest[];
}

export interface UserCollaborator {
  id: string;
  userId: string;
  collaboratorId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  collaboratorUser: User;
}

export interface UserProfile {
  id: string;
  user: User;
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
}

export interface UserSearch {
  userId: string;
  fullName?: string;
  bio?: string;
}

export interface UserUrl {
  id: string;
  url: string;
  userId: string;
  urlType: UrlType;
  createdAt: string;
  user?: User;
}

