import { URL_CONFIG } from '@/assets/config';

export const getCollection = async (route: string, id: string) => {
  const res = await fetch(id === '' ? `${URL_CONFIG}/${route}` : `${URL_CONFIG}/${route}/${id}`);
  return res.json();
};
