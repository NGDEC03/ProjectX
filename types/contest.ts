import { UseFormRegister, FieldErrors, Control, UseFieldArrayRemove } from 'react-hook-form'

export type TestCase = {
  input: string
  expectedOutput: string
}

export type ProblemInput = {
  description: string
  testCases: TestCase[]
}

export type ContestInput = {
  name: string
  description: string
  startDate: string
  endDate: string
  problems: ProblemInput[]
}

export interface ContestDetailsProps {
  register: UseFormRegister<ContestInput>
  errors: FieldErrors<ContestInput>
}

export interface ProblemFormProps {
  index: number
  register: UseFormRegister<ContestInput>
  errors: FieldErrors<ContestInput>
  control: Control<ContestInput>
  removeProblem: UseFieldArrayRemove
}

export interface TestCaseFormProps {
  problemIndex: number
  testCaseIndex: number
  register: UseFormRegister<ContestInput>
  errors: FieldErrors<ContestInput>
  removeTestCase: UseFieldArrayRemove
}

