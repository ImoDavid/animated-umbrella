"use client";
import Input from "@/components/form/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {  useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import HorizontalStepper from "@/components/ui/steps";
import { useForm } from "react-hook-form";
import {
  registerUser,
  resendOTP,
  resetPassword,
  validateOTP,
} from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/ui/backButton";
import { toast } from "react-toastify";

const soaData = [
  {
    title: "Manage your SOA account",
    description:
      "Easily manage your account anytime, anywhere with our mobile-friendly microsite—designed for convenience, speed, and a touch of neighbourly support.",
  },
  {
    title: "Configure your STB Box",
    description:
      "We empower you to manage and configure your set-top box with ease—anytime, anywhere. Enjoy seamless control and added convenience, all with a user-first experience built for life on the go.",
  },
  {
    title: "Link and manage devices",
    description:
      "Even without the latest device, you can securely access and manage your account and connected devices by tapping into the help of nearby mates with smarter phones—because convenience, security and support can go hand-in-hand.",
  },
];

const ForgotPassword = () => {
  const router = useRouter();

  const [step, setStep] = useState(0);
    const [otp, setOtp] = useState("");
     const [prefix, setPrefix] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, },
  } = useForm();



  const onSubmit = async (data) => {
    try {
    
      const response = await registerUser({ ...data, user_type: "soa" });

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

  
const email = watch("email");
  const newPassword = watch("newPassword");
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
    
    const handleRequestOTP = async () => {
        startLoading();
      const res = await resendOTP(email);
      stopLoading();
    
      if (res?.success) {
          toast.success("OTP sent successfully");
          setPrefix(res.data.prefix)
        setStep(1);
      } else {
        toast.error(res?.message || "Failed to send OTP");
      }
    };

     const handleVerifyOTPCode = async () => {
      if (!otp || otp.length !== 6) {
        toast.error("Please enter valid OTP");
        return;
      }
    
         startLoading();
      const res = await validateOTP({  email:email,otp: `${prefix}-${otp}`, user_type:"soa" });
      stopLoading();
    
      if (res?.success) {
        toast.success("OTP verified");
        setStep(2);
      } else {
        toast.error(res?.message || "Invalid OTP");
      }
     };
    
      const handleChangePassword = async () => {
      if (!newPassword) {
        toast.error("Please enter a new password");
        return;
      }
    
      startLoading();
      const res = await resetPassword({
        email,
        newPassword,
      });
      stopLoading();
    
      if (res?.success) {
        toast.success("Password updated successfully");
       doLogin()
        setStep(1);
      } else {
        toast.error(res?.message || "Failed to update password");
      }
    };

  const handlePrevStep = () => setStep((prev) => prev - 1);
  const handleNextStep = () => {
  if (step === 0) {
    handleRequestOTP();
  } else if (step === 1) {
    handleVerifyOTPCode();
  } else if (step === 2) {
    handleChangePassword();
  }
};

  const doLogin = async () => {
    router.replace("/auth/login");
  };

  const renderContent = () => {
    if (step === 0) {
      return (
        <>
          <BackButton onClick={() => router.push("/auth/login")} />

          <h1 className="text-2xl lg:text-3xl font-bold text-[#333] dark:text-white">
            Enter Email address
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group space-y-5">
              <div className="flex gap-2 flex-col lg:flex-row">
                <div className="w-full">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    {...register("email", {
                      required: "email is required",
                    })}
                  />

                  {errors.email && (
                    <p className="text-red-500 text-[12px] mt-1">
                      {errors.email?.message as string}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </>
      );
    }

    if (step === 1) {
      return (
        <>
          <BackButton onClick={handlePrevStep} />

          <div className="space-y-5">
            <h2 className="text-xl lg:text-2xl font-bold dark:text-white">
              Enter OTP code
            </h2>

            <p className="text-gray-700 text-sm dark:text-white text-[13px] lg:text-sm">
              you will receive a 6 digit code.
            </p>

            <form>
              <input
                type="text"
                value={`${prefix}-${otp}`}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (!inputValue.startsWith(prefix)) return;

                  const cleaned = inputValue
                    .replace(prefix, "")
                    .replace(/[^A-Za-z0-9]/g, "")
                    .toUpperCase();

                  setOtp(cleaned);
                }}
                maxLength={11}
                className="border px-3 py-2 rounded w-full text-lg tracking-widest dark:text-white"
              />
            </form>

            <div className="flex justify-between w-full my-4 mr-5 text-[12px] lg:w-[500px] xl:w-[640px]">
              <span>
                <FaCircleExclamation className="text-[#00A057] inline-block mr-1" />
                Didn’t get the code?
              </span>
              <p className="text-[#818181]">Resend (00:00)</p>
            </div>
          </div>
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          <BackButton onClick={handlePrevStep} />

          <div className="space-y-5">
            <h2 className="text-xl lg:text-2xl font-bold dark:text-white">
              Enter new password
            </h2>

            <p className="text-gray-700 text-sm dark:text-white text-[13px] lg:text-sm">
              Re-enter your new password to confirm.
            </p>

            <Input
              type="password"
              placeholder="Confirm new password"
              {...register("newPassword")}
            />
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <div className="grid h-screen bg-[#F0F0F0] dark:bg-[#232323] grid-cols-1 lg:grid-cols-[2fr_3fr]">
        <div className="hidden lg:flex flex-col lg:gap-10 pc:gap-30 bg-[#F0F0F0] dark:bg-[#232323] lg:p-15 pc:p-20">
          <Image src="/icons/authLogo.png" alt="Logo" width={50} height={50} />
          <div className="flex flex-col w-80 ml-5">
            <h1 className="text-2xl font-semibold text-[#333] dark:text-gray-200">
              Create & manage your SOA account on the web microsite
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
              {renderContent()}

              <Button
                loading={loading}
                variant="secondary"
                className="w-full my-2"
                onClick={() => handleNextStep()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
