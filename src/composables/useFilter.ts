import { computed } from "vue";

export function useFilter<T>(
  data: T[],
  filterKey: keyof T & (string | number),
  filterText: string
) {
  const filteredData = computed(() => {
    return data.filter((item) => {
      const value = item[filterKey];
      return (
        value !== undefined &&
        value!.toString().toLowerCase().includes(filterText.toLowerCase())
      );
    });
  });

  return { filteredData };
}
