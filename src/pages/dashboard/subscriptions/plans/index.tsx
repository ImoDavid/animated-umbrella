import { getPlans } from "@/actions/plans.actions";
import Layout from "@/components/layout";
import Box from "@/components/ui/box";
import { useQuery } from "@tanstack/react-query";
//import { toast } from "react-toastify";
import { useAuthStore } from "../../../../../stores/useAuthStore";
import { useRouter } from "next/navigation";

const Plans = () => {
  const { profile } = useAuthStore();
  const { data: plans, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: ()=> getPlans(profile?.region!)
  });
  
  const plansList = plans?.data?.data
  if (isLoading) {
  return (
    <Layout
      Breadcrumbs={[
        { name: "my account", link: "/my-account" },
        { name: "manage subscriptions", link: "/my-account/subscriptions" },
        { name: "my plans" },
      ]}
    >
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
      </div>
    </Layout>
  );
}
 
  return (
    <Layout
      Breadcrumbs={[
        { name: "my account", link: "/my-account" },
        { name: "manage subscriptions", link: "/my-account/subscriptions" },
        { name: "my plans" },
      ]}
    >
   <div className="flex flex-col gap-4 lg:p-5">
  {plansList?.map((plan: any) => (
    <Item
      key={plan._id}
      plan={`${plan.name} (${plan.currency}${plan.amount}/month)`}
      description={plan.des}
      isActive={profile?.plan?._id === plan._id}
      id={plan._id}// or whatever identifies active
    />
  ))}
</div>

    </Layout>
  );
};

export default Plans;

const Item = ({
  plan,
  description,
  isActive,
  id
}: {
  plan: string;
  description: string;
    isActive?: boolean;
  id: string
  }) => {
    const router = useRouter();
  return (
    <Box className="cursor-pointer" onClick={()=>  router.push(`/my-account/subscriptions/plans/${id}`)}>
      <div className="flex  items-center p-3 lg:p-5">
        <div className="flex flex-col gap-2">
          {isActive && (
            <span className="text-[10px] lg:text-[12px] bg-[#00A057] w-fit p-1 rounded-lg  dark:text-[#1F2A37] text-white">
              Active plan
            </span>
          )}
          <span className="text-sm font-medium lg:text-[16px] dark:text-[#F9F9F9] text-[#040404]">
            {plan}
          </span>
          <span className="dark:text-[#818181] text-[12px] lg:text-sm text-[#01040D]">
            {description}
          </span>
        </div>
      </div>
    </Box>
  );
};
