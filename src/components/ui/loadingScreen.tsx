type LoadingScreenProps = {
  text: string;
  showText?: boolean;
};

const LoadingScreen = ({ text, showText = true }: LoadingScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mb-3"></span>
      {showText && (
        <p className="text-gray-500 dark:text-gray-400 text-sm">{`Loading ${text}`}</p>
      )}
    </div>
  );
};

export default LoadingScreen;
