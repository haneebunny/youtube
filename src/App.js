import "./App.css";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./components/commons/layout";
import Home from "./components/units/home/Home";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Video from "./components/units/video/Video";
import Root from "./components/commons/layout/Root";
import VideoDetail from "./components/units/video_detail/VideoDetail";
import SearchVideo from "./components/units/search_video/SearchVideo";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: (
      <div className="mx-auto h-screen bg-slate-700 text-white">
        미안해요🥲오류가 났어요
      </div>
    ),
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        index: true,
        path: "/search/:keyword",
        element: <SearchVideo />,
      },
      {
        index: true,
        path: "/video/:id",
        element: <VideoDetail />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
