import { Metadata } from "next";
import SignUpForm from "./signup";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Sign up for a new account",
    keywords: "sign up, register, account"
}

export default function Page() {
    return <SignUpForm />
}