import { Metadata } from 'next'
import Dashboard from '@/components/essentials/dashboard'

export const metadata: Metadata = {
  title: 'Contest Platform Dashboard',
  description: 'Your hub for all contest activities and information',
}

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-white dark:from-slate-950 dark:to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-emerald-500/5 to-transparent dark:from-cyan-600/20 dark:via-emerald-500/10 dark:to-transparent" />
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(20,184,166,0.1)_0deg,transparent_60deg,transparent_300deg,rgba(20,184,166,0.1)_360deg)] dark:bg-[conic-gradient(from_0deg_at_50%_50%,rgba(20,184,166,0.2)_0deg,transparent_60deg,transparent_300deg,rgba(20,184,166,0.2)_360deg)]" />

      {/* Dashboard content */}
      <div className="relative z-10 mt-20">
        <Dashboard />
      </div>
    </div>
  )
}

