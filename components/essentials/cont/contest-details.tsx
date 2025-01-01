import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ContestDetailsProps } from '@/types/contest'

export function ContestDetails({ register, errors }: ContestDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contest Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Contest Name</Label>
          <Input id="name" {...register("name", { required: "Contest name is required" })} />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>
        <div>
          <Label htmlFor="startTime">Start Time</Label>
          <Input id="startTime" type="datetime-local" {...register("startTime", { required: "Start time is required" })} />
          {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>}
        </div>
        <div>
          <Label htmlFor="endTime">End Time</Label>
          <Input id="endTime" type="datetime-local" {...register("endTime", { required: "End time is required" })} />
          {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime.message}</p>}
        </div>
        <div>
          <Label htmlFor="isPublic">Is Public</Label>
          <Input id="isPublic" type="checkbox" {...register("isPublic")} />
          {errors.isPublic && <p className="text-red-500 text-sm mt-1">{errors.isPublic.message}</p>}
        </div>
        <div>
          <Label htmlFor="maxDuration">Max Duration (minutes)</Label>
          <Input id="maxDuration" type="number" {...register("maxDuration")} />
          {errors.maxDuration && <p className="text-red-500 text-sm mt-1">{errors.maxDuration.message}</p>}
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Input id="status" {...register("status")} />
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
        </div>
        <div>
          <Label htmlFor="ratingFloor">Rating Floor</Label>
          <Input id="ratingFloor" type="number" {...register("ratingFloor")} />
          {errors.ratingFloor && <p className="text-red-500 text-sm mt-1">{errors.ratingFloor.message}</p>}
        </div>
        <div>
          <Label htmlFor="ratingCeil">Rating Ceil</Label>
          <Input id="ratingCeil" type="number" {...register("ratingCeil")} />
          {errors.ratingCeil && <p className="text-red-500 text-sm mt-1">{errors.ratingCeil.message}</p>}
        </div>
        <div>
          <Label htmlFor="isRated">Is Rated</Label>
          <Input id="isRated" type="checkbox" {...register("isRated")} />
          {errors.isRated && <p className="text-red-500 text-sm mt-1">{errors.isRated.message}</p>}
        </div>
        <div>
          <Label htmlFor="ratingType">Rating Type</Label>
          <Input id="ratingType" {...register("ratingType")} />
          {errors.ratingType && <p className="text-red-500 text-sm mt-1">{errors.ratingType.message}</p>}
        </div>
        <div>
          <Label htmlFor="ratingKFactor">Rating K Factor</Label>
          <Input id="ratingKFactor" type="number" {...register("ratingKFactor")} />
          {errors.ratingKFactor && <p className="text-red-500 text-sm mt-1">{errors.ratingKFactor.message}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
