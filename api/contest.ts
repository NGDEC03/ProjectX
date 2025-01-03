import axios from 'axios';
import { Contest } from '@/types/User';

export interface ContestsResponse {
    user_contests: Contest[];
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const contestsApi = {
    getContests: async (): Promise<ContestsResponse> => {
        const { data } = await axios.get(`${API_URL}/contest/get-all`, {
            withCredentials: true,
        });
        return data;
    },
};
