export enum ORDER {
  ASC = 'asc',
  DESC = 'desc',
}

export type Category = {
  id: number;
  name: string;
};

export type FeedSummary = {
  category_id: number;
  contents: string;
  created_at: Date;
  id: number;
  title: string;
  updated_at: Date;
  user_id: number;
};

export type Advertisement = {
  contents: string;
  created_at: Date;
  id: number;
  img: string;
  updated_at: Date;
};

export type FeedListParams = {
  page: number;
  ord: 'asc' | 'desc';
  category: number[];
  limit: number;
};

export type AdvertisementListParams = {
  page: number;
  limit: number;
};

export type AdvertisementListResponse = {
  data: {
    data: Advertisement[];
    current_page: number;
    last_page: number;
  };
};

export type FeedListResponse = {
  data: {
    data: FeedSummary[];
    current_page: number;
    last_page: number;
  };
};

export type CategoryResponse = {
  data: {
    category: Category[];
  };
  total: number;
};

export type MainState = {
  page: number;
  order: ORDER;
  limit: number;
  filter: number[];
  categories: Category[];
  lastPage: number;
};
