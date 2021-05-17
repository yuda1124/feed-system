import React from 'react';
import { useParams } from 'react-router-dom';

type ParamTypes = {
  id: string;
};

const Detail = () => {
  const { id } = useParams<ParamTypes>();
  return <div>{id}</div>;
};

export { Detail };
