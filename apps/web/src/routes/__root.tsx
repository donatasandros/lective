import { type QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { trpc } from "@/utils/trpc";
import "../index.css";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/header";
import { OnboardingDialog } from "@/components/onboarding-dialog";
import { ToastProvider } from "@/components/ui/toast";

export type RouterAppContext = {
  trpc: typeof trpc;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: "lective",
      },
      {
        name: "description",
        content: "lective is a web application",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
  }),
  beforeLoad: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.subject.getMany.queryOptions()
    );
  },
});

function RootComponent() {
  const { data: subjects } = useSuspenseQuery(
    trpc.subject.getMany.queryOptions()
  );

  return (
    <>
      <HeadContent />
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
      >
        <ToastProvider>
          {subjects.length <= 0 && <OnboardingDialog />}
          <div>
            <Header />
            <Outlet />
          </div>
        </ToastProvider>
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools buttonPosition="bottom-right" position="bottom" />
    </>
  );
}
