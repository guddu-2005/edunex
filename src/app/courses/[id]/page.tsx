import { notFound } from 'next/navigation';
import Image from 'next/image';
import { courses, quizzes } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import {
  Star,
  Clock,
  Users,
  PlayCircle,
  FileText,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type CoursePageProps = {
  params: {
    id: string;
  };
};

export default function CoursePage({ params }: CoursePageProps) {
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    notFound();
  }
  
  const courseQuiz = quizzes.find(q => q.lectureId === course.lectures[0]?.id);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-secondary/50 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <Badge>{course.category}</Badge>
            <h1 className="font-headline text-4xl font-bold tracking-tight">
              {course.title}
            </h1>
            <p className="text-muted-foreground text-lg">{course.description}</p>
            <p className="text-sm">Created by {course.instructor}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span>{course.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-5 h-5" />
                <span>{course.enrollmentCount.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5" />
                <span>{course.duration}</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              src={course.image.imageUrl}
              alt={course.title}
              width={600}
              height={400}
              data-ai-hint={course.image.imageHint}
              className="rounded-lg object-cover w-full shadow-lg"
            />
             <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
                <PlayCircle className="w-20 h-20 text-white/80 hover:text-white transition-colors cursor-pointer"/>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <Tabs defaultValue="description">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="materials">Materials</TabsTrigger>
                    <TabsTrigger value="quiz">Quiz</TabsTrigger>
                </TabsList>
                <TabsContent value="description">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">About This Course</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-blue dark:prose-invert max-w-none">
                            <p>{course.longDescription}</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="materials">
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Course Materials</CardTitle>
                            <CardDescription>Downloadable notes and resources.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline">
                                <FileText className="mr-2 h-4 w-4" />
                                Download All Notes (PDF)
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="quiz">
                    <Card>
                         <CardHeader>
                            <CardTitle className="font-headline">Test Your Knowledge</CardTitle>
                             <CardDescription>A short quiz on the introductory lecture.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {courseQuiz ? courseQuiz.questions.map((q, index) => (
                                <div key={q.id}>
                                    <p className="font-semibold mb-2">{index + 1}. {q.question}</p>
                                    <RadioGroup>
                                        {q.options.map(opt => (
                                            <div key={opt} className="flex items-center space-x-2">
                                                <RadioGroupItem value={opt} id={`${q.id}-${opt}`} />
                                                <Label htmlFor={`${q.id}-${opt}`}>{opt}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                            )) : <p className="text-muted-foreground">No quiz available for this lecture yet.</p>}
                            {courseQuiz && <Button>Submit Quiz</Button>}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

          
        </div>

        <aside className="space-y-6">
          <h2 className="font-headline text-2xl font-bold">Lectures</h2>
          <Accordion type="single" collapsible className="w-full">
            {course.lectures.length > 0 ? (
              course.lectures.map((lecture, index) => (
                <AccordionItem key={lecture.id} value={`item-${index}`}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <PlayCircle className="h-5 w-5 text-primary" />
                      <span>
                        {index + 1}. {lecture.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pl-6">
                    <p className="text-sm text-muted-foreground">{lecture.notes.substring(0, 100)}...</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Duration: {lecture.duration}</span>
                        <Button variant="link" size="sm" className="p-0 h-auto">Watch Now</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <p className="text-muted-foreground">No lectures available yet.</p>
            )}
          </Accordion>
        </aside>
      </div>
    </div>
  );
}
