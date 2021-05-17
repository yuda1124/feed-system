import React, { memo } from 'react';
import { FEED_TYPE, TFeed } from '../../types';
import { formatDate } from '../../utils';
import './style.scss';

type FeedProps = {
  feed: TFeed;
};
const areEqual = (prevProps: FeedProps, nextProps: FeedProps) =>
  prevProps.feed.id === nextProps.feed.id && prevProps.feed.feedType === nextProps.feed.feedType;
const Feed = memo(({ feed }: FeedProps) => {
  const { id, contents, feedType, created_at, category } = feed;
  const userInfo =
    feed.feedType === FEED_TYPE.ADVERTISEMENT
      ? 'sponsered'
      : feed.feedType === FEED_TYPE.SUMMARY
      ? feed.user_id
      : feed.user.name;
  return (
    <div className={`wrap_feed ${feedType}`}>
      {feedType === FEED_TYPE.SUMMARY && (
        <div className="header_feed">
          <span className="category_name">{category?.name}</span>
          <span className="feed_id">{id}</span>
        </div>
      )}
      <div className="main_feed">
        {feedType !== FEED_TYPE.REPLY && (
          <div className="info_feed">
            <span className="user_info">{userInfo}</span>
            {feedType === FEED_TYPE.SUMMARY && <span className="created_at">{formatDate(created_at)}</span>}
          </div>
        )}
        <div className="wrap_contents">
          {feed.feedType === FEED_TYPE.ADVERTISEMENT && (
            <img
              src={`${process.env.REACT_APP_IMAGE_PATH as string}${feed.img}`}
              alt={feed.title}
              className="img_adv"
            />
          )}
          <div className="content_feed">
            <title>{feed.feedType === FEED_TYPE.REPLY ? feed.user.name : feed.title}</title>
            <p>{contents}</p>
          </div>
        </div>
        {(feedType === FEED_TYPE.DETAIL || feedType === FEED_TYPE.REPLY) && (
          <p className="created_at">{formatDate(created_at)}</p>
        )}
      </div>
    </div>
  );
}, areEqual);

export { Feed };
