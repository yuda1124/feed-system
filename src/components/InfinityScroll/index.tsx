import React, { useRef, useEffect, ReactNode, useState } from 'react';
import './style.scss';

type InfinityScrollProps = {
  children: ReactNode;
  fetchMore: () => Promise<void>;
  lastPage: number;
  page: number;
};

const InfinityScroll = ({ children, fetchMore, lastPage, page }: InfinityScrollProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const target = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onIntersect = async ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        if (page < lastPage) {
          observer.unobserve(entry.target);
          setLoading(true);
          await fetchMore();
          setLoading(false);
        }
      }
    };
    if (!target.current) return undefined;
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    observer.observe(target.current);
    return () => observer.disconnect();
  }, [fetchMore, page, lastPage]);
  useEffect(() => {
    if (page === 1 && wrapper.current) {
      wrapper.current.scrollTo(0, 0);
    }
  }, [page]);
  return (
    <div className="wrap-infinity-scroll" ref={wrapper}>
      <div className="contents">
        {children}
        <div ref={target} className="dummy" />
        {loading && <p className="loading">···</p>}
      </div>
    </div>
  );
};

export { InfinityScroll };
