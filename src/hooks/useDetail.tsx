import React, { useState, useEffect } from 'react';
import { FeedDetail, FEED_TYPE, Reply } from '../types';
import * as API from '../apis';

const useDetail = (id: number) => {
  const [feedDetail, setFeedDetail] = useState<FeedDetail>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchFeedDetail = async () => {
      setLoading(true);
      const { data: detail } = await API.getFeedDetail({ id });
      setLoading(false);
      setFeedDetail({ ...detail, feedType: FEED_TYPE.DETAIL });
    };
    fetchFeedDetail();
  }, [id]);
  const reformatReplies = () => {
    if (!feedDetail) return [];
    const { reply } = feedDetail;
    return reply.map(feed => ({ ...feed, feedType: FEED_TYPE.REPLY } as Reply));
  };

  return { feedDetail, loading, replies: reformatReplies() };
};

export { useDetail };
