
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { UseFormReturn } from "react-hook-form"
import { ContestInput } from "@/types/contest"

interface ContestDetailsProps {
  form: UseFormReturn<ContestInput>
}

export function ContestDetails({ form }: ContestDetailsProps) {
  const { register, formState: { errors }, setValue, getValues } = form

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Contest Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Contest Name</Label>
          <Input
            id="name"
            placeholder="Enter contest name"
            className="w-full"
            {...register("name", { required: "Contest name is required" })}
          />
          {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            placeholder="Enter contest description"
            className="min-h-[100px]"
            {...register("description")} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="start_time">Start Time</Label>
            <Input
              id="start_time"
              type="datetime-local"
              {...register("start_time", { required: "Start time is required" })}
            />
            {errors.start_time && <p className="text-destructive text-sm">{errors.start_time.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="end_time">End Time</Label>
            <Input
              id="end_time"
              type="datetime-local"
              {...register("end_time", { required: "End time is required" })}
            />
            {errors.end_time && <p className="text-destructive text-sm">{errors.end_time.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              defaultValue={getValues("status")}
              onValueChange={(value) => setValue("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" {...register("status", { required: "Status is required" })} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="rating_type">Rating Type</Label>
            <Select 
              defaultValue={getValues("rating_type")}
              onValueChange={(value) => setValue("rating_type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select rating type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="random">Random</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" {...register("rating_type", { required: "Rating type is required" })} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="rating_floor">Rating Floor</Label>
            <Input
              id="rating_floor"
              type="number"
              placeholder="0"
              {...register("rating_floor")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="rating_ceil">Rating Ceiling</Label>
            <Input
              id="rating_ceil"
              type="number"
              placeholder="3000"
              {...register("rating_ceil")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="rating_k_factor">Rating K Factor</Label>
            <Input
              id="rating_k_factor"
              type="number"
              placeholder="32"
              {...register("rating_k_factor", { required: "Rating K Factor is required" })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="is_public"
              onCheckedChange={(checked) => setValue("is_public", checked)}
              defaultChecked={true}
            />
            <Label htmlFor="is_public">Public Contest</Label>
            <input type="hidden" {...register("is_public")} />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_rated"
              onCheckedChange={(checked) => setValue("is_rated", checked)}
              defaultChecked={true}
            />
            <Label htmlFor="is_rated">Rated Contest</Label>
            <input type="hidden" {...register("is_rated")} />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="max_duration">Max Duration (minutes)</Label>
          <Input
            id="max_duration"
            type="number"
            placeholder="Enter duration in minutes (0 for no limit)"
            {...register("max_duration")}
          />
        </div>
      </CardContent>
    </Card>
  )
}