import { Metadata } from "next";
import SignInForm from "./signin";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your account",
    keywords: "sign in, login, account"
}

export default function Page() {
    return <SignInForm />
}