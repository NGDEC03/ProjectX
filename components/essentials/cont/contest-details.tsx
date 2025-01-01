import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/userContext";
import { Textarea } from "@/components/ui/textarea";
import { ContestDetailsProps } from "@/types/contest";

export function ContestDetails({ register, errors }: ContestDetailsProps) {
  const {user}=useUser()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contest Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Contest Name</Label>
          <Input
            id="name"
            {...register("name", { required: "Contest name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>
        <div>
          <Label htmlFor="start_time">Start Time</Label>
          <Input
            id="start_time"
            type="datetime-local"
            {...register("start_time", { required: "Start time is required" })}
          />
          {errors.start_time && <p className="text-red-500 text-sm mt-1">{errors.start_time.message}</p>}
        </div>
        <div>
          <Label htmlFor="end_time">End Time</Label>
          <Input
            id="end_time"
            type="datetime-local"
            {...register("end_time", { required: "End time is required" })}
          />
          {errors.end_time && <p className="text-red-500 text-sm mt-1">{errors.end_time.message}</p>}
        </div>
        <div>
          <Label htmlFor="is_public">Is Public</Label>
          <Input
            id="is_public"
            type="checkbox"
            {...register("is_public")}
          />
          {errors.is_public && <p className="text-red-500 text-sm mt-1">{errors.is_public.message}</p>}
        </div>
        <div>
          <Label htmlFor="max_duration">Max Duration (minutes)</Label>
          <Input
            id="max_duration"
            type="number"
            {...register("max_duration")}
          />
          {errors.max_duration && <p className="text-red-500 text-sm mt-1">{errors.max_duration.message}</p>}
        </div>
        <div>
          <Label htmlFor="creator_id">Creator ID</Label>
          <Input
            id="creator_id"
          value={user?.ID}
            disabled={true}
            type="number"
            {...register("creator_id", { required: "ID required" })}
          />
          {errors.creator_id && <p className="text-red-500 text-sm mt-1">{errors.creator_id.message}</p>}
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Input
            id="status"
            {...register("status", { required: "Status is required" })}
          />
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
        </div>
        <div>
          <Label htmlFor="rating_floor">Rating Floor</Label>
          <Input
            id="rating_floor"
            type="number"
            {...register("rating_floor")}
          />
          {errors.rating_floor && <p className="text-red-500 text-sm mt-1">{errors.rating_floor.message}</p>}
        </div>
        <div>
          <Label htmlFor="rating_ceil">Rating Ceil</Label>
          <Input
            id="rating_ceil"
            type="number"
            {...register("rating_ceil")}
          />
          {errors.rating_ceil && <p className="text-red-500 text-sm mt-1">{errors.rating_ceil.message}</p>}
        </div>
        <div>
          <Label htmlFor="is_rated">Is Rated</Label>
          <Input
            id="is_rated"
            type="checkbox"
            {...register("is_rated")}
          />
          {errors.is_rated && <p className="text-red-500 text-sm mt-1">{errors.is_rated.message}</p>}
        </div>
        <div>
          <Label htmlFor="rating_type">Rating Type</Label>
          <Input
            id="rating_type"
            {...register("rating_type", { required: "Rating type is required" })}
          />
          {errors.rating_type && <p className="text-red-500 text-sm mt-1">{errors.rating_type.message}</p>}
        </div>
        <div>
          <Label htmlFor="rating_k_factor">Rating K Factor</Label>
          <Input
            id="rating_k_factor"
            type="number"
            {...register("rating_k_factor", { required: "Rating K Factor is required" })}
          />
          {errors.rating_k_factor && <p className="text-red-500 text-sm mt-1">{errors.rating_k_factor.message}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
