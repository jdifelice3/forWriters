const LEGACY_ACTIVE_GROUP_STORAGE_KEY = "fw:activeGroupId";
const ACTIVE_GROUP_STORAGE_PREFIX = "fw:activeGroupId";

type SessionRequestScope = {
  userId: string;
  controller: AbortController;
};

let currentScope: SessionRequestScope | null = null;

export function activateSessionRequestScope(userId: string): AbortSignal {
  if (
    !currentScope ||
    currentScope.userId !== userId ||
    currentScope.controller.signal.aborted
  ) {
    currentScope?.controller.abort();
    currentScope = {
      userId,
      controller: new AbortController(),
    };
  }

  localStorage.removeItem(LEGACY_ACTIVE_GROUP_STORAGE_KEY);
  return currentScope.controller.signal;
}

export function suspendSessionRequests(userId?: string): void {
  if (!currentScope || (userId && currentScope.userId !== userId)) return;
  currentScope.controller.abort();
}

export function getSessionRequestSignal(): AbortSignal | undefined {
  return currentScope?.controller.signal;
}

export function getActiveGroupStorageKey(userId: string): string {
  return `${ACTIVE_GROUP_STORAGE_PREFIX}:${userId}`;
}

export function clearLegacyActiveGroupStorage(): void {
  localStorage.removeItem(LEGACY_ACTIVE_GROUP_STORAGE_KEY);
}
