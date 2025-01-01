'use client';

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { ContestDetails } from './cont/contest-details'; 
import { ContestInput } from '@/types/contest'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import axios, { AxiosError } from 'axios'
import { useUser } from '@/context/userContext'

export function ContestForm() {
  const { user } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const form = useForm<ContestInput>({
    defaultValues: {
      status: 'pending',
      rating_type: 'standard',
      is_public: true,
      is_rated: true,
      rating_k_factor: 32,
      max_duration: 0,
      rating_floor: 0,
      rating_ceil: 3000,
      creator_id: user?.ID || 0,
      description: '',
    }
  })

  const onSubmit = async (data: ContestInput) => {
    try {
      setIsSubmitting(true)
      setErrorMessage(null)
      setSuccessMessage(null)

      // Format dates to RFC3339 format
      const formattedData = {
        ...data,
        start_time: new Date(data.start_time).toISOString(),
        end_time: new Date(data.end_time).toISOString(),
        // Ensure numeric fields are numbers, not strings
        max_duration: Number(data.max_duration),
        rating_floor: Number(data.rating_floor),
        rating_ceil: Number(data.rating_ceil),
        rating_k_factor: Number(data.rating_k_factor),
        creator_id: Number(user?.ID)
      }

      const contestResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/contest/create`, 
        formattedData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      setSuccessMessage(contestResponse.data.message)
      form.reset()
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error('Submission error:', err)
      setErrorMessage(error.response?.data?.message || "Failed to create contest. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-4xl mx-auto p-4">
      <ContestDetails form={form} />

      {successMessage && (
        <div className="bg-green-50 text-green-600 p-4 rounded-md font-semibold">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <AlertDialog open={!!errorMessage} onOpenChange={() => setErrorMessage(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Error</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              {errorMessage}
            </AlertDialogDescription>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? 'Creating Contest...' : 'Create Contest'}
        </Button>
      </div>
    </form>
  )
}
