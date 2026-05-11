import React, { useState } from 'react';

// This is a demo component for Tabs.
export function Tabs(props) {
  const [activeTab, setActiveTab] = useState('home');
  return (
    <div className="py-2">
      <h1 className="text-4xl font-bold text-white mb-8">Tailwind CSS Test</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex border-b border-gray-300 gap-1 mb-6">
          {props.content.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 rounded-t-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 bg-blue-50 text-blue-700 font-semibold shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="text-lg text-gray-700 p-4 bg-gray-50 rounded-md">
          {props.content.find((tab) => tab.id === activeTab)?.content}
        </div>
      </div>
    </div>
  );
}

// This is a demo component for Select.
export function SelectDropDown({
  label,
  options,
  onChange,
  placeholder = 'Select an option',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
      {label && <label>{label}</label>}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between bg-amber-50 p-2 rounded-lg border-amber-500"
      >
        {selectedOption || placeholder}
        <button>{isOpen ? 'V' : 'Y'}</button>
      </div>

      {isOpen && (
        <div className="mt-2 rounded-lg">
          {options.map((option) => (
            <div
              className={`bg-amber-50 py-4 px-2 ${selectedOption === option.value ? 'bg-orange-50 text-orange-600' : 'text-gray-800 hover:bg-gray-50'}`}
              key={option.key || option.value || option}
              onClick={() => {
                onChange(option);
                setSelectedOption(option.label || option.value || option);
                setIsOpen(false);
              }}
            >
              {option.label || option.value || option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
