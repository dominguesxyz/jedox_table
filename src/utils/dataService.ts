import mockData from '../data/mockData';

interface DataRecord {
  article: string;
  region: string;
  legalEntity: string;
  version: string;
  currency: string;
  measure: string;
  value: number;
}

interface Table {
  rows: Array<{ name: string; hierarchyLevel: number }>;
  columns: Array<{ name: string; hierarchyLevel: number }>;
  data: DataRecord[];
}

interface Filters {
  [key: string]: { name: string; hierarchyLevel: number }[];
}

export interface TableData {
  table: Table;
  filters: Filters;
}

export const retrieveData = (): Promise<TableData> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500);
  });

export const filterChanged = (selectedFilters: { [key: string]: string }): Promise<TableData> =>
  new Promise((resolve) => {
    const dimensionMap: { [key: string]: keyof DataRecord } = {
      Article: 'article',
      Region: 'region',
      LegalEntity: 'legalEntity',
      Version: 'version',
      Currency: 'currency',
      Measure: 'measure',
    };
    setTimeout(() => {
      const filteredTableData = mockData.table.data.filter((entry: DataRecord) => {
        for (const dimension in selectedFilters) {
          const filterValue = selectedFilters[dimension];
          if (filterValue && !filterValue.toLowerCase().startsWith('all')) {
            const key = dimensionMap[dimension];
            if (!key || entry[key] !== filterValue) {
              return false;
            }
          }
        }
        return true;
      });
      const filteredData: TableData = {
        table: {
          ...mockData.table,
          data: filteredTableData,
        },
        filters: mockData.filters,
      };
      resolve(filteredData);
    }, 500);
  });

  export const collapseExpand = (_action: {
    type: 'row' | 'col';
    key: string;
    isCollapsed: boolean;
  }): Promise<TableData> =>
    new Promise((resolve) => {
      void _action; // Mark _action as used to satisfy ESLint.
      setTimeout(() => {
        // Simulation: collapse/expand does not alter the data.
        resolve(mockData);
      }, 500);
    });
  
