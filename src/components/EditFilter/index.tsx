import React, { useEffect, useState } from 'react';
import { Category } from '../../types';
import './style.scss';

type EditFilterProps = {
  categories: Category[];
  filter: number[];
  changeFilter: (filter: number[]) => Promise<void>;
  closePopup: () => void;
};

const EditFilter = ({ categories, filter, changeFilter, closePopup }: EditFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState(filter);
  useEffect(() => {
    setSelectedCategory(filter);
  }, [filter]);
  const toggleCategory = (categoryId: number) => {
    if (selectedCategory.some(id => id === categoryId)) {
      setSelectedCategory(selectedCategory.filter(id => id !== categoryId));
    } else {
      setSelectedCategory([...selectedCategory, categoryId]);
    }
  };
  const onSubmit = () => {
    changeFilter(selectedCategory);
    closePopup();
  };
  const renderCategories = () =>
    categories.map(category => {
      const { name, id } = category;
      return (
        <li key={id}>
          <label htmlFor={`category_${id}`}>
            <input
              type="checkbox"
              id={`category_${id}`}
              checked={selectedCategory.some(categoryId => id === categoryId)}
              onChange={() => toggleCategory(id)}
            />
            {name}
          </label>
        </li>
      );
    });
  return (
    <>
      <div className="wrap_edit_filter">
        <h4>필터</h4>
        <ul>{renderCategories()}</ul>
        <div>
          <button type="button" onClick={() => onSubmit()}>
            저장하기
          </button>
        </div>
      </div>
      <div className="dimmed" onClick={() => closePopup()} />
    </>
  );
};

export { EditFilter };
