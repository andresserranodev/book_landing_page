import { renderHook, act } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/lib/LanguageContext";
import { queryClient } from "@/lib/queryClient";
import { useWaitlistForm } from "./use-waitlist-form";

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>{children}</LanguageProvider>
    </QueryClientProvider>
  );
}

describe("useWaitlistForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("initializes with empty email and not submitting", () => {
    const { result } = renderHook(() => useWaitlistForm(), {
      wrapper: Wrapper,
    });

    expect(result.current.email).toBe("");
    expect(result.current.isSubmitting).toBe(false);
  });

  it("updates email when setEmail is called", () => {
    const { result } = renderHook(() => useWaitlistForm(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.setEmail("test@example.com");
    });

    expect(result.current.email).toBe("test@example.com");
  });

  it("has handleSubmit function", () => {
    const { result } = renderHook(() => useWaitlistForm(), {
      wrapper: Wrapper,
    });

    expect(typeof result.current.handleSubmit).toBe("function");
  });

  it("handleSubmit is async function", () => {
    const { result } = renderHook(() => useWaitlistForm(), {
      wrapper: Wrapper,
    });
    const mockEvent = {
      preventDefault: jest.fn(),
    } as any;

    const submitResult = result.current.handleSubmit(mockEvent);
    expect(submitResult).toBeInstanceOf(Promise);
  });
});
