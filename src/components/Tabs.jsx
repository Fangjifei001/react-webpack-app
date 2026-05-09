import './tabs.css';
import { useState, useEffect, useCallback } from 'react';

export default function TabsDemo() {
  const [activeTab, setActiveTab] = useState('home');
  const tabs = [
    { id: 'home', label: 'Home', content: 'Welcome to the Home Page!' },
    { id: 'profile', label: 'Profile', content: 'This is your Profile.' },
    {
      id: 'settings',
      label: 'Settings',
      content: 'Adjust your Settings here.',
    },
  ];
  return (
    <>
      <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'active' : ''}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>

      <div className="flexDemo">
        <div className="item">1</div>
        <div className="item">2</div>
        <div className="item">3</div>
      </div>
    </>
  );
}

export function useFetch(url, options = {}, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]); // options 也要依赖变化

  useEffect(() => {
    fetchData();
  }, deps); // deps 变化时触发

  return { data, loading, error, refetch: fetchData };
}
