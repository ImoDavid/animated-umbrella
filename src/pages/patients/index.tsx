"use client";

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { FiPlus, FiUser, FiMail } from "react-icons/fi";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import TableSearch from "@/components/ui/table/TableSearch";
import { DataTable } from "@/components/ui/table/DataTable";
import EmptyPatientsState from "@/components/ui/empty/EmptyPatient";
import Modal from "@/components/ui/modal";
import Input from "@/components/form/input";
import { useCreatePatient } from "@/hooks/useCreatePatient";

interface Patient {
  id: string;
  name: string;
  email: string;
  assignedDoctor: string;
  status: "active" | "inactive";
}

/* ---------------- Columns ---------------- */

const patientColumns: ColumnDef<Patient>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "assignedDoctor", header: "Doctor" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<string>();
      return (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {status}
        </span>
      );
    },
  },
];

/* ---------------- Dummy Data ---------------- */

const dummyPatients: Patient[] = [
  {
    id: "p1",
    name: "John Doe",
    email: "john.doe@example.com",
    assignedDoctor: "Dr. Smith",
    status: "active",
  },
];

/* ---------------- Component ---------------- */

const Patients = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: createPatientMutate, isPending } = useCreatePatient();

  // Create Patient Form State
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
  });
  type FormErrors = Partial<Record<keyof typeof form, string>>;

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!form.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    if (!form.gender) {
      newErrors.gender = "Gender is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const patients = dummyPatients;
  const hasPatients = patients.length > 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof form]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name as keyof typeof form];
        return updated;
      });
    }
  };

  const handleCreatePatient = () => {
    if (!validateForm()) return;

    createPatientMutate(form, {
      onSuccess: () => {
        onClose();
        setErrors({});
      },
    });
  };

  const onClose = () => {
     setIsModalOpen(false);
        setForm({
          email: "",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "",
        });
        setErrors({});
  }

  return (
    <Layout Breadcrumbs={[{ name: "Patients" }]}>
      <div className="flex flex-col gap-6 lg:p-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Patients
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage and view all registered patients.
            </p>
          </div>

          {hasPatients && (
            <div className="flex items-center gap-3">
              <TableSearch
                value={search}
                onChange={setSearch}
                placeholder="Search patients..."
              />
              <Button
                className="flex items-center gap-2"
                onClick={() => setIsModalOpen(true)}
              >
                <FiPlus size={18} />
                Create Patient
              </Button>
            </div>
          )}
        </div>

        {/* Table / Empty State */}
        {hasPatients ? (
          <DataTable
            columns={patientColumns}
            data={patients}
            globalFilter={search}
            onGlobalFilterChange={setSearch}
          />
        ) : (
          <EmptyPatientsState onCreate={() => setIsModalOpen(true)} />
        )}
      </div>

      {/* ---------------- Create Patient Modal ---------------- */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => onClose()}>
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create Patient
            </h2>

            <Input
              label="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
              icon={<FiMail size={18} />}
              placeholder="example@gmail.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  icon={<FiUser size={18} />}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <Input
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  icon={<FiUser size={18} />}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <Input
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={form.dateOfBirth}
              onChange={handleChange}
            />
            {errors.dateOfBirth && (
              <p className="text-xs text-red-500 mt-1">{errors.dateOfBirth}</p>
            )}

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md border-2 ${
                  errors.gender
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } bg-white dark:bg-[#0f0f0f] text-black dark:text-white`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePatient} disabled={isPending}>
                {isPending ? "Creating..." : "Create Patient"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  );
};

export default Patients;
