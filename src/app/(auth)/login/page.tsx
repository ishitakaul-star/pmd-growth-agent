"use client";

import { useState, useEffect } from "react";
import { Bot } from "lucide-react";

interface Provider {
  id: string;
  name: string;
  type: string;
}

export default function LoginPage() {
  const [csrfToken, setCsrfToken] = useState("");
  const [providers, setProviders] = useState<Record<string, Provider>>({});
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    // Fetch CSRF token and available providers in parallel
    fetch("/api/auth/csrf")
      .then((r) => r.json())
      .then((d) => setCsrfToken(d.csrfToken))
      .catch(() => {});
    fetch("/api/auth/providers")
      .then((r) => r.json())
      .then((d) => setProviders(d || {}))
      .catch(() => {});
  }, []);

  const hasGoogle = !!providers.google;
  const hasCredentials = !!providers.credentials;

  const handleCredentialsSignIn = (role: string) => {
    if (!csrfToken) return;
    setLoading(role);
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/api/auth/callback/credentials";
    const fields: Record<string, string> = {
      csrfToken,
      role,
      callbackUrl: "/dashboard",
    };
    for (const [k, v] of Object.entries(fields)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = k;
      input.value = v;
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
  };

  const handleGoogleSignIn = () => {
    if (!csrfToken) return;
    setLoading("google");
    // POST to the Google callback to initiate OAuth flow
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/api/auth/signin/google";
    const csrf = document.createElement("input");
    csrf.type = "hidden";
    csrf.name = "csrfToken";
    csrf.value = csrfToken;
    form.appendChild(csrf);
    const cb = document.createElement("input");
    cb.type = "hidden";
    cb.name = "callbackUrl";
    cb.value = "/dashboard";
    form.appendChild(cb);
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-900 p-6">
      <div className="max-w-md w-full fade-up">
        <div className="glass rounded-2xl p-8 text-center">
          <div className="w-14 h-14 rounded-xl bg-intuit-blue flex items-center justify-center mx-auto mb-5">
            <Bot size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            PM&D Growth Agent
          </h1>
          <p className="text-slate-400 text-sm mb-8">
            Career growth, team management, and promotion readiness
          </p>

          {/* Dev mode credentials — show prominently when available */}
          {hasCredentials && (
            <>
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => handleCredentialsSignIn("manager")}
                  disabled={!!loading || !csrfToken}
                  className="flex-1 py-3 rounded-xl bg-intuit-blue text-white text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading === "manager"
                    ? "Signing in..."
                    : "Sign in as Manager"}
                </button>
                <button
                  onClick={() => handleCredentialsSignIn("employee")}
                  disabled={!!loading || !csrfToken}
                  className="flex-1 py-3 rounded-xl bg-slate-600 text-white text-sm font-semibold hover:bg-slate-500 transition disabled:opacity-50"
                >
                  {loading === "employee"
                    ? "Signing in..."
                    : "Sign in as Employee"}
                </button>
              </div>
              <p className="text-[10px] text-blue-300 mb-4">
                Manager sees My Team + RBAC. Employee sees Growth tools only.
              </p>
            </>
          )}

          {/* Google OAuth — only show when configured */}
          {hasGoogle && (
            <>
              {hasCredentials && (
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 border-t border-slate-700" />
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                    or
                  </span>
                  <div className="flex-1 border-t border-slate-700" />
                </div>
              )}
              <button
                onClick={handleGoogleSignIn}
                disabled={!!loading || !csrfToken}
                className="w-full py-3 rounded-xl bg-white text-gray-800 text-sm font-medium hover:bg-gray-100 transition flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {loading === "google"
                  ? "Connecting..."
                  : "Sign in with Google"}
              </button>
            </>
          )}

          {/* Loading state while fetching providers */}
          {!hasCredentials && !hasGoogle && (
            <div className="py-4">
              <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-slate-500 text-xs mt-2">Loading...</p>
            </div>
          )}

          <p className="text-[10px] text-slate-600 mt-6">
            Your data is stored securely. Only you and your manager see your
            profile.
          </p>
        </div>
      </div>
    </div>
  );
}
