import React, { useState } from 'react';
import { useFeedList } from '../../hooks';
import { FeedList, EditFilter, InfinityScroll, Loading } from '../../components';
import { ORDER } from '../../types';
import './style.scss';

const Main = () => {
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const { feedState, changeFilter, fetchMore, changeOrder, feeds, loading } = useFeedList();
  const { categories, order, filter, lastPage, page } = feedState;
  const onChangeOrder = (nextOrder: ORDER) => {
    if (order === nextOrder) return;
    changeOrder(nextOrder);
  };

  return (
    <div className="wrap_main">
      {loading && <Loading />}
      {onEdit && <EditFilter {...{ categories, changeFilter, filter, closePopup: () => setOnEdit(false) }} />}
      <div className="filter_bar">
        <label htmlFor="asc">
          <input
            type="radio"
            id="asc"
            name="sort"
            checked={order === ORDER.ASC}
            onChange={() => onChangeOrder(ORDER.ASC)}
          />
          오름차순
        </label>
        <label htmlFor="desc">
          <input
            type="radio"
            id="desc"
            name="sort"
            checked={order === ORDER.DESC}
            onChange={() => onChangeOrder(ORDER.DESC)}
          />
          내림차순
        </label>
        <button type="button" onClick={() => setOnEdit(true)}>
          필터
        </button>
      </div>
      {feeds.length > 0 && (
        <InfinityScroll {...{ fetchMore, lastPage, page }}>
          <FeedList {...{ feeds }} />
        </InfinityScroll>
      )}
    </div>
  );
};

export { Main };
