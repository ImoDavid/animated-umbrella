import { getSinglePlan, subscribe } from "@/actions/plans.actions";
import Layout from "@/components/layout";
import Box from "@/components/ui/box";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../../../../../stores/useAuthStore";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useState } from "react";
import ViewContentsModal from "@/components/plans/viewPlanContentsModal";

const SinglePlan = () => {
  const router = useRouter();
  const { id } = router.query;

  const { profile } = useAuthStore();
  const { setProfile } = useAuthStore();
  const queryClient = useQueryClient();
  const [isContentsOpen, setIsContentsOpen] = useState(false);
  const [contentType, setContentType] = useState<"channel" | "radio">(
    "channel"
  );

  // -------------------------
  // GET PLAN
  // -------------------------
  const { data: singlePlan, isLoading } = useQuery({
    queryKey: ["SinglePlan", id],
    queryFn: () => getSinglePlan(id as string),
    enabled: !!id,
  });

  const plan = singlePlan?.data;

  // -------------------------
  // SUBSCRIBE MUTATION
  // -------------------------
  const subscribeMutation = useMutation({
    mutationFn: (payload: { planId: string }) => subscribe(payload),

    onSuccess: (res) => {
      if (res?.success) {
         setProfile(res.data);
        toast.success(res.message || "Subscription successful");

        // queryClient.invalidateQueries({ queryKey: ["userSubscriptions"] });
        queryClient.invalidateQueries({ queryKey: ["SinglePlan"] });
      } else {
        toast.error(res?.message || "Subscription failed");
      }
    },

    onError: (error) => {
      console.error("Subscribe error:", error);
      toast.error("Something went wrong");
    },
  });

  // -------------------------
  // HANDLE SUBSCRIBE BUTTON CLICK
  // -------------------------
  const handleSubscribe = () => {
    if (!id) return toast.error("Invalid plan");
    subscribeMutation.mutate({ planId: id as string });
  };

  // -------------------------
  // LOADING STATE
  // -------------------------
  if (isLoading) {
    return (
      <Layout
        Breadcrumbs={[
          { name: "my account", link: "/my-account" },
          { name: "manage subscriptions", link: "/my-account/subscriptions" },
          { name: "my plans", link: "/my-account/subscriptions/plans" },
          { name: "loading plan..." },
        ]}
      >
        <div className="flex items-center justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  // -------------------------
  // MAIN UI
  // -------------------------
  return (
    <Layout
      Breadcrumbs={[
        { name: "my account", link: "/my-account" },
        { name: "manage subscriptions", link: "/my-account/subscriptions" },
        { name: "my plans", link: "/my-account/subscriptions/plans" },
        { name: plan?.name ?? "plan details" },
      ]}
    >
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm overflow-hidden">
        {/* COVER IMAGE */}
        <div className="w-full h-[260px] sm:h-[340px] overflow-hidden">
          <img
            src={
              plan?.image ||
              "https://res.cloudinary.com/dioyo0ivz/image/upload/v1700816184/Frame_4327_lkvvkp.png"
            }
            alt={plan?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* BODY */}
        <div className="p-6 sm:p-8">
          <div className="mb-3">
            <img src="/mtn-logo.svg" className="h-6 w-auto opacity-80" />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-2 leading-snug">
            {plan?.name} ({plan?.currency}
            {plan?.amount}/month)
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
            Plan for family specials. Connect up to {plan?.devicesLimit ?? 10}{" "}
            devices.
            <br />
            <br />
            Enjoy top news, movies, entertainment, series, kid shows, sports and
            more.
          </p>

          <div className="flex flex-col gap-4 mb-8">
            {/* SEE ALL CHANNELS */}
            <button
              onClick={() => {
                setContentType("channel");
                setIsContentsOpen(true);
              }}
              className="flex items-center justify-between border border-gray-200 bg-gray-50 dark:bg-[#222] 
             dark:border-gray-700 px-4 py-3 rounded-lg text-sm text-gray-800 dark:text-gray-300 
             hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
            >
              <span>See all {plan?.channels} channels</span>
              <span className="text-lg">→</span>
            </button>

            {/* SEE ALL RADIO STATIONS */}
            <button
              onClick={() => {
                setContentType("radio");
                setIsContentsOpen(true);
              }}
              className="flex items-center justify-between border border-gray-200 bg-gray-50 dark:bg-[#222] 
             dark:border-gray-700 px-4 py-3 rounded-lg text-sm text-gray-800 dark:text-gray-300 
             hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
            >
              <span>See all {plan?.radio} radio stations</span>
              <span className="text-lg">→</span>
            </button>
          </div>

          {/* SUBSCRIBE BUTTON */}
          <button
            disabled={subscribeMutation.isPending}
            onClick={handleSubscribe}
            className="w-full py-4 rounded-lg border border-green-600 text-green-700 
            font-medium hover:bg-green-50 dark:hover:bg-[#102d10] dark:text-green-400 
            transition"
          >
            {subscribeMutation.isPending
              ? "Processing..."
              : "Subscribe to this plan"}
          </button>
        </div>
      </div>
      <ViewContentsModal
  isOpen={isContentsOpen}
  setIsOpen={setIsContentsOpen}
  id={id as string}
  type={contentType}
/>

    </Layout>
  );
};

export default SinglePlan;
