-- ============================================
-- AJTAK.IT - Supabase Database Schema
-- Pro admin panel a Flutter aplikaci
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ZAKAZNICI (Customers)
-- ============================================
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Zakladni udaje
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    
    -- Fakturacni udaje
    ico VARCHAR(20),
    dic VARCHAR(20),
    address_street VARCHAR(255),
    address_city VARCHAR(100),
    address_zip VARCHAR(20),
    address_country VARCHAR(100) DEFAULT 'Ceska republika',
    
    -- Metadata
    notes TEXT,
    tags TEXT[], -- ['firemni', 'pravidelny', 'vip']
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pro rychle vyhledavani
CREATE INDEX idx_customers_name ON customers(name);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_ico ON customers(ico);

-- ============================================
-- ZARIZENI (Devices)
-- ============================================
CREATE TABLE devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    
    -- Zakladni info
    device_type VARCHAR(50) NOT NULL, -- 'pc', 'notebook', 'server', 'tiskarna', 'sit', 'jine'
    brand VARCHAR(100),
    model VARCHAR(100),
    serial_number VARCHAR(100),
    
    -- Detaily
    specs TEXT, -- JSON s konfiguraci
    purchase_date DATE,
    warranty_until DATE,
    
    -- Metadata
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_devices_customer ON devices(customer_id);
CREATE INDEX idx_devices_serial ON devices(serial_number);

-- ============================================
-- SERVISNI ZAKAZKY (Service Orders)
-- ============================================
CREATE TABLE service_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    device_id UUID REFERENCES devices(id) ON DELETE SET NULL,
    
    -- Identifikace
    order_number VARCHAR(50) UNIQUE NOT NULL, -- SL-2024-001
    
    -- Stav
    status VARCHAR(30) DEFAULT 'prijato', -- prijato, diagnostika, oprava, ceka_na_dily, hotovo, predano
    priority VARCHAR(20) DEFAULT 'normal', -- low, normal, high, urgent
    
    -- Popis
    reported_issue TEXT NOT NULL,
    diagnosis TEXT,
    work_done TEXT,
    
    -- Casy
    received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    estimated_completion DATE,
    completed_at TIMESTAMP WITH TIME ZONE,
    handed_over_at TIMESTAMP WITH TIME ZONE,
    
    -- Finance
    estimated_price DECIMAL(10,2),
    final_price DECIMAL(10,2),
    is_paid BOOLEAN DEFAULT FALSE,
    
    -- Podpisy (base64 encoded)
    customer_signature_receive TEXT,
    customer_signature_handover TEXT,
    technician_signature TEXT,
    
    -- Fotodokumentace
    photos TEXT[], -- URLs z Supabase Storage
    
    -- Metadata
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_service_orders_customer ON service_orders(customer_id);
CREATE INDEX idx_service_orders_status ON service_orders(status);
CREATE INDEX idx_service_orders_number ON service_orders(order_number);

-- ============================================
-- FAKTURY (Invoices)
-- ============================================
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    service_order_id UUID REFERENCES service_orders(id) ON DELETE SET NULL,
    
    -- Identifikace
    invoice_number VARCHAR(50) UNIQUE NOT NULL, -- FV-2024-001
    variable_symbol VARCHAR(20),
    
    -- Typ
    invoice_type VARCHAR(20) DEFAULT 'faktura', -- faktura, proforma, dobropis
    
    -- Castky
    subtotal DECIMAL(10,2) NOT NULL,
    vat_rate DECIMAL(5,2) DEFAULT 21.00,
    vat_amount DECIMAL(10,2),
    total DECIMAL(10,2) NOT NULL,
    
    -- Platba
    payment_method VARCHAR(30) DEFAULT 'prevod', -- prevod, hotovost, karta
    due_date DATE,
    paid_at TIMESTAMP WITH TIME ZONE,
    is_paid BOOLEAN DEFAULT FALSE,
    
    -- QR platba
    qr_payment_data TEXT,
    
    -- Datumy
    issue_date DATE DEFAULT CURRENT_DATE,
    taxable_date DATE DEFAULT CURRENT_DATE,
    
    -- Metadata
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_invoices_customer ON invoices(customer_id);
CREATE INDEX idx_invoices_number ON invoices(invoice_number);
CREATE INDEX idx_invoices_is_paid ON invoices(is_paid);

-- ============================================
-- POLOZKY FAKTURY (Invoice Items)
-- ============================================
CREATE TABLE invoice_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
    
    -- Polozka
    description VARCHAR(500) NOT NULL,
    quantity DECIMAL(10,2) DEFAULT 1,
    unit VARCHAR(20) DEFAULT 'ks', -- ks, hod, km, mes
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    
    -- Poradi
    sort_order INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_invoice_items_invoice ON invoice_items(invoice_id);

