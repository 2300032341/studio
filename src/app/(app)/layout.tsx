
'use client';

import { Logo } from '@/components/app/logo';
import { UserNav } from '@/components/app/user-nav';
import { MainNav } from '@/components/app/main-nav';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PanelLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type FormEvent } from 'react';
import { ThemeToggle } from '@/components/app/theme-toggle';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = e.currentTarget.search.value;
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };
  
  const SearchBar = ({ className }: { className?: string }) => (
    <form
        className={`relative w-full ${className}`}
        onSubmit={handleSearch}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          name="search"
          placeholder="Search..."
          className="pl-9 w-full bg-background"
        />
      </form>
  )

  return (
    <div className="flex min-h-screen w-full">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-72 border-r bg-card/50 p-6 gap-8">
        <Logo />
        <MainNav />
        <div className="mt-auto">
          {/* Future sidebar footer content can go here */}
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        {/* Main Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
          <div className="flex items-center gap-4">
             {/* Mobile Nav Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 rounded-full md:hidden"
                >
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b">
                    <Logo />
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <MainNav isMobile={true} />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-full max-w-md hidden md:block">
              <SearchBar />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="md:hidden mb-4">
             <SearchBar />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
