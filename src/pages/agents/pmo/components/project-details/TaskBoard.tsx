import React, { useState } from 'react';
import { Plus, MoreVertical, Clock, User, AlertCircle } from 'lucide-react';
import { Project } from '../../../../../lib/agents/pmo/types';

interface TaskBoardProps {
  project: Project;
  onTaskUpdate: (taskId: string, updates: Partial<Project['tasks'][0]>) => void;
}

export function TaskBoard({ project, onTaskUpdate }: TaskBoardProps) {
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    title: '',
    description: '',
    assignee: '',
    startDate: '',
    endDate: '',
    dependencies: [] as string[]
  });

  const columns = [
    { id: 'todo', title: 'To Do', tasks: project.tasks.filter(t => t.status === 'todo') },
    { id: 'inProgress', title: 'In Progress', tasks: project.tasks.filter(t => t.status === 'inProgress') },
    { id: 'completed', title: 'Completed', tasks: project.tasks.filter(t => t.status === 'completed') }
  ];

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: 'todo' | 'inProgress' | 'completed') => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    onTaskUpdate(taskId, { status });
  };

  return (
    <div className="h-full">
      {/* Task Board Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Tasks</h3>
          <p className="text-sm text-gray-500">
            {project.tasks.length} tasks • {project.tasks.filter(t => t.status === 'completed').length} completed
          </p>
        </div>
        <button
          onClick={() => setShowNewTask(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </button>
      </div>

      {/* Task Board Columns */}
      <div className="grid grid-cols-3 gap-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="bg-gray-50 p-4 rounded-lg"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id as any)}
          >
            <h4 className="text-sm font-medium text-gray-900 mb-4">{column.title}</h4>
            <div className="space-y-3">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm cursor-move hover:border-indigo-600 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <h5 className="text-sm font-medium text-gray-900">{task.title}</h5>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <div className="flex items-center text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      {task.assignee}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(task.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  {task.dependencies.length > 0 && (
                    <div className="mt-2 flex items-center text-xs text-yellow-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {task.dependencies.length} dependencies
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* New Task Modal */}
      {showNewTask && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Task</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onTaskUpdate(crypto.randomUUID(), {
                  ...newTaskData,
                  id: crypto.randomUUID(),
                  status: 'todo',
                  startDate: new Date(newTaskData.startDate),
                  endDate: new Date(newTaskData.endDate)
                });
                setShowNewTask(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={newTaskData.title}
                  onChange={(e) => setNewTaskData({ ...newTaskData, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newTaskData.description}
                  onChange={(e) => setNewTaskData({ ...newTaskData, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Assignee</label>
                <select
                  value={newTaskData.assignee}
                  onChange={(e) => setNewTaskData({ ...newTaskData, assignee: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                >
                  <option value="">Select assignee</option>
                  {project.resources.map((resource, index) => (
                    <option key={index} value={resource.name}>{resource.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={newTaskData.startDate}
                    onChange={(e) => setNewTaskData({ ...newTaskData, startDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={newTaskData.endDate}
                    onChange={(e) => setNewTaskData({ ...newTaskData, endDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewTask(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}