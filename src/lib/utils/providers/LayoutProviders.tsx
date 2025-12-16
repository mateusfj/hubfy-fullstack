import { Toaster } from "sonner";
import { ReactqueryProvider } from "./ReactqueryProvider";
import { ThemeProvider } from "./ThemeProvider";

const LayoutProviders = ({ children }: React.PropsWithChildren<object>) => {
  return (
    <ReactqueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
        enableSystem
      >
        {children}
        <Toaster position="top-center" />
      </ThemeProvider>
    </ReactqueryProvider>
  );
};

export { LayoutProviders };
