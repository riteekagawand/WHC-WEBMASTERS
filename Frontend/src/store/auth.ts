import { atom, selector } from "recoil";
import axios from "axios";

// Define a User type
interface User {
  id: string;
  fullName: string;
  email: string;
}

// Define the type for the token state
export const tokenState = atom<string | null>({
  key: "tokenState",
  default: localStorage.getItem("token"),
});

export const userState = selector<User | null>({
  key: "authState",
  get: async ({ get }) => {
    const token = get(tokenState);

    if (!token) return null;

    try {
      const { data } = await axios.get<{ user: User }>(
        `${import.meta.env.VITE_BASE_URL}/api/user/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data?.user;
    } catch (error) {
      return null;
    }
  },
});

export const loggedInState = selector<boolean>({
  key: "loggedInState",
  get: ({ get }) => {
    const token = get(tokenState);
    const user = get(userState);
    return Boolean(token && user);
  },
});
