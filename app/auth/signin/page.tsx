import { getProviders } from "next-auth/react";
import SignInComponent from "./SignInComponent";

async function SignInPage() {
  const providers = (await getProviders() || null);
  const url = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

  return (
    <div>
      <SignInComponent
        providers={providers}
        url={url}
      />
    </div>
  );
};

export default SignInPage;