# SoftEng2023-52
**Στόχος**



**Τεχνικές Λεπτομέρειες**

| Asset | Technologies Used |
| ----- | ----------- |
| backend | NodeJS |
| frontend | flutter, dart |
| database | MySQL + Sequelize ORM |
| CLI | Python3 argparse


**Τα μέλη της τετραμελούς ομάδας που διεκπεραίωσε την εργασία είναι:**

| Όνομα
| ----- 
| Γιώργος Φωτόπουλος _ 031190143
| Γιάννης Ρουμελιώτης _ 031190103
| Σταύρος Κουτεντάκης _ 03119092
| Εμμανουήλ Παπανικόλας _ 03119063


Setting up the database:
All we need to setup the database is the backup file " ntuaflix_backup.sql " and make sure you are connected to your MySQL server. 
1. Open a cmd and navigate to the " bin " directory of mysql
2. Before we import the data we have to create a new database first. Run " mysql -u YOUR_USERNAME -pYOUR_PASSWORD " and then " create database YOUR_PREFFERED_DB_NAME "
3. Exit the mysql mode using ^C
4. Type " mysql -u YOUR_USERNAME -pYOUR_PASSWORD YOUR_PREFFERED_DB_NAME<RELATIVE_PATH/ntuaflix_backup.sql ". In a couple of seconds the database will be set.

Alternatively you can use an RDBMS to import the backup sql file
