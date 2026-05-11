import React from 'react';
import { SelectDropDown, Tabs } from './Widgets';

export default function Home() {
  const tabs = [
    { id: 'home', label: 'Home', content: 'Welcome to the Home Page!' },
    { id: 'profile', label: 'Profile', content: 'This is your Profile.' },
    {
      id: 'settings',
      label: 'Settings',
      content: 'Adjust your Settings here.',
    },
  ];

  const options = [
    {
      key: 'Y',
      value: 'Yes',
    },
    {
      key: 'N',
      value: 'No',
    },
  ];

  function onChange(option) {
    console.log(option);
  }
  return (
    <div className="px-8 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
      <Tabs content={tabs} />
      <SelectDropDown
        options={options}
        label="Is there social media"
        onChange={onChange}
      />
    </div>
  );
}
