
import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css';
import { WorkFlow } from '@/components/WorkFlow/WorkFlow';


function App() {


  return (
    <ReactFlowProvider>
      <WorkFlow />
    </ReactFlowProvider>
  );
}

export default App;
