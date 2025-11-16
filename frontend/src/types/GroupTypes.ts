import { User } from './UserTypes';
import { Url } from './UrlTypes';

enum GroupType {
  WRITING
}

export interface Group {
  id: string;
  creatorUserId: string;  
  groupType: GroupType;
  name: string;
  description: string;
  imageUrl?: string;
  websiteUrl?: string;
  createdAt: string;
  updatedAt: string;
  groupsAddresses?: GroupAddresses[];
  groupsUsers?: GroupUsers[];
  newsItems?: GroupNews[];
  events?: GroupEvents[];
  groupsUrls?: GroupUrls[];          
}

export interface GroupAddresses {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  groupId: string;  
  group: Group;
}

export interface GroupEvents {
  id: string;
  groupId: string;
  eventType: string;
  eventUserType: string;
  eventDate: string;
  submissionDeadline: string;
  minDaysBetweenReads: number;
  maxConsecutiveReads: number;
  createdAt: string;
  group: Group;
  signups: string;//EventSignups[]
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

export interface GroupUsers {
  id: string;
  userId: string;
  groupId: string;
  isAdmin: string;
  invitedBy: string;
  createdAt: string;
  users: User[];
  group:Group;
}

export interface GroupUrls {
  id: string;
  url: string;
  groupId: string;
  urlType: Url;
  createdAt: string;
  group: Group;
}