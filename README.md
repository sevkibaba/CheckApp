# CheckApp
This is an app that can collect sales information as checks, tracks inventory information and reports sales-inventory data

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

I may have missed some other libraries, if you get errors please contact me and update this file. 

In the first Commit we have can create user, add products and add a simple check. User can change password. I think that's all for now :)

Special notes:
- You can get an error on firts launch of the app from your local host. There is an error coming from the functions that retrieve old data when user enters wrong values on a form. I tried solving this with an if clause but I see I couldn't. (Fixed on second commit)

- Database user names and passwords are available on the app.php file lines 18,19

PHP Admin:
- Create a database called 'codecourse'. We will change it later, it is connected on the app.php under bootstrap folder, line 17.
- Create checks table (
    check_row_id
    check_id
    order_id
    order_product_id
    created_at
    updated_at
- Create orders table
    check_id
    order_id
    user_id
    product_id
    product_name
    product_price
    created_at
    updated_at
- Create Products table
    user_id
    id
    name
    price
    created_at
    updated_at
 - Create user checks
    check_id
    user_id
    created_at
    updated_at
 - Create users
    id
    name
    email
    password
    created_at
    updated_at
    
    
