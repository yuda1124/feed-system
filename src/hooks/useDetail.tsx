import React, { useState, useEffect } from 'react';
import { FeedDetail, FEED_TYPE, Reply } from '../types';
import * as API from '../apis';

const useDetail = (id: number) => {
  const [feedDetail, setFeedDetail] = useState<FeedDetail>();
  useEffect(() => {
    const fetchFeedDetail = async () => {
      const { data: detail } = await API.getFeedDetail({ id });
      setFeedDetail({ ...detail, feedType: FEED_TYPE.DETAIL });
    };
    fetchFeedDetail();
  }, [id]);
  const reformatReplies = () => {
    if (!feedDetail) return [];
    const { reply } = feedDetail;
    return reply.map(feed => ({ ...feed, feedType: FEED_TYPE.REPLY } as Reply));
  };

  return { feedDetail, replies: reformatReplies() };
};

export { useDetail };
