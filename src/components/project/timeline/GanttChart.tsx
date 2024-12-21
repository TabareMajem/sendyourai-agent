```typescript
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Link, AlertTriangle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  dependencies: string[];
  assignee?: {
    name: string;
    avatar: string;
  };
  status: 'on_track' | 'at_risk' | 'delayed';
}

interface GanttChartProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onAddDependency: (taskId: string, dependencyId: string) => void;
}

export function GanttChart({
  tasks,
  onTaskUpdate,
  onAddTask,
  onAddDependency
}: GanttChartProps) {
  const [viewStartDate, setViewStartDate] = useState(new Date());
  const [timeScale, setTimeScale] = useState<'day' | 'week' | 'month'>('week');
  const [showAddTask, setShowAddTask] = useState(false);

  // Calculate view range based on timeScale
  const getViewRange = () => {
    const start = new Date(viewStartDate);
    const end = new Date(viewStartDate);
    switch (timeScale) {
      case 'day':
        end.setDate(end.getDate() + 14); // Show 2 weeks
        break;
      case 'week':
        end.setDate(end.getDate() + 42); // Show 6 weeks
        break;
      case 'month':
        end.setMonth(end.getMonth() + 3); // Show 3 months
        break;
    }
    return { start, end };
  };

  const viewRange = getViewRange();

  // Generate time slots based on timeScale
  const generateTimeSlots = () => {
    const slots = [];
    const current = new Date(viewRange.start);
    while (current <= viewRange.end) {
      slots.push(new Date(current));
      switch (timeScale) {
        case 'day':
          current.setDate(current.getDate() + 1);
          break;
        case 'week':
          current.setDate(current.getDate() + 7);
          break;
        case 'month':
          current.setMonth(current.getMonth() + 1);
          break;
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Calculate task position and width
  const getTaskStyle = (task: Task) => {
    const totalDays = (viewRange.end.getTime() - viewRange.start.getTime()) / (1000 * 60 * 60 * 24);
    const taskStart = Math.max(task.startDate.getTime(), viewRange.start.getTime());
    const taskEnd = Math.min(task.endDate.getTime(), viewRange.end.getTime());
    
    const left = ((taskStart - viewRange.start.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100;
    const width = ((taskEnd - taskStart) / (1000 * 60 * 60 * 24)) / totalDays * 100;

    return {
      left: `${left}%`,
      width: `${width}%`
    };
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'on_track':
        return 'bg-green-500';
      case 'at_risk':
        return 'bg-yellow-500';
      case 'delayed':
        return 'bg-red-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Project Timeline</h2>
          </div>
          <div className="flex items-center space-x-4">
            {/* Time Scale Selector */}
            <select
              value={timeScale}
              onChange={(e) => setTimeScale(e.target.value as typeof timeScale)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
            </select>

            {/* Navigation Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  const newDate = new Date(viewStartDate);
                  switch (timeScale) {
                    case 'day':
                      newDate.setDate(newDate.getDate() - 14);
                      break;
                    case 'week':
                      newDate.setDate(newDate.getDate() - 42);
                      break;
                    case 'month':
                      newDate.setMonth(newDate.getMonth() - 3);
                      break;
                  }
                  setViewStartDate(newDate);
                }}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  const newDate = new Date(viewStartDate);
                  switch (timeScale) {
                    case 'day':
                      newDate.setDate(newDate.getDate() + 14);
                      break;
                    case 'week':
                      newDate.setDate(newDate.getDate() + 42);
                      break;
                    case 'month':
                      newDate.setMonth(newDate.getMonth() + 3);
                      break;
                  }
                  setViewStartDate(newDate);
                }}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => setShowAddTask(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="p-4 overflow-x-auto">
        <div className="min-w-max">
          {/* Time Headers */}
          <div className="flex border-b border-gray-200">
            <div className="w-64 flex-shrink-0" />
            <div className="flex-1">
              <div className="grid grid-cols-{timeSlots.length} gap-0">
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 text-center text-sm text-gray-500 border-r border-gray-200"
                  >
                    {timeScale === 'day'
                      ? slot.toLocaleDateString()
                      : timeScale === 'week'
                      ? `Week ${Math.ceil(slot.getDate() / 7)}`
                      : slot.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div className="relative">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center border-b border-gray-200">
                {/* Task Info */}
                <div className="w-64 flex-shrink-0 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                      {task.assignee && (
                        <div className="flex items-center mt-1">
                          <img
                            src={task.assignee.avatar}
                            alt={task.assignee.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="ml-2 text-xs text-gray-500">
                            {task.assignee.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
                  </div>
                </div>

                {/* Task Timeline */}
                <div className="flex-1 relative h-16">
                  <div
                    className={`absolute top-4 h-8 rounded-lg ${getStatusColor(task.status)} opacity-75`}
                    style={getTaskStyle(task)}
                  >
                    <div
                      className="h-full bg-white opacity-50"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dependencies */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {tasks.map((task) =>
          task.dependencies.map((depId) => {
            const dependencyTask = tasks.find((t) => t.id === depId);
            if (!dependencyTask) return null;

            // Calculate path between tasks
            const startTask = getTaskStyle(dependencyTask);
            const endTask = getTaskStyle(task);

            return (
              <path
                key={`${task.id}-${depId}`}
                d={`M ${startTask.left} ${startTask.top} C ${startTask.left} ${endTask.top}, ${endTask.left} ${startTask.top}, ${endTask.left} ${endTask.top}`}
                stroke="#9CA3AF"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4"
              />
            );
          })
        )}
      </svg>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            {/* Add task form would go here */}
          </div>
        </div>
      )}
    </div>
  );
}
```