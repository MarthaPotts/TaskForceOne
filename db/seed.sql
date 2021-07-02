use employees_db;

INSERT INTO department
    (name)
VALUES
    ('Nursing'),
    ('Therapy'),
    ('Maintenance'),
    ('Legal');

INSERT INTO role
    (title, salary, dept_id)
VALUES
    ('Direct-care LPN Certified', 100000, 1),
    ('Occupational Therapy Assistant', 80000, 1),
    ('Lead Maintenance Technician', 150000, 2),
    ('Pay Roll Specialist', 120000, 2),
    ('Senior Assistant', 160000, 3),
    ('Licensed Social Worker', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, mgr_id)
VALUES
    ('Anita', 'Penn', 1, NULL),
    ('Hevee', 'Waits', 2, 1),
    ('Iman', 'Azole', 3, NULL),
    ('Geraldine', 'Cash', 4, 3),
    ('Kaitlyn', 'Ball', 5, NULL),
    ('Sherry', 'Baker', 6, 5),
    ('Christopher', 'Rice', 7, NULL),
    ('Joshua', 'Barrington', 8, 7);
