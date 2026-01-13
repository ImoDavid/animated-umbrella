import { FiUsers } from "react-icons/fi";
import { Button } from "@/components/ui/button";

interface EmptyPatientsStateProps {
  onCreate: () => void;
}

const EmptyPatientsState = ({ onCreate }: EmptyPatientsStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#0f0f0f]">
      <FiUsers size={48} className="text-gray-400 mb-4" />

      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        No patients yet
      </h3>

      <p className="mt-1 max-w-sm text-sm text-gray-600 dark:text-gray-400">
        Patients you add will appear here. Create a patient to begin managing
        appointments, medical records, and interactions.
      </p>

      <Button className="mt-5" onClick={onCreate}>
        Create Patient
      </Button>
    </div>
  );
};

export default EmptyPatientsState;
