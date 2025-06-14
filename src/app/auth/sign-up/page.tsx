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

const signUpWithGoogleDummy = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Signing up with Google")
            resolve({ success: true, message: "Signed up successfully with Google!" })
        }, 1000)
    })
}

function SignUpPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const emailSignUpMutation = useMutation({
        mutationFn: async () => {
            const { data, error } = await authClient.signUp.email({
                email,
                password,
                name,
                callbackURL: "/dashboard",
            })

            if (error) {
                toast.error(error.message)
                throw new Error(error.message)
            }

            return data
        },
        onSuccess: (data) => {
            console.log("Email sign-up success:", data)
            toast.success("Account created successfully! Redirecting...")
        },
        onError: (error) => {
            console.error("Email sign-up error:", error)
        },
    })

    const googleSignUpMutation = useMutation({
        mutationFn: signUpWithGoogleDummy,
        onSuccess: (data) => {
            console.log("Google sign-up success:", data)
            toast.success("Signed up with Google successfully!")
        },
        onError: (error) => {
            console.error("Google sign-up error:", error)
            toast.error("Failed to sign up with Google.")
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        emailSignUpMutation.mutate()
    }

    const handleGoogleSignUp = () => {
        googleSignUpMutation.mutate()
    }

    return (
        <section className="h-full flex flex-col w-full items-center justify-center py-8">
            <article className="flex flex-col justify-center md:max-w-sm lg:max-w-auto w-full">
                <article className="flex flex-col gap-2 w-full my-4">
                    <h2 className="text-3xl font-bold text-gray-800">Join us! 🎉</h2>
                    <p className="text-muted-foreground text-md md:max-w-md text-gray-600">
                        Create your account to unlock all the amazing features. It's quick and easy!
                    </p>
                </article>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <Label htmlFor="name" className="sr-only">
                            Name
                        </Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            required
                        />
                        <Button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            variant="ghost"
                            size="icon"
                        >
                            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                        </Button>
                    </div>

                    <Button
                        size="lg"
                        type="submit"
                        disabled={emailSignUpMutation.isPending}
                    >
                        {emailSignUpMutation.isPending ? "Signing Up..." : "Sign Up"}
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-500 my-4">Or</p>

                <Button
                    size="lg"
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50"
                    onClick={handleGoogleSignUp}
                    variant="secondary"
                    disabled={googleSignUpMutation.isPending}
                >
                    {googleSignUpMutation.isPending ? (
                        "Signing Up with Google..."
                    ) : (
                        <>
                            Sign Up with Google
                        </>
                    )}
                </Button>
                <p className="text-muted-foreground text-md text-center mt-4 text-gray-600">
                    Already have an account?{" "}
                    <Link className="font-semibold text-blue-600 hover:underline" href="/auth/sign-in">
                        Sign In
                    </Link>
                </p>

                {emailSignUpMutation.isError && (
                    <p className="text-red-500 text-sm text-center mt-2">Error: {emailSignUpMutation.error.message}</p>
                )}
                {googleSignUpMutation.isError && (
                    <p className="text-red-500 text-sm text-center mt-2">Error: {googleSignUpMutation.error.message}</p>
                )}
            </article>
        </section>
    )
}

export default SignUpPage
