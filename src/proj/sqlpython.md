---
title: "SQL & Python - simple book manufacturer database filled with scraped data"
date: 2025-04-24
author: "Josh"
---

<br> As a starting project to learn SQL, I created a database based off a diagram given to me by Alan. I started by creating the Delivery.., Logistics.. and Document.. tables, connected with foreign keys, then decided to create more connecting tables to fill the database with, starting by webscraping a book store website designed for scraping found [here](https://books.toscrape.com/).

<br> ![](/assets/img/sqlpython/diagram.png)

<br> Using this python script I scraped 10 000 books - their names, prices, ratings, availability and a link to their page - all to CSV files which can be imported in to SQL using BULK INSERT.

<br> ![](/assets/img/sqlpython/scraper.png)

<br>I then used python to fill temporary tables with random data - driver names, adressess, business names, warehouses, distribution centers... Then using this data I randomly created associated foreign keys.

<br> For example, this script randomly selects dates, route ids and driver ids from the database to fill a temporary logistics route schedule table. 

<br> ![](/assets/img/sqlpython/faker.png)

<br> I also used more complicated scripts to fill in columns that should be mathematically sound, such as making sure the quantity in item boxes match the overall ordered quantity of the delivery.

<br> ![](/assets/img/sqlpython/generateboxes.png)
