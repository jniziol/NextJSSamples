// This uses react-hook-form and makes it really easy to setup forms, manage
// form fields and manage errors https://react-hook-form.com/
// This also uses Yup for validation of the form fields, which is the same
// for the backend, which is why the schema is in a seperate file, so it's not
// not repeated in both the API and this front end.
import { userSignupForm } from "@/validators/user";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SignUp() {
  // We need to tell react-hook-form which validtor to use
  const formOptions = { resolver: yupResolver(userSignupForm), mode: "onBlur" };
  // Then we use the useForm hook and it provides us with a handful
  // of useful objects that we can use.
  const { register, setError, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState; // Extract the errors from the formState

  async function formSubmit(data) {
    // If there are errors on the form, the form simply will not submit thanks to react-hook-form
    // If there aren't we are posting the data to the backend API, /api/auth/signup
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // If the response is okay, then we are doing something good, probably
    // logging them in or redirecting, who knows!
    if (response.ok) {
      // do something good!
    } else if (response.status === 400) {
      // if the response is an http code that is an error, we check for it
      // I use an http code of 400 here, but you can use whatever you want
      // based on how you set up your API

      // Loop through the list of error messages and add them to react-hook-forms
      // custom error messages state. The error messages are pretty tightly coupled to the
      // API and must have the same names as the inputs if you want them to show up inline.
      // That's what 'error.name' does, ties it to the input.
      const data = await response.json();
      for (const error of data.errorMessages) {
        setError(error.name, { type: "custom", message: error.message });
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 max-w-md w-full">
        <div className="">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up for a new account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto w-full">
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
                    className={`w-600 block w-full appearance-none rounded-md border px-3 py-2  shadow-sm sm:text-sm ${
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
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="mt-1">
                  <input
                    id="address"
                    name="address"
                    autoComplete="address"
                    className={`w-600 block w-full appearance-none rounded-md border px-3 py-2  shadow-sm sm:text-sm ${
                      errors.email
                        ? "text-red-900 placeholder-red-300 border-red-500 focus:outline-none focus:ring-red-500"
                        : "focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 border-gray-300 placeholder-gray-400"
                    }`}
                    {...register("address")}
                  />
                </div>
                <div className="h-5 text-red-500 sm:text-sm">{errors.address?.message}</div>
              </div>

              <div>
                <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <div className="mt-1">
                  <input
                    id="postal_code"
                    name="postal_code"
                    autoComplete="postal_code"
                    className={`w-600 block w-full appearance-none rounded-md border px-3 py-2  shadow-sm sm:text-sm ${
                      errors.email
                        ? "text-red-900 placeholder-red-300 border-red-500 focus:outline-none focus:ring-red-500"
                        : "focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 border-gray-300 placeholder-gray-400"
                    }`}
                    {...register("postal_code")}
                  />
                </div>
                <div className="h-5 text-red-500 sm:text-sm">{errors.postal_code?.message}</div>
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
