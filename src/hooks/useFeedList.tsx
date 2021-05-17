import React, { useState, useEffect } from 'react';
import { ORDER, FeedSummary, Category, Advertisement, TFeed, FEED_TYPE } from '../types';
import * as API from '../apis';

type FeedState = {
  page: number;
  limit: number;
  order: ORDER;
  filter: number[];
  feedSummaries: FeedSummary[];
  advertisements: Advertisement[];
  categories: Category[];
  lastPage: number;
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
  lastPage: -1,
};

const initialFetch = async () => {
  const { page, limit, order } = initialState;
  const categories = await API.getCategories();
  const filter = categories.map((category: Category) => category.id);
  const [feedsResponse, adsResponse] = await Promise.all([
    await API.getFeedList({ page, limit, ord: order, category: filter }),
    await API.getAdvertisementList({ page, limit: Math.floor(limit / 3) }),
  ]);
  const { data: feeds, last_page: lastPage } = feedsResponse;
  const { data: ads } = adsResponse;
  return { categories, filter, feeds, ads, lastPage };
};

const useFeedList = () => {
  const [feedState, setFeedState] = useState<FeedState>(initialState);

  useEffect(() => {
    const init = async () => {
      const { categories, filter, feeds, ads, lastPage } = await initialFetch();
      setFeedState(state => ({
        ...state,
        categories,
        filter,
        lastPage,
        feedSummaries: feeds,
        advertisements: ads,
      }));
    };
    init();
  }, []);

  const reformatFeeds = () => {
    const feeds: TFeed[] = [];
    const { feedSummaries, advertisements, categories } = feedState;
    let advIdx = 0;
    feedSummaries.forEach((feed, idx) => {
      if (idx > 0 && idx % 3 === 0 && advIdx < advertisements.length) {
        const advertisement = advertisements[advIdx];
        feeds.push({ ...advertisement, feedType: FEED_TYPE.ADVERTISEMENT } as Advertisement);
        advIdx += 1;
      }
      const category = categories.find(c => c.id === feed.category_id);
      feeds.push({ ...feed, category, feedType: FEED_TYPE.SUMMARY } as FeedSummary);
    });
    return feeds;
  };

  const fetchAll = async ({
    page = feedState.page,
    limit = feedState.limit,
    order = feedState.order,
    filter = feedState.filter,
  }) => {
    const [feedsResponse, adsResponse] = await Promise.all([
      await API.getFeedList({ page, limit, ord: order, category: filter }),
      await API.getAdvertisementList({ page, limit: Math.floor(limit / 3) }),
    ]);
    const { data: feeds, last_page: lastPage } = feedsResponse;
    const { data: ads } = adsResponse;
    return { feeds, ads, lastPage };
  };

  const changeFilter = async (filter: number[]) => {
    const { feeds, ads, lastPage } = await fetchAll({
      filter,
      page: 1,
    });
    setFeedState({
      ...feedState,
      lastPage,
      filter,
      page: 1,
      feedSummaries: feeds,
      advertisements: ads,
    });
  };

  const fetchMore = async () => {
    const { page, feedSummaries, advertisements } = feedState;
    const { feeds, ads } = await fetchAll({ page: page + 1 });
    setFeedState({
      ...feedState,
      page: page + 1,
      feedSummaries: [...feedSummaries, ...feeds],
      advertisements: [...advertisements, ...ads],
    });
  };

  const changeOrder = async (order: ORDER) => {
    const { feeds, ads } = await fetchAll({ page: 1, order });
    setFeedState({ ...feedState, order, page: 1, feedSummaries: feeds, advertisements: ads });
  };

  return { feedState, changeFilter, fetchMore, changeOrder, feeds: reformatFeeds() };
};

export { useFeedList };
