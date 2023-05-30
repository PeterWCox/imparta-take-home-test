import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { TaskListApp } from "./components/TaskList/TaskListApp";

const queryClient = new QueryClient();
initializeIcons(/* optional base url */);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <main>
        <TaskListApp />
      </main>
    </React.StrictMode>
  </QueryClientProvider>
);
