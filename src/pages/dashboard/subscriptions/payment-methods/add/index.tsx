import Layout from "@/components/layout";

const Add = () => {
  return (
    <>
      <Layout
        Breadcrumbs={[
          {
            name: "my account",
            link: "/my-account",
          },
          {
            name: "subscriptions",
            link: "/my-account/subscriptions",
          },
          {
            name: "payment methods",
            link: "/my-account/subscriptions/payment-methods",
          },
          {
            name: "add new card",
          },
        ]}
      >
        add card
      </Layout>
    </>
  );
};

export default Add;
