import { SignIn } from "@clerk/nextjs"

const clerkAppearance = {
    elements: {
        rootBox: "mx-auto w-full max-w-[400px]",
        cardBox: "w-full",
    },
}

const SignInPage = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
            <SignIn appearance={clerkAppearance} />
        </main>
    )
}

export default SignInPage




// import { SignIn } from '@clerk/nextjs'

// const SignInPage = () => {
//     return <SignIn />
// };

// export default SignInPage;