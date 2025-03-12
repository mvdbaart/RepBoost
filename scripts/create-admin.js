// Script to create an admin user via the Supabase Edge Function

async function createAdmin() {
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error(
      "Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.",
    );
    process.exit(1);
  }

  const email = "mvdbaart@gmail.com";
  const password = "password123"; // You should use a secure password in production

  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/create_admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Admin user created successfully:", data);
    } else {
      console.error("Failed to create admin user:", data.error);
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

createAdmin();
