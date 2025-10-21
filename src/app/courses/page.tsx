// This is a Client Component to manage filter state
'use client';

import { useState } from 'react';
import CourseCard from '@/components/CourseCard';
import { courses } from '@/lib/data';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import type { Course } from '@/lib/data';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const uniqueCategories = [
    'all',
    ...Array.from(new Set(courses.map((course) => course.category))),
  ];

  const filteredCourses = courses.filter((course: Course) => {
    const matchesCategory =
      category === 'all' || course.category === category;
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="space-y-4 mb-8 text-center animate-fade-in">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Explore Our Courses
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Find your next learning adventure. Filter by category or search for
          a specific topic.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {uniqueCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No Courses Found</h2>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}
