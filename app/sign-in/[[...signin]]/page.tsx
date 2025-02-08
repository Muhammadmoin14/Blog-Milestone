import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "bg-white shadow-lg rounded-lg",
            headerTitle: "text-xl font-bold text-main",
            socialButtons: "gap-2 hover:border-main",
            formButtonPrimary: "bg-main hover:bg-main border-none outline-none text-white font-bold rounded-md",
          },
        }} />
    </div>
  );
}