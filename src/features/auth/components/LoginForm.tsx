'use client';

import * as React from 'react';
import { useLoginMutation } from '../hooks/useAuthMutations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/api';

import { toast } from 'sonner';

export function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  
  const loginMutation = useLoginMutation();

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Password recovery is not supported yet.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg('Email and password are required');
      return;
    }
    
    loginMutation.mutate(
      { email, password },
      {
        onError: (error) => {
          if (error instanceof AxiosError && error.response?.data) {
            const apiError = error.response.data as ApiError;
            setErrorMsg(apiError.message || 'Invalid credentials');
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
        <CardTitle className="text-2xl font-bold tracking-tight">Sign in to TradeX</CardTitle>
        <CardDescription>Enter your email and password to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loginMutation.isPending}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button 
                onClick={handleForgotPassword}
                className="text-sm font-medium text-[var(--color-primary)] hover:underline focus:outline-none"
              >
                Forgot Password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loginMutation.isPending}
            />
          </div>
          
          {errorMsg && (
            <div className="p-3 text-sm rounded-md bg-[var(--color-danger)]/10 text-[var(--color-danger)]">
              {errorMsg}
            </div>
          )}

          <Button type="submit" className="w-full" isLoading={loginMutation.isPending}>
            Sign In
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-slate-500">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-[var(--color-primary)] hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
