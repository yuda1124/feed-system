import endpoint from './endpoint';
import {
  CategoryResponse,
  FeedListParams,
  FeedListResponse,
  AdvertisementListParams,
  AdvertisementListResponse,
  FeedDetailParams,
  FeedDetailResponse,
} from '../types';

const serializeParameter = (obj: { [key: string]: any }) => {
  const str: string[] = [];
  Object.keys(obj).forEach(key => {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((val: any) => {
        str.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(val)}`);
      });
    } else {
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    }
  });
  return str.join('&');
};

export const getCategories = async () => {
  const response: CategoryResponse = await endpoint.get('/category');
  const {
    data: { category },
  } = response;
  return category;
};

export const getFeedList = async ({ page, ord, category, limit }: FeedListParams) => {
  const response: FeedListResponse = await endpoint.get(`/list?${serializeParameter({ page, ord, category, limit })}`);
  const { data } = response;
  return data;
};

export const getAdvertisementList = async ({ page, limit }: AdvertisementListParams) => {
  const response: AdvertisementListResponse = await endpoint.get(`/ads?${serializeParameter({ page, limit })}`);
  const { data } = response;
  return data;
};

export const getFeedDetail = async ({ id }: FeedDetailParams) => {
  const response: FeedDetailResponse = await endpoint.get(`/view?${serializeParameter({ id })}`);
  const { data } = response;
  return data;
};
