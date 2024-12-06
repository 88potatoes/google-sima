import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { PostHogProvider } from "posthog-js/react";
import posthog from "posthog-js";

const options = {
  api_host: import.meta.env.VITE_REACT_APP_PUBLIC_POSTHOG_HOST,
};
console.log(import.meta.env);

if (
  !window.location.host.includes("127.0.0.1") &&
  !window.location.host.includes("localhost")
) {
  posthog.init("phc_oBqsx1oYIjFa3fsjWUqIL2lNwmVRv6EDB0vutScV778", {
    api_host: "https://us.i.posthog.com",
    person_profiles: "always",
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_REACT_APP_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </PostHogProvider>
  </StrictMode>,
);
