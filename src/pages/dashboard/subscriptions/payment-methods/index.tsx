import Layout from "@/components/layout";
import { FiCreditCard } from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa";
import Item from "@/components/ui/itemCard";
import Box from "@/components/ui/box";

const PaymentMethods = () => {
  return (
    <Layout
      Breadcrumbs={[
        { name: "my account", link: "/my-account" },
        { name: "manage subscriptions", link: "/my-account/subscriptions" },
        { name: "payment methods" },
      ]}
    >
      <div className="flex flex-col gap-4  lg:p-5">
        <Box>
          <div className="flex  items-center p-3 lg:p-5">
            <div className="flex flex-col gap-1">
              <span className="lg:text-sm  text-[#1F2A37] dark:text-white capitalize">
                active payment method
              </span>
              <span className="text-sm font-medium lg:text-[15px] text-[#101828] dark:text-white">
              Mastercard - 0334
              </span>
            </div>
          </div>
        </Box>
        <Item
          url="/my-account/subscriptions/payment-methods/add"
          icon={FiCreditCard}
          title="Add Credit or Debit Card"
          subtitle="Manage your account details and subscriptions"
        />
        <Item
          icon={FaDollarSign}
          title="Activate Digital Wallet"
          subtitle="Manage your account details and subscriptions"
        />
      </div>
    </Layout>
  );
};

export default PaymentMethods;
