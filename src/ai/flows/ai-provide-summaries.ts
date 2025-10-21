'use server';
/**
 * @fileOverview This file implements the AI Learning Assistant flow for providing summaries of lectures and course materials.
 *
 * - provideSummary - A function that takes content and returns a summary.
 * - ProvideSummaryInput - The input type for the provideSummary function.
 * - ProvideSummaryOutput - The return type for the provideSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideSummaryInputSchema = z.object({
  content: z.string().describe('The lecture or course material content to summarize.'),
});
export type ProvideSummaryInput = z.infer<typeof ProvideSummaryInputSchema>;

const ProvideSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the provided content.'),
});
export type ProvideSummaryOutput = z.infer<typeof ProvideSummaryOutputSchema>;

export async function provideSummary(input: ProvideSummaryInput): Promise<ProvideSummaryOutput> {
  return provideSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideSummaryPrompt',
  input: {schema: ProvideSummaryInputSchema},
  output: {schema: ProvideSummaryOutputSchema},
  prompt: `You are an AI Learning Assistant tasked with summarizing educational content for students.

  Please provide a concise and informative summary of the following content:

  Content: {{{content}}}
  `,
});

const provideSummaryFlow = ai.defineFlow(
  {
    name: 'provideSummaryFlow',
    inputSchema: ProvideSummaryInputSchema,
    outputSchema: ProvideSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
