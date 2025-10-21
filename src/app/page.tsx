import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { courses } from '@/lib/data';
import CourseCard from '@/components/CourseCard';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 animate-fade-in">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock Your Potential with LearnVerse
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Explore a universe of knowledge with our expert-led courses.
                    Personalized learning paths, interactive sessions, and an AI
                    assistant to guide you.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/courses">Explore Courses</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/register">Get Started</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                 <img
                  src="https://picsum.photos/seed/learn/600/400"
                  width="600"
                  height="400"
                  alt="Hero"
                  data-ai-hint="online learning"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="featured-courses" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Featured Courses
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Kickstart your learning journey with our most popular courses,
                designed to provide you with in-demand skills.
              </p>
            </div>
            <div className="mx-auto grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 md:grid-cols-3">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            <div className="flex justify-center">
              <Button asChild variant="link" className="text-lg">
                <Link href="/courses">
                  View All Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
