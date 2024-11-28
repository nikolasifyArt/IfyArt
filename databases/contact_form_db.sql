CREATE  TABLE contacts {
    id INT AUTO_INCREMENT  PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) 
    NOT NULL,
    contry_code 
    VARCHAR(10) NO NULL,
    phone_number VARCHAR(20) NOT NULL, 
    customer_type VARCHAR(255) --  not directly related  that is strigjh  foward  to to  my contat  form 

};