
BEGIN TRANSACTION;
INSERT INTO role (`id`, `name` , `alive` , `active`, `create-at` , `create-by` , `update-at` , `update-by` ) 
values ('0197a134-24e0-7989-8dc2-b6fb1755e246', 'admin', true, true, 1750756091950, 'vi', 1750756091950, 'vi')

INSERT INTO role (`id`, `name` , `alive` , `active`, `create-at` , `create-by` , `update-at` , `update-by` ) 
values ('0197a134-814b-755a-be4f-f374b66a5014', 'customer', true, true, 1750756091950, 'vi', 1750756091950, 'vi')

INSERT INTO role (`id`, `name` , `alive` , `active`, `create-at` , `create-by` , `update-at` , `update-by` ) 
values ('0197a134-d764-7b45-b1c2-87dba90ab2a5', 'seller', true, true, 1750756091950, 'vi', 1750756091950, 'vi')

COMMIT TRANSACTION;
