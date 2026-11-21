import type { AppDispatch } from './store';
import { fetchFeeds } from './feedSlice';

let ws: WebSocket | null = null;

export const connectFeedWebSocket = (dispatch: AppDispatch): void => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    return;
  }

  ws = new WebSocket('wss://norma.ffapi.ru/orders/all');

  ws.onopen = (): void => {
    console.log('WebSocket connected');
  };

  ws.onmessage = (event: MessageEvent): void => {
    const data: { success?: boolean } = JSON.parse(event.data as string);
    if (data.success) {
      void dispatch(fetchFeeds());
    }
  };

  ws.onerror = (error: Event): void => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = (): void => {
    console.log('WebSocket disconnected');
  };
};

export const disconnectFeedWebSocket = (): void => {
  if (ws) {
    ws.close();
    ws = null;
  }
};