// AUTO-GENERATED — DO NOT EDIT
// Generated via parsePrismaSchema()

export type CommentSource = "DOCX" | "MANUAL";

export type DocumentType = "MANUSCRIPT" | "VERSION" | "FEEDBACK";

export type FileType = "DOCX" | "PDF";

export type EventType = "READING" | "RETREAT";

export type Genre = "FANTASY" | "HISTORICAL" | "HORROR" | "LITERARY" | "MYSTERY" | "POEM" | "ROMANCE" | "SCIENCEFICTION";

export type GroupType = "WRITING" | "PERSONAL";

export type GroupRole = "OWNER" | "MEMBER" | "ADMIN" | "READER";

export type JoinRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export type NotificationType = "GROUP_JOIN_REQUEST" | "GROUP_INVITE" | "COLLAB_REQUEST" | "READING_FEEDBACK";

export type ParticipantType = "AUTHOR" | "REVIEWER";

export type ReadingScheduleType = "SCHEDULED" | "UNSCHEDULED";

export type Role = "ADMIN" | "AUTHOR" | "EDITOR" | "READER";

export type UrlOwnerType = "USER" | "WRITINGGROUP";

export type UrlType = "AUDIO" | "FACEBOOK" | "IMAGE" | "LINKEDIN" | "MEETUP" | "SUBSTACK" | "WEBSITE" | "YOUTUBE";

export type WorkType = "FLASHFICTION" | "NOVEL" | "NOVELLA" | "NOVELETTE" | "PLAY" | "SCREENPLAY" | "SERIALIZEDFICTION" | "SHORTSTORY";

export type SubscriptionTier = "FREE" | "PRO_GROUP" | "PROFESSIONAL";

export interface AppFile {
  id: string;
  appFileMetaId: string;
  name: string;
  version: number;
  userId: string;
  filename: string;
  documentType: DocumentType;
  mimetype: FileType;
  url: string;
  sizeBytes?: number;
  uploadedAt: string;
  workType?: WorkType;
  wordCount?: number;
  pageCount?: number;
  genre?: Genre;
  manuscriptIsVisible: boolean;
  versionComment?: string;
  createdAt: string;
  appFileMeta: AppFileMeta;
  readingSubmission: ReadingSubmission[];
  fileFeedback: FileFeedback[];
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
  groupInvite: GroupInvite[];
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

export interface GroupInvite {
  id: string;
  groupId: string;
  email: string;
  role: GroupRole;
  tokenHash: string;
  expiresAt: string;
  acceptedAt?: string;
  createdAt: string;
  group: Group;
}

export interface GroupNews {
  id: string;
  groupId: string;
  content?: string;
  postedAt: string;
  archived: boolean;
  group: Group;
}

export interface GroupUser {
  id: string;
  userId: string;
  groupId: string;
  role: GroupRole;
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

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  entityId: string;
  message: string;
  createdAt: string;
  readAt?: string;
  href: string;
}

export interface Subscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  status: string;
  currentPeriodEnd?: string;
  createdAt: string;
  updatedAt: string;
  user: User;
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
  user: User;
  readingParticipant: ReadingParticipant[];
  group: Group;
  groupAddress?: GroupAddress;
  readingSubmission: ReadingSubmission[];
}

export interface FileFeedback {
  id: string;
  reviewerUserId: string;
  appFileId: string;
  createdAt: string;
  reviewerUser: User;
  appFile: AppFile;
  fileFeedbackComment: FileFeedbackComment[];
}

export interface FileFeedbackComment {
  id: string;
  fileFeedbackId: string;
  reviewerUserId: string;
  source: CommentSource;
  commentText: string;
  isResolved: boolean;
  createdAt: string;
  updatedAt: string;
  fileFeedback: FileFeedback;
  reviewerUser: User;
  targets: FileFeedbackCommentTarget[];
}

export interface FileFeedbackCommentTarget {
  id: string;
  commentId: string;
  paragraphId: string;
  from: number;
  to: number;
  targetText: string;
  createdAt: string;
  comment: FileFeedbackComment;
}

export interface ReadingParticipant {
  id: string;
  readingId: string;
  userId: string;
  role: ParticipantType;
  joinedAt: string;
  reading: Reading;
  user: User;
  readingSubmission?: ReadingSubmission;
}

export interface ReadingSubmission {
  id: string;
  readingId: string;
  participantId: string;
  appFileId: string;
  submittedAt: string;
  reading: Reading;
  participant: ReadingParticipant;
  appFile: AppFile;
}

export interface User {
  id: string;
  superTokensId: string;
  email: string;
  role: Role;
  username: string;
  proTrialUsedAt?: string;
  createdAt: string;
  updatedAt: string;
  subscription?: Subscription;
  userProfile?: UserProfile;
  groupUser: GroupUser[];
  group: Group[];
  reading: Reading[];
  appFileMetas: AppFileMeta[];
  urls: UserUrl[];
  joinRequests: JoinRequest[];
  readingParticipant: ReadingParticipant[];
  userInviter: UserCollaborator[];
  userCollaborator: UserCollaborator[];
  userRequestor: CollaboratorRequest[];
  collaboratorUserRequestor: CollaboratorRequest[];
  fileFeedback: FileFeedback[];
  fileFeedbackComment: FileFeedbackComment[];
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
  firstName: string;
  lastName: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
}

export interface UserUrl {
  id: string;
  url: string;
  userId: string;
  urlType: UrlType;
  createdAt: string;
  user?: User;
}

