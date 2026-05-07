import { useContext } from 'react';
import { ToastContext } from './notificationProvider';


export const useToast = () => {
  const context = useContext(ToastContext);
  console.log(context, 'context');
  return context;
};
