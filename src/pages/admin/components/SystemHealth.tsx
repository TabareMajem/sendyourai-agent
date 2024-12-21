import React from 'react';
import { Activity, Server, Database, Globe } from 'lucide-react';

interface Service {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  uptime: string;
  responseTime: string;
  icon: React.ElementType;
}

export function SystemHealth() {
  const services: Service[] = [
    {
      name: 'API Server',
      status: 'healthy',
      uptime: '99.9%',
      responseTime: '45ms',
      icon: Server
    },
    {
      name: 'Database',
      status: 'healthy',
      uptime: '99.99%',
      responseTime: '15ms',
      icon: Database
    },
    {
      name: 'Worker Nodes',
      status: 'healthy',
      uptime: '99.95%',
      responseTime: '25ms',
      icon: Activity
    },
    {
      name: 'CDN',
      status: 'healthy',
      uptime: '100%',
      responseTime: '35ms',
      icon: Globe
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <Activity className="w-5 h-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">System Health</h2>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.name}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <Icon className="w-5 h-5 text-indigo-600 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-500">
                    Response Time: {service.responseTime}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-3">
                  Uptime: {service.uptime}
                </span>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  service.status === 'healthy' ? 'bg-green-100 text-green-800' :
                  service.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {service.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* System Metrics */}
      <div className="p-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-4">System Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">CPU Usage</p>
            <div className="mt-2 relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: "25%" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                />
              </div>
              <p className="text-right text-xs text-gray-500 mt-1">25%</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Memory Usage</p>
            <div className="mt-2 relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: "45%" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
                />
              </div>
              <p className="text-right text-xs text-gray-500 mt-1">45%</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Storage Usage</p>
            <div className="mt-2 relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: "60%" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                />
              </div>
              <p className="text-right text-xs text-gray-500 mt-1">60%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}