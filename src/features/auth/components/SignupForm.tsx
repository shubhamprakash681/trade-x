'use client';

import * as React from 'react';
import { useSignupMutation } from '../hooks/useAuthMutations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/api';

export function SignupForm() {
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  
  const signupMutation = useSignupMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !password || !fullName) {
      setErrorMsg('All fields are required');
      return;
    }
    
    signupMutation.mutate(
      { email, fullName, password },
      {
        onError: (error) => {
          if (error instanceof AxiosError && error.response?.data) {
            const apiError = error.response.data as ApiError;
            setErrorMsg(apiError.message || 'Signup failed');
          } else {
            setErrorMsg('An unexpected error occurred');
          }
        },
      }
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto pl-6 pr-6">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
        <CardDescription>Enter your details below to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={signupMutation.isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={signupMutation.isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={signupMutation.isPending}
            />
          </div>
          
          {errorMsg && (
            <div className="p-3 text-sm rounded-md bg-[var(--color-danger)]/10 text-[var(--color-danger)]">
              {errorMsg}
            </div>
          )}

          <Button type="submit" className="w-full" isLoading={signupMutation.isPending}>
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[var(--color-primary)] hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
