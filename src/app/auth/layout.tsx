import Image from "next/image"
import { ReactNode } from "react"

function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <main className="flex md:flex-row flex-col-reverse gap-4 md:justify-between items-center min-h-screen p-4 md:p-8">
            {children}

            {/* Image asset */}
            <Image
                className="rounded-3xl max-h-[200px] md:min-h-[600px] md:max-w-auto md:max-h-auto md:w-auto w-full object-cover"
                width={500}
                height={500}
                alt="Classroom"
                src="/images/assets/class.jpg" />
        </main>
    )
}

export default AuthLayout
