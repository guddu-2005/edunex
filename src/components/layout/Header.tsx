'use client';

import Link from 'next/link';
import { BookOpen, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import UserNav from '@/components/UserNav';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/live', label: 'Live Classes' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              LearnVerse
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === link.href
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Header */}
        <div className="flex items-center md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link href="/" className="mr-6 flex items-center space-x-2 px-6">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline">LearnVerse</span>
              </Link>
              <div className="my-4 h-px w-full bg-border" />
              <div className="flex flex-col space-y-3 px-6">
                 {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'transition-colors hover:text-foreground',
                      pathname === link.href
                        ? 'text-foreground font-semibold'
                        : 'text-muted-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Mobile Logo */}
        <div className="flex flex-1 justify-center md:hidden">
             <Link href="/" className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="font-bold sm:inline-block font-headline">
                LearnVerse
                </span>
            </Link>
        </div>


        <div className="flex flex-1 items-center justify-end space-x-2">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
