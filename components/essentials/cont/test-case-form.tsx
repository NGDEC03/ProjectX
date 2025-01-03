// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { TestCaseFormProps } from '@/types/contest';

// export function TestCaseForm({ problemIndex, testCaseIndex, register, errors, removeTestCase }: TestCaseFormProps) {
//   return (
//     <div className="flex space-x-2 mt-2">
//       <Input
//         placeholder="Input"
//         {...register(`problems.${problemIndex}.testCases.${testCaseIndex}.input` as const, { required: "Input is required" })}
//       />
//       <Input
//         placeholder="Expected Output"
//         {...register(`problems.${problemIndex}.testCases.${testCaseIndex}.expectedOutput` as const, { required: "Expected output is required" })}
//       />
//       <Button
//         type="button"
//         variant="outline"
//         size="icon"
//         onClick={() => removeTestCase(testCaseIndex)}
//         className="flex-shrink-0"
//       >
//         X
//       </Button>
//       {errors.problems?.[problemIndex]?.testCases?.[testCaseIndex]?.input && (
//         <p className="text-red-500 text-sm mt-1">{errors.problems[problemIndex]?.testCases[testCaseIndex]?.input?.message}</p>
//       )}
//       {errors.problems?.[problemIndex]?.testCases?.[testCaseIndex]?.expectedOutput && (
//         <p className="text-red-500 text-sm mt-1">{errors.problems[problemIndex]?.testCases[testCaseIndex]?.expectedOutput?.message}</p>
//       )}
//     </div>
//   )
// }