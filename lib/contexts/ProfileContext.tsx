"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { useSession } from "next-auth/react";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveProfileData: (p: Profile, c: ContactItem[], s: any[]) => Promise<boolean>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const defaultContacts: ContactItem[] = [];

const emptyProfile = {
  id: "",
  userId: "",
  slug: "",
  displayName: "",
  jobTitle: "",
  company: "",
  bio: "",
  avatarUrl: "",
  coverUrl: "",
  logoUrl: "",
  publicEmail: "",
  publicPhone: "",
  publicWhatsApp: "",
  linkedInUrl: "",
  whatsAppCountryCode: "",
  whatsAppNumber: "",
  isPrimary: true,
  visibility: "public",
  plan: "free",
} as unknown as Profile;

export function ProfileProvider({ 
  children, 
  initialData 
}: { 
  children: ReactNode,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: { profile: Profile; contacts: ContactItem[]; sections: any[] }
}) {
  const [profile, setProfile] = useState<Profile>(initialData?.profile || emptyProfile);
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
            if (data.profile.contactItems && Array.isArray(data.profile.contactItems)) {
              setContacts(data.profile.contactItems);
            } else if (data.profile.contacts && data.profile.contacts.length > 0 && data.profile.contacts[0].type) {
              // Backward compatibility just in case
              setContacts(data.profile.contacts);
            }
            if (data.profile.sections) setSections(data.profile.sections);
          }
          // Set to false after loading from API to allow subsequent user edits to trigger save
          setTimeout(() => { isFirstFetch.current = false; }, 500);
        })
        .catch((err) => console.error("Failed to load profile", err));
    }
  }, [status, initialData]);

  const isInitialMount = useRef(true);
  const isFirstFetch = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // We want to avoid saving the sections right after they are fetched for the first time
    if (isFirstFetch.current) {
      return;
    }
    
    if (status === "authenticated" && !initialData && profile.id) {
      saveProfileData(profile, contacts, sections);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveProfileData = async (newProfile: Profile, newContacts: ContactItem[], newSections: any[]) => {
    try {
      const res = await fetch("/api/profile/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: newProfile,
          contacts: newContacts,
          sections: newSections,
        }),
      });
      if (!res.ok) throw new Error("Failed to save profile");
      const data = await res.json();
      if (data.profile) {
        setProfile((prev) => ({ ...prev, ...data.profile }));
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, contacts, setContacts, sections, setSections, saveProfileData }}>
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
