"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
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
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile/me")
        .then((res) => res.json())
        .then((data) => {
          if (data.profile) {
            setProfile((prev) => ({ ...prev, ...data.profile }));
            if (data.profile.contacts) setContacts(data.profile.contacts);
            if (data.profile.sections) setSections(data.profile.sections);
          }
        })
        .catch((err) => console.error("Failed to load profile", err));
    }
  }, [status]);

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
