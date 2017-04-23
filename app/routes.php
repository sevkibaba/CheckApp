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


	$this->get('/check', 'CheckController:getCheck')->setName('check.add');

	$this->get('/product/list', 'CheckController:getProducts');

	$this->post('/order/post', 'CheckController:postOrder');
	
	$this->post('/check', 'CheckController:postCheck');


	$this->get('/auth/password/change', 'PasswordController:getChangePassword')->setName('auth.password.change');

	$this->post('/auth/password/change', 'PasswordController:postChangePassword');


})->add($newAuthMiddleware);


$app->group('', function (){

	$this->get('/auth/signup', 'AuthController:getSignUp')->setName('auth.signup');

	$this->post('/auth/signup', 'AuthController:postSignUp');

	$this->get('/auth/signin', 'AuthController:getSignIn')->setName('auth.signin');

	$this->post('/auth/signin', 'AuthController:postSignIn');


})->add($newGuestMiddleware);