"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlLabel = exports.UrlTypeLabels = exports.Url = void 0;
var Url;
(function (Url) {
    Url["AUDIO"] = "AUDIO";
    Url["FACEBOOK"] = "FACEBOOK";
    Url["IMAGE"] = "IMAGE";
    Url["LINKEDIN"] = "LINKEDIN";
    Url["MEETUP"] = "MEETUP";
    Url["SUBSTACK"] = "SUBSTACK";
    Url["WEBSITE"] = "WEBSITE";
    Url["YOUTUBE"] = "YOUTUBE";
})(Url || (exports.Url = Url = {}));
exports.UrlTypeLabels = {
    [Url.AUDIO]: 'Audio',
    [Url.FACEBOOK]: 'Facebook',
    [Url.IMAGE]: 'Image',
    [Url.LINKEDIN]: 'LinkedIn',
    [Url.MEETUP]: "Meet Up",
    [Url.SUBSTACK]: "Substack",
    [Url.WEBSITE]: "Website",
    [Url.YOUTUBE]: "Youtube"
};
const getUrlLabel = (urlType) => {
    switch (urlType) {
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
};
exports.getUrlLabel = getUrlLabel;
