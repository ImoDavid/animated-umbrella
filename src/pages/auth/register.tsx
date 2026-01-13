"use client";
import Input from "@/components/form/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import HorizontalStepper from "@/components/ui/steps";
import { useForm } from "react-hook-form";
import {
  completeSoaRegistration,
  getGoogleProfileAction,
  registerUser,
  validateOTP,
} from "@/actions/auth.actions";
import { useRouter, useSearchParams } from "next/navigation";
import { BackButton } from "@/components/ui/backButton";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import Select from "@/components/form/select";
import { useAuthStore } from "../../../stores/useAuthStore";

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


const Register = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setProfile } = useAuthStore();
  const [prefix, setPrefix] = useState("");
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");
  const region = watch("region"); // get selected region

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const resendParam = searchParams.get("resend");

    if (emailParam) {
      setEmail(emailParam);
    }

    if (emailParam && resendParam === "true") {
      setStep(1);
    }
  }, [searchParams]);
  const onSubmit = async (data) => {
    try {
      setEmail(data.email);
      const response = await registerUser({ ...data, role: "doctor" });
      if (response?.success) {
        handleNextStep();
      } else {
        toast.error(response?.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handlePrevStep = () => setStep((prev) => prev - 1);
  const handleNextStep = () => setStep((prev) => prev + 1);

  return (
    <>
      <div className="grid h-screen bg-[#F0F0F0] dark:bg-[#232323] grid-cols-1 lg:grid-cols-[2fr_3fr]">
        <div className="hidden lg:flex flex-col lg:gap-10 pc:gap-30 bg-[#F0F0F0] dark:bg-[#232323] lg:p-15 pc:p-20">
          <span className="text-[#575757] dark:text-white text-lg font-bold">
            Hospyta
          </span>
          <div className="flex flex-col w-80 ml-5">
            <h1 className="text-2xl font-semibold text-[#333] dark:text-gray-200">
              Create & manage your account
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

        <div className="flex flex-col items-center lg:justify-center  bg-white dark:bg-[#232323] p-8 m-3 lg:border border-gray-200 dark:border-gray-600 rounded-lg">
          <div className="w-full lg:min-w-[80%] lg:w-auto">
            <div className="lg:mt-30 w-full">
              <HorizontalStepper currentStep={step} />
            </div>
            <div className="mt-10 space-y-5 max-w-[700px]">
              {step === 0 && (
                <>
                  <h1 className="text-2xl lg:text-3xl font-bold text-[#333] dark:text-white capitalize">
                    Create your account
                  </h1>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group  space-y-5 ">
                      <div className="flex gap-2 flex-col lg:flex-row">
                        <div className="w-full">
                          <Input
                            label="First name"
                            type="text"
                            placeholder="First name"
                            {...register("firstName", {
                              required: "First name is required",
                            })}
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-[12px] mt-1">
                              {errors.firstName?.message as string}
                            </p>
                          )}
                        </div>
                        <div className="w-full">
                          <Input
                            label="Last name"
                            type="text"
                            placeholder="Last name"
                            {...register("lastName", {
                              required: "Last name is required",
                            })}
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-[12px] mt-1">
                              {errors.lastName?.message as string}
                            </p>
                          )}
                        </div>
                      </div>
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
                          label="Role"
                          type="text"
                          placeholder="Doctor"
                          disabled
                        />
                      </div>
                      <div className="w-full">
                        <Input
                          label="Create password"
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
                      <div className="w-full">
                        <Input
                          label="Confirm password"
                          type="password"
                          placeholder="Enter your password"
                          {...register("confirmPassword", {
                            required: "Confirm your password",
                            validate: (value) =>
                              value === password || "Passwords do not match",
                          })}
                        />
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-[12px] my-1">
                            {errors.confirmPassword?.message as string}
                          </p>
                        )}
                      </div>
                      <Button
                        loading={isSubmitting}
                        type="submit"
                        variant="secondary"
                        className="w-full my-2"
                      >
                        Create my account
                      </Button>
                    </div>
                  </form>
                  <div className="flex items-center justify-center my-5">
                    <p className="text-sm text-gray-500">
                      Already have an account?
                      <span
                        className="text-[#00A057] cursor-pointer ml-1"
                        onClick={() => router.push("/auth/login")}
                      >
                        Sign in
                      </span>
                    </p>
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  {/* <BackButton onClick={handlePrevStep} /> */}
                  <h1 className="text-2xl lg:text-3xl font-bold text-[#040404] dark:text-gray-300">
                    Verify Email Address
                  </h1>
                  <p className="text-[#838383] text-[14px]">
                    Enter the 6 digit code sent to the email input
                  </p>
                  <form>
                    <div className="flex flex-col items-start lg:w-[700px]">
                      <input
                        type="text"
                        value={`${otp}`}
                        onChange={(e) => {
                          const inputValue = e.target.value;

                          // Allow alphanumeric only + convert to uppercase
                          const cleaned = inputValue
                            .replace(/[^A-Za-z0-9]/g, "")
                            .toUpperCase();
                          setOtp(cleaned);

                          // Trigger validation on 6 chars
                          if (cleaned.length === 6) {
                            const fullOtp = `${cleaned}`;
                            setLoading(true);
                            validateOTP({
                              email,
                              otp: fullOtp,
                            }).then((response) => {
                              if (response?.success) {
                                setLoading(false);
                                router.replace("/auth/login");
                              } else {
                                setLoading(false);
                                toast.error(response?.message);
                              }
                            });
                          }
                        }}
                        maxLength={7} // KYPF- (5 chars) + 6 characters
                        className="border px-3 py-2 rounded w-full text-lg tracking-widest 
             text-black dark:text-white"
                        placeholder=""
                      />

                      <div className="flex justify-between w-full my-4 mr-5 text-[12px] lg:w-[500px] xl:w-[640px]">
                        <span>
                          <FaCircleExclamation className="text-[#00A057] inline-block mr-1" />
                          Didn’t get the code?
                        </span>
                        <p className="text-[#818181]">Resend (00:00)</p>
                      </div>
                      <Button
                        variant="secondary"
                        loading={loading}
                        className="w-full my-10"
                      >
                        Next
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
