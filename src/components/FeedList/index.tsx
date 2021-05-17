import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FeedSummary, Category, Advertisement } from '../../types';
import { Feed, AdvertisementFeed } from '..';
import './style.scss';

type FeedListProps = {
  feedSummaries: FeedSummary[];
  advertisements: Advertisement[];
  categories: Category[];
};

const FeedList = ({ feedSummaries, categories, advertisements }: FeedListProps) => {
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

  return <div className="wrap-feed-list">{renderFeeds()}</div>;
};

export { FeedList };
