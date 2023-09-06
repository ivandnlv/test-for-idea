// Правильное окончание для слова 'Пересадка'
const transferFormat = (count: number): string => {
  if (count === 1) {
    return 'Пересадка';
  } else if (count <= 4) {
    return 'Пересадки';
  } else {
    return 'Пересадок';
  }
};

export { transferFormat };
