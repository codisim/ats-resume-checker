// import { SignUp } from '@clerk/nextjs'


// const SignUpPage = () => {
//     return <SignUp />
// };

// export default SignUpPage;


import { SignUp } from "@clerk/nextjs"

const clerkAppearance = {
  elements: {
    rootBox: "mx-auto w-full max-w-[400px]",
    cardBox: "w-full",
  },
}

const SignUpPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <SignUp appearance={clerkAppearance} />
    </main>
  )
}

export default SignUpPage
