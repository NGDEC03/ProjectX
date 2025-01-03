// import { useFieldArray } from 'react-hook-form'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { TestCaseForm } from './test-case-form'
// import { ProblemFormProps } from '@/types/contest'

// export function ProblemForm({ index, register, errors, control, removeProblem }: ProblemFormProps) {
//   const { fields: testCaseFields, append: appendTestCase, remove: removeTestCase } = useFieldArray({
//     control,
//     name: `problems.${index}.testCases` as const,
//   })

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Problem {index + 1}</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div>
//           <Label htmlFor={`problems.${index}.description`}>Problem Description</Label>
//           <Textarea 
//             id={`problems.${index}.description`}
//             {...register(`problems.${index}.description` as const, { required: "Problem description is required" })}
//           />
//           {errors.problems?.[index]?.description && (
//             <p className="text-red-500 text-sm mt-1">{errors.problems[index]?.description?.message}</p>
//           )}
//         </div>
//         <div>
//           <Label className='block'>Test Cases</Label>
//           {testCaseFields.map((field, testIndex) => (
//             <TestCaseForm
//               key={field.id}
//               problemIndex={index}
//               testCaseIndex={testIndex}
//               register={register}
//               errors={errors}
//               removeTestCase={removeTestCase}
//             />
//           ))}
//           <Button
//             type="button"
//             variant="outline"
//             size="sm"
//             className="mt-2"
//             onClick={() => appendTestCase({ input: '', expectedOutput: '' })}
//           >
//             Add Test Case
//           </Button>
//         </div>
//         {index > 0 && (
//           <Button type="button" variant="destructive" onClick={() => removeProblem(index)}>
//             Remove Problem
//           </Button>
//         )}
//       </CardContent>
//     </Card>
//   )
// }

