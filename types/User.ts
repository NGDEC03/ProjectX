export interface User {
    ID: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    Image?: string;
    Phone?: string;
    Gender?: string;
    SessionToken?: string;
    VerifyToken?: string;
    IsVerified: boolean;
    IsAdmin:boolean;
    LastLogin: Date;
    CurrentRating: number;
    MaxRating: number;
    MinRating: number;
    GlobalRank?: number;
    TotalContests: number;
    ContestsWon: number;
    TotalSubmissions: number;
    TotalSolved: number;
    CurrentStreak: number;
    MaxStreak: number;
    LastProblemSolved?: Date;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: Date | null;
    Contests: Contest[];
    Submissions: Submission[];
    ContestCreated: Contest[];
    RatingHistory: RatingChange[];
}

export interface Contest {
    ID: number;
    Name: string;
    Description?: string;
    StartTime: Date;
    EndTime: Date;
    IsPublic: boolean;
    MaxDuration: number;
    CreatorID: number;
    Status: string;
    RatingFloor: number;
    RatingCeil: number;
    IsRated: boolean;
    RatingType: string;
    RatingKFactor: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: Date | null;
    Problems: Problem[];
    Users: User[];
    Creator: User;
}

export interface RatingChange {
    ID: number;
    UserID: number;
    ContestID: number;
    OldRating: number;
    NewRating: number;
    Rank: number;
    Performance: number;
    Volatility?: number;
    ChangeTime: Date;
    User: User;
    Contest: Contest;
}

export interface UserContest {
    UserID: number;
    ContestID: number;
    Score: number;
    Rank: number;
    StartTime: Date;
    EndTime: Date;
    Status: string;
    InitialRating: number;
    RatingChange: number;
    Performance: number;
    ExpectedRank: number;
    Volatility: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    User: User;
    Contest: Contest;
}

export interface Problem {
    ID: number;
    ContestID: number;
    Title: string;
    Description: string;
    TimeLimit: number;
    MemoryLimit: number;
    Difficulty?: string;
    Score: number;
    Rating: number;
    SampleInput?: string;
    SampleOutput?: string;
    TestCasesCount: number;
    TotalSubmissions: number;
    SuccessfulSubmissions: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: Date | null;
    Contest: Contest;
    Submissions: Submission[];
    TestCases: TestCase[];
}

export interface TestCase {
    ID: number;
    ProblemID: number;
    Input: string;
    Output: string;
    IsHidden: boolean;
    CreatedAt: Date;
    UpdatedAt: Date;
    Problem: Problem;
}

export interface Submission {
    ID: number;
    UserID: number;
    ProblemID: number;
    Language: string;
    Code: string;
    Status: string;
    Score: number;
    Runtime: number;
    Memory: number;
    SubmittedAt: Date;
    CreatedAt: Date;
    UpdatedAt: Date;
    User: User;
    Problem: Problem;
}