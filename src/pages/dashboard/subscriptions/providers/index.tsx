import Layout from "@/components/layout";
import Box from "@/components/ui/box";
import Item from "@/components/ui/itemCard";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

const Providers = () => {
  const [showList, setShowList] = useState(false);
  return (
    <Layout
      Breadcrumbs={[
        { name: "my account", link: "/my-account" },
        { name: "manage subscriptions", link: "/my-account/subscriptions" },
        { name: "providers" },
      ]}
    >
      <div className="flex flex-col gap-4  lg:p-5">
        <Box>
          <div className="flex  items-center p-3 lg:p-5">
            <div className="flex flex-col gap-1">
              <span className="lg:text-sm  text-[#1F2A37] dark:text-white capitalize">
                current provider
              </span>
              <span className="text-sm font-medium lg:text-[15px] text-[#101828] ">
                MTN
              </span>
            </div>
          </div>
        </Box>
        <Item
          onClick={() => setShowList(!showList)}
          title="Add New Provider"
          subtitle="Manage your account details and subscriptions"
          icon2={showList ? FaChevronUp : FaChevronDown}
        />
        {showList && (
          <Box>
            <div className="flex flex-col gap-4">
              <div className="flex items-center p-3 lg:p-5 bg-[white] rounded-lg">
                Airtel NG
              </div>
              <div className="flex items-center p-3 lg:p-5 bg-[white] rounded-lg">
                Globacom
              </div>
            </div>
          </Box>
        )}
      </div>
    </Layout>
  );
};

export default Providers;
