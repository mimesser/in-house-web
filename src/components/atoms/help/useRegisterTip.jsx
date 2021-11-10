import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { registerTip, unregisterTip } from '../../../store/help';

export const useRegisterTip = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(registerTip());

    return () => {
      dispatch(unregisterTip());
    };
  }, [dispatch]);
};
