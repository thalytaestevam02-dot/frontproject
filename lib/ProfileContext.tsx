'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ProfileContextType {
  profileImage: string;
  setProfileImage: (image: string) => void;

  description: string;
  setDescription: (description: string) => void;

  isLoaded: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);


export function ProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [profileImage, setProfileImage] = useState("/professor1.jpeg");

  const [description, setDescription] = useState(
    "Doutor em Interação Humano-Computador com mais de 15 anos de experiência em consultoria para grandes corporações. Lidera o núcleo de Design de Interface do Portal ENIAC."
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
  const savedImage = localStorage.getItem("profileImage");
  const savedDescription = localStorage.getItem("professorDescription");

  if (savedImage) {
    setProfileImage(savedImage);
  }

  if (savedDescription) {
    setDescription(savedDescription);
  }

  setIsLoaded(true);
}, []);

useEffect(() => {
  localStorage.setItem("profileImage", profileImage);
}, [profileImage]);

useEffect(() => {
  localStorage.setItem("professorDescription", description);
}, [description]);

return (
  <ProfileContext.Provider
    value={{
      profileImage,
      setProfileImage,
      description,
      setDescription,
      isLoaded,
    }}
  >
    {children}
  </ProfileContext.Provider>
 );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile deve ser usado dentro de um ProfileProvider");
  }

  return context;
}

export default ProfileContext;