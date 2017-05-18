<?php

use App\Middleware\AuthMiddleware;
use App\Middleware\GuestMiddleware;

$newAuthMiddleware = new AuthMiddleware($container);
$newGuestMiddleware = new GuestMiddleware($container);


$app->get('/', 'HomeController:index')->setName('home');





// Check if the user is signed in and if not, protect these routes for access.
$app->group('', function (){


	$this->get('/auth/signout', 'AuthController:getSignOut')->setName('auth.signout');


	$this->get('/product/addProduct', 'ProductController:getAddProduct')->setName('product.add');
	
	$this->post('/product/addProduct', 'ProductController:postAddProduct');

	$this->get('/product/list', 'ProductController:getProducts');

	$this->get('/product/delete/{id}', 'ProductController:deleteProduct');

	$this->get('/product/update/{id}', 'ProductController:updateProductGet');

	$this->post('/product/update/{id}', 'ProductController:updateProductPost')->setName('product.update');


	$this->get('/check/list', 'CheckController:checkList'); 

	$this->get('/check/createnewcheck', 'CheckController:newCheck'); //new check	

	$this->get('/check', 'CheckController:controlCheck')->setName('check.add'); 

	$this->post('/check/addorder', 'CheckController:postSingleOrder');

	$this->get('/check/{id}', 'CheckController:getCheckId')->setName('check.id'); 

	$this->post('/check/{id}/updateName', 'CheckController:updateCheckName');

	$this->post('/check/{id}/updateClosed', 'CheckController:updateCheckClosed');

	$this->post('/check/{id}/updateTotal', 'CheckController:updateCheckTotal');


	$this->get('/order/list/{id}', 'OrderController:orderList'); 


	$this->get('/auth/password/change', 'PasswordController:getChangePassword')->setName('auth.password.change');

	$this->post('/auth/password/change', 'PasswordController:postChangePassword');


})->add($newAuthMiddleware);


$app->group('', function (){

	$this->get('/auth/signup', 'AuthController:getSignUp')->setName('auth.signup');

	$this->post('/auth/signup', 'AuthController:postSignUp');

	$this->get('/auth/signin', 'AuthController:getSignIn')->setName('auth.signin');

	$this->post('/auth/signin', 'AuthController:postSignIn');


})->add($newGuestMiddleware);