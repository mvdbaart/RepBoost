import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { hashPassword, verifyPassword } from "@/lib/utils";

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
    // For admin user, require specific password
    if (email === "mvdbaart@gmail.com") {
      // Check if there's a stored user with a custom password
      const storedUserStr = localStorage.getItem("mockUser");
      let passwordHash = await hashPassword("password123"); // Default admin password hash
      let storedUser = null;

      if (storedUserStr) {
        try {
          storedUser = JSON.parse(storedUserStr);
          // If the stored user has the same email and a custom password hash, use that
          if (storedUser.email === email && storedUser.passwordHash) {
            passwordHash = storedUser.passwordHash;
          }
        } catch (e) {
          console.error("Error parsing stored user:", e);
        }
      }

      // Check if provided password matches the stored hash
      const passwordMatches = await verifyPassword(password, passwordHash);

      if (passwordMatches) {
        const mockUser = {
          id: "1",
          email,
          passwordHash, // Store the password hash for future reference
          user_metadata: storedUser?.user_metadata || { name: "Admin User" },
          app_metadata: { is_admin: true },
        } as User;
        const mockSession = { user: mockUser } as Session;

        localStorage.setItem("mockUser", JSON.stringify(mockUser));
        setSession(mockSession);
        setUser(mockUser);

        return { data: { session: mockSession }, error: null };
      } else {
        return {
          data: { session: null },
          error: new Error("Invalid password for admin account."),
        };
      }
    }

    // Check if there's a stored user with this email
    const storedUserStr = localStorage.getItem("mockUser");
    if (storedUserStr) {
      try {
        const storedUser = JSON.parse(storedUserStr);
        if (storedUser.email === email && storedUser.passwordHash) {
          const passwordMatches = await verifyPassword(
            password,
            storedUser.passwordHash,
          );
          if (passwordMatches) {
            const mockSession = { user: storedUser } as Session;
            setSession(mockSession);
            setUser(storedUser as User);
            return { data: { session: mockSession }, error: null };
          }
        }
      } catch (e) {
        console.error("Error parsing stored user:", e);
      }
    }

    return {
      data: { session: null },
      error: new Error(
        "Invalid credentials. Use mvdbaart@gmail.com with the correct password or sign up for a new account.",
      ),
    };
  };

  const signUp = async (email: string, password: string) => {
    // Check if email is already in use (admin account)
    if (email === "mvdbaart@gmail.com") {
      return {
        data: { session: null, user: null },
        error: new Error("This email is already in use."),
      };
    }

    // Check if there's already a user with this email
    const storedUserStr = localStorage.getItem("mockUser");
    if (storedUserStr) {
      try {
        const storedUser = JSON.parse(storedUserStr);
        if (storedUser.email === email) {
          return {
            data: { session: null, user: null },
            error: new Error("This email is already in use."),
          };
        }
      } catch (e) {
        console.error("Error parsing stored user:", e);
      }
    }

    // Hash the password before storing
    const passwordHash = await hashPassword(password);

    // Generate a unique ID
    const userId = `user_${Date.now()}`;

    const mockUser = {
      id: userId,
      email,
      passwordHash, // Store the hashed password
      user_metadata: { name: "New User" },
      app_metadata: { is_admin: false },
    } as User;

    // Store the user in localStorage
    localStorage.setItem(`user_${email}`, JSON.stringify(mockUser));

    // Auto-login the new user
    const mockSession = { user: mockUser } as Session;
    setSession(mockSession);
    setUser(mockUser);

    return {
      data: { session: mockSession, user: mockUser },
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
