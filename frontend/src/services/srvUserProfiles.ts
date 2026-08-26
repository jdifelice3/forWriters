import { User, UserProfile } from "../types/UserTypes";

async function responseError(res: Response, fallback: string) {
  try {
    const payload = await res.json();
    return new Error(payload.error || fallback);
  } catch {
    return new Error(fallback);
  }
}

export const getUserProfile = async (): Promise<User> => {
  const res = await fetch(`${import.meta.env.VITE_API_HOST}/api/users/userprofile`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw await responseError(res, "Unable to load your profile.");
  return res.json();
};

export const updateUserProfile = async (
  firstName: string,
  lastName: string,
  bio: string
): Promise<UserProfile> => {
  const res = await fetch(`${import.meta.env.VITE_API_HOST}/api/users/userprofile`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, bio }),
  });
  if (!res.ok) throw await responseError(res, "Unable to save your profile.");
  return res.json();
};

export const uploadUserAvatar = async (file: File) => {
  const form = new FormData();
  form.append("avatar", file);

  const res = await fetch(
    `${import.meta.env.VITE_API_HOST}/api/users/userprofile/avatar`,
    {
      method: "POST",
      credentials: "include",
      body: form,
    }
  );
  if (!res.ok) throw await responseError(res, "Unable to upload your profile image.");
  return res.json() as Promise<{ avatarUrl: string; userProfile: UserProfile }>;
};
