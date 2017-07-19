# CheckApp
This is an app that can collect sales information as checks, tracks inventory information and reports sales-inventory data.

You will need:
- Composer (https://getcomposer.org/download/)
- Xampp (https://www.apachefriends.org/tr/index.html)
- Slim (https://www.slimframework.com/docs/)
- Eloquent (https://laravel.com/docs/5.4/installation)
- Bootstrap (There is an inline code that gets bootstrap)
- jQuery (There is an inline code that gets jQuery)
- Twig (https://twig.sensiolabs.org/doc/2.x/installation.html)
- Respect (http://respect.github.io/Validation/docs/install.html)
- jQuersy-confirm.js (There is an inline code that gets jQueryconfirm.js)
- Datatables 

I may have missed some other libraries, if you get errors please contact me and I will update this file. 

In the first commit we can create user, add products and add a simple check. User can change password. I think that's all for now :)

Special notes:
- You can get an error on first launch of the app from your local host. There is an error coming from one of the functions that retrieve old data when user enters wrong values on a form. I tried solving this with an if clause but I couldn't. (Fixed on second commit)

- Database usernames and passwords are available in the app.php file, at lines 18 and 19.

- Future Features: Stock Control, CRM (by collecting customer data)


PHP Admin:
- Created a database called 'codecourse'. We will change it later, it is connected on the app.php under bootstrap folder, line 17.
- Create checks table (
    user_id
    id
    name
    total
    closed
    created_at
    updated_at
- Create orders table
    userid
    check_id
    check_name
    id
    product_id
    product_name
    product_price
    quantity
    created_at
    updated_at
- Create Products table
    user_id
    id
    name
    price
    created_at
    updated_at
 - Create users
    id
    name
    email
    password
    created_at
    updated_at
    
    
SQL For Tables

CREATE DATABASE checkapp DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;


CREATE TABLE `checks` (
 `user_id` int(11) NOT NULL,
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
 `total` float NOT NULL,
 `total_paid` float NOT NULL,
 `total_remaining` float NOT NULL,
 `closed` tinyint(1) NOT NULL,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=244 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci

CREATE TABLE `orders` (
 `user_id` int(11) NOT NULL,
 `check_id` int(11) NOT NULL,
 `check_name` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `product_id` int(11) NOT NULL,
 `product_name` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
 `product_price` float NOT NULL,
 `quantity` int(11) NOT NULL,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=622 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci ROW_FORMAT=COMPACT

CREATE TABLE `users` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `name` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
 `email` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
 `password` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci

CREATE TABLE `products` (
 `user_id` int(11) NOT NULL,
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
 `price` int(11) NOT NULL,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci