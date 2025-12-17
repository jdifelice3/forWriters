import { ReadingsAPI } from "../api/readings";
import { FormInput } from "../types/Reading";

export function useReadingsActions(
  groupId: string,
  userId: string,
  refresh: () => void
) {
  const create = async (input: FormInput, schedule: string) => {
    await ReadingsAPI.create(groupId, input, userId, schedule);
    refresh();
  };

  const signup = async (readingId: string) => {
    await ReadingsAPI.signup(readingId, userId);
    refresh();
  };

  const withdraw = async (readingId: string) => {
    await ReadingsAPI.withdraw(readingId, userId);
    refresh();
  };

  const remove = async (readingId: string) => {
    await ReadingsAPI.remove(readingId, groupId);
    refresh();
  };

  return { create, signup, withdraw, remove };
}
