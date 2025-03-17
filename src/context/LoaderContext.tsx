"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface LoaderContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoaderContext = createContext<LoaderContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  // const router = useRouter();

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setTimeout(() => setIsLoading(false), 700); // Delay hiding for smooth transition

  useEffect(() => {
    startLoading(); // Show loader when the route changes
    stopLoading(); // Hide loader after short delay
  }, [pathname]); // Runs on every route change

  return (
    <LoaderContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
