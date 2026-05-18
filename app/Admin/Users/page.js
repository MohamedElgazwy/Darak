"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { userApi } from "../services/api";

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Ensure authenticated; if no token redirect to login
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken") || localStorage.getItem("token");
      if (!token) {
        router.push("/Auth/login");
        return;
      }
    }
    const fetchUsers = async () => {
      try {
        const data = await userApi.listUsers();
        setUsers(data.items || []);
        setError("");
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-gray-600">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">User Management</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">First Name</th>
            <th className="border p-2 text-left">Last Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Roles</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id || u.userId} className="hover:bg-gray-50">
              <td className="border p-2">{u.id || u.userId}</td>
              <td className="border p-2">{u.firstName || u.first_name}</td>
              <td className="border p-2">{u.lastName || u.last_name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{Array.isArray(u.roles) ? u.roles.join(", ") : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
