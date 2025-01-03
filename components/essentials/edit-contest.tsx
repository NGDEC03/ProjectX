import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import axios, { AxiosError } from "axios";
import { toast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { Loader } from "lucide-react";

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
    onSuccess?: () => void;
    onClose?: () => void;
}

export function EditContestForm({ contestId, onSuccess, onClose }: EditContestFormProps) {
    const [isLoading, setIsLoading] = useState(true);

    const form = useForm<FormValues>({
        defaultValues: {
            contest_id: contestId,
            problems: [{
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
            }]
        }
    });

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contest/${contestId}/problems`, {
                    withCredentials: true
                });

                form.reset({
                    contest_id: contestId,
                    problems: response.data.problems
                });
            } catch (error) {
                const axiosError = error as AxiosError<{ message: string }>;
                toast({
                    title: "Error",
                    description: axiosError.response?.data.message || "An error occurred.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchProblems();
    }, [contestId, form]);

    const onSubmit = async (data: FormValues) => {
        try {
            const formattedData = {
                ...data,
                problems: data.problems.map(problem => ({
                    ...problem,
                    test_cases_count: problem.test_cases.length,
                    contest_id: contestId
                }))
            };

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contest/update/problems`, formattedData, {
                withCredentials: true
            });

            toast({
                title: "Success",
                description: "Contest problems updated successfully",
            });

            onSuccess?.();
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            toast({
                title: "Error",
                description: axiosError.response?.data.message || "An error occurred.",
                variant: "destructive",
            });
        }
    };

    if (isLoading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {form.watch("problems")?.map((problem, problemIndex) => (
                    <Card key={problemIndex} className="p-4">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Problem {problemIndex + 1}</h3>
                                {form.watch("problems").length > 1 && (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                            const newProblems = form.getValues("problems").filter((_, i) => i !== problemIndex);
                                            form.setValue("problems", newProblems);
                                        }}
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
                                            <Input {...field} />
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
                                            <Textarea {...field} />
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
                                                <Input type="number" {...field} />
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
                                                <Input type="number" {...field} />
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
                                                <Input type="number" {...field} />
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
                                            <Input type="number" {...field} />
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
                                                <Textarea {...field} />
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
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-medium">Test Cases</h4>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            const currentProblems = form.getValues("problems");
                                            const currentProblem = currentProblems[problemIndex];
                                            const newTestCases = [...(currentProblem.test_cases || []), {
                                                input: "",
                                                output: "",
                                                is_hidden: false
                                            }];
                                            form.setValue(`problems.${problemIndex}.test_cases`, newTestCases);
                                        }}
                                    >
                                        Add Test Case
                                    </Button>
                                </div>

                                {problem.test_cases?.map((_, testCaseIndex) => (
                                    <Card key={testCaseIndex} className="p-4">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-medium">Test Case {testCaseIndex + 1}</h4>
                                                {problem.test_cases.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => {
                                                            const currentProblems = form.getValues("problems");
                                                            const currentProblem = currentProblems[problemIndex];
                                                            const newTestCases = currentProblem.test_cases.filter((_, i) => i !== testCaseIndex);
                                                            form.setValue(`problems.${problemIndex}.test_cases`, newTestCases);
                                                        }}
                                                    >
                                                        Remove
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
                                                            <Textarea {...field} />
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
                                                            <Textarea {...field} />
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
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </Card>
                ))}

                <div className="flex justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            const currentProblems = form.getValues("problems") || [];
                            form.setValue("problems", [...currentProblems, {
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
                            }]);
                        }}
                    >
                        Add Problem
                    </Button>
                    <div className="space-x-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">{isLoading ? <Loader className="animate-spin"/> : "Save Changes"}</Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}
