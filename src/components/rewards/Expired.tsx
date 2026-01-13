import { CiCircleRemove } from "react-icons/ci";
import Item from "../ui/itemCard";

const ExpiredRewards = () => {
  return (
    <div className="space-y-3">
 <Item
        title="Daily log in bonus"
        subtitle="Feb 12, 2024"
        icon={CiCircleRemove}
        iconStyle="text-red-500"
        noShow
        altText="- 250"
      />
      <Item
        title="Daily log in bonus"
        subtitle="Feb 12, 2024"
        icon={CiCircleRemove}
        iconStyle="text-red-500"
        noShow
        altText="- 250"
      />
    </div>
  );
};

export default ExpiredRewards;
