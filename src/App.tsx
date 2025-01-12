
import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css';
import { BoardFlow } from '@/components/BoardFlow/BoardFlow';


function App() {


  return (
    <ReactFlowProvider>
      <BoardFlow />
    </ReactFlowProvider>
  );
}

export default App;
