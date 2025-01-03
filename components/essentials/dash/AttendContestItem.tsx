import { Badge } from "@/components/ui/badge";
import { Contest } from "@/types/User";

const AttendedContestItem = ({ Name, StartTime, Status }: Contest) => {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex-grow">
                <h4 className="font-semibold">{Name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{new Date(StartTime).toLocaleDateString()}</p>
                <p className="text-xs text-gray-500">Status: {Status}</p>
            </div>
            <div className="text-right">
                {/* <p className="font-semibold">{score}</p> */}
                <Badge variant="secondary">Rank
                    {/* {rank} */}
                </Badge>
            </div>
        </div>
    );
};

export default AttendedContestItem;
