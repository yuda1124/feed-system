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
          π
        </button>
      )}
      <span>[5/18] κΉμ μ</span>
    </header>
  );
};

export { Header };
