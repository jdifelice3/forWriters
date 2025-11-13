export const extractLinks = (text: string): string [] => {
    const urlPattern = /https?:\/\/[^\s/$.?#].[^\s]*/g;
    const links = text.match(urlPattern);

    return links || [];
}

export const extractEmailAddresses = (text: string): string [] => {
    const emailPattern = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g;
    const emails: string[] | null = text.match(emailPattern);

    return emails || [];
}