import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TabsDemo from './components/Tabs';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TabsDemo />} />
      <Route path="/about" element={<h1>About Page</h1>} />
    </Routes>
  );
}
