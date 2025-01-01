import { UseFormRegister, FieldErrors, Control, UseFieldArrayRemove, UseFormSetValue, UseFormWatch } from 'react-hook-form';

export type TestCase = {
  input: string;
  output: string;
  isHidden: boolean;
};

export interface Contest {
  id: string
  name: string
  status: 'active' | 'pending' | 'completed'
  startDate: string
  endDate: string
  participants: number
}



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

export interface ContestInput {
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  is_public: boolean;
  max_duration: number;
  creator_id: number;
  status: string;
  rating_floor: number;
  rating_ceil: number;
  is_rated: boolean;
  rating_type: string;
  rating_k_factor: number;
}

export type ContestDetailsProps = {
  register: UseFormRegister<ContestInput>;
  errors: FieldErrors<ContestInput>;
  setValue: UseFormSetValue<ContestInput>;
  watch: UseFormWatch<ContestInput>;
};

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
