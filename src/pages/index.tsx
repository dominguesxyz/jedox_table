import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import FilterDropdown from '../components/FilterDropdown';
import { retrieveData, filterChanged, TableData } from '../utils/dataService';
import zebraStyles from '../styles/zebra.module.css';
import plainStyles from '../styles/plain.module.css';
import loaderStyles from '../styles/loader.module.css';

const IndexPage: React.FC = () => {
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({});
  const [currentStyle, setCurrentStyle] = useState<'zebra' | 'plain'>('zebra');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    retrieveData().then((data) => {
      setTableData(data);
      setLoading(false);
    });
  }, []);

  const handleFilterChange = (dimension: string, value: string) => {
    const newFilters = { ...selectedFilters, [dimension]: value };
    setSelectedFilters(newFilters);
    setLoading(true);
    filterChanged(newFilters).then((data) => {
      setTableData(data);
      setLoading(false);
    });
  };

  const toggleStyle = () => {
    setCurrentStyle(currentStyle === 'zebra' ? 'plain' : 'zebra');
  };

  if (!tableData) {
    return <div>Loading...</div>;
  }

  const { filters, table } = tableData;
  const { data } = table;
  const appliedFilters = Object.entries(selectedFilters)
    .filter(([, value]) => value !== '')
    .map(([dimension, value]) => `${dimension}: ${value}`)
    .join(' | ');

  return (
    <div style={{ padding: '20px' }}>
      <h1>Simplified Data Table</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Object.keys(filters).map((dimension) => (
          <FilterDropdown
            key={dimension}
            dimension={dimension}
            options={filters[dimension]}
            selected={selectedFilters[dimension] || ''}
            onChange={(value) => handleFilterChange(dimension, value)}
          />
        ))}
      </div>
      {appliedFilters && (
        <div style={{ margin: '10px 0', fontStyle: 'italic' }}>
          Applied Filters: {appliedFilters}
        </div>
      )}
      <button onClick={toggleStyle} style={{ margin: '20px 0' }}>
        Switch Style (Current: {currentStyle})
      </button>
      <div style={{ position: 'relative', overflowX: 'auto', maxWidth: '100%' }}>
        <DataTable
          data={data}
          tableStyle={
            (currentStyle === 'zebra' ? zebraStyles : plainStyles) as { table: string } & Record<string, string>
          }
          setGlobalLoading={setLoading}
        />
        {loading && (
          <div className={loaderStyles.overlay}>
            <div className={loaderStyles.spinner}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
