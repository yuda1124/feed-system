import React from 'react';
import { useDeviceDetect } from '../../hooks';
import { useHistory, useRouteMatch } from 'react-router-dom';
import './style.scss';

const Header = () => {
  const { isMobile } = useDeviceDetect();
  const history = useHistory();
  const isDetailPage = useRouteMatch('/:id') !== null;

  return (
    <header>
      {isMobile && isDetailPage && (
        <button type="button" onClick={() => history.goBack()}>
          🔙
        </button>
      )}
      <span>[5/18] 김유영</span>
    </header>
  );
};

export { Header };
