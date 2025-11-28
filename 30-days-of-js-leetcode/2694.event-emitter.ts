type Callback = (...args: any[]) => any;

type Subscription = {
  unsubscribe: () => void;
};

class EventEmitter {
  private eventHandlers: { [eventName: string]: Callback[] } = {};

  subscribe(eventName: string, callback: Callback): Subscription {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(callback);

    const unsubscribe = () => {
      this.eventHandlers[eventName] = this.eventHandlers[eventName].filter(
        (cb) => cb !== callback,
      );
    };

    return { unsubscribe };
  }

  emit(eventName: string, args: any[] = []): any[] {
    const callbacks = this.eventHandlers[eventName] || [];
    const results = callbacks.map((callback) => callback(...args));
    return results;
  }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */
