import { createContext, useContext, useState } from 'react';

export type Audience = 'all' | 'tenant' | 'sponsor' | 'event';

export const AUDIENCE_CONFIG = {
  all:     { label: 'All Visitors',     emoji: '🌐', color: '#3b82f6', desc: 'Full experience' },
  tenant:  { label: 'Retail Tenant',    emoji: '🏪', color: '#f59e0b', desc: 'Leasing focused' },
  sponsor: { label: 'Brand Sponsor',    emoji: '🎯', color: '#8b5cf6', desc: 'Sponsorship focused' },
  event:   { label: 'Event Producer',   emoji: '🎤', color: '#10b981', desc: 'Venue & events' },
};

interface AudienceCtx {
  audience: Audience;
  setAudience: (a: Audience) => void;
}

const Ctx = createContext<AudienceCtx>({ audience: 'all', setAudience: () => {} });
export const useAudience = () => useContext(Ctx);

export function AudienceProvider({ children, initialAudience = 'all' }: { children: React.ReactNode, initialAudience?: Audience }) {
  const [audience, setAudience] = useState<Audience>(initialAudience);
  return <Ctx.Provider value={{ audience, setAudience }}>{children}</Ctx.Provider>;
}
