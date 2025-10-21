'use server';

/**
 * @fileOverview An AI course suggestion agent.
 *
 * - getSuggestedCourses - A function that suggests relevant courses to students.
 * - SuggestedCoursesInput - The input type for the getSuggestedCourses function.
 * - SuggestedCoursesOutput - The return type for the getSuggestedCourses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestedCoursesInputSchema = z.object({
  studentId: z.string().describe('The unique identifier of the student.'),
  courseHistory: z
    .array(
      z.object({
        courseId: z.string().describe('The unique identifier of the course.'),
        completionPercentage: z
          .number()
          .describe('The percentage of the course completed by the student.'),
        forumPosts: z.string().describe('The content of the student’s forum posts for the course')
      })
    )
    .describe('The learning history of the student, including course completion and forum posts.'),
});
export type SuggestedCoursesInput = z.infer<typeof SuggestedCoursesInputSchema>;

const SuggestedCoursesOutputSchema = z.object({
  suggestedCourses: z
    .array(
      z.object({
        courseId: z.string().describe('The unique identifier of the suggested course.'),
        relevanceScore: z
          .number()
          .describe('A score indicating the relevance of the course to the student (0-1).'),
        reason: z.string().describe('The reason why the course is suggested.'),
      })
    )
    .describe('A list of courses suggested to the student based on their learning history.'),
});
export type SuggestedCoursesOutput = z.infer<typeof SuggestedCoursesOutputSchema>;

export async function getSuggestedCourses(
  input: SuggestedCoursesInput
): Promise<SuggestedCoursesOutput> {
  return suggestedCoursesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestedCoursesPrompt',
  input: {schema: SuggestedCoursesInputSchema},
  output: {schema: SuggestedCoursesOutputSchema},
  prompt: `You are an AI learning assistant that suggests courses to students based on their learning history.

Analyze the student's course history and forum posts to understand their interests and knowledge gaps.
Suggest courses that are relevant to their interests and will help them expand their knowledge.

Student ID: {{{studentId}}}
Course History:
{{#each courseHistory}}
  - Course ID: {{{courseId}}}, Completion Percentage: {{{completionPercentage}}}, Forum Posts: {{{forumPosts}}}
{{/each}}

Suggest courses with a relevance score and a reason for each suggestion.
Ensure the relevance score is between 0 and 1.

Output in the following JSON format:
{{json suggestedCourses}}`,
});

const suggestedCoursesFlow = ai.defineFlow(
  {
    name: 'suggestedCoursesFlow',
    inputSchema: SuggestedCoursesInputSchema,
    outputSchema: SuggestedCoursesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
