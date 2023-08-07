'use client';
import { useGlobalContext } from '@/hooks/Context';
import { useEffect } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  const { selectedKey, setSelectedKey } = useGlobalContext();

  useEffect(() => {
    setSelectedKey('5');
  }, []);

  return <>{children}</>;
}
