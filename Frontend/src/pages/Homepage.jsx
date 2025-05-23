import ChatPage from "../components/ChatPage"
import NochatSelected from "../components/NochatSelected"
import Sidebar from "../components/Sidebar"
import { useChatStore } from "../store/useChatStore"

function Homepage() {
  const {selectedUser} = useChatStore();
  return (
    <div className="h-screen bg-base-200 overflow-hidden">
       <div className="flex items-center justify-center">
         <div className="bg-base-100 rounded-lg shadow-cl w-full h-screen overflow-hidden">
            <div className="flex h-full rounded-lg overflow-hidden">
              <Sidebar />
              {!selectedUser ?<NochatSelected/>: <ChatPage/>}
            </div>
         </div>
       </div>
    </div>
  )
}

export default Homepage