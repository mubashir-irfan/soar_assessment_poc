import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
}

const TAB_TRANSITION_DURATION = 200;

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  className?: string;
}

function Tabs({ tabs, activeTab, setActiveTab, className }: TabsProps) {
  const [transitioning, setTransitioning] = useState(false);

  const handleTabClick = (tabId: string) => {
    if (activeTab !== tabId) {
      setTransitioning(true);
      setTimeout(() => {
        setActiveTab(tabId);
        setTransitioning(false);
      }, TAB_TRANSITION_DURATION);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex justify-between md:justify-center lg:justify-start md:gap-4 w-full  border-b border-solid border-border-light">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`relative rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800`}
          >
            <button
              className={`relative text-base md:text-lg font-medium transition-colors 
                focus:outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-soar focus-visible:ring-offset-1
             focus-visible:ring-offset-background-white rounded-lg
                ${activeTab === tab.id ? `text-text-primary` : `text-text-secondary`}`}
              onClick={() => handleTabClick(tab.id)}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              <p className="px-4 py-2">{tab.label}</p>
              <div
                className={`absolute bottom-[-1px] h-[3px] w-full mx-auto bg-active transition-transform rounded-t-[10px] ${
                  activeTab === tab.id ? (transitioning ? 'scale-x-0' : 'scale-x-100') : 'scale-x-0'
                }`}
              ></div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
