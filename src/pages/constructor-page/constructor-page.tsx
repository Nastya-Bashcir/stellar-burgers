import { BurgerIngredients, BurgerConstructor } from '@components';
import { Preloader } from '@ui';
import { useSelector } from 'react-redux';
import type { RootState } from '../../services/store';

import styles from './constructor-page.module.css';

export const ConstructorPage = (): React.JSX.Element => {
  const { isLoading, error } = useSelector((state: RootState) => state.ingredients);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <p className="text text_type_main-medium">
        Не удалось загрузить ингредиенты
      </p>
    );
  }

  return (
    <main className={styles.containerMain}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
