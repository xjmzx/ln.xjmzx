import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '@/hooks/useAppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'LND Guides', 
    href: '#',
    children: [
      { name: 'LND + Debian', href: '/lnd/debian' },
      { name: 'LND + Ubuntu', href: '/lnd/ubuntu' },
    ]
  },
  { 
    name: 'phoenixd Guides', 
    href: '#',
    children: [
      { name: 'phoenixd + Debian', href: '/phoenixd/debian' },
      { name: 'phoenixd + Ubuntu', href: '/phoenixd/ubuntu' },
    ]
  },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { config, updateConfig } = useAppContext();

  const toggleTheme = () => {
    updateConfig((current) => ({
      ...current,
      theme: current.theme === 'dark' ? 'light' : 'dark',
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <MobileNav onNavigate={() => setMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2 md:gap-3">
            <a href="https://fizx.uk" className="flex items-center" aria-label="fizx.uk">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 4 4"
                shapeRendering="crispEdges"
                className="h-8 w-8"
              >
                <rect x="0" y="0" width="2" height="2" fill="#0d1117"/>
                <rect x="2" y="0" width="2" height="2" fill="#34d399"/>
                <rect x="0" y="2" width="2" height="2" fill="#a78bfa"/>
                <rect x="2" y="2" width="2" height="2" fill="#131d2a"/>
              </svg>
            </a>
          </div>

          <nav className="hidden md:flex ml-auto gap-6 items-center">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.children ? (
                  <>
                    <button className="text-sm font-medium transition-colors hover:text-primary">
                      {item.name}
                    </button>
                    <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-popover rounded-md shadow-lg border p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="block px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-2"
              aria-label="Toggle theme"
            >
              {config.theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>ln.fizx.uk</span>
          <a
            href="https://shakespeare.diy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-accent/60 hover:text-accent/90 transition-colors"
          >
            <span>✦ built with</span>
            <img src="/shakespeare.svg" alt="" className="h-4 w-4" />
            <span>shakespeare.diy</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const { config, updateConfig } = useAppContext();

  const toggleTheme = () => {
    updateConfig((current) => ({
      ...current,
      theme: current.theme === 'dark' ? 'light' : 'dark',
    }));
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-4">
        {navigation.map((item) => (
          <div key={item.name} className="flex flex-col gap-1">
            {item.children ? (
              <>
                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                  {item.name}
                </div>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    onClick={onNavigate}
                    className="px-6 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  >
                    {child.name}
                  </Link>
                ))}
              </>
            ) : (
              <Link
                to={item.href}
                onClick={onNavigate}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
        
        <div className="mt-4 pt-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-full justify-start"
          >
            {config.theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4 mr-2" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 mr-2" />
                Dark Mode
              </>
            )}
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
