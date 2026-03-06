export type RequestLike = {
  getHeader?: (key: string) => string | undefined;

  // Depending on framework, these may or may not exist
  ip?: string;
  headers?: Record<string, string | string[] | undefined>;

  // We'll stash these in middleware (Express) and can also attach them to ST req objects
  deviceId?: string;
  requestId?: string;
};

