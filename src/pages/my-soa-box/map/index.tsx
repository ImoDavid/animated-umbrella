import OTPInput from "@/components/form/OTPInput";
import Layout from "@/components/layout";
import Box from "@/components/ui/box";

const MapBox = () => {
  const handleOtpChange = () => {
  };
  return (
    <Layout
      Breadcrumbs={[
        { name: "my SOA box", link: "/my-soa-box" },
        { name: "map using passkey" },
      ]}
    >
      <div className="flex flex-col gap-4  lg:p-5">
        <Box>
          <p className="p-5 text-sm lg:p-8 text-[#1F2A37] dark:text-[#F6F6F6] lg:text-lg">
            Enter the passkey displayed below into your SOA Set top box
          </p>
        </Box>
        <div className="flex space-x-2 lg:space-x-8 max:space-x-10 mt-4 mx-auto">
          <OTPInput onChange={handleOtpChange} />
         
        </div>
      </div>
    </Layout>
  );
};

export default MapBox;
