import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";

type MockAuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ error: Error | null; data: { session: Session | null } }>;
  signUp: (
    email: string,
    password: string,
  ) => Promise<{ error: Error | null; data: { session: Session | null } }>;
  signOut: () => Promise<void>;
};

const MockAuthContext = createContext<MockAuthContextType | undefined>(
  undefined,
);

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for mock user in localStorage
    const mockUserStr = localStorage.getItem("mockUser");
    if (mockUserStr) {
      try {
        const mockUser = JSON.parse(mockUserStr);
        const mockSession = { user: mockUser } as Session;
        setSession(mockSession);
        setUser(mockUser as User);
      } catch (e) {
        console.error("Error parsing mock user:", e);
        localStorage.removeItem("mockUser");
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // For demo purposes, accept any credentials with mvdbaart@gmail.com
    if (email === "mvdbaart@gmail.com") {
      const mockUser = {
        id: "1",
        email,
        user_metadata: { name: "Admin User" },
        app_metadata: { is_admin: true },
      } as User;
      const mockSession = { user: mockUser } as Session;

      localStorage.setItem("mockUser", JSON.stringify(mockUser));
      setSession(mockSession);
      setUser(mockUser);

      return { data: { session: mockSession }, error: null };
    }

    return {
      data: { session: null },
      error: new Error(
        "Invalid credentials. Use mvdbaart@gmail.com with any password for demo.",
      ),
    };
  };

  const signUp = async (email: string, password: string) => {
    const mockUser = {
      id: "2",
      email,
      user_metadata: { name: "New User" },
    } as User;

    localStorage.setItem("mockUser", JSON.stringify(mockUser));

    return {
      data: { session: null, user: mockUser },
      error: null,
    };
  };

  const signOut = async () => {
    localStorage.removeItem("mockUser");
    setSession(null);
    setUser(null);
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <MockAuthContext.Provider value={value}>
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockAuth() {
  const context = useContext(MockAuthContext);
  if (context === undefined) {
    throw new Error("useMockAuth must be used within a MockAuthProvider");
  }
  return context;
}
