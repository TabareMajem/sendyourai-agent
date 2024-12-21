import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bot,
  LayoutDashboard,
  GitBranch,
  BarChart2,
  Link as LinkIcon,
  Settings,
  HelpCircle,
  X,
  ChevronDown,
  Gavel,
  ClipboardList,
  Building2
} from 'lucide-react';
import { LanguageSelector } from '../layout/LanguageSelector';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'AI Agents', icon: Bot, href: '/agents' },
  { name: 'Legal Agent', icon: Gavel, href: '/agents/legal' },
  { name: 'Project Manager', icon: ClipboardList, href: '/agents/pmo' },
  { name: 'Sales Agent', icon: Building2, href: '/agents/sales/config' },
  { name: 'Workflows', icon: GitBranch, href: '/workflows' },
  { name: 'Analytics', icon: BarChart2, href: '/analytics' },
  { name: 'Integrations', icon: LinkIcon, href: '/integrations' },
  { name: 'Settings', icon: Settings, href: '/settings' },
  { name: 'Help & Support', icon: HelpCircle, href: '/support' },
];

export function Navigation({ isOpen, onClose }: NavigationProps) {
  const location = useLocation();
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'JD'
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform lg:transform-none lg:translate-x-0 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center">
              <Bot className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-lg font-semibold text-gray-900">
                Send AI Companion
              </span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md
                  ${location.pathname === item.href
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Selector */}
          <div className="px-4 py-2 border-t border-gray-200">
            <LanguageSelector variant="minimal" />
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-600">{user.avatar}</span>
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}