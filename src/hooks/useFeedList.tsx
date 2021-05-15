import React, { useState, useEffect } from 'react';
import { ORDER, FeedSummary, Category, Advertisement } from '../types';
import * as API from '../apis';

type FeedState = {
  page: number;
  limit: number;
  order: ORDER;
  filter: number[];
  feedSummaries: FeedSummary[];
  advertisements: Advertisement[];
  categories: Category[];
};

const DEFAULT_LIMIT = 10;

const initialState = {
  page: 1,
  limit: DEFAULT_LIMIT,
  order: ORDER.ASC,
  filter: [],
  feedSummaries: [],
  advertisements: [],
  categories: [],
};

const initialFetch = async () => {
  const { page, limit, order } = initialState;
  const categories = await API.getCategories();
  const filter = categories.map((category: Category) => category.id);
  const [feedsResponse, adsResponse] = await Promise.all([
    await API.getFeedList({ page, limit, ord: order, category: filter }),
    await API.getAdvertisementList({ page, limit: Math.floor(limit / 3) }),
  ]);
  const { data: feeds } = feedsResponse;
  const { data: ads } = adsResponse;
  return { categories, filter, feeds, ads };
};

const useFeedList = () => {
  const [feedState, setFeedState] = useState<FeedState>(initialState);

  useEffect(() => {
    const init = async () => {
      const { categories, filter, feeds, ads } = await initialFetch();
      setFeedState(state => ({ ...state, categories, filter, feedSummaries: feeds, advertisements: ads }));
    };
    init();
  }, []);

  const changeFilter = async (filter: number[]) => {
    const { limit, order } = feedState;
    const [feedsResponse, adsResponse] = await Promise.all([
      await API.getFeedList({ page: 1, limit, ord: order, category: filter }),
      await API.getAdvertisementList({ page: 1, limit: Math.floor(limit / 3) }),
    ]);
    const { data: feeds } = feedsResponse;
    const { data: ads } = adsResponse;
    setFeedState({ ...feedState, filter, page: 1, feedSummaries: feeds, advertisements: ads });
  };

  const fetchMore = async () => {
    const { limit, order, filter, page, feedSummaries, advertisements } = feedState;
    const [feedsResponse, adsResponse] = await Promise.all([
      await API.getFeedList({ page: page + 1, limit, ord: order, category: filter }),
      await API.getAdvertisementList({ page: page + 1, limit: Math.floor(limit / 3) }),
    ]);
    const { data: feeds } = feedsResponse;
    const { data: ads } = adsResponse;
    setFeedState({
      ...feedState,
      filter,
      page: 1,
      feedSummaries: [...feedSummaries, ...feeds],
      advertisements: [...advertisements, ...ads],
    });
  };

  return { feedState, changeFilter, fetchMore };
};

export { useFeedList };
