import { SignInForm } from "@/components/auth/sign-in-form";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen">
      {/* Left Section */}
      <div className="flex items-center justify-center flex-1 p-6 lg:p-12">
        <SignInForm />
      </div>

      {/* Right Section */}
      <div className="relative hidden lg:flex lg:w-1/2">
        <div
          className="absolute inset-0 z-10 opacity-50 bg-gradient-to-br from-blue-900/90 to-blue-800/90"
          style={{
            backgroundImage: `url('/sign-in-bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-20 flex flex-col items-center justify-center px-12 text-center text-white">
          <h1 className="mb-4 text-4xl font-semibold">Hello Friend</h1>
          <p className="text-gray-200">
            To keep connected with us provide us with your information
          </p>
          <Link href={"/sign-up"}>
            <button className="px-8 py-2 mt-6 text-sm transition-colors rounded-none bg-white/10 hover:bg-white/20">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
