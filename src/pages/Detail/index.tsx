import React from 'react';
import { useParams } from 'react-router-dom';
import { useDetail } from '../../hooks';
import { Feed, FeedList } from '../../components';
import './style.scss';
import { FEED_TYPE } from '../../types';

type ParamTypes = {
  id: string;
};

const Detail = () => {
  const { id } = useParams<ParamTypes>();
  const { feedDetail, replies } = useDetail(parseInt(id, 10));
  return (
    <div className="wrap_detail">
      <div className="contents">{feedDetail && <Feed {...{ feed: feedDetail, feedType: FEED_TYPE.DETAIL }} />}</div>
      <div className="count">
        답변 <span>{replies.length}</span>
      </div>
      <FeedList feeds={replies} />
    </div>
  );
};

export { Detail };
