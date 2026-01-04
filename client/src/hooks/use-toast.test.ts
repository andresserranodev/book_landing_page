import { renderHook, act } from '@testing-library/react';
import { useToast, toast, reducer } from './use-toast';

describe('useToast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // Reset module state by reimporting
    jest.resetModules();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('adds a toast and returns control functions', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      const toastInstance = toast({ title: 'Test Toast' });
      expect(toastInstance).toHaveProperty('dismiss');
      expect(toastInstance).toHaveProperty('update');
      expect(toastInstance).toHaveProperty('id');
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Test Toast');
  });

  it('respects TOAST_LIMIT of 1', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: 'Toast 1' });
      toast({ title: 'Toast 2' });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Toast 2');
  });

  it('generates unique sequential IDs', () => {
    const { result } = renderHook(() => useToast());
    const ids: string[] = [];

    act(() => {
      const toast1 = toast({ title: 'Toast 1' });
      const toast2 = toast({ title: 'Toast 2' });
      ids.push(toast1.id, toast2.id);
    });

    // IDs should be different
    expect(ids[0]).not.toBe(ids[1]);
  });

  it('dismisses toast and sets open to false', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: 'Dismissible Toast' });
    });

    expect(result.current.toasts[0].open).toBe(true);

    act(() => {
      result.current.dismiss(result.current.toasts[0].id);
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  it('removes toast after TOAST_REMOVE_DELAY when dismissed', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: 'Temporary Toast' });
    });

    const toastId = result.current.toasts[0].id;

    act(() => {
      result.current.dismiss(toastId);
    });

    // Toast should still exist but be closed
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].open).toBe(false);

    // Fast-forward time to after TOAST_REMOVE_DELAY (1000000ms in the code)
    act(() => {
      jest.advanceTimersByTime(1000000);
    });

    // Now toast should be removed
    expect(result.current.toasts).toHaveLength(0);
  });

  it('updates toast properties', () => {
    const { result } = renderHook(() => useToast());
    let toastInstance: any;

    act(() => {
      toastInstance = toast({ title: 'Original Title' });
    });

    expect(result.current.toasts[0].title).toBe('Original Title');

    act(() => {
      toastInstance.update({ title: 'Updated Title' });
    });

    expect(result.current.toasts[0].title).toBe('Updated Title');
  });

  it('dismisses all toasts when called without toastId', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: 'Toast 1' });
      // Note: TOAST_LIMIT is 1, so only one toast at a time
    });

    expect(result.current.toasts[0].open).toBe(true);

    act(() => {
      result.current.dismiss(); // No ID provided
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  it('multiple hook instances receive updates', () => {
    const { result: result1 } = renderHook(() => useToast());
    const { result: result2 } = renderHook(() => useToast());

    act(() => {
      toast({ title: 'Shared Toast' });
    });

    // Both instances should see the same toast
    expect(result1.current.toasts).toHaveLength(1);
    expect(result2.current.toasts).toHaveLength(1);
    expect(result1.current.toasts[0].title).toBe('Shared Toast');
    expect(result2.current.toasts[0].title).toBe('Shared Toast');
  });

  describe('reducer', () => {
    it('handles ADD_TOAST action', () => {
      const initialState = { toasts: [] };
      const newToast = {
        id: '1',
        title: 'Test',
        open: true,
      };

      const newState = reducer(initialState, {
        type: 'ADD_TOAST',
        toast: newToast,
      });

      expect(newState.toasts).toHaveLength(1);
      expect(newState.toasts[0]).toEqual(newToast);
    });

    it('handles UPDATE_TOAST action', () => {
      const initialState = {
        toasts: [{ id: '1', title: 'Original', open: true }],
      };

      const newState = reducer(initialState, {
        type: 'UPDATE_TOAST',
        toast: { id: '1', title: 'Updated' },
      });

      expect(newState.toasts[0].title).toBe('Updated');
      expect(newState.toasts[0].open).toBe(true); // Preserved
    });

    it('handles DISMISS_TOAST action', () => {
      const initialState = {
        toasts: [{ id: '1', title: 'Test', open: true }],
      };

      const newState = reducer(initialState, {
        type: 'DISMISS_TOAST',
        toastId: '1',
      });

      expect(newState.toasts[0].open).toBe(false);
    });

    it('handles REMOVE_TOAST action', () => {
      const initialState = {
        toasts: [{ id: '1', title: 'Test', open: true }],
      };

      const newState = reducer(initialState, {
        type: 'REMOVE_TOAST',
        toastId: '1',
      });

      expect(newState.toasts).toHaveLength(0);
    });

    it('removes all toasts when REMOVE_TOAST called without ID', () => {
      const initialState = {
        toasts: [
          { id: '1', title: 'Test 1', open: true },
          { id: '2', title: 'Test 2', open: true },
        ],
      };

      const newState = reducer(initialState, {
        type: 'REMOVE_TOAST',
        toastId: undefined,
      });

      expect(newState.toasts).toHaveLength(0);
    });
  });
});
