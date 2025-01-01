"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { ContestDetails } from '@/components/essentials/cont/contest-details'
import { ContestInput } from '@/types/contest'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import axios from 'axios'
import { useUser } from '@/context/userContext'

export function ContestForm() {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ContestInput>({
  });

  const onSubmit = async (data: ContestInput) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);  
      setSuccessMessage(null);

      const intFields = ["creator_id", "max_duration", "rating_floor", "rating_ceil", "rating_k_factor"];

      const parsedData = {
        ...data,
        ...Object.fromEntries(
          Object.entries(data).map(([key, value]) =>
            intFields.includes(key) ? [key, parseInt(value as unknown as string, 10)] : [key, value]
          )
        )
      };

      parsedData.creator_id = user?.ID || 101;

      const contestResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contest/create`, parsedData);

      localStorage.setItem('contest', JSON.stringify(contestResponse.data));
      const existingContests = JSON.parse(localStorage.getItem('contests') || '[]');
      const updatedContests = [...existingContests, contestResponse.data];
      localStorage.setItem('contests', JSON.stringify(updatedContests));

      setSuccessMessage("Contest created successfully!");
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to create contest. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
      <ContestDetails register={register} errors={errors} />

      {successMessage && (
        <div className="text-green-600 font-semibold">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <AlertDialog open={true}>
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

      <div className="flex justify-between">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Contest...' : 'Create Contest'}
        </Button>
      </div>
    </form>
  );
}
