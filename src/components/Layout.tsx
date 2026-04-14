import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

// ── fizx 4×4 favicon block ────────────────────────────────────────────────────
const FizxLogo = () => (
  <svg width="16" height="16" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" style={{ imageRendering: 'pixelated' }}>
    <rect x="0" y="0" width="1" height="1" fill="#34d399"/>
    <rect x="1" y="0" width="1" height="1" fill="#a78bfa"/>
    <rect x="2" y="0" width="1" height="1" fill="#34d399"/>
    <rect x="3" y="0" width="1" height="1" fill="#a78bfa"/>
    <rect x="0" y="1" width="1" height="1" fill="#a78bfa"/>
    <rect x="1" y="1" width="1" height="1" fill="#34d399"/>
    <rect x="2" y="1" width="1" height="1" fill="#a78bfa"/>
    <rect x="3" y="1" width="1" height="1" fill="#34d399"/>
    <rect x="0" y="2" width="1" height="1" fill="#34d399"/>
    <rect x="1" y="2" width="1" height="1" fill="#a78bfa"/>
    <rect x="2" y="2" width="1" height="1" fill="#34d399"/>
    <rect x="3" y="2" width="1" height="1" fill="#a78bfa"/>
    <rect x="0" y="3" width="1" height="1" fill="#a78bfa"/>
    <rect x="1" y="3" width="1" height="1" fill="#34d399"/>
    <rect x="2" y="3" width="1" height="1" fill="#a78bfa"/>
    <rect x="3" y="3" width="1" height="1" fill="#34d399"/>
  </svg>
);

// ── Subdomain footer links ────────────────────────────────────────────────────
const SUBDOMAINS: [string, string][] = [
  ['https://fizx.uk',         'fizx.uk'],
  ['https://glimpse.fizx.uk', 'glimpse'],
  ['https://pulse.fizx.uk',   'pulse'],
  ['https://ln.fizx.uk',      'ln'],
  ['https://stakes.fizx.uk',  'stakes'],
  ['https://sonic.fizx.uk',   'sonic'],
];

// ── Site navigation ───────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'home',     href: '/' },
  { label: 'lnd',      href: null, children: [
    { label: 'lnd + debian', href: '/lnd/debian' },
    { label: 'lnd + ubuntu', href: '/lnd/ubuntu' },
  ]},
  { label: 'phoenixd', href: null, children: [
    { label: 'phoenixd + debian', href: '/phoenixd/debian' },
    { label: 'phoenixd + ubuntu', href: '/phoenixd/ubuntu' },
  ]},
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Nav */}
      <nav className="border-b border-border px-6 py-4 sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="max-w-5xl mx-auto flex items-center justify-between">

          {/* Logo + breadcrumb */}
          <a href="https://fizx.uk" className="flex items-center gap-2" aria-label="fizx.uk">
            <FizxLogo />
            <span className="font-mono text-sm">
              <span className="bg-gradient-to-r from-[#34d399] via-[#a78bfa] to-[#34d399] bg-clip-text text-transparent font-bold">fizx</span>
              <span className="text-muted-foreground">.uk</span>
              <span className="text-muted-foreground/40 ml-1">/ ln</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5">
            {NAV_ITEMS.map(item =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <button className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
                    {item.label}
                  </button>
                  <div className="absolute right-0 mt-2 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                    <div className="bg-background border border-border py-1">
                      {item.children.map(child => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={`block px-4 py-2 font-mono text-[11px] transition-colors ${
                            isActive(child.href)
                              ? 'text-primary'
                              : 'text-muted-foreground hover:text-foreground hover:bg-card'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href!}
                  className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                    isActive(item.href!) ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button className="p-1 text-muted-foreground hover:text-foreground transition-colors" aria-label="menu">
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-56 p-0 bg-background border-border">
              <div className="flex flex-col gap-0 pt-12">
                {NAV_ITEMS.map(item => (
                  <div key={item.label}>
                    {item.children ? (
                      <>
                        <div className="px-5 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
                          {item.label}
                        </div>
                        {item.children.map(child => (
                          <Link
                            key={child.href}
                            to={child.href}
                            onClick={() => setMobileOpen(false)}
                            className={`block px-8 py-2.5 font-mono text-[11px] transition-colors border-t border-border/40 ${
                              isActive(child.href)
                                ? 'text-primary'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </>
                    ) : (
                      <Link
                        to={item.href!}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-5 py-3 font-mono text-xs uppercase tracking-widest border-t border-border/40 transition-colors ${
                          isActive(item.href!) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </nav>

      {/* Main */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-5">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-y-2 text-xs text-muted-foreground font-mono">
          <span>ln.fizx.uk</span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {SUBDOMAINS.map(([href, label]) => (
              <a key={href} href={href} className="hover:text-primary transition-colors">{label}</a>
            ))}
            <span className="text-primary/60 ml-1">✦ built with claude</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
