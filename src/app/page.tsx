import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function Landing() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session) {
    redirect("/dashboard")
  } else {
    redirect("/auth/sign-in")
  }

  return null
}