import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { FC } from "react";

interface StatsCardProps {
    title: string;
    value: string | number;
    change: string;
    icon: FC<{ className?: string }>;
}

const StatsCard: FC<StatsCardProps> = ({ title, value, change, icon: Icon }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{change}</p>
            </CardContent>
        </Card>
    )
}

export default StatsCard