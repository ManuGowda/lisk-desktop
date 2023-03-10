import { useSelector } from 'react-redux';
import { selectCurrentHWDevice } from '../store/selectors/hwSelectors';

export const useHWStatus = () => useSelector(selectCurrentHWDevice);

