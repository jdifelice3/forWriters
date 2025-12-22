import { UrlType } from "./domain-types";
export enum Url {
    AUDIO = "AUDIO",
    FACEBOOK = 'FACEBOOK',
    IMAGE = "IMAGE",
    LINKEDIN = "LINKEDIN",
    MEETUP = "MEETUP",
    SUBSTACK = "SUBSTACK",
    WEBSITE = "WEBSITE",
    YOUTUBE = "YOUTUBE",
}

export const UrlTypeLabels: Record<Url, string> = {
    [Url.AUDIO]: 'Audio',
    [Url.FACEBOOK]: 'Facebook',
    [Url.IMAGE]: 'Image',
    [Url.LINKEDIN]: 'LinkedIn',
    [Url.MEETUP]: "Meet Up",
    [Url.SUBSTACK]: "Substack",
    [Url.WEBSITE]: "Website",
    [Url.YOUTUBE]: "Youtube"
};

export const getUrlLabel = (urlType: UrlType): string => {
  switch(urlType) {
    case Url.AUDIO:
      return 'Audio';
    case Url.FACEBOOK:
      return 'Facebook';
    case Url.IMAGE:
      return 'Image';
    case Url.LINKEDIN:
      return 'LinkedIn';
    case Url.MEETUP:
      return 'Meet Up';
    case Url.SUBSTACK:
      return 'Substack';
    case Url.WEBSITE:
      return 'Website';
    case Url.YOUTUBE:
      return 'YouTube';
    default:
      return 'Unknown Url Type';
  }
}
