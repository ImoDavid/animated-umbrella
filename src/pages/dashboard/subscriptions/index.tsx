import Layout from "@/components/layout";
import Item from "@/components/ui/itemCard";
import Box from "@/components/ui/box";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { FaRegSquare } from "react-icons/fa";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { useAuthStore } from "../../../../stores/useAuthStore";
import { MdBlock } from "react-icons/md";

const Subscriptions = () => {
  const { profile } = useAuthStore();
  return (
    <Layout
      Breadcrumbs={[
        { name: "my account", link: "/my-account" },
        { name: "manage subscriptions" },
      ]}
    >
      <div className="flex flex-col gap-4  lg:p-5">
        <Box>
          <div className="flex  items-center p-3 lg:p-5">
            <div className="flex flex-col gap-1">
              <span className="lg:text-sm text-[#1F2A37] dark:text-white">
                Active plan
              </span>

              {profile?.plan ? (
                <>
                  <span className="text-sm font-medium lg:text-[16px] text-[#00A057] capitalize">
                    {profile?.plan?.bouquetName} ({profile?.plan?.currency} {profile?.plan?.amount}/month)
                  </span>

                  <span className="text-[#A87937] text-[12px] lg:text-sm inline-flex items-center gap-2">
                    <IoIosInformationCircleOutline />
                    Your membership ends on Mar 15, 2025
                  </span>
                </>
              ) : (
                <span className="text-sm font-medium lg:text-[16px] inline-flex items-center gap-2 text-red-400">
                  <MdBlock />
                  You are not subscribed to any plan
                </span>
              )}
            </div>
          </div>
        </Box>
        <Item
          url="/my-account/subscriptions/plans"
          icon={FiPackage}
          title="My Plans"
          subtitle="Manage your account details and subscriptions"
        />
        <Item
          url="/my-account/subscriptions/payment-methods"
          icon={FiShoppingBag}
          title="Payment Methods"
          subtitle="Manage your account details and subscriptions"
        />
        <Item
          icon={IoIosInformationCircleOutline}
          title="Payment History"
          subtitle="Manage your account details and subscriptions"
        />
        <Item
          url="/my-account/subscriptions/providers"
          icon={FaRegSquare}
          title="Providers"
          subtitle="Manage your account details and subscriptions"
        />
        <Item
          icon={HiOutlineSquares2X2}
          title="Manage Add-ons"
          subtitle="Manage your account details and subscriptions"
        />
      </div>
    </Layout>
  );
};

export default Subscriptions;
