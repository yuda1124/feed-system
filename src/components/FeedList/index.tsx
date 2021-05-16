import React from 'react';
import { FeedSummary, Category } from '../../types';
import { Feed } from '..';
import './style.scss';

type FeedListProps = {
  feedSummaries: FeedSummary[];
  categories: Category[];
};

const FeedList = ({ feedSummaries, categories }: FeedListProps) => {
  const renderFeeds = () => feedSummaries.map(feed => <Feed {...{ feed, categories }} key={feed.id} />);
  return (
    <div className="wrap-feed-list">
      <div className="contents">{renderFeeds()}</div>
    </div>
  );
};

export { FeedList };
