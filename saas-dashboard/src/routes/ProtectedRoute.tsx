import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-dev-runtime";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}