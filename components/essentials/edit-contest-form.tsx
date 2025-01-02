"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import axios from "axios"

interface TestCase {
  problem_id?: number;
  input: string;
  output: string;
  is_hidden: boolean;
}

interface Problem {
  contest_id: number;
  title: string;
  description: string;
  time_limit: number;
  memory_limit: number;
  difficulty: string;
  score: number;
  rating: number;
  sample_input: string;
  sample_output: string;
  test_cases_count: number;
  test_cases: TestCase[];
}

interface FormValues {
  problems: Problem[];
  contest_id: number;
}

interface EditContestFormProps {
  contestId: number;
  onSuccess: () => void;
}

export function EditContestForm({ contestId, onSuccess }: EditContestFormProps) {
  const form = useForm<FormValues>({
    defaultValues: {
      contest_id: contestId,
      problems: [
        {
          contest_id: contestId,
          title: "",
          description: "",
          time_limit: 1,
          memory_limit: 256,
          difficulty: "medium",
          score: 100,
          rating: 1200,
          sample_input: "",
          sample_output: "",
          test_cases_count: 1,
          test_cases: [
            {
              input: "",
              output: "",
              is_hidden: false
            }
          ]
        }
      ]
    }
  })

  const { fields: problemFields, append: appendProblem, remove: removeProblem } = useFieldArray({
    control: form.control,
    name: "problems"
  })

  // Create nested field arrays for test cases
  const testCasesArrays = problemFields.map((_, index) => 
    useFieldArray({
      control: form.control,
      name: `problems.${index}.test_cases`
    })
  )

  const onSubmit = async (data: FormValues) => {
    try {
      // Update test_cases_count before submission
      data.problems = data.problems.map(problem => ({
        ...problem,
        test_cases_count: problem.test_cases.length
      }))
      const response =await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contest/update/problems`,data,{
        withCredentials:true
      })
console.log(response);
      onSuccess()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {problemFields.map((field, problemIndex) => {
          const testCasesArray = testCasesArrays[problemIndex]
          
          return (
            <Card key={field.id} className="p-4">
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{contestId}</h3>
                  {problemFields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeProblem(problemIndex)}
                    >
                      Remove Problem
                    </Button>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name={`problems.${problemIndex}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`problems.${problemIndex}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`problems.${problemIndex}.time_limit`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time Limit (seconds)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            min={1}
                            required
                            onChange={e => field.onChange(parseInt(e.target.value))} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`problems.${problemIndex}.memory_limit`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Memory Limit (MB)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            min={1}
                            required
                            onChange={e => field.onChange(parseInt(e.target.value))} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`problems.${problemIndex}.difficulty`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`problems.${problemIndex}.score`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Score</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            min={0}
                            required
                            onChange={e => field.onChange(parseInt(e.target.value))} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`problems.${problemIndex}.rating`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          min={0}
                          required
                          onChange={e => field.onChange(parseInt(e.target.value))} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`problems.${problemIndex}.sample_input`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sample Input</FormLabel>
                        <FormControl>
                          <Textarea {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`problems.${problemIndex}.sample_output`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sample Output</FormLabel>
                        <FormControl>
                          <Textarea {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Test Cases Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Test Cases</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => testCasesArray.append({
                        input: "",
                        output: "",
                        is_hidden: false
                      })}
                    >
                      Add Test Case
                    </Button>
                  </div>

                  {testCasesArray.fields.map((testCase, testCaseIndex) => (
                    <Card key={testCase.id} className="p-4">
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Test Case {testCaseIndex + 1}</h4>
                          {testCasesArray.fields.length > 1 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => testCasesArray.remove(testCaseIndex)}
                            >
                              Remove Test Case
                            </Button>
                          )}
                        </div>
                        
                        <FormField
                          control={form.control}
                          name={`problems.${problemIndex}.test_cases.${testCaseIndex}.input`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Input</FormLabel>
                              <FormControl>
                                <Textarea {...field} required />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`problems.${problemIndex}.test_cases.${testCaseIndex}.output`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Output</FormLabel>
                              <FormControl>
                                <Textarea {...field} required />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`problems.${problemIndex}.test_cases.${testCaseIndex}.is_hidden`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Hidden Test Case</FormLabel>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => appendProblem({
              contest_id: contestId,
              title: "",
              description: "",
              time_limit: 1,
              memory_limit: 256,
              difficulty: "medium",
              score: 100,
              rating: 1200,
              sample_input: "",
              sample_output: "",
              test_cases_count: 1,
              test_cases: [{
                input: "",
                output: "",
                is_hidden: false
              }]
            })}
          >
            Add Problem
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  )
}