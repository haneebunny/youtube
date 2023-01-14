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
import { YoutubeApiProvider } from "./context/YoutubeApiContext";

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
        element: <Home />,
      },
      {
        path: "/videos",
        element: <Home />,
      },
      {
        path: "/videos/:keyword",
        element: <Home />,
      },
      {
        path: "/videos/watch/:id",
        element: <VideoDetail />,
      },
    ],
  },
]);

function App() {
  return (
    <YoutubeApiProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </YoutubeApiProvider>
  );
}

export default App;
