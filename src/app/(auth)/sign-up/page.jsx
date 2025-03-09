import { SignUpForm } from "@/components/auth/sign-up-form";
import Link from "next/link";

export default function SignUp() {
  return (
    <main className="flex min-h-screen">
      {/* Left Section */}
      <div className="relative hidden lg:flex lg:w-1/2">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-10 opacity-50 bg-gradient-to-br from-red-900/90 to-blue-900/90"
          style={{
            backgroundImage: `url('/sign-up-bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Centered Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full px-12 text-white">
          <h1 className="mb-4 text-4xl font-semibold">Welcome back</h1>
          <p className="text-center text-gray-200">
            To keep connected with us provide us with your information
          </p>
          <Link href="/sign-in">
            <button className="px-8 py-2 mt-6 text-sm transition-colors rounded-md bg-white/10 hover:bg-white/20 w-fit">
              Signin
            </button>
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center flex-1 p-6 lg:p-12">
        <SignUpForm />
      </div>
    </main>
  );
}
