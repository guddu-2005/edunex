import { users, courses, Course } from "@/lib/data";
import CourseCard from "@/components/CourseCard";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trophy, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const user = users[0];
  const enrolledCourses = user.enrolledCourses.map(courseId => 
    courses.find(c => c.id === courseId)
  ).filter((c): c is Course => c !== undefined);

  // Mock progress data
  const progressData = {
    'crs_001': 75,
    'crs_003': 40,
    'crs_006': 15,
  };

  const recommendedCourses = courses.filter(c => !user.enrolledCourses.includes(c.id)).slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 animate-fade-in">
      <div className="space-y-2 mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground text-lg">Continue your learning journey and reach new heights.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          
          {/* My Courses */}
          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">My Courses</h2>
            <div className="space-y-4">
              {enrolledCourses.map(course => {
                const progress = progressData[course.id as keyof typeof progressData] || 0;
                return (
                  <Link href={`/courses/${course.id}`} key={course.id}>
                    <Card className="hover:bg-secondary/50 transition-colors">
                      <CardContent className="p-4 flex items-center gap-4">
                        <img src={course.image.imageUrl} alt={course.title} data-ai-hint={course.image.imageHint} className="w-32 h-20 object-cover rounded-md"/>
                        <div className="flex-1">
                          <h3 className="font-semibold">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">{course.instructor}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Progress value={progress} className="w-full h-2" />
                            <span className="text-sm font-medium">{progress}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </section>

           {/* Recommended For You */}
           <section>
            <h2 className="font-headline text-2xl font-bold mb-4">Recommended For You</h2>
            <div className="grid sm:grid-cols-2 gap-6">
                {recommendedCourses.map(course => <CourseCard key={course.id} course={course} />)}
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Trophy className="text-yellow-500" />
                    Achievements
                </CardTitle>
                <CardDescription>Your learning milestones.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full"><BookOpen className="h-5 w-5 text-blue-500" /></div>
                    <div>
                        <p className="font-semibold">React Master</p>
                        <p className="text-sm text-muted-foreground">Completed "React for Beginners"</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full"><Trophy className="h-5 w-5 text-green-500" /></div>
                    <div>
                        <p className="font-semibold">Course Explorer</p>
                        <p className="text-sm text-muted-foreground">Enrolled in 3+ courses</p>
                    </div>
                </div>
            </CardContent>
          </Card>
        </aside>

      </div>
    </div>
  );
}
