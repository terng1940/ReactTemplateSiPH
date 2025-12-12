import { createContext, useContext } from 'react';
import { rootStore } from '../stores/RootStroe';

export const StoreContext = createContext(rootStore);
export const useStores = () => useContext(StoreContext);
