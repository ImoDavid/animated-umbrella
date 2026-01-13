"use client";

import Layout from "@/components/layout";
import Input from "@/components/form/input";
import { Button } from "@/components/ui/button";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiEdit,
} from "react-icons/fi";
import { useAuthStore } from "../../../stores/useAuthStore";

const Profile = () => {
  const { profile } = useAuthStore();
  return (
    <Layout Breadcrumbs={[{ name: "Profile" }]}>
      <div className="flex flex-col gap-6 lg:p-5 max-w-4xl mx-auto">

        {/* Profile Summary Card */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-lg bg-white dark:bg-[#0f0f0f] border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl font-semibold text-gray-700 dark:text-gray-300 capitalize">
              {profile?.firstName?.charAt(0)}{profile?.lastName?.charAt(0)}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
                {profile?.firstName} {profile?.lastName}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Doctor
              </p>
            </div>
          </div>

          {/* <Button variant="outline" className="flex items-center gap-2">
            <FiEdit size={16} />
            Edit Profile
          </Button> */}
        </div>

        {/* Personal Information */}
        <div className="p-6 rounded-lg bg-white dark:bg-[#0f0f0f] border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={profile?.firstName}
              icon={<FiUser size={18} />}
              disabled
            />

            <Input
              label="Last Name"
              value={profile?.lastName}
              icon={<FiUser size={18} />}
              disabled
            />

            <Input
              label="Email Address"
              value={profile?.email}
              icon={<FiMail size={18} />}
              disabled
            />

            <Input
              label="Phone Number"
              value="+234 000 000 0000"
              icon={<FiPhone size={18} />}
              disabled
            />

            <Input
              label="Role"
              value="Doctor"
              icon={<FiShield size={18} />}
              disabled
            />
          </div>
        </div>

        {/* Account Actions */}
        {/* <div className="p-6 rounded-lg bg-white dark:bg-[#0f0f0f] border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Account Actions
          </h3>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline">
              Change Password
            </Button>

            <Button variant="destructive">
              Delete Account
            </Button>
          </div>
        </div> */}

      </div>
    </Layout>
  );
};

export default Profile;
