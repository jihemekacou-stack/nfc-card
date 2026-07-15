import { Profile, ProfileSection, Contact } from '../types';

export const mockProfile: Profile = {
  id: 'mock-profile-1',
  userId: 'mock-user-1',
  slug: '',
  displayName: '',
  jobTitle: '',
  company: '',
  publicEmail: '',
  plan: 'free',
  visibility: 'public',
  isPrimary: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockSections: ProfileSection[] = [];

export const mockContacts: Contact[] = [];
