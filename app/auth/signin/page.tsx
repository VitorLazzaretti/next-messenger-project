import { getProviders } from "next-auth/react";
import SignInComponent from "./SignInComponent";

async function SignInPage() {
  const providers = (await getProviders() || null);

  return (
    <div>
      <SignInComponent
        providers={providers}
      />
    </div>
  );
};

export default SignInPage;