import React, { useRef, useEffect, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { FeedSummary, Category, Advertisement } from '../../types';
import { Feed, AdvertisementFeed } from '..';
import './style.scss';

type FeedListProps = {
  feedSummaries: FeedSummary[];
  advertisements: Advertisement[];
  categories: Category[];
  fetchMore: () => Promise<void>;
  lastPage: number;
  page: number;
};

const FeedList = ({ feedSummaries, categories, fetchMore, lastPage, page, advertisements }: FeedListProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const renderFeeds = () => {
    const feeds: ReactNode[] = [];
    let advIdx = 0;
    feedSummaries.forEach((feed, idx) => {
      if (idx > 0 && idx % 3 === 0 && advIdx < advertisements.length) {
        const advertisement = advertisements[advIdx];
        const { id } = advertisement;
        feeds.push(<AdvertisementFeed advertisement={advertisement} key={`adv_${id}`} />);
        advIdx += 1;
      }
      feeds.push(
        <Link className="link_feed" to={location => `${location.pathname}${feed.id}`} key={`feed_${feed.id}`}>
          <Feed {...{ feed, categories }} />
        </Link>,
      );
    });
    return feeds;
  };
  const target = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onIntersect = async ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        if (page < lastPage) {
          observer.unobserve(entry.target);
          setLoading(true);
          await fetchMore();
          setLoading(false);
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
      <div className="contents">
        {renderFeeds()}
        <div ref={target} className="dummy" />
        {loading && <p className="loading">···</p>}
      </div>
    </div>
  );
};

export { FeedList };
