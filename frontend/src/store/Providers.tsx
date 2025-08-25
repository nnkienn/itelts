"use client";

import { Provider } from "react-redux";
import { store } from "./store"; // file store.ts bạn đã có

// Đây là component Providers, sẽ wrap toàn bộ app
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
