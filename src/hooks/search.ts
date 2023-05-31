export default function searchData(
  items: any,
  searchInput: any,
  field1: string,
  field2: string,
  field3: string
) {
  const data = items.value.filter((item: any) => {
    if (
      item[field1]?.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      item[field2]?.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      item[field3]?.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      return item;
    }
  });
  return { data };
}
