// Mock profile service

export interface Profile {
  id: string;
  full_name?: string;
  company_name?: string;
  avatar_url?: string;
  website?: string;
  created_at: string;
  updated_at: string;
}

export async function getProfile() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Get mock user from localStorage
  const mockUserStr = localStorage.getItem("mockUser");
  if (!mockUserStr) throw new Error("User not authenticated");

  const mockUser = JSON.parse(mockUserStr);

  // Return mock profile
  return {
    id: mockUser.id,
    full_name: mockUser.user_metadata?.name || "Admin User",
    company_name: "RepBooster",
    avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${mockUser.id}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export async function updateProfile(
  profile: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>,
) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Get mock user from localStorage
  const mockUserStr = localStorage.getItem("mockUser");
  if (!mockUserStr) throw new Error("User not authenticated");

  const mockUser = JSON.parse(mockUserStr);

  // Update user metadata if name is provided
  if (profile.full_name) {
    mockUser.user_metadata = {
      ...mockUser.user_metadata,
      name: profile.full_name,
    };
    localStorage.setItem("mockUser", JSON.stringify(mockUser));
  }

  // Return updated profile
  return {
    id: mockUser.id,
    ...profile,
    full_name:
      profile.full_name || mockUser.user_metadata?.name || "Admin User",
    company_name: profile.company_name || "RepBooster",
    avatar_url:
      profile.avatar_url ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${mockUser.id}`,
    updated_at: new Date().toISOString(),
  };
}

export async function uploadAvatar(file: File) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Get mock user from localStorage
  const mockUserStr = localStorage.getItem("mockUser");
  if (!mockUserStr) throw new Error("User not authenticated");

  const mockUser = JSON.parse(mockUserStr);

  // In a real implementation, we would upload the file to storage
  // For now, just generate a random avatar
  const seed = Math.random().toString(36).substring(7);
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

  // Update profile with new avatar URL
  await updateProfile({ avatar_url: avatarUrl });

  return avatarUrl;
}
