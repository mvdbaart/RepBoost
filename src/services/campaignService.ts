import { mockCampaigns } from "./mockData";

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  status: "active" | "paused" | "scheduled" | "completed";
  channel: "email" | "sms" | "whatsapp";
  sent_count: number;
  opened_count: number;
  responded_count: number;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export async function getCampaigns() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [...mockCampaigns].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

export async function getCampaignById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const campaign = mockCampaigns.find((campaign) => campaign.id === id);

  if (!campaign) {
    throw new Error(`Campaign with id ${id} not found`);
  }

  return {
    ...campaign,
    campaign_recipients: [],
  };
}

export async function createCampaign(
  campaign: Omit<Campaign, "id" | "created_at" | "updated_at">,
) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newCampaign = {
    ...campaign,
    id: `${mockCampaigns.length + 1}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  mockCampaigns.push(newCampaign as any);

  return newCampaign;
}

export async function updateCampaignStatus(
  id: string,
  status: Campaign["status"],
) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const campaignIndex = mockCampaigns.findIndex(
    (campaign) => campaign.id === id,
  );

  if (campaignIndex === -1) {
    throw new Error(`Campaign with id ${id} not found`);
  }

  mockCampaigns[campaignIndex] = {
    ...mockCampaigns[campaignIndex],
    status,
    updated_at: new Date().toISOString(),
  };

  return mockCampaigns[campaignIndex];
}

export async function addCampaignRecipients(
  campaignId: string,
  recipients: Array<{
    customer_name: string;
    customer_email?: string;
    customer_phone?: string;
  }>,
) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const campaignIndex = mockCampaigns.findIndex(
    (campaign) => campaign.id === campaignId,
  );

  if (campaignIndex === -1) {
    throw new Error(`Campaign with id ${campaignId} not found`);
  }

  // In a real implementation, we would store these recipients
  // For now, just return them with IDs
  return recipients.map((recipient, index) => ({
    id: `${campaignId}-${index}`,
    campaign_id: campaignId,
    ...recipient,
    sent: false,
    opened: false,
    responded: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}
