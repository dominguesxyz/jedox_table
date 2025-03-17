const mockData = {
  table: {
    rows: [
      { name: 'Article', hierarchyLevel: 0 },
      { name: 'Measure', hierarchyLevel: 1 }
    ],
    columns: [
      { name: 'Region', hierarchyLevel: 0 },
      { name: 'Currency', hierarchyLevel: 1 }
    ],
    data: [
      { article: 'Bikes', region: 'Europe', legalEntity: '11', version: 'Actual', currency: 'LC',  measure: 'Units',         value: 1200 },
      { article: 'Bikes', region: 'Europe', legalEntity: '11', version: 'Actual', currency: 'USD', measure: 'Units',         value: 1300 },
      { article: 'Bikes', region: 'Europe', legalEntity: '11', version: 'Budget', currency: 'LC',  measure: 'Units',         value: 900  },
      { article: 'Bikes', region: 'Great Britain', legalEntity: '12', version: 'Actual', currency: 'EUR', measure: 'Unit Price',    value: 250  },
      { article: 'Bikes', region: 'Great Britain', legalEntity: '12', version: 'Budget', currency: 'EUR', measure: 'Unit Price',    value: 260  },
      { article: 'Motorbikes', region: 'Germany', legalEntity: '13', version: 'Actual', currency: 'USD', measure: 'Gross Revenue', value: 15000 },
      { article: 'Motorbikes', region: 'Germany', legalEntity: '13', version: 'Budget', currency: 'USD', measure: 'Gross Revenue', value: 14000 },
      { article: 'Motorbikes', region: 'Europe', legalEntity: '11', version: 'Actual', currency: 'EUR', measure: 'Unit Price',    value: 350  },
      { article: 'Motorbikes', region: 'Europe', legalEntity: '12', version: 'Budget', currency: 'LC',  measure: 'Units',         value: 800  },
      { article: 'Scooters', region: 'Great Britain', legalEntity: '11', version: 'Actual', currency: 'LC',  measure: 'Gross Revenue', value: 7000 },
      { article: 'Scooters', region: 'Great Britain', legalEntity: '12', version: 'Budget', currency: 'USD', measure: 'Units',         value: 650  },
      { article: 'Scooters', region: 'Germany', legalEntity: '13', version: 'Actual', currency: 'EUR', measure: 'Unit Price',    value: 120  },
      { article: 'Bikes', region: 'Germany', legalEntity: '11', version: 'Actual', currency: 'USD', measure: 'Gross Revenue', value: 5000 },
      { article: 'Motorbikes', region: 'Great Britain', legalEntity: '12', version: 'Budget', currency: 'LC',  measure: 'Units',         value: 1100 },
      { article: 'Motorbikes', region: 'Great Britain', legalEntity: '13', version: 'Actual', currency: 'USD', measure: 'Unit Price',    value: 400  },
      { article: 'Scooters', region: 'Europe', legalEntity: '12', version: 'Actual', currency: 'EUR', measure: 'Gross Revenue', value: 9300 },
      { article: 'Bikes', region: 'Great Britain', legalEntity: '11', version: 'Budget', currency: 'USD', measure: 'Units',         value: 770  },
      { article: 'Motorbikes', region: 'Europe', legalEntity: '13', version: 'Budget', currency: 'LC',  measure: 'Gross Revenue', value: 8200 },
      { article: 'Scooters', region: 'Germany', legalEntity: '12', version: 'Actual', currency: 'USD', measure: 'Units',         value: 540  },
      { article: 'Bikes', region: 'Europe', legalEntity: '13', version: 'Actual', currency: 'EUR', measure: 'Unit Price',    value: 210  }
    ]
  },
  filters: {
    Article: [
      { name: 'All Articles', hierarchyLevel: 0 },
      { name: 'Bikes', hierarchyLevel: 0 },
      { name: 'Motorbikes', hierarchyLevel: 0 },
      { name: 'Scooters', hierarchyLevel: 0 }
    ],
    Region: [
      { name: 'Europe', hierarchyLevel: 0 },
      { name: 'Great Britain', hierarchyLevel: 0 },
      { name: 'Germany', hierarchyLevel: 0 }
    ],
    LegalEntity: [
      { name: 'All Entities', hierarchyLevel: 0 },
      { name: '11', hierarchyLevel: 0 },
      { name: '12', hierarchyLevel: 0 },
      { name: '13', hierarchyLevel: 0 }
    ],
    Version: [
      { name: 'Actual', hierarchyLevel: 0 },
      { name: 'Budget', hierarchyLevel: 0 }
    ],
    Currency: [
      { name: 'LC', hierarchyLevel: 0 },
      { name: 'USD', hierarchyLevel: 0 },
      { name: 'EUR', hierarchyLevel: 0 }
    ],
    Measure: [
      { name: 'Units', hierarchyLevel: 0 },
      { name: 'Unit Price', hierarchyLevel: 0 },
      { name: 'Gross Revenue', hierarchyLevel: 0 }
    ]
  }
};

export default mockData;
