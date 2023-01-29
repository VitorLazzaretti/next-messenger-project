import { getProviders } from "next-auth/react";
import SignInComponent from "./SignInComponent";

async function SignInPage() {
  const providers = await getProviders();

  return (
    <div>
      <SignInComponent
        providers={providers}
      />
    </div>
  );
};

export default SignInPage;