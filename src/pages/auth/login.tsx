"use client";
import Input from "@/components/form/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

const soaData = [
  {
    title: "Feature title goes here",
    description:
      "This is placeholder text used to describe a feature or capability. It provides a brief summary without conveying real product information.",
  },
  {
    title: "Another feature title",
    description:
      "Use this space for temporary descriptive content. The final copy will be replaced once product messaging is finalized.",
  },
  {
    title: "Third feature title",
    description:
      "Placeholder description text for layout and spacing purposes. This content helps visualize how real text will appear in the interface.",
  },
];


const Login = () => {
  const { setProfile } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (payload) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    });

    const data = await res.json();
    console.log(data)
    
    if (data.success) {
      toast.success("Login successful");
      doLogin({ ...data.user ,...data.profile});
    } else {
      toast.error(data.message || "Login failed");
      if (data?.message === "Account not verified")
      {
       router.push(`/auth/register?email=${payload.email}&resend=true`);
}    }
  };


  const doLogin = async (userData: any) => {
    console.log(userData)
    setProfile(userData);
    router.replace("/dashboard");
  };

  return (
    <>
      <div className="grid h-screen bg-[#F0F0F0] dark:bg-[#232323] grid-cols-1 lg:grid-cols-[2fr_3fr]">
        <div className="hidden lg:flex flex-col gap-30 bg-[#F0F0F0] dark:bg-[#232323] lg:p-20">
          <span className="text-[#575757] dark:text-white text-lg font-bold">
                Hospyta 
              </span>
          <div className="flex flex-col w-80 ml-5">
            <h1 className="text-2xl font-semibold text-[#333] dark:text-gray-200">
              Welcome back, Doc !
            </h1>
            <div className="flex flex-col gap-5 mt-5">
              {soaData.map((_, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h1 className="text-[#00A057] text-lg font-semibold">
                    {_.title}
                  </h1>
                  <p className="text-[#838383] text-[14px]">{_.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:justify-center lg:items-center bg-white dark:bg-[#232323] lg:p-8 m-3 lg:border border-gray-200 dark:border-gray-600 rounded-lg">
          <div className="w-full lg:min-w-[80%] lg:w-auto p-5">
            <div className="block lg:hidden w-full mb-20">
              <Image
                src="/icons/authLogo.png"
                alt="Logo"
                width={50}
                height={50}
              />
            </div>
            <div className="mt-5 space-y-5 lg:max-w-[700px]">
              <h1 className="text-2xl font-bold text-[#333] dark:text-white">
                Log in to your  account
              </h1>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group  space-y-5 ">
                  <div className="w-full">
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-[12px] mt-1">
                        {errors.email?.message as string}
                      </p>
                    )}
                  </div>

                  <div className="w-full">
                    <Input
                      label="Enter password"
                      type="password"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-[12px] mt-1">
                        {errors.password?.message as string}
                      </p>
                    )}
                  </div>
                    <div className="flex items-center justify-end my-5">
                <p className="text-sm text-gray-500">
                 
                  <span
                    className="text-[#00A057] cursor-pointer ml-1"
                    onClick={() => router.push("/auth/forgot-password")}
                  >
                    Forgot Password?
                  </span>
                </p>
                  </div>
                    <Button
                    type="submit"
                    loading={isSubmitting}
                    variant="secondary"
                    className="w-full"
                  >
                    Sign in
                  </Button>
                </div>
              </form>
            
              <div className="flex items-center justify-center my-5">
                <p className="text-sm text-gray-500">
                  Don&#39;t have an account?
                  <span
                    className="text-[#00A057] cursor-pointer ml-1"
                    onClick={() => router.push("/auth/register")}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
