"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Development bypass - allow admin access without authentication
    if (requireAdmin) {
      // Check if user has clicked "Admin Access" button or has admin flag in localStorage
      const hasAdminAccess = localStorage.getItem('dev_admin_access') === 'true';
      if (!hasAdminAccess) {
        // Show admin access prompt
        const allowAccess = confirm('Development Mode: Click OK to access admin panel');
        if (allowAccess) {
          localStorage.setItem('dev_admin_access', 'true');
        } else {
          router.push('/');
          return;
        }
      }
    }
    setLoading(false);
  }, [requireAdmin, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
