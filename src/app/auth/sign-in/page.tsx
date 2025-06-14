"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const signInWithEmailAndPasswordDummy = async (email: string, password: string) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Signing in with email and password:", { email, password })
            resolve({ success: true, message: "Signed in successfully with email/password!" })
        }, 1000)
    })
}

const signInWithGoogleDummy = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Signing in with Google")
            resolve({ success: true, message: "Signed in successfully with Google!" })
        }, 1000)
    })
}

function SignInPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const emailSignInMutation = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            signInWithEmailAndPasswordDummy(email, password),
        onSuccess: (data) => {
            console.log("Email sign-in success:", data)
        },
        onError: (error) => {
            console.error("Email sign-in error:", error)
        },
    })

    const googleSignInMutation = useMutation({
        mutationFn: signInWithGoogleDummy,
        onSuccess: (data) => {
            console.log("Google sign-in success:", data)
        },
        onError: (error) => {
            console.error("Google sign-in error:", error)
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        emailSignInMutation.mutate({ email, password })
    }

    const handleGoogleSignIn = () => {
        googleSignInMutation.mutate()
    }

    return (
        <section className="h-full flex items-center justify-center">
            <article className="flex flex-col">
                <article className="flex flex-col gap-2 w-full my-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800">Welcome back!</h2>
                    <p className="text-center text-muted-foreground text-md md:max-w-md">
                        It's great to see you again! Let's get you signed in and back to what you love.
                    </p>
                </article>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <Label htmlFor="email" className="sr-only">
                            Email
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Label htmlFor="password" className="sr-only">
                            Password
                        </Label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            required
                        />
                        <Button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            aria-Label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                        </Button>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                        disabled={emailSignInMutation.isPending}
                    >
                        {emailSignInMutation.isPending ? "Signing In..." : "Sign In"}
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-500">Or</p>

                <Button
                    onClick={handleGoogleSignIn}
                    className="w-full bg-red-600 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                    disabled={googleSignInMutation.isPending}
                >
                    {googleSignInMutation.isPending ? (
                        "Signing In with Google..."
                    ) : (
                        <>
                            Sign In with Google
                        </>
                    )}
                </Button>

                {emailSignInMutation.isError && (
                    <p className="text-red-500 text-sm text-center">Error: {emailSignInMutation.error.message}</p>
                )}
                {googleSignInMutation.isError && (
                    <p className="text-red-500 text-sm text-center">Error: {googleSignInMutation.error.message}</p>
                )}
            </article>
        </section>
    )
}

export default SignInPage
