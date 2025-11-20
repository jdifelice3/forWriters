import { User } from './User';
import { Url } from './Url';
import { Reading } from './Reading';

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
  groupAddress?: GroupAddress[];
  groupUsers: GroupUser[];
  newsItems?: GroupNews[];
  reading?: Reading[];
  groupUrl?: GroupUrl[];          
}

export interface GroupAddress {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  groupId: string;  
  group: Group;
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
  isAdmin: string;
  invitedBy: string;
  createdAt: string;
  users: User[];
  group:Group;
}

export interface GroupUrl {
  id: string;
  url: string;
  groupId: string;
  urlType: Url;
  createdAt: string;
  group: Group;
}