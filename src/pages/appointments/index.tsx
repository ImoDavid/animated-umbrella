"use client";

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { FiPlus, FiUser, FiCalendar } from "react-icons/fi";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import TableSearch from "@/components/ui/table/TableSearch";
import { DataTable } from "@/components/ui/table/DataTable";
import EmptyAppointmentsState from "@/components/ui/empty/EmptyAppointment";
import Modal from "@/components/ui/modal";
import Input from "@/components/form/input";

/* ---------------- Types ---------------- */

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
}

/* ---------------- Columns ---------------- */

const appointmentColumns: ColumnDef<Appointment>[] = [
  { accessorKey: "patientName", header: "Patient" },
  { accessorKey: "doctorName", header: "Doctor" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "time", header: "Time" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<Appointment["status"]>();
      const color =
        status === "scheduled"
          ? "bg-blue-100 text-blue-700"
          : status === "completed"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700";

      return (
        <span className={`px-2 py-1 text-xs rounded-full ${color}`}>
          {status}
        </span>
      );
    },
  },
];

/* ---------------- Dummy Data ---------------- */

const dummyAppointments: Appointment[] = [
  {
    id: "a1",
    patientName: "John Doe",
    doctorName: "Dr. Smith",
    date: "2026-01-12",
    time: "10:30",
    status: "scheduled",
  },
];

/* ---------------- Component ---------------- */

const Appointments = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Create Appointment Form State
  const [form, setForm] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
  });

  const appointments = dummyAppointments;
  const hasAppointments = appointments.length > 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateAppointment = () => {
    // later: react-query mutation
    console.log("Creating appointment:", form);

    setIsModalOpen(false);
    setForm({
      patientName: "",
      doctorName: "",
      date: "",
      time: "",
    });
  };

  return (
    <Layout Breadcrumbs={[{ name: "Appointments" }]}>
      <div className="flex flex-col gap-6 lg:p-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Appointments
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View and manage all appointments in the system.
            </p>
          </div>

          {hasAppointments && (
            <div className="flex items-center gap-3">
              <TableSearch
                value={search}
                onChange={setSearch}
                placeholder="Search appointments..."
              />
              <Button
                className="flex items-center gap-2"
                onClick={() => setIsModalOpen(true)}
              >
                <FiPlus size={18} />
                Create Appointment
              </Button>
            </div>
          )}
        </div>

        {/* Table / Empty State */}
        {hasAppointments ? (
          <DataTable
            columns={appointmentColumns}
            data={appointments}
            globalFilter={search}
            onGlobalFilterChange={setSearch}
          />
        ) : (
          <EmptyAppointmentsState
            onCreate={() => setIsModalOpen(true)}
          />
        )}
      </div>

      {/* ---------------- Create Appointment Modal ---------------- */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create Appointment
            </h2>

            <Input
              label="Patient Name"
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              icon={<FiUser size={18} />}
              placeholder="John Doe"
            />

            <Input
              label="Doctor"
              name="doctorName"
              value={form.doctorName}
              onChange={handleChange}
              icon={<FiUser size={18} />}
              placeholder="Dr. Smith"
            />

            <Input
              label="Date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              icon={<FiCalendar size={18} />}
            />

            <Input
              label="Time"
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateAppointment}>
                Create Appointment
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  );
};

export default Appointments;
