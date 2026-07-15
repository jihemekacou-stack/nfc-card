export type Plan = 'free' | 'pro' | 'business';
export type Visibility = 'public' | 'unlisted' | 'private';
export type SectionType = 'links' | 'socials' | 'text' | 'gallery' | 'video' | 'calendar';

export interface Profile {
  id: string;
  userId: string;
  organizationId?: string | null;
  slug: string;
  displayName: string;
  jobTitle?: string;
  company?: string;
  bio?: string;
  avatarUrl?: string;
  coverUrl?: string;
  logoUrl?: string;
  linkedInUrl?: string;
  whatsAppCountryCode?: string;
  whatsAppNumber?: string;
  publicEmail?: string;
  publicPhone?: string;
  plan: Plan;
  visibility: Visibility;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileSection {
  id: string;
  profileId: string;
  type: SectionType;
  title: string;
  content: Record<string, unknown>;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  ownerProfileId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  source: 'scan' | 'manual' | 'exchange' | 'import';
  createdAt: string;
  updatedAt: string;
}
