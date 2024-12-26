"use client"

import React, { useState, useRef, KeyboardEvent } from 'react'
import { Input } from "@/components/ui/input"

interface OTPInputProps {
  length: number
  onComplete: (otp: string) => void
}

export function OTPInput({ length, onComplete }: OTPInputProps) {
  const [otp, setOtp] = useState(Array(length).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false

    const newOtp = [...otp]
    newOtp[index] = element.value
    setOtp(newOtp)

    // Focus next input
    if (element.nextSibling && element.value !== '') {
      (element.nextSibling as HTMLInputElement).focus()
    }

    if (newOtp.every(v => v !== '')) {
      onComplete(newOtp.join(''))
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Focus previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex justify-center gap-2">
      {otp.map((data, index) => (
        <Input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={data}
          ref={el => {
            inputRefs.current[index] = el;
          }}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 text-center text-lg bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 focus:ring-cyan-500 dark:focus:ring-cyan-600"
        />
      ))}
    </div>
  )
}
