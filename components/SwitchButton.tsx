import { useState } from 'react';

interface SwitchButtonProps {
  label: string;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ label }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex items-center justify-center space-x-4">
      <span>{label}</span>
      <button
        className={`relative w-24 p-1 flex items-center rounded-lg bg-white`}
        onClick={() => setIsActive(!isActive)}
      >
        {/* La sélection qui se déplace */}
        <div
          className={`absolute left-1 top-1 w-10 h-6 rounded-full bg-grey-300 transform transition-all duration-300 ${
            isActive ? 'translate-x-0' : 'translate-x-12'
          }`}
        ></div>
        {/* Les labels OUI et NON */}
        <div className="flex justify-between w-full px-1">
          <span className={`font-bold ${isActive ? 'text-main-dark' : 'text-gray-500'}`}>OUI</span>
          <span className={`font-bold ${!isActive ? 'text-main-dark' : 'text-gray-500'}`}>NON</span>
        </div>
      </button>
    </div>
  );
};

export default SwitchButton;
