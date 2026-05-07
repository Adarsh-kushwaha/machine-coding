import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ToastProvider from "./components/toast/notificationProvider";
import Toast from "./pages/Toast";
import { StarRating } from "./pages/StarRating";
import { TooltipPage } from "./pages/TooltipPage";
import { PopoverPage } from "./pages/PopoverPage";
import { VirtualListPage } from "./pages/VirtualListPage";
import { InfiniteScrollPage } from "./pages/InfiniteScrollPage";
import { ModalPages } from "./pages/ModalPage";
import { DragDropPage } from "./pages/DragDropPage";
import { NestedFolderPages } from "./pages/NestedFolder";
import { AucompletePage } from "./pages/AutocompletePage";
import { NestedCheckboxPage } from "./pages/NestedCheckboxPage";
import { NestedCommentPage } from "./pages/NestedCommentPage";
import { TodoPage } from "./pages/ToDoPage";
import { KanbanPage } from "./pages/KanbanPage";
import { OtpPage } from "./pages/OtpPage";
import { CarouselPage } from "./pages/CarouselPage";

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/toast" element={<Toast />} />
        <Route path="/star" element={<StarRating/>}/>
        <Route path="/tooltip" element={<TooltipPage/>}/>
        <Route path="/popover" element={<PopoverPage/>}/>
        <Route path="/virtual" element={<VirtualListPage/>}/>
        <Route path="/scroll" element={<InfiniteScrollPage/>}/>
        <Route path ="/modal" element={<ModalPages/>}/>
        <Route path="/drag" element={<DragDropPage/>}/>
        <Route path="/nested" element={<NestedFolderPages/>}/>
        <Route path="/autocomplete" element={<AucompletePage/>}/>
        <Route path="/checkbox" element={<NestedCheckboxPage/>}/>
        <Route path="/comments" element={<NestedCommentPage/>}/>
        <Route path="/todo" element={<TodoPage/>}/>
        <Route path="/kanban" element={<KanbanPage/>}/>
        <Route path = "/otp" element={<OtpPage/>}/>
        <Route path="/carousel" element={<CarouselPage/>}/>
      </Routes>
    </ToastProvider>
  );
}

export default App;
