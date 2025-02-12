import logo from '@public/Nebula_Planner_Logo.png';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { getProviders, signIn, useSession } from 'next-auth/react';
import React from 'react';

import { useRouter } from 'next/router';

// import AuthCard from '../../components/auth/AuthCard';
// import LoginCard from '@components/auth/Login'

/**
 * A page that presents a sign-in/sign-up box to the user.
 */
export default function AuthPage({
  providers,
}: InferGetServerSidePropsType<typeof getStaticProps>): JSX.Element {
  const [email, setEmail] = React.useState('');
  const [showSignIn, setShowSignIn] = React.useState(true);

  // Lets just handle auth redirect on client side
  const router = useRouter();
  const { status } = useSession();

  React.useEffect(() => {
    if (router && status === 'authenticated') {
      router.push('/app');
    }
  }, [router, status]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleEmailSignIn = () => {
    signIn('email', {
      email,
      callbackUrl: '/app',
    });
  };
  return (
    <div className="relative flex h-screen flex-col items-center justify-center space-y-10 bg-gradient-to-r from-purple-500 to-blue-500">
      <section>
        <div className="m-2 bg-white md:rounded-md md:shadow-md">
          <div className="w-96 rounded bg-white p-6 shadow-none md:shadow-lg ">
            <div className="mb-4 flex items-center justify-center">
              <Image
                src={logo}
                alt="Logo"
                width="120"
                height="120"
                className="rounded-full"
                priority
              />
            </div>
            <h1 className="mb-2 text-center text-3xl font-semibold leading-normal">Sign in</h1>
            <p className="text-sm leading-normal">
              Log in to your Nebula Profile to continue to Planner.
            </p>
            <section className="mt-5 space-y-5">
              <div className="relative mb-4">
                <input
                  type="email"
                  className="w-full rounded border border-black p-3 outline-none focus:border-black"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email"
                  onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                      handleEmailSignIn();
                    }
                  }}
                ></input>
              </div>
              <button
                onClick={handleEmailSignIn}
                className="w-full rounded-lg bg-blue-700 py-3 text-center text-lg text-white hover:bg-blue-800"
              >
                Sign in
              </button>
              {providers && (
                <div className="mx-auto -mb-6 items-center rounded-lg border-2 border-red-400 pb-1">
                  <h4 className="text-s text-center text-gray-700">or</h4>
                </div>
              )}
              {providers &&
                Object.values(providers).map((provider, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      signIn(provider.id, {
                        callbackUrl: '/app',
                      })
                    }
                    className="block w-full appearance-none items-center justify-center rounded-lg border border-gray-500 bg-gray-100 py-3 px-3 leading-tight text-gray-700 shadow hover:bg-gray-200 hover:text-gray-700 focus:outline-none"
                  >
                    <h4 className="text-center text-lg text-blue-700">
                      Sign in with {provider.name}
                    </h4>
                  </button>
                ))}
              <div className="flex place-content-center">
                <h4 className="text-lg">
                  {showSignIn ? 'New to Nebula?' : 'Existing User?'}
                  <button
                    onClick={() => setShowSignIn(!showSignIn)}
                    className="ml-2 text-lg font-semibold text-blue-700 hover:rounded-lg hover:bg-blue-200"
                  >
                    {showSignIn ? 'Sign Up' : 'Sign In'}
                  </button>
                </h4>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
export async function getStaticProps() {
  const providers = await getProviders();

  if (providers && providers['email']) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    delete providers['email'];
  }
  return {
    props: { providers },
  };
}