-- ============================================
-- CENOVE NABIDKY (Quotes)
-- ============================================
CREATE TABLE quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    
    -- Identifikace
    quote_number VARCHAR(50) UNIQUE NOT NULL, -- CN-2024-001
    
    -- Stav
    status VARCHAR(20) DEFAULT 'nova', -- nova, odeslana, schvalena, zamitnuta, expirovana
    
    -- Platnost
    valid_until DATE,
    
    -- Castky
    subtotal DECIMAL(10,2),
    vat_amount DECIMAL(10,2),
    total DECIMAL(10,2),
    
    -- Metadata
    title VARCHAR(255),
    description TEXT,
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_quotes_customer ON quotes(customer_id);
CREATE INDEX idx_quotes_status ON quotes(status);

-- ============================================
-- POLOZKY NABIDKY (Quote Items)
-- ============================================
CREATE TABLE quote_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE,
    
    -- Polozka
    description VARCHAR(500) NOT NULL,
    quantity DECIMAL(10,2) DEFAULT 1,
    unit VARCHAR(20) DEFAULT 'ks',
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    
    -- Kategorie/balicek
    category VARCHAR(100),
    
    -- Poradi
    sort_order INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_quote_items_quote ON quote_items(quote_id);

-- ============================================
-- CENIK (Price List)
-- ============================================
CREATE TABLE price_list (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Kategorie
    category VARCHAR(100) NOT NULL, -- prace, opravy, site, kamery, doprava, pausaly
    
    -- Polozka
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Cena
    price DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20) DEFAULT 'ks', -- ks, hod, km, mes
    
    -- Aktivni
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Poradi
    sort_order INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_price_list_category ON price_list(category);
CREATE INDEX idx_price_list_active ON price_list(is_active);

-- ============================================
-- KALKULACE (Saved Calculations)
-- ============================================
CREATE TABLE calculations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    
    -- Nazev
    name VARCHAR(255),
    
    -- Data (JSON s polozkami)
    items JSONB NOT NULL,
    
    -- Celkova cena
    subtotal DECIMAL(10,2),
    vat_amount DECIMAL(10,2),
    total DECIMAL(10,2),
    
    -- Export info
    exported_to VARCHAR(50), -- 'invoice', 'quote', 'service_order'
    exported_id UUID,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_calculations_customer ON calculations(customer_id);

