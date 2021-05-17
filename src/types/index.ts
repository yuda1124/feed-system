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
  created_at: string;
  id: number;
  title: string;
  updated_at: string;
  user_id: number;
};

export type User = {
  created_at: string;
  email: string;
  email_verified_at: string;
  id: number;
  name: string;
  updated_at: string;
};

export type Reply = {
  contents: string;
  created_at: string;
  id: number;
  parent: number;
  updated_at: string;
  user_id: number;
};

export type FeedDetail = FeedSummary & {
  reply: Reply[];
  user: User;
};

export type Advertisement = {
  contents: string;
  title: string;
  created_at: string;
  id: number;
  img: string;
  updated_at: string;
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

export type FeedDetailResponse = {
  data: {
    data: FeedDetail;
  };
};

export type FeedDetailParams = {
  id: number;
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
