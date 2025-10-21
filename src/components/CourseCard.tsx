import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Star } from 'lucide-react';
import type { Course } from '@/lib/data';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`} className="group">
      <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0">
          <Image
            src={course.image.imageUrl}
            alt={course.title}
            width={600}
            height={400}
            data-ai-hint={course.image.imageHint}
            className="rounded-t-lg object-cover aspect-video"
          />
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <Badge variant="secondary" className="mb-2">{course.category}</Badge>
          <h3 className="font-headline text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            By {course.instructor}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground flex justify-between">
           <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
