import React, { useRef, useEffect } from 'react';
import { FeedSummary, Category } from '../../types';
import { Feed } from '..';
import './style.scss';

type FeedListProps = {
  feedSummaries: FeedSummary[];
  categories: Category[];
  fetchMore: () => Promise<void>;
  lastPage: number;
  page: number;
};

const FeedList = ({ feedSummaries, categories, fetchMore, lastPage, page }: FeedListProps) => {
  const renderFeeds = () => feedSummaries.map(feed => <Feed {...{ feed, categories }} key={feed.id} />);
  const target = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onIntersect = async ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        if (page < lastPage) {
          await fetchMore();
          observer.observe(entry.target);
        }
      }
    };
    if (!target.current || feedSummaries.length === 0) return undefined;
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    observer.observe(target.current);
    return () => observer.disconnect();
  }, [feedSummaries, fetchMore, page, lastPage]);
  useEffect(() => {
    if (page === 1 && wrapper.current) {
      wrapper.current.scrollTo(0, 0);
    }
  }, [page]);
  return (
    <div className="wrap-feed-list" ref={wrapper}>
      <div className="contents">{renderFeeds()}</div>
      <div ref={target} className="loading" />
    </div>
  );
};

export { FeedList };
