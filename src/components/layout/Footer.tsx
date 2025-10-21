import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <BookOpen className="h-6 w-6" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} LearnVerse. All Rights Reserved.
          </p>
        </div>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
            <Link href="/courses" className="text-sm hover:underline underline-offset-4">Courses</Link>
            <Link href="/live" className="text-sm hover:underline underline-offset-4">Live Classes</Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">Terms</Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}
