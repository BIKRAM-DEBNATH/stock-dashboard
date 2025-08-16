-- Insert sample companies (mix of Indian and global stocks)
INSERT INTO companies (symbol, name, sector, market_cap) VALUES
('RELIANCE', 'Reliance Industries Limited', 'Oil & Gas', 1500000000000),
('TCS', 'Tata Consultancy Services', 'Information Technology', 1200000000000),
('INFY', 'Infosys Limited', 'Information Technology', 800000000000),
('HDFCBANK', 'HDFC Bank Limited', 'Banking', 900000000000),
('ICICIBANK', 'ICICI Bank Limited', 'Banking', 700000000000),
('BHARTIARTL', 'Bharti Airtel Limited', 'Telecommunications', 600000000000),
('ITC', 'ITC Limited', 'FMCG', 500000000000),
('SBIN', 'State Bank of India', 'Banking', 450000000000),
('LT', 'Larsen & Toubro Limited', 'Engineering', 400000000000),
('HCLTECH', 'HCL Technologies Limited', 'Information Technology', 350000000000),
('WIPRO', 'Wipro Limited', 'Information Technology', 300000000000),
('MARUTI', 'Maruti Suzuki India Limited', 'Automobile', 280000000000)
ON CONFLICT (symbol) DO NOTHING;
