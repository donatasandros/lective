import { type QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { trpc } from "@/utils/trpc";
import "../index.css";
import { ThemeProvider } from "next-themes";
import { AddSubjectDialog } from "@/components/add-subject-dialog";
import { Header } from "@/components/header";
import { SubjectList } from "@/components/subject-list";
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
  beforeLoad: async ({ context, location }) => {
    const data = await context.queryClient.ensureQueryData(
      context.trpc.subject.getMany.queryOptions()
    );

    if (data.length > 0 && location.pathname === "/") {
      throw redirect({
        to: "/subject/$subjectId",
        params: {
          subjectId: data[0].id,
        },
      });
    }
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
          {subjects.length <= 0 && <AddSubjectDialog isOnboarding />}
          <div className="min-h-[calc(100vh-64px)]">
            <Header />
            <div className="flex min-h-[calc(100vh-64px)]">
              <SubjectList />
              <Outlet />
            </div>
          </div>
        </ToastProvider>
      </ThemeProvider>
      {/*<TanStackRouterDevtools position="bottom-left" />*/}
      {/*<ReactQueryDevtools buttonPosition="bottom-right" position="bottom" />*/}
    </>
  );
}
