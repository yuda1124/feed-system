import React from 'react';
import { FeedSummary, Category } from '../../types';
import './style.scss';

type FeedProps = {
  feed: FeedSummary;
  categories: Category[];
};

const Feed = ({ feed, categories }: FeedProps) => {
  const { category_id, id, contents, title, created_at, user_id } = feed;
  const category = categories.find(c => c.id === category_id);
  return (
    <div className="wrap_feed">
      <div className="header_feed">
        <span className="category_name">{category?.name}</span>
        <span className="feed_id">{id}</span>
      </div>
      <div className="main_feed">
        <div className="info_feed">
          <span className="user_id">{user_id}</span>
          <span>{created_at}</span>
        </div>
        <div className="content_feed">
          <title>{title}</title>
          <p>{contents}</p>
        </div>
      </div>
    </div>
  );
};

export { Feed };
