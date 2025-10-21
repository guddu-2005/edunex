// This file implements the AI Learning Assistant's question answering flow.

'use server';

/**
 * @fileOverview AI-powered chatbot flow that answers student questions about course content.
 *
 * - aiRespondToQueries - A function that takes a student's query and course context to provide an answer.
 * - AIRespondToQueriesInput - The input type for the aiRespondToQueries function.
 * - AIRespondToQueriesOutput - The return type for the aiRespondToQueries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIRespondToQueriesInputSchema = z.object({
  query: z.string().describe('The student\u2019s question about the course content.'),
  courseContext: z.string().describe('The relevant context from the course materials, progress, and forum posts.'),
});
export type AIRespondToQueriesInput = z.infer<typeof AIRespondToQueriesInputSchema>;

const AIRespondToQueriesOutputSchema = z.object({
  answer: z.string().describe('The AI\u2019s answer to the student\u2019s question.'),
  needsExpert: z.boolean().describe('Whether the AI believes an expert response would be more appropriate.'),
});
export type AIRespondToQueriesOutput = z.infer<typeof AIRespondToQueriesOutputSchema>;

export async function aiRespondToQueries(input: AIRespondToQueriesInput): Promise<AIRespondToQueriesOutput> {
  return aiRespondToQueriesFlow(input);
}

const aiRespondToQueriesPrompt = ai.definePrompt({
  name: 'aiRespondToQueriesPrompt',
  input: {schema: AIRespondToQueriesInputSchema},
  output: {schema: AIRespondToQueriesOutputSchema},
  prompt: `You are an AI Learning Assistant helping students with their questions about course content.

  Use the provided course context to answer the student's question. If the context does not contain information to answer the question, respond that you cannot answer the question with the available context.
  If you believe that an expert (human) response would better address the question, set needsExpert to true; otherwise, set it to false.

  Course Context:
  {{courseContext}}

  Question:
  {{query}}`,
});

const aiRespondToQueriesFlow = ai.defineFlow(
  {
    name: 'aiRespondToQueriesFlow',
    inputSchema: AIRespondToQueriesInputSchema,
    outputSchema: AIRespondToQueriesOutputSchema,
  },
  async input => {
    const {output} = await aiRespondToQueriesPrompt(input);
    return output!;
  }
);
