"use client"
import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

// import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
    //   variant="secondary"
    //   size="icon"
      onClick={() =>{

        setTheme(theme==="system" ?"dark": "system")
        console.log(theme);
      }
        
      }
    >
      {theme === "system" ? (
        <>
          <SunIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch to Dark Mode</span>
        </>
      ) : (
        <>
          <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch to Light Mode</span>
        </>
      )}
    </button>
  )
}