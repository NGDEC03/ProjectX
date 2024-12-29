
export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	image?: string;
	phone?: string;
	gender?: string;
	sessionToken?: string;
	verifyToken?: string;
	isVerified: boolean;
	lastLogin: Date;
	currentRating: number;
	maxRating: number;
	minRating: number;
	globalRank?: number;
	totalContests: number;
	contestsWon: number;
	totalSubmissions: number;
	totalSolved: number;
	currentStreak: number;
	maxStreak: number;
	lastProblemSolved?: Date;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;
	contests: Contest[];
	submissions: Submission[];
	contestCreated: Contest[];
	ratingHistory: RatingChange[];
}

export interface Contest {
	id: number;
	name: string;
	description?: string;
	startTime: Date;
	endTime: Date;
	isPublic: boolean;
	maxDuration?: number;
	creatorId: number;
	status: 'pending' | 'active' | 'completed';
	ratingFloor?: number;
	ratingCeil?: number;
	isRated: boolean;
	ratingType: 'standard' | 'performance' | 'random';
	ratingKFactor: number;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;
	problems: Problem[];
	users: User[];
	creator: User;
}

export interface RatingChange {
	id: number;
	userId: number;
	contestId: number;
	oldRating: number;
	newRating: number;
	rank: number;
	performance: number;
	volatility?: number;
	changeTime: Date;
	user: User;
	contest: Contest;
}


export interface UserContest {
	userId: number;
	contestId: number;
	score: number;
	rank: number;
	startTime: Date;
	endTime: Date;
	status: 'registered' | 'started' | 'finished';
	initialRating: number;
	ratingChange: number;
	performance: number;
	expectedRank: number;
	volatility: number;
	createdAt: Date;
	updatedAt: Date;
	user: User;
	contest: Contest;
}


export interface Problem {
	id: number;
	contestId: number;
	title: string;
	description: string;
	timeLimit: number;
	memoryLimit: number;
	difficulty?: 'easy' | 'medium' | 'hard';
	score: number;
	rating: number;
	sampleInput?: string;
	sampleOutput?: string;
	testCasesCount: number;
	totalSubmissions: number;
	successfulSubmissions: number;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;
	contest: Contest;
	submissions: Submission[];
	testCases: TestCase[];
}



export interface TestCase {
	id: number;
	problemId: number;
	input: string;
	output: string;
	isHidden: boolean;
	createdAt: Date;
	updatedAt: Date;
	problem: Problem;
}



export interface Submission {
	id: number;
	userId: number;
	problemId: number;
	language: string;
	code: string;
	status: string;
	score?: number;
	runtime?: number;
	memory?: number;
	submittedAt: Date;
	user: User;
	problem: Problem;
}
