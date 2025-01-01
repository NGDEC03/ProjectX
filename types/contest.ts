import { UseFormRegister, FieldErrors, Control, UseFieldArrayRemove } from 'react-hook-form';

export type TestCase = {
  input: string;
  output: string;
  isHidden: boolean;
};

export type ProblemInput = {
  title: string;
  description: string;
  timeLimit: number;
  memoryLimit: number;
  difficulty: string;
  score: number;
  rating: number;
  sampleInput: string;
  sampleOutput: string;
  testCases: TestCase[];
};

export type ContestInput = {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  isPublic: boolean;
  maxDuration: number;
  status: string;
  ratingFloor: number;
  ratingCeil: number;
  isRated: boolean;
  ratingType: string;
  ratingKFactor: number;
  problems: ProblemInput[];
};

export interface ContestDetailsProps {
  register: UseFormRegister<ContestInput>;
  errors: FieldErrors<ContestInput>;
}

export interface ProblemFormProps {
  index: number;
  register: UseFormRegister<ContestInput>;
  errors: FieldErrors<ContestInput>;
  control: Control<ContestInput>;
  removeProblem: UseFieldArrayRemove;
}

export interface TestCaseFormProps {
  problemIndex: number;
  testCaseIndex: number;
  register: UseFormRegister<ContestInput>;
  errors: FieldErrors<ContestInput>;
  removeTestCase: UseFieldArrayRemove;
}
