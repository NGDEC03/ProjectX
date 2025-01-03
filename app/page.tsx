import HeroSection from "@/components/sections/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'project X',
  description: 'Project X',
}

export default function Page() {
  return (
    <HeroSection />
  )
}