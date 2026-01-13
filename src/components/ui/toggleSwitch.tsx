type ToggleSwitchProps = {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-green-400 transition-colors duration-300 ease-in-out" />
      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white dark:bg-gray-100 border border-gray-300 dark:border-gray-600 rounded-full transition-all duration-300 ease-in-out peer-checked:translate-x-5" />
    </label>
  );
}
