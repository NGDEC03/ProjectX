import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell } from 'lucide-react'
import { User } from "@/types/User"

const ProfileHeader = ({ user }: { user: User }) => {
    return (
        <header className="flex justify-between items-center">
            <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Welcome back, {user?.FirstName ? user.FirstName : "User"}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">Here&apos;s what&apos;s happening with your contests.</p>
            </div>
            <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon">
                    <Bell className="h-4 w-4" />
                </Button>
                <Avatar>
                    <AvatarImage src={user?.Image} alt="@shadcn" />
                    <AvatarFallback>CS</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}

export default ProfileHeader