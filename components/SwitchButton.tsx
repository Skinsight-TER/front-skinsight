import { useState } from 'react';

interface SwitchButtonProps {
  label: string;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ label }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <span className="text-base">{label}</span>
      <button
        className={`relative w-30 p-2 flex items-center rounded-lg bg-white`}
        onClick={() => setIsActive(!isActive)}
      >
        {/* La sélection qui se déplace */}
        <div
          className={`absolute left-1 top-1 w-10 h-6 rounded-full bg-grey-300 transform transition-all duration-300 ${
            isActive ? 'translate-x-0' : 'translate-x-12'
          }`}
        ></div>
        {/* Les labels OUI et NON */}
        <div className="flex items-center justify-between w-full px-1 gap-4">
          <span className={`font-bold ${isActive ? 'text-main-dark' : 'text-main-dark bg-gray-400 px-2 py-1 rounded-lg'}`}>OUI</span>
          <span className={`font-bold ${!isActive ? 'text-main-dark' : 'text-main-dark bg-gray-400 px-2 py-1 rounded-lg'}`}>NON</span>
        </div>
      </button>
    </div>
  );
};

export default SwitchButton;
