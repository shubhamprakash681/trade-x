'use client';

import { useAlerts } from '@/features/notifications/hooks/useNotificationQueries';
import { AlertsList } from '@/features/notifications/components/AlertsList';
import { CreateAlertForm } from '@/features/notifications/components/CreateAlertForm';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AlertsPage() {
  const { data: alerts, isLoading, isError, error } = useAlerts();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-slate-200 animate-pulse rounded"></div>
        <div className="h-64 w-full bg-slate-200 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message || 'Failed to load alerts. Please try again later.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Price Alerts</h1>
        <p className="text-slate-500 mt-1">Set targets and get notified when your favorite stocks move</p>
      </div>

      <CreateAlertForm />

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Active Alerts</h2>
        <AlertsList alerts={alerts || []} />
      </div>
    </div>
  );
}
