type Props = {
  title: string;
  body: string;
  icon?: any;
};

export const notification = ({ title, body, icon = '' }: Props) => {
  const myNotification = new Notification(title, {
    body,
    icon,
  });
  return myNotification;
};
