import { Toaster } from "sonner";
import { ReactqueryProvider } from "./ReactqueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "./AuthProvider";

const LayoutProviders = ({ children }: React.PropsWithChildren<object>) => {
  return (
    <ReactqueryProvider>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
          enableSystem
        >
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </AuthProvider>
    </ReactqueryProvider>
  );
};

export { LayoutProviders };
