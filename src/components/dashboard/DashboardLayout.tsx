import React, { useState } from 'react';
import { Bot, Menu, Bell } from 'lucide-react';
import { Navigation } from './Navigation';
import { Header } from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-gray-600 hover:text-gray-900"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Bot className="w-8 h-8 text-indigo-600" />
        <button className="p-2 text-gray-600 hover:text-gray-900">
          <Bell className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <Navigation isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="lg:pl-64">
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <Header />
          
          {/* Main Content Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}