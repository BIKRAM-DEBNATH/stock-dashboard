-- Generate sample stock price data for the last 30 days
WITH date_series AS (
    SELECT generate_series(
        CURRENT_DATE - INTERVAL '30 days',
        CURRENT_DATE - INTERVAL '1 day',
        INTERVAL '1 day'
    )::date AS price_date
),
company_data AS (
    SELECT id, symbol FROM companies
),
base_prices AS (
    SELECT 
        c.id,
        c.symbol,
        CASE c.symbol
            WHEN 'RELIANCE' THEN 2500.00
            WHEN 'TCS' THEN 3800.00
            WHEN 'INFY' THEN 1650.00
            WHEN 'HDFCBANK' THEN 1580.00
            WHEN 'ICICIBANK' THEN 950.00
            WHEN 'BHARTIARTL' THEN 850.00
            WHEN 'ITC' THEN 420.00
            WHEN 'SBIN' THEN 580.00
            WHEN 'LT' THEN 3200.00
            WHEN 'HCLTECH' THEN 1450.00
            WHEN 'WIPRO' THEN 480.00
            WHEN 'MARUTI' THEN 11500.00
        END AS base_price
    FROM company_data c
)
INSERT INTO stock_prices (company_id, date, open_price, high_price, low_price, close_price, volume)
SELECT 
    bp.id,
    ds.price_date,
    -- Generate realistic price movements
    ROUND((bp.base_price * (1 + (RANDOM() - 0.5) * 0.1))::numeric, 2) AS open_price,
    ROUND((bp.base_price * (1 + (RANDOM() - 0.3) * 0.15))::numeric, 2) AS high_price,
    ROUND((bp.base_price * (1 + (RANDOM() - 0.7) * 0.15))::numeric, 2) AS low_price,
    ROUND((bp.base_price * (1 + (RANDOM() - 0.5) * 0.1))::numeric, 2) AS close_price,
    FLOOR(RANDOM() * 1000000 + 100000) AS volume
FROM date_series ds
CROSS JOIN base_prices bp
ON CONFLICT (company_id, date) DO NOTHING;
