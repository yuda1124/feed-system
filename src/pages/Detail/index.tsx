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
  return <div>{id}</div>;
};

export { Detail };
