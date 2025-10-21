'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import UserNav from '@/components/UserNav';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/live', label: 'Live' },
  { href: '/profile', label: 'Profile' },
];

function getPageTitle(pathname: string): string {
    if (pathname.startsWith('/courses/')) {
        return 'Course Details';
    }

    const currentLink = navLinks.find(link => pathname === link.href);
    if (currentLink) {
        return currentLink.label;
    }
    
    if (pathname === '/') return 'Home';
    if (pathname === '/login') return 'Login';
    if (pathname === '/register') return 'Sign Up';

    return 'LearnVerse';
}


export default function Header() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center">
          <Link href="/" className="mr-4 flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
          </Link>
          <h1 className="text-xl font-bold tracking-tight font-headline">
            {title}
          </h1>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
