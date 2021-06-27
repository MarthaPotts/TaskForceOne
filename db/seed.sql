use employees_db; 
-- always end the last entered value with a semicolon!!!
INSERT INTO department (name)
VALUES 
('Nursing'), 
('Therapy'), 
('Dietary'), 
('Housekeeping'), 
('Maintenance'), 
('Business_Office'), 
('Social_Services'), 
('Activities'), 
('Administration');

INSERT INTO role (title, salary, dept_id)
VALUES 
('Unit_Mgr', 60000, 1),
('Physical_Therapist', 80000, 2), 
('Senior_Dietary_Mgr', 40000, 3)
('Second_Shift_Housekeeper', 30000, 4), 
('Lead_Maintenance', 60000, 5),
('Pay_Roll_Specialist', 70000, 6), 
('Licensed_Social_Worker', 70000, 7), 
('Activities_Assistant', 20000, 8), 
('Administrator', 105000, 9); 

INSERT INTO employee (first_name, last_name, role_id, mgr_id)
VALUES 
('Anita', 'Penn', 1, 2),
('Hevee', 'Waits', 2, NULL),
('Sherry', 'Baker', 3, 3), 
('Seymour', 'Butts', 4, NULL), 
('Iman', 'Azole', 5, 4), 
('Geraldine', 'Cash', 6, NULL), 
('Urma', 'Heolper', 7, NULL), 
('Kathy', 'Ball', 8, NULL), 
('Notma', 'Jobs', 9, 5); 