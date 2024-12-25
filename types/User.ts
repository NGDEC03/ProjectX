
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
	LastLogin?: Date;
	CreatedAt?: Date;
	UpdatedAt?: Date;
	DeletedAt?: Date;

	Contests?: Contest[];
}

export interface Contest {
	ID: number;
	Name: string;
	StartTime: Date;
	EndTime: Date;
	Users: User[];
}

export interface Problem {
	ID: number;
	ContestID: number;
	Contest: Contest;
}