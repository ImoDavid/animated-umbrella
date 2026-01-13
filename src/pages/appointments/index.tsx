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
import { useAppointments, useCreateAppointment } from "@/hooks/useAppointments";
import { usePatients } from "@/hooks/useCreatePatient";

/* ---------------- Types ---------------- */

interface Appointment {
  _id: string;
  patientId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  doctorId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  appointmentDate: string;
  appointmentTime: string;
  status: "scheduled" | "completed" | "cancelled";
}


/* ---------------- Columns ---------------- */

const appointmentColumns: ColumnDef<Appointment>[] = [
  {
    header: "Patient",
    accessorFn: (row) =>
      `${row?.patientId?.firstName} ${row?.patientId?.lastName}`,
  },
  
  {
    header: "Date",
    accessorKey: "appointmentDate",
    cell: ({ getValue }) =>
      new Date(getValue<string>()).toLocaleDateString(),
  },
  {
    header: "Time",
    accessorKey: "appointmentTime",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<string>();
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



/* ---------------- Component ---------------- */

const Appointments = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: appointments = [],
    isLoading: loadingAppointments,
  } = useAppointments();

  console.log(appointments)


  const {
    mutate: createAppointment,
    isPending: creating,
  } = useCreateAppointment();

  const { data: patients = [] } = usePatients(); // 👈 needed for select

  const [form, setForm] = useState({
    patientId: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const hasAppointments = appointments.length > 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateAppointment = () => {
    createAppointment(form, {
      onSuccess: () => {
        setIsModalOpen(false);
        setForm({
          patientId: "",
          appointmentDate: "",
          appointmentTime: "",
          reason: "",
        });
      },
    });
  };

  return (
    <Layout Breadcrumbs={[{ name: "Appointments" }]}>
      <div className="flex flex-col gap-6 lg:p-5">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Appointments</h1>
            <p className="text-sm text-gray-500">
              View and manage appointments
            </p>
          </div>

          <Button onClick={() => setIsModalOpen(true)}>
            <FiPlus /> Create Appointment
          </Button>
        </div>

        {/* Loading */}
        {loadingAppointments && (
          <div className="text-center py-10 text-gray-500">
            Loading appointments...
          </div>
        )}

        {/* Table / Empty */}
        {!loadingAppointments && hasAppointments && (
          <DataTable
            columns={appointmentColumns}
            data={appointments}
            globalFilter={search}
            onGlobalFilterChange={setSearch}
          />
        )}

        {!loadingAppointments && !hasAppointments && (
          <EmptyAppointmentsState onCreate={() => setIsModalOpen(true)} />
        )}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <Modal isOpen onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Create Appointment</h2>

            {/* Patient Select */}
            <div>
              <label className="text-sm font-medium">Patient</label>
              <select
                name="patientId"
                value={form.patientId}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="">Select patient</option>
                {patients.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.firstName} {p.lastName}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Date"
              type="date"
              name="appointmentDate"
              value={form.appointmentDate}
              onChange={handleChange}
            />

            <Input
              label="Time"
              type="time"
              name="appointmentTime"
              value={form.appointmentTime}
              onChange={handleChange}
            />

            <Input
              label="Reason"
              type="textArea"
              name="reason"
              value={form.reason}
              onChange={handleChange}
            />

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAppointment} disabled={creating}>
                {creating ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  );
};

export default Appointments;


