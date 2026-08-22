import { createContext, useContext, useState, type ReactNode } from 'react';

export type Route =
  | { name: 'dashboard' }
  | { name: 'visualizer'; topic: string }
  | { name: 'algorithms' }
  | { name: 'about' };

type Ctx = {
  route: Route;
  go: (r: Route) => void;
};

const NavContext = createContext<Ctx | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>({ name: 'dashboard' });
  return <NavContext.Provider value={{ route, go: setRoute }}>{children}</NavContext.Provider>;
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error('useNav must be used within NavProvider');
  return ctx;
}
