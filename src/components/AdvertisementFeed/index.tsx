import React, { memo } from 'react';
import { Advertisement } from '../../types';
import './style.scss';

type AdvertisementFeedProps = {
  advertisement: Advertisement;
};
const areEqual = (prevProps: AdvertisementFeedProps, nextProps: AdvertisementFeedProps) =>
  prevProps.advertisement.id === nextProps.advertisement.id;

const AdvertisementFeed = memo(({ advertisement }: AdvertisementFeedProps) => {
  const { contents, title, img } = advertisement;
  return (
    <div className="wrap_advertisement">
      <div className="header_feed">
        <span>sponser</span>
      </div>
      <div className="main_feed">
        <img src={`${process.env.REACT_APP_IMAGE_PATH as string}${img}`} alt={title} className="img_adv" />
        <div className="content_feed">
          <title>{title}</title>
          <p>{contents}</p>
        </div>
      </div>
    </div>
  );
}, areEqual);

export { AdvertisementFeed };
