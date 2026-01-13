import Layout from "@/components/layout";
import { FiInbox } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import Item from "@/components/ui/itemCard";
import Box from "@/components/ui/box";
import Image from "next/image";

const Soa = () => {
  const isMapped = true;
  return (
    <Layout Breadcrumbs={[{ name: "my SOA box" }]}>
      <div className="flex flex-col gap-4  lg:p-5">
        {!isMapped ? (
          <>
            <Box>
              <p className="p-5 text-sm lg:p-8 text-[#1F2A37] dark:text-[#F6F6F6] lg:text-lg">
                You have not mapped an SOA box to this account profile, details
                of the box will appear here upon activation.
              </p>
              <p className="px-5 text-sm lg:px-8 text-[#1F2A37] dark:text-[#F6F6F6] lg:text-lg">
                Proceed to map the box to your account on your SOA mobile.
              </p>
            </Box>

            <Item
              url="/my-soa-box/map"
              title="Map using passkey"
              icon={FiInbox}
            />
          </>
        ) : (
          <>
            <div className="w-full flex justify-center">
              <Image
                src="/SOA-BOX.png"
                alt="SOA Box"
                className="mx-auto"
                width={400}
                height={10}
              />
            </div>
            <Box className="p-5 flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <span className="lg:text-md font-medium text-[#040404] dark:text-[#F6F6F6] capitalize">
                  serial no
                </span>
                <span className="text-[12px] lg:text-sm text-[#6C737F] dark:text-[#6B6B6B]">
                  1.1.0.2.3.4.1
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="lg:text-md font-medium text-[#040404] dark:text-[#F6F6F6] capitalize">
                  Firmware version
                </span>
                <span className="text-[12px] lg:text-sm text-[#6C737F] dark:text-[#6B6B6B]">
                  1.1.0.2.3.4.1
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="lg:text-md font-medium text-[#040404] dark:text-[#F6F6F6] capitalize">
                  Model
                </span>
                <span className="text-[12px] lg:text-sm text-[#6C737F] dark:text-[#6B6B6B]">
                  1.1.0.2.3.4.1
                </span>
              </div>
            </Box>

            <Box className="p-5 flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <span className="lg:text-md font-medium text-[#040404] dark:text-[#F6F6F6] capitalize">
                  Registered address
                </span>
                <span className="text-[12px] lg:text-sm text-[#6C737F] dark:text-[#6B6B6B]">
                  Region: Nigeria
                </span>
                <span className="text-[12px] lg:text-sm text-[#6C737F] dark:text-[#6B6B6B]">
                  Region: Nigeria
                </span>
                <span className="text-[12px] lg:text-sm text-[#6C737F] dark:text-[#6B6B6B]">
                  Region: Nigeria
                </span>
                <span className="text-[12px] lg:text-sm text-[#6C737F] dark:text-[#6B6B6B]">
                  Region: Nigeria
                </span>
              </div>
            </Box>
            <Item
              url="/my-soa-box/change-location"
              title="Change location"
              subtitle="mange your location settings"
              icon={GoHome}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Soa;
