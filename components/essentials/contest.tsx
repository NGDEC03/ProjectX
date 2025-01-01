"use client"

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { ContestDetails } from '@/components/essentials/cont/contest-details'
import { ProblemForm } from '@/components/essentials/cont/problem-form'
import { ContestInput } from '@/types/contest'
import { useUser } from '@/context/userContext'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

export function ContestForm() {
    const {user,updateUser}=useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, control, handleSubmit, formState: { errors } } = useForm<ContestInput>({
    defaultValues: {
      problems: [{ description: '', testCases: [{ input: '', expectedOutput: '' }] }]
    }
  })
  const { fields: problemFields, append: appendProblem, remove: removeProblem } = useFieldArray({
    control,
    name: "problems"
  })

  const onSubmit = async (data: ContestInput) => {
    setIsSubmitting(true)
    // Here you would typically send the data to your backend
    console.log(data)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    alert('Contest created successfully!')
  }

  return user?.IsAdmin?(
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
      <ContestDetails register={register} errors={errors} />

      {problemFields.map((field, index) => (
        <ProblemForm
          key={field.id}
          index={index}
          register={register}
          errors={errors}
          control={control}
          removeProblem={removeProblem}
        />
      ))}

      <div className="flex justify-between">
        <Button type="button" onClick={() => appendProblem({ description: '', testCases: [{ input: '', expectedOutput: '' }] })}>
          Add Problem
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Contest...' : 'Create Contest'}
        </Button>
      </div>
    </form>
  ):(
    <AlertDialog open={true}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Access Denied</AlertDialogTitle>
        <AlertDialogDescription>
          You do not have permission to access this page. Please contact an administrator if you believe this is an error.
        </AlertDialogDescription>
      </AlertDialogHeader>
    </AlertDialogContent>
  </AlertDialog>
  )
}

