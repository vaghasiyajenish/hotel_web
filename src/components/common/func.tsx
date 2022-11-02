type sortArrayType = {
  image: string;
  title: string;
  address: string;
  slaapkamers: number;
  badkamers: number;
  price: number;
  type: number;
  createdAt: Date;
};
export const sortArray = (data: sortArrayType[], order: string,orderBy:string) => {
  const SorededData = data.sort(function (a, b) {
    const items =
      order === "descending" ? b.price - a.price : a.price - b.price;
    return items;
  });
  return SorededData;
};
