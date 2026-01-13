import Layout from "@/components/layout";
import Box from "@/components/ui/box";

const ChangeLocation = () => {
  return (
    <Layout
      Breadcrumbs={[
        { name: "my SOA box", link: "/my-soa-box" },
        { name: "change location" },
      ]}
    >
      <div className="flex flex-col gap-4  lg:p-5">
        <div className="space-y-3">
          <h3 className="lg:p-1 font-semibold dark:text-[#F6F6F6]">
            Current Region
          </h3>
          <Box className="lg:max-w-50">
            <p className="p-2 text-sm  text-[#1F2A37] dark:text-[#F6F6F6] lg:text-md">
              Nigeria
            </p>
          </Box>
        </div>
        <div className="space-y-3">
          <h3 className="lg:p-1 font-semibold dark:text-[#F6F6F6]">
            State/County/Council
          </h3>
          <Box>
            <p className="p-2 text-sm  text-[#1F2A37] dark:text-[#F6F6F6] lg:text-md">
            Select state
            </p>
          </Box>
        </div>
        <div className="space-y-3">
          <h3 className="lg:p-1 font-semibold dark:text-[#F6F6F6]">
            LGA/City/Province
          </h3>
          <Box>
            <p className="p-2 text-sm  text-[#1F2A37] dark:text-[#F6F6F6] lg:text-md">
              Select Local government area
            </p>
          </Box>
        </div>
        <div className="space-y-3">
          <h3 className="lg:p-1 font-semibold dark:text-[#F6F6F6]">
            Street Name
          </h3>
          <Box>
            <p className="p-2 text-sm  text-[#1F2A37] dark:text-[#F6F6F6] lg:text-md">
              Enter street name
            </p>
          </Box>
        </div>
      </div>
    </Layout>
  );
};

export default ChangeLocation;
