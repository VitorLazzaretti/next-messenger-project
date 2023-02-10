"use client";

import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>
}

type ProviderInfo = {
  name: string;
  image: string;
  color: string;
}

function SignInComponent({ providers }: Props) {
  const info: ProviderInfo[] = [
    {
      name: 'Facebook',
      image: 'https://img.freepik.com/vetores-gratis/vetor-de-icone-de-midia-social-de-arquivo-de-meta-logo-3-de-novembro-de-2021-banguecoque-tailandia_53876-157873.jpg',
      color: 'bg-blue-500 hover:bg-blue-700'
    },
    {
      name: 'GitHub',
      image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      color: 'bg-gray-800 hover:bg-black'
    }
  ];

  return (
    <div>
      {providers ? Object.values(providers!).map((provider) => (
        <div
          key={provider.id}
          className="flex flex-col mx-auto w-96 justify-center p-8 rounded-md items-center cursor-pointer bg-gray-200 my-8"
          onClick={() => {
            signIn(provider.id, {
              redirect: true,
              callbackUrl: process.env.VERCEL_URL || 'http://localhost:3000'
            })
          }}
        >
          <Image
            className="rounded-full mx-2 object-contain my-4"
            src={info.find((item) => item.name === provider.name)?.image!}
            alt={provider.name}
            width={100}
            height={100}
          />

          <div
            className={`text-center min-w-[250px] text-white font-bold py-2 px-4 rounded ${info.find((item) => item.name === provider.name)?.color}`}
          > Sign In with {provider.name} </div>
        </div>
      )):
      <div>
        <p className="text-center text-sm text-gray-500">
          No providers found
        </p>
      </div>
      }
    </div>
  )
}

export default SignInComponent;