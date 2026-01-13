import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { FiLoader } from "react-icons/fi";

import { getBouquetContents } from "@/actions/plans.actions";

interface RadioStation {
  id: number;
  name: string;
  frequency: string;
  image: string;
}

interface ViewContentsModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  id: string;
  type: string;
}

const ViewContentsModal: React.FC<ViewContentsModalProps> = ({
  isOpen,
  setIsOpen,
  id,
  type,
}) => {
  const [search, setSearch] = useState("");
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- Debounce search ---
  const [debouncedQuery, setDebouncedQuery] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  // --- Fetch contents when modal opens OR debounced search changes ---
  useEffect(() => {
    if (!isOpen) return;

    const fetchContents = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getBouquetContents(id, type, debouncedQuery);
      
        if (response) {
          setStations(response.data.channel || []);
        } else {
          setError(response?.message || "Failed to load contents.");
        }
      } catch (err: any) {
        setError(err?.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, [isOpen, id, type, debouncedQuery]);

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex flex-col p-4 lg:p-6 w-full max-w-lg mx-auto h-[80vh]">

        {/* SEARCH INPUT */}
        <div className="border rounded-lg px-3 py-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Search station name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none bg-transparent text-gray-700 dark:text-white"
          />
        </div>

        {/* TITLE */}
        <p className="mt-4 font-semibold text-gray-800 dark:text-gray-200">
          {loading ? "Loading…" : `${stations.length} ${type} stations`}
        </p>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center items-center flex-1">
            <FiLoader className="animate-spin w-6 h-6 text-gray-600" />
          </div>
        )}

        {/* ERROR */}
        {/* {!loading && error && (
          <div className="text-center text-red-500 text-sm flex-1">
            {error}
          </div>
        )} */}

        {/* LIST */}
        {!loading && !error && (
          <div className="mt-5 space-y-3 overflow-y-auto flex-1 pr-2">
            {stations.map((station) => (
              <div key={station.id} className="flex items-center gap-3">
                <img
                  src={station.logo_url || "https://res.cloudinary.com/dioyo0ivz/image/upload/v1700816184/Frame_4327_lkvvkp.png" }
                  alt={station.name}
                  className="w-14 h-14 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {station.name}
                  </p>
                  <p className="text-sm text-gray-500">{station.frequency}</p>
                </div>
              </div>
            ))}

            {stations.length === 0 && (
              <p className="text-center text-gray-500 text-sm">
                No results found.
              </p>
            )}
          </div>
        )}

        {/* CLOSE BUTTON */}
        <Button
          className="w-full mt-4 py-2"
          variant="secondary"
          onClick={() => setIsOpen(false)}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ViewContentsModal;
