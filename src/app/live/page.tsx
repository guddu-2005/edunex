import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Video } from "lucide-react";

const liveClasses = [
  {
    id: 1,
    title: "Live Q&A: Advanced React Patterns",
    instructor: "Jane Doe",
    time: "Today, 4:00 PM EST",
    isActive: true,
  },
  {
    id: 2,
    title: "Workshop: Building a Full-Stack App with Node.js",
    instructor: "Mike Brown",
    time: "Tomorrow, 2:00 PM EST",
    isActive: false,
  },
  {
    id: 3,
    title: "Fireside Chat: The Future of Machine Learning",
    instructor: "Emily White",
    time: "October 28, 2024, 11:00 AM EST",
    isActive: false,
  },
];

export default function LiveClassesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 animate-fade-in">
      <div className="space-y-4 mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Live Classes & Workshops
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Join real-time interactive sessions with our expert instructors.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {liveClasses.map((session) => (
            <Card key={session.id} className="flex flex-col sm:flex-row">
              <CardHeader className="flex-shrink-0 p-4 sm:p-6">
                <div className="w-full sm:w-32 h-24 bg-secondary rounded-lg flex items-center justify-center">
                   <img src="https://picsum.photos/seed/liveclass/128/96" alt="Live class" data-ai-hint="video conference" className="w-full h-full object-cover rounded-lg" />
                </div>
              </CardHeader>
              <div className="flex flex-col flex-grow">
                <CardContent className="p-4 sm:p-6 sm:pb-2">
                    <CardTitle className="font-headline text-xl">{session.title}</CardTitle>
                    <CardDescription className="mt-1">By {session.instructor}</CardDescription>
                </CardContent>
                <CardFooter className="p-4 sm:px-6 sm:pb-6 flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">{session.time}</p>
                    <Button disabled={!session.isActive}>
                        <Video className="mr-2 h-4 w-4" />
                        Join Now
                    </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
        
        <aside>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Schedule</CardTitle>
                    <CardDescription>Plan your learning week.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={new Date()}
                        className="rounded-md"
                    />
                </CardContent>
            </Card>
        </aside>
      </div>
    </div>
  );
}
