import { userSchema } from "@/schemas/userSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SignUp() {
  const formOptions = { resolver: yupResolver(userSchema), mode: "onBlur" };
  const { register, setError, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const router = useRouter();
  const { data: session, status } = useSession();

  async function formSubmit(data) {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/");
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 w-">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up for a new account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-red-900 bg-red-300 mb-8 sm:rounded-lg">
              {errors.root?.ServerError?.messages.map((message) => (
                <p className="py-4 px-2">{message}</p>
              ))}
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(formSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`block w-full appearance-none rounded-md border px-3 py-2  shadow-sm sm:text-sm ${
                      errors.email
                        ? "text-red-900 placeholder-red-300 border-red-500 focus:outline-none focus:ring-red-500"
                        : "focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 border-gray-300 placeholder-gray-400"
                    }`}
                    {...register("email")}
                  />
                </div>
                <div className="h-5 text-red-500 sm:text-sm">{errors.email?.message}</div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    className={`block w-full appearance-none rounded-md border px-3 py-2  shadow-sm sm:text-sm ${
                      errors.name
                        ? "text-red-900 placeholder-red-300 border-red-500 focus:outline-none focus:ring-red-500"
                        : "focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 border-gray-300 placeholder-gray-400"
                    }`}
                    {...register("name")}
                  />
                </div>
                <div className="h-5 text-red-500 sm:text-sm">{errors.name?.message}</div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className={`block w-full appearance-none rounded-md border px-3 py-2  shadow-sm sm:text-sm ${
                      errors.password
                        ? "text-red-900 placeholder-red-300 border-red-500 focus:outline-none focus:ring-red-500"
                        : "focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 border-gray-300 placeholder-gray-400"
                    }`}
                    {...register("password")}
                  />
                </div>
                <div className="h-5 text-red-500 sm:text-sm">{errors.password?.message}</div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Confirm your Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirm_password"
                    name="confirmPassword"
                    type="password"
                    className={`block w-full appearance-none rounded-md border px-3 py-2  shadow-sm sm:text-sm ${
                      errors.confirmPassword
                        ? "text-red-900 placeholder-red-300 border-red-500 focus:outline-none focus:ring-red-500"
                        : "focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 border-gray-300 placeholder-gray-400"
                    }`}
                    {...register("confirmPassword")}
                  />
                </div>
                <div className="h-5 text-red-500 sm:text-sm">{errors.confirmPassword?.message}</div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
