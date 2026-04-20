"use client";

import useAuth from "./useAuth";

export default function RoleGuard({
  allow,
  fallback,
  children,
}) {
  const { role } = useAuth();
  const isAllowed = allow.includes(role);

  if (!isAllowed) {
    return (
      fallback || (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
          You do not have permission to access this section.
        </div>
      )
    );
  }

  return children;
}
