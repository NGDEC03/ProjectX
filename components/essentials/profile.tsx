"use client"

import { useState } from 'react'
import { useUser } from '@/context/userContext'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/toast"
import { Loader2 } from 'lucide-react'
import { Toast } from "@/components/ui/toast"

type ProfileFormData = {
  FirstName: string
  LastName: string
  Email: string
  Password?: string
  Image?: string
  Phone?: string
  Gender?: 'male' | 'female' | 'other'
}

export default function ProfileEditContent() {
  const { user, updateUser } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProfileFormData>({
    defaultValues: {
      FirstName: user?.FirstName || "",
      LastName: user?.LastName || "",
      Email: user?.Email || "",
      Image: user?.Image || "",
      Phone: user?.Phone || "",
      Gender: user?.Gender,
    },
  })

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    setIsLoading(true)
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update user context
      updateUser(data)
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleEditing = () => {
    if (isEditing) {
      reset()
    }
    setIsEditing(!isEditing)
  }

  return (
    <div className="container mx-auto p-6 mt-24">
      <Card className="w-full max-w-2xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
          <div className="flex items-center space-x-2">
            <Switch
              checked={isEditing}
              onCheckedChange={toggleEditing}
              aria-label="Toggle edit mode"
            />
            <Label htmlFor="edit-mode">Edit Mode</Label>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="FirstName">First Name</Label>
                <Input
                  id="FirstName"
                  placeholder={user?.FirstName}
                  {...register("FirstName", { required: "First name is required" })}
                  disabled={!isEditing}
                />
                {errors.FirstName && (
                  <p className="text-sm text-red-500">{errors.FirstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="LastName">Last Name</Label>
                <Input
                  id="LastName"
                  placeholder={user?.LastName}
                  {...register("LastName", { required: "Last name is required" })}
                  disabled={!isEditing}
                />
                {errors.LastName && (
                  <p className="text-sm text-red-500">{errors.LastName.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="Email">Email</Label>
              <Input
                id="Email"
                type="email"
                placeholder={user?.Email}
                {...register("Email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                disabled={true}
              />
              {errors.Email && (
                <p className="text-sm text-red-500">{errors.Email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="Password">Password</Label>
              <Input
                id="Password"
                type="password"
                {...register("Password", {
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                disabled={!isEditing}
                placeholder="Leave blank to keep current password"
              />
              {errors.Password && (
                <p className="text-sm text-red-500">{errors.Password.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="Image">Profile Image URL</Label>
              <Input
                id="Image"
                placeholder={user?.Image?user.Image:"Paste your image url"}
                {...register("Image", {
                  pattern: {
                    value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                    message: "Invalid URL"
                  }
                })}
                disabled={!isEditing}
              />
              {errors.Image && (
                <p className="text-sm text-red-500">{errors.Image.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="Phone">Phone</Label>
              <Input
                id="Phone"
                placeholder={user?.Phone?user.Phone:"Enter phone"}
                {...register("Phone")}
                disabled={!isEditing}
              />
              {errors.Phone && (
                <p className="text-sm text-red-500">{errors.Phone.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="Gender">Gender</Label>
              <Select 
              
                onValueChange={(value) => setValue("Gender", value as 'male' | 'female' | 'other')}
                defaultValue={user?.Gender}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder={user?.Gender?user.Gender:"Select gender" }/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.Gender && (
                <p className="text-sm text-red-500">{errors.Gender.message}</p>
              )}
            </div>
            {isEditing && (
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