-- ============================================
-- PREDAVACI PROTOKOLY (Handover Protocols)
-- ============================================
CREATE TABLE handover_protocols (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_order_id UUID REFERENCES service_orders(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    
    -- Identifikace
    protocol_number VARCHAR(50) UNIQUE NOT NULL, -- PP-2024-001
    
    -- Stav zarizeni
    device_condition TEXT,
    accessories TEXT[], -- prislusenstvi
    
    -- Zaruka
    warranty_period INTEGER, -- mesice
    warranty_conditions TEXT,
    
    -- Podpisy
    customer_signature TEXT,
    technician_signature TEXT,
    
    -- Checklist (JSON)
    checklist JSONB,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    handover_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_handover_protocols_order ON handover_protocols(service_order_id);

-- ============================================
-- AKTIVITA / LOG
-- ============================================
CREATE TABLE activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Kdo
    user_id UUID,
    user_name VARCHAR(100),
    
    -- Co
    action VARCHAR(50) NOT NULL, -- created, updated, deleted, viewed, exported, sent
    entity_type VARCHAR(50) NOT NULL, -- customer, invoice, service_order, etc.
    entity_id UUID,
    
    -- Detaily
    details JSONB,
    
    -- Kdy
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_activity_log_entity ON activity_log(entity_type, entity_id);
CREATE INDEX idx_activity_log_date ON activity_log(created_at);

-- ============================================
-- NASTAVENI (Settings)
-- ============================================
CREATE TABLE settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vychozi nastaveni
INSERT INTO settings (key, value, description) VALUES
('company_info', '{
    "name": "Julius Joska - ajtak.it",
    "ico": "",
    "dic": "",
    "address": "",
    "email": "info@ajtak.it",
    "phone": "",
    "bank_account": "",
    "iban": ""
}', 'Firemni udaje pro faktury'),
('invoice_numbering', '{
    "prefix": "FV",
    "year_format": "YYYY",
    "separator": "-",
    "padding": 3,
    "last_number": 0
}', 'Format cislovani faktur'),
('quote_numbering', '{
    "prefix": "CN",
    "year_format": "YYYY",
    "separator": "-",
    "padding": 3,
    "last_number": 0
}', 'Format cislovani nabidek'),
('service_order_numbering', '{
    "prefix": "SL",
    "year_format": "YYYY",
    "separator": "-",
    "padding": 3,
    "last_number": 0
}', 'Format cislovani servisnich listu'),
('vat_rate', '{"default": 21}', 'Vychozi sazba DPH');

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Zapnout RLS na vsech tabulkach
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE handover_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Policy pro autentifikovane uzivatele (plny pristup)
CREATE POLICY "Authenticated users have full access" ON customers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users have full access" ON devices FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users have full access" ON service_orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users have full access" ON invoices FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users have full access" ON invoice_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users have full access" ON quotes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users have full access" ON quote_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users have full access" ON price_list FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users have full access" ON calculations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users have full access" ON handover_protocols FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users have full access" ON activity_log FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users have full access" ON settings FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- FUNKCE PRO AUTOMATICKE CISLOVANI
-- ============================================
CREATE OR REPLACE FUNCTION generate_document_number(doc_type VARCHAR)
RETURNS VARCHAR AS $$
DECLARE
    settings_key VARCHAR;
    settings_value JSONB;
    prefix VARCHAR;
    year_format VARCHAR;
    separator VARCHAR;
    padding INTEGER;
    last_num INTEGER;
    new_num INTEGER;
    current_year VARCHAR;
    result VARCHAR;
BEGIN
    -- Najit nastaveni
    CASE doc_type
        WHEN 'invoice' THEN settings_key := 'invoice_numbering';
        WHEN 'quote' THEN settings_key := 'quote_numbering';
        WHEN 'service_order' THEN settings_key := 'service_order_numbering';
        ELSE RAISE EXCEPTION 'Unknown document type: %', doc_type;
    END CASE;
    
    -- Nacist nastaveni
    SELECT value INTO settings_value FROM settings WHERE key = settings_key;
    
    prefix := settings_value->>'prefix';
    separator := settings_value->>'separator';
    padding := (settings_value->>'padding')::INTEGER;
    last_num := (settings_value->>'last_number')::INTEGER;
    
    -- Aktualni rok
    current_year := TO_CHAR(NOW(), 'YYYY');
    
    -- Nove cislo
    new_num := last_num + 1;
    
    -- Sestavit vysledek
    result := prefix || separator || current_year || separator || LPAD(new_num::VARCHAR, padding, '0');
    
    -- Aktualizovat posledni cislo
    UPDATE settings 
    SET value = jsonb_set(value, '{last_number}', to_jsonb(new_num)),
        updated_at = NOW()
    WHERE key = settings_key;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGER PRO updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplikovat trigger na vsechny tabulky
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_devices_updated_at BEFORE UPDATE ON devices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_orders_updated_at BEFORE UPDATE ON service_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_price_list_updated_at BEFORE UPDATE ON price_list FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_calculations_updated_at BEFORE UPDATE ON calculations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VYCHOZI DATA PRO CENIK
-- ============================================
INSERT INTO price_list (category, name, price, unit, sort_order) VALUES
-- Prace
('prace', 'Diagnostika', 600, 'hod', 1),
('prace', 'Bezna prace', 850, 'hod', 2),
('prace', 'Pokrocila prace (site, servery)', 1100, 'hod', 3),
('prace', 'Konzultace', 1000, 'hod', 4),
('prace', 'Urgentni zasah 24/7', 1800, 'hod', 5),

-- Opravy
('opravy', 'Cisteni PC/notebooku', 800, 'ks', 1),
('opravy', 'Vymena termopasty', 500, 'ks', 2),
('opravy', 'Instalace OS Windows', 990, 'ks', 3),
('opravy', 'Zachrana dat (zakladni)', 1500, 'ks', 4),
('opravy', 'Odstraneni viru/malware', 990, 'ks', 5),

-- Site
('site', 'Konfigurace routeru', 500, 'ks', 1),
('site', 'Instalace WiFi AP', 800, 'ks', 2),
('site', 'Instalace mesh systemu', 1500, 'ks', 3),
('site', 'Konfigurace VPN', 990, 'ks', 4),

-- Kamery
('kamery', 'Instalace IP kamery', 800, 'ks', 1),
('kamery', 'Konfigurace NVR', 1200, 'ks', 2),
('kamery', 'Navrh kameroveho systemu', 1500, 'ks', 3),

-- Doprava
('doprava', 'Vyjezd (do 15 km)', 0, 'ks', 1),
('doprava', 'Vyjezd (15-40 km)', 300, 'ks', 2),
('doprava', 'Vyjezd (nad 40 km)', 9, 'km', 3),

-- Pausaly
('pausaly', 'Pausal MINI (do 5 zarizeni)', 2990, 'mes', 1),
('pausaly', 'Pausal STANDARD (do 15 zarizeni)', 5490, 'mes', 2),
('pausaly', 'Pausal PREMIUM (15+ zarizeni)', 8990, 'mes', 3);

-- ============================================
-- KONEC SCHEMA
-- ============================================
