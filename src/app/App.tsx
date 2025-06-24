import { RAW_PATH } from '@/shared/constants';
import { Stack } from './stackflow';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthScreen } from '@/screen/auth/ui';
import { JoinScreen } from '@/screen/join/ui';
import { JoinLoadingScreen } from '@/screen/join-loading/ui';
import { JoinCompleteScreen } from '@/screen/join-complete/ui';
import { useFetchUserInfo } from '@/shared/hook';
import { useEffect } from 'react';

export default function App() {
  const { data } = useFetchUserInfo();

  useEffect(() => {
    if (data) {
      sessionStorage.setItem('userInfo', JSON.stringify(data.results[0]));
    }
  }, [data]);

  const router = createBrowserRouter([
    {
      path: RAW_PATH.HOME,
      element: (
        <div className="size-screen">
          <div className="scrollbar-hide container-mobile fixed inset-0 overflow-hidden">
            <Stack />
          </div>
        </div>
      ),
    },
    { path: RAW_PATH.AUTH, element: <AuthScreen /> },
    { path: RAW_PATH.SIGNUP, element: <JoinScreen /> },
    { path: RAW_PATH.SIGNUP_LOADING, element: <JoinLoadingScreen /> },
    { path: RAW_PATH.SIGNUP_COMPLETE, element: <JoinCompleteScreen /> },
  ]);

  return <RouterProvider router={router} />;
}
