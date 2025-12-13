'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { User, Lock, Loader2, CheckCircle } from 'lucide-react'
import { useAuth } from '@/components/auth/auth-provider'
import { cn } from '@/lib/utils'

interface SettingsTabProps {
  userId: string
}

export function SettingsTab({ userId }: SettingsTabProps) {
  const { user, loading, updateProfile, updatePassword } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile')
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileMessage, setProfileMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)
  const [passwordMessage, setPasswordMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  // Load user profile on mount
  useEffect(() => {
    if (!loading && user) {
      setProfile({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        company: user.company || '',
      })
    }
  }, [loading, user])

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setProfileMessage(null)

    try {
      const result = await updateProfile({
        fullName: profile.fullName,
        phone: profile.phone,
        company: profile.company,
      })

      if (result.success) {
        setProfileMessage({
          type: 'success',
          text: 'Profile updated successfully!',
        })
      } else {
        setProfileMessage({
          type: 'error',
          text: result.error || 'Failed to update profile',
        })
      }
    } catch {
      setProfileMessage({
        type: 'error',
        text: 'An unexpected error occurred',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setPasswordMessage(null)

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match' })
      setIsSubmitting(false)
      return
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage({
        type: 'error',
        text: 'Password must be at least 6 characters',
      })
      setIsSubmitting(false)
      return
    }

    try {
      const result = await updatePassword(passwordForm.newPassword)

      if (result.success) {
        setPasswordMessage({
          type: 'success',
          text: 'Password updated successfully!',
        })
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
      } else {
        setPasswordMessage({
          type: 'error',
          text: result.error || 'Failed to update password',
        })
      }
    } catch {
      setPasswordMessage({
        type: 'error',
        text: 'An unexpected error occurred',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
          <Loader2 className="relative h-10 w-10 animate-spin text-primary" strokeWidth={2.5} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Premium Header */}
      <div className="pb-4 border-b border-gray-200/50">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
          Account Settings
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-600 font-medium">
          Manage your profile information and security settings
        </p>
      </div>

      {/* Premium Tabs Navigation */}
      <div className="rounded-2xl border-2 border-gray-200/60 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <nav className="flex min-w-max">
            <button
              onClick={() => setActiveTab('profile')}
              className={cn(
                'flex flex-1 items-center justify-center gap-3 px-8 py-4 text-sm font-bold transition-all duration-300 whitespace-nowrap relative group',
                activeTab === 'profile'
                  ? 'bg-linear-to-r from-primary to-primary/90 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <div className={cn(
                "relative z-10 transition-all duration-300",
                activeTab === 'profile' ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" : ""
              )}>
                <User className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <span className="relative z-10">Profile</span>
              {activeTab === 'profile' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={cn(
                'flex flex-1 items-center justify-center gap-3 px-8 py-4 text-sm font-bold transition-all duration-300 whitespace-nowrap relative group',
                activeTab === 'password'
                  ? 'bg-linear-to-r from-primary to-primary/90 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <div className={cn(
                "relative z-10 transition-all duration-300",
                activeTab === 'password' ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" : ""
              )}>
                <Lock className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <span className="relative z-10">Password</span>
              {activeTab === 'password' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30" />
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="rounded-2xl border-2 border-gray-200/60 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden relative">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16"></div>
          
          <div className="relative">
            <div className="border-b border-gray-200/50 p-5 sm:p-7 bg-gradient-to-r from-white/50 to-transparent">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl"></div>
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 border-2 border-primary/30 shadow-lg">
                    <User className="h-7 w-7 text-primary" strokeWidth={2} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Profile Information
                  </h3>
                  <p className="text-sm text-gray-600 mt-1.5 font-medium">
                    Update your personal details
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleProfileSubmit} className="p-5 sm:p-7">
              {profileMessage && (
                <Alert
                  className={cn(
                    "mb-6 rounded-xl border-2 shadow-lg",
                    profileMessage.type === 'success'
                      ? 'bg-primary/10 text-primary border-primary/30'
                      : 'bg-red-50 text-red-900 border-red-200'
                  )}
                >
                  <CheckCircle className={cn(
                    "h-5 w-5",
                    profileMessage.type === 'success' ? "text-primary" : "text-red-600"
                  )} strokeWidth={2.5} />
                  <AlertDescription className="font-semibold">{profileMessage.text}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-6">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-bold text-gray-900">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="mt-2 h-11 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm font-medium"
                    disabled={isSubmitting}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-bold text-gray-900">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="mt-2 h-11 opacity-70 border-2 border-gray-200 rounded-xl bg-gray-50/80 backdrop-blur-sm font-medium"
                  />
                  <p className="mt-2 text-xs text-gray-600 font-medium">
                    Email cannot be changed. Contact support if needed.
                  </p>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-bold text-gray-900">
                    Phone Number <span className="text-gray-500 font-normal">(optional)</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="mt-2 h-11 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm font-medium"
                    disabled={isSubmitting}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <Label htmlFor="company" className="text-sm font-bold text-gray-900">
                    Company Name <span className="text-gray-500 font-normal">(optional)</span>
                  </Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    className="mt-2 h-11 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm font-medium"
                    disabled={isSubmitting}
                    placeholder="Enter your company name"
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 h-12 bg-linear-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" strokeWidth={2.5} />}
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => {
                      if (user) {
                        setProfile({
                          fullName: user.fullName || '',
                          email: user.email || '',
                          phone: user.phone || '',
                          company: user.company || '',
                        })
                      }
                      setProfileMessage(null)
                    }}
                    className="h-12 px-6 border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-primary hover:text-primary transition-all duration-200 rounded-xl"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Tab */}
      {activeTab === 'password' && (
        <div className="rounded-2xl border-2 border-gray-200/60 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden relative">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16"></div>
          
          <div className="relative">
            <div className="border-b border-gray-200/50 p-5 sm:p-7 bg-gradient-to-r from-white/50 to-transparent">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl"></div>
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 border-2 border-primary/30 shadow-lg">
                    <Lock className="h-7 w-7 text-primary" strokeWidth={2} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Change Password
                  </h3>
                  <p className="text-sm text-gray-600 mt-1.5 font-medium">
                    Update your password to keep your account secure
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit} className="p-5 sm:p-7">
              {passwordMessage && (
                <Alert
                  className={cn(
                    "mb-6 rounded-xl border-2 shadow-lg",
                    passwordMessage.type === 'success'
                      ? 'bg-primary/10 text-primary border-primary/30'
                      : 'bg-red-50 text-red-900 border-red-200'
                  )}
                >
                  <CheckCircle className={cn(
                    "h-5 w-5",
                    passwordMessage.type === 'success' ? "text-primary" : "text-red-600"
                  )} strokeWidth={2.5} />
                  <AlertDescription className="font-semibold">{passwordMessage.text}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-6">
                <div>
                  <Label htmlFor="currentPassword" className="text-sm font-bold text-gray-900">
                    Current Password
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    placeholder="Enter current password"
                    className="mt-2 h-11 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm font-medium"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="newPassword" className="text-sm font-bold text-gray-900">
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder="Enter new password"
                    className="mt-2 h-11 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm font-medium"
                    disabled={isSubmitting}
                  />
                  <p className="mt-2 text-xs text-gray-600 font-medium">Minimum 6 characters</p>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-sm font-bold text-gray-900">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm new password"
                    className="mt-2 h-11 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm font-medium"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 h-12 bg-linear-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" strokeWidth={2.5} />}
                    Update Password
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => {
                      setPasswordForm({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                      })
                      setPasswordMessage(null)
                    }}
                    className="h-12 px-6 border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-primary hover:text-primary transition-all duration-200 rounded-xl"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


