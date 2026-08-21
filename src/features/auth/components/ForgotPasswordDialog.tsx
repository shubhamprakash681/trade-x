'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRequestPasswordRecoveryMutation, useResetPasswordMutation } from '../hooks/useAuthMutations';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { ApiError } from '@/types/api';

interface ForgotPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ForgotPasswordDialog({ open, onOpenChange }: ForgotPasswordDialogProps) {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [email, setEmail] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  
  const requestMutation = useRequestPasswordRecoveryMutation();
  const resetMutation = useResetPasswordMutation();

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setEmail('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
    }, 300);
  };

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    requestMutation.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success('OTP sent to your email');
          setStep(2);
        },
        onError: (error) => {
          if (error instanceof AxiosError && error.response?.data) {
            const apiError = error.response.data as ApiError;
            toast.error(apiError.message || 'Failed to request OTP');
          } else {
            toast.error('An unexpected error occurred');
          }
        },
      }
    );
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    resetMutation.mutate(
      { email, otp, newPassword },
      {
        onSuccess: () => {
          toast.success('Password successfully reset! You can now log in.');
          handleClose();
        },
        onError: (error) => {
          if (error instanceof AxiosError && error.response?.data) {
            const apiError = error.response.data as ApiError;
            toast.error(apiError.message || 'Failed to reset password');
          } else {
            toast.error('An unexpected error occurred');
          }
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            {step === 1 
              ? "Enter your email address and we'll send you an OTP to reset your password."
              : "Enter the OTP sent to your email and your new password."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <form id="request-form" onSubmit={handleRequestOtp} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email Address</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>
          </form>
        ) : (
          <form id="reset-form" onSubmit={handleResetPassword} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="otp">One-Time Password (OTP)</Label>
              <Input
                id="otp"
                type="text"
                placeholder="6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </form>
        )}

        <DialogFooter>
          <Button 
            className="bg-transparent border border-slate-200 hover:bg-slate-100 text-slate-900" 
            type="button" 
            onClick={handleClose}
          >
            Cancel
          </Button>
          {step === 1 ? (
            <Button 
              type="submit" 
              form="request-form" 
              isLoading={requestMutation.isPending}
            >
              Send OTP
            </Button>
          ) : (
            <Button 
              type="submit" 
              form="reset-form" 
              isLoading={resetMutation.isPending}
            >
              Reset Password
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
