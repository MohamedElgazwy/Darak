"use client";

import { useMemo } from "react";
import { DEFAULT_USER, USER_ROLES } from "./constants";

export function getStoredUser() {
  if (typeof window === "undefined") return DEFAULT_USER;

  try {
    const parsed = JSON.parse(localStorage.getItem("user") || "null");
    if (!parsed) return DEFAULT_USER;

    return {
      ...DEFAULT_USER,
      ...parsed,
    };
  } catch {
    return DEFAULT_USER;
  }
}

export default function useAuth() {
  const user = useMemo(() => getStoredUser(), []);

  return {
    user,
    role: user.role,
    isSeeker: user.role === USER_ROLES.SEEKER,
    isOwner: user.role === USER_ROLES.OWNER,
    isAgency: user.role === USER_ROLES.AGENCY,
    isAdmin: user.role === USER_ROLES.ADMIN,
  };
}
