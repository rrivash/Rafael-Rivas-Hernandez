
import React from 'react';

export interface ContentSection {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

export enum NavigationSection {
  INTRO = 'intro',
  MARCO = 'marco',
  IMSS = 'imss',
  ISSSTE = 'issste',
  FOVISSSTE = 'fovissste',
  QUIZ = 'quiz'
}