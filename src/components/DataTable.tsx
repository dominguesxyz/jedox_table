import React, { useState } from 'react';
import { collapseExpand } from '../utils/dataService';

interface DataRecord {
  article: string;
  region: string;
  legalEntity: string;
  version: string;
  currency: string;
  measure: string;
  value: number;
}

interface DataTableProps {
  data: DataRecord[];
  tableStyle: { table: string };
  setGlobalLoading: (loading: boolean) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, tableStyle, setGlobalLoading }) => {
  // Group rows by Article then Measure.
  const rowGroups: { [article: string]: { [measure: string]: DataRecord[] } } = {};
  data.forEach((record) => {
    const { article, measure } = record;
    if (!rowGroups[article]) rowGroups[article] = {};
    if (!rowGroups[article][measure]) rowGroups[article][measure] = [];
    rowGroups[article][measure].push(record);
  });

  // Group columns by Region then list unique Currencies.
  const colGroups: { [region: string]: Set<string> } = {};
  data.forEach((record) => {
    const { region, currency } = record;
    if (!colGroups[region]) colGroups[region] = new Set();
    colGroups[region].add(currency);
  });
  const colRegions = Object.keys(colGroups).sort();
  const colGroupsArray = colRegions.map((region) => ({
    region,
    currencies: Array.from(colGroups[region]).sort(),
  }));

  const [rowCollapsed, setRowCollapsed] = useState<{ [article: string]: boolean }>({});
  const [colCollapsed, setColCollapsed] = useState<{ [region: string]: boolean }>({});

  const toggleRowCollapse = (article: string) => {
    const newState = !rowCollapsed[article];
    setGlobalLoading(true);
    collapseExpand({ type: 'row', key: article, isCollapsed: newState }).then(() => {
      setRowCollapsed((prev) => ({ ...prev, [article]: newState }));
      setGlobalLoading(false);
    });
  };

  const toggleColCollapse = (region: string) => {
    const newState = !colCollapsed[region];
    setGlobalLoading(true);
    collapseExpand({ type: 'col', key: region, isCollapsed: newState }).then(() => {
      setColCollapsed((prev) => ({ ...prev, [region]: newState }));
      setGlobalLoading(false);
    });
  };

  const articles = Object.keys(rowGroups).sort();

  return (
    <table className={tableStyle.table}>
      <thead>
        <tr>
          <th rowSpan={2}>Rows</th>
          {colGroupsArray.map((group) => {
            const isCollapsed = colCollapsed[group.region];
            const colspan = isCollapsed ? 1 : group.currencies.length;
            return (
              <th
                key={group.region}
                colSpan={colspan}
                style={{ cursor: 'pointer' }}
                onClick={() => toggleColCollapse(group.region)}
              >
                {isCollapsed ? '▶' : '▼'} {group.region}
              </th>
            );
          })}
        </tr>
        <tr>
          {colGroupsArray.map((group) => {
            const isCollapsed = colCollapsed[group.region];
            if (isCollapsed) {
              return <th key={group.region + '-collapsed'} />;
            }
            return group.currencies.map((currency) => (
              <th key={group.region + '-' + currency}>{currency}</th>
            ));
          })}
        </tr>
      </thead>
      <tbody>
        {articles.map((article) => {
          const measures = Object.keys(rowGroups[article]).sort();
          const isArticleCollapsed = rowCollapsed[article];
          return (
            <React.Fragment key={article}>
              <tr style={{ backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>
                <td
                  colSpan={
                    1 +
                    colGroupsArray.reduce(
                      (sum, group) =>
                        sum + (colCollapsed[group.region] ? 1 : group.currencies.length),
                      0
                    )
                  }
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleRowCollapse(article)}
                >
                  {isArticleCollapsed ? '▶' : '▼'} {article}
                </td>
              </tr>
              {!isArticleCollapsed &&
                measures.map((measure) => (
                  <tr key={article + '-' + measure}>
                    <td style={{ paddingLeft: '20px' }}>{measure}</td>
                    {colGroupsArray.map((group) => {
                      const isGroupCollapsed = colCollapsed[group.region];
                      if (isGroupCollapsed) {
                        const records = rowGroups[article][measure].filter(
                          (r) => r.region === group.region
                        );
                        const displayValue = records.map((r) => r.value).join(', ');
                        return <td key={group.region + '-' + measure}>{displayValue}</td>;
                      }
                      return group.currencies.map((currency) => {
                        const records = rowGroups[article][measure].filter(
                          (r) => r.region === group.region && r.currency === currency
                        );
                        const displayValue = records.map((r) => r.value).join(', ');
                        return (
                          <td key={group.region + '-' + currency + '-' + measure}>
                            {displayValue}
                          </td>
                        );
                      });
                    })}
                  </tr>
                ))}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
