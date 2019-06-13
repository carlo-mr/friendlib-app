export interface Notification {
  id: string;
  recipientId: string;
  createdAt: string;

  title: string;
  message: string;

  type?: string;
  parameters?: any;
}
