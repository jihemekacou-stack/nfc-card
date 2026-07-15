"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { mockProfile } from "@/lib/data/mock";
import { Profile } from "@/lib/types";

export type ContactItem = {
  id: number;
  type: string;
  label: string;
  value: string;
  countryCode?: string;
  iconColor?: string;
  bg?: string;
};

type ProfileContextType = {
  profile: Profile;
  setProfile: (profile: Profile) => void;
  contacts: ContactItem[];
  setContacts: (contacts: ContactItem[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sections: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSections: (sections: any[]) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const defaultContacts: ContactItem[] = [];

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(mockProfile);
  const [contacts, setContacts] = useState<ContactItem[]>(defaultContacts);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sections, setSections] = useState<any[]>([]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, contacts, setContacts, sections, setSections }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
