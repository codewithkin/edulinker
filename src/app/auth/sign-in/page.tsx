"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"



const signInWithGoogle = async () => {
    const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        newUserCallbackURL: "/onboarding"
    });

    if (error) {
        toast.error(error.message);
    }

    return data;
}

function SignInPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const emailSignInMutation = useMutation({
        mutationFn: () =>
            signInWithPasswordAndEmail(email, password),
        onSuccess: (data) => {
            console.log("Email sign-in success:", data)
        },
        onError: (error) => {
            console.error("Email sign-in error:", error)
        },
    })

    const signInWithPasswordAndEmail = async (email: string, password: string) => {
        const { data, error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/dashboard"
        })

        if (error) {
            return toast.error(error.message);
        }

        return data;
    }

    const googleSignInMutation = useMutation({
        mutationFn: signInWithGoogle,
        onSuccess: (data) => {
            console.log("Google sign-in success:", data)
        },
        onError: (error) => {
            console.error("Google sign-in error:", error)
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        emailSignInMutation.mutate()
    }

    const handleGoogleSignIn = () => {
        googleSignInMutation.mutate()
    }

    return (
        <section className="h-full flex flex-col w-full items-center justify-center">
            <article className="flex flex-col justify-center md:max-w-sm lg:max-w-auto">
                <article className="flex flex-col gap-2 w-full my-4">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome back 👋</h2>
                    <p className="text-muted-foreground text-md md:max-w-md">
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
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                        </Button>
                    </div>

                    <Link
                        href="/auth/forgot-password"
                        className="text-primary font-semibold text-sm self-end"
                    >
                        Forgot Password?
                    </Link>

                    <Button
                        size="lg"
                        type="submit"
                        disabled={emailSignInMutation.isPending}
                    >
                        {emailSignInMutation.isPending ? "Signing In..." : "Sign In"}
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-500 my-4">Or</p>

                <Button
                    size="lg"
                    className="bg-gray-300 text-gray-600 hover:bg-gray-500"
                    onClick={handleGoogleSignIn}
                    variant="secondary"
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
                <p className="text-muted-foreground text-md text-center mt-4">Don't have an account ? <Link className="font-semibold text-primary" href="/auth/sign-up">Sign up</Link></p>

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
