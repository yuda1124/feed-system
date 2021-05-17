import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FeedSummary, Category, Advertisement, FEED_TYPE, TFeed } from '../../types';
import { Feed } from '..';
import './style.scss';

type FeedListProps = {
  feeds: TFeed[];
};

const FeedList = ({ feeds }: FeedListProps) => {
  const renderFeeds = () =>
    feeds.map(feed => {
      if (feed.feedType === FEED_TYPE.SUMMARY) {
        return (
          <Link
            className="link_feed"
            to={location => `${location.pathname}${feed.id}`}
            key={`${feed.feedType}_${feed.id}`}>
            <Feed {...{ feed }} />
          </Link>
        );
      }
      return <Feed {...{ feed }} key={`${feed.feedType}_${feed.id}`} />;
    });

  return <div className="wrap-feed-list">{renderFeeds()}</div>;
};

export { FeedList };
