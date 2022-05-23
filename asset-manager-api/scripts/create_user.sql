CREATE USER 'assets_manager_api'@'localhost' IDENTIFIED WITH mysql_native_password BY 'zMjf7^Rf';

/* In an ideal world, we should strictly provide the grants the API has access
 * to a specific table rather than all the privileges.
 */
GRANT ALL PRIVILEGES ON assets_system.assets TO 'assets_manager_api'@'localhost';

flush privileges;
