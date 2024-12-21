import React, { useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { WorkflowCanvas } from '../../components/workflows/WorkflowCanvas';
import { ComponentSidebar } from '../../components/workflows/ComponentSidebar';
import { PropertiesPanel } from '../../components/workflows/PropertiesPanel';
import { WorkflowToolbar } from '../../components/workflows/WorkflowToolbar';
import { AIAssistant } from '../../components/workflows/AIAssistant';
import { AIWorkflowGenerator } from '../../components/workflows/AIWorkflowGenerator';

export function WorkflowCreator() {
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [workflow, setWorkflow] = useState<any>({
    nodes: [],
    edges: []
  });

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        {/* AI Generator */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="p-4">
            <AIWorkflowGenerator 
              onWorkflowGenerated={(generatedWorkflow) => {
                setWorkflow(generatedWorkflow);
              }}
            />
          </div>
        </div>

        {/* Workflow Editor */}
        <div className="flex-1 flex min-h-0">
          <ReactFlowProvider>
            <div className="flex h-full">
              <ComponentSidebar
                onComponentDrag={(component) => {
                  console.log('Component dragged:', component);
                }}
              />

              <div className="flex-1 flex flex-col">
                <WorkflowToolbar
                  workflow={workflow}
                  onSave={() => {
                    console.log('Saving workflow:', workflow);
                  }}
                  onTest={() => {
                    console.log('Testing workflow');
                  }}
                  onDeploy={() => {
                    console.log('Deploying workflow');
                  }}
                />
                
                <div className="flex-1 flex min-h-0">
                  <WorkflowCanvas
                    workflow={workflow}
                    onWorkflowChange={setWorkflow}
                    onElementSelect={setSelectedElement}
                  />
                  
                  {selectedElement && (
                    <PropertiesPanel
                      selectedElement={selectedElement}
                      onElementUpdate={(updatedElement) => {
                        const updatedNodes = workflow.nodes.map((node: any) =>
                          node.id === updatedElement.id ? updatedElement : node
                        );
                        setWorkflow({
                          ...workflow,
                          nodes: updatedNodes
                        });
                      }}
                    />
                  )}
                </div>
              </div>

              <AIAssistant
                workflow={workflow}
                onSuggestion={(suggestion) => {
                  console.log('AI suggestion:', suggestion);
                }}
              />
            </div>
          </ReactFlowProvider>
        </div>
      </div>
    </DashboardLayout>
  );
}