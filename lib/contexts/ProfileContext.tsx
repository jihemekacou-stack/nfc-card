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

export function ProfileProvider({ 
  children, 
  initialData 
}: { 
  children: ReactNode,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: { profile: Profile; contacts: ContactItem[]; sections: any[] }
}) {
  const [profile, setProfile] = useState<Profile>(initialData?.profile || mockProfile);
  const [contacts, setContacts] = useState<ContactItem[]>(initialData?.contacts || defaultContacts);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sections, setSections] = useState<any[]>(initialData?.sections || []);
  const { status } = useSession();

  useEffect(() => {
    // Si on a déjà initialData (ex: profil public), on ne fetch pas /api/profile/me
    if (initialData) return;

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
  }, [status, initialData]);

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
