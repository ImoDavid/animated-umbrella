import Layout from "@/components/layout";
import { FaUserInjured } from "react-icons/fa";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { HiOutlineChartBar } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useActivityLogs } from "@/hooks/useActivityLogs";
import { usePatients } from "@/hooks/useCreatePatient";
import { useAppointments } from "@/hooks/useAppointments";

const Dashboard = () => {
  const { profile } = useAuthStore();
  const { data: logs, isLoading } = useActivityLogs();
  const { data: patients, isLoading: patientsLoading } = usePatients();
  const { data: appointments, isLoading: appointmentsLoading } =
    useAppointments();

  const patientsList = patients ?? [];
  const appointmentsList = appointments ?? [];


  const stats = [
    {
      title: "Total Patients",
      value: patientsLoading ? "—" : patientsList.length,
      icon: FaUserInjured,
      description: "Registered patients under your care",
    },
    {
      title: "Appointments",
      value: appointmentsLoading ? "—" : appointmentsList.length,
      icon: MdOutlineCalendarMonth,
      description: "Scheduled appointments",
    },
    {
      title: "System Activity",
      value: "Stable",
      icon: HiOutlineChartBar,
      description: "Overall platform status",
    },
  ];

  const upcomingAppointments = appointmentsList?.filter((appt: any) => appt.status === "pending")
    .sort((a: any, b: any) => {
      const dateA = new Date(`${a.appointmentDate} ${a.appointmentTime}`);
      const dateB = new Date(`${b.appointmentDate} ${b.appointmentTime}`);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 5)
    .map((appt: any) => ({
      id: appt._id,
      patient: `${appt.patientId?.firstName ?? ""} ${
        appt.patientId?.lastName ?? ""
      }`.trim(),
      date: new Date(appt.appointmentDate).toLocaleDateString(),
      time: appt.appointmentTime,
    }));

  const recentActivities = (logs?.data ?? [])?.slice(0, 5).map((log: any) => ({
    id: log._id,
    text: log.message,
    time: new Date(log.createdAt).toLocaleString(),
  }));


  return (
    <Layout Breadcrumbs={[{ name: "Dashboard" }]}>
      <div className="flex flex-col gap-6 lg:p-5">
        {/* Welcome */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white capitalize">
            Welcome back, Dr {profile?.firstName ? ` ${profile.firstName}` : ""}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Here’s a quick overview of what’s happening.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center gap-4 p-5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121212]"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                  <Icon size={22} />
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.title}
                  </span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Activity */}
          <div className="lg:col-span-2 p-5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121212]">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>

            <ul className="space-y-4">
              {isLoading && (
                <li className="text-sm text-gray-500">Loading activity...</li>
              )}

              {!isLoading && recentActivities.length === 0 && (
                <li className="text-sm text-gray-500">No recent activity</li>
              )}

              {recentActivities.map((activity) => (
                <li
                  key={activity.id}
                  className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  <BsDot size={24} className="text-gray-400" />
                  <div className="flex flex-col">
                    <span>{activity.text}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Appointments */}
          <div className="p-5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121212]">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Upcoming Appointments
            </h2>

            <ul className="space-y-3">
              {upcomingAppointments.length === 0 && (
                <li className="text-sm text-gray-500">
                  No upcoming appointments
                </li>
              )}

              {upcomingAppointments.map((appt) => (
                <li
                  key={appt.id}
                  className="flex flex-col text-sm text-gray-700 dark:text-gray-300"
                >
                  <span className="font-medium text-gray-900 dark:text-white">
                    {appt.patient}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {appt.date} · {appt.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
