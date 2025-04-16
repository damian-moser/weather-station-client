type Callback<T = any> = (payload: T) => void;

const listeners = new Map<string, Set<Callback>>();

export const eventBus = {
  on(event: string, callback: Callback) {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event)!.add(callback);
  },
  off(event: string, callback: Callback) {
    listeners.get(event)?.delete(callback);
  },
  emit(event: string, payload?: any) {
    listeners.get(event)?.forEach((callback) => callback(payload));
  },
};
