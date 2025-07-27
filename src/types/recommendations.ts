export type RecommendationType = 'book' | 'podcast';

export type RecommendationStatus = 
  | 'want-to-read' 
  | 'reading' 
  | 'completed' 
  | 'not-interested';

export interface Recommendation {
  id: string;
  title: string;
  author: string;
  type: RecommendationType;
  status: RecommendationStatus;
  reason: string;
  recommendedAt: Date;
  coverUrl?: string;
  description?: string;
}

export const statusLabels: Record<RecommendationStatus, string> = {
  'want-to-read': 'Want to Read',
  'reading': 'Reading',
  'completed': 'Completed',
  'not-interested': 'Not Interested'
};