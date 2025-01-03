import { useEffect, useState } from 'react';
import axios from 'axios';
import { Contest } from '@/types/User';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users } from 'lucide-react';

const STATUS_COLORS = {
    pending: 'bg-yellow-500 hover:bg-yellow-600',
    active: 'bg-green-500 hover:bg-green-600',
    completed: 'bg-blue-500 hover:bg-blue-600',
} as const;

const ContestPage = ({ id }: { id: unknown }) => {
    const [contest, setContest] = useState<Contest | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchContest = async () => {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contest/get-one/${id}`);
                    setContest(response.data.contest);
                    console.log(response.data.contest);
                } catch (error) {
                    console.error('Failed to fetch contest:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchContest();
        }
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!contest) {
        return <div>Contest not found</div>;
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-4">
            <Card className="relative hover:shadow-md transition-shadow duration-200">
                <Badge
                    className={`absolute top-2 right-2 ${STATUS_COLORS[contest.Status as keyof typeof STATUS_COLORS] || 'bg-gray-500'}`}
                >
                    {contest.Status}
                </Badge>

                <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:bg-gray-400 pr-24">
                        {contest.Name}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-600">
                            <CalendarDays className="h-4 w-4" />
                            <div className="text-sm space-y-1">
                                <p className="flex items-center">
                                    <span className="font-medium">Start:</span>
                                    <span className="ml-2">{formatDate(contest.StartTime)}</span>
                                </p>
                                <p className="flex items-center">
                                    <span className="font-medium">End:</span>
                                    <span className="ml-2">{formatDate(contest.EndTime)}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                            <Users className="h-4 w-4" />
                            <span className="text-sm">
                                {contest?.Users?.length || 0} Participant{contest?.Users?.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {contest && contest.Problems && contest.Problems.map((problem) => (
                <Card key={problem.ID} className="mb-4">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">{problem.Title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p>{problem.Description}</p>
                        <p><strong>Time Limit:</strong> {problem.TimeLimit} ms</p>
                        <p><strong>Memory Limit:</strong> {problem.MemoryLimit} KB</p>
                        <p><strong>Difficulty:</strong> {problem.Difficulty}</p>
                        <p><strong>Score:</strong> {problem.Score}</p>
                        <p><strong>Rating:</strong> {problem.Rating}</p>
                        <p><strong>Sample Input:</strong> {problem.SampleInput}</p>
                        <p><strong>Sample Output:</strong> {problem.SampleOutput}</p>
                        <p><strong>Test Cases Count:</strong> {problem.TestCasesCount}</p>
                        <div>
                            <strong>Test Cases:</strong>
                            {problem.TestCases.map((testCase) => (
                                <div key={testCase.ID} className="ml-4">
                                    <p><strong>Input:</strong> {testCase.Input}</p>
                                    <p><strong>Output:</strong> {testCase.Output}</p>
                                    <p><strong>Hidden:</strong> {testCase.IsHidden ? 'Yes' : 'No'}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ContestPage;
