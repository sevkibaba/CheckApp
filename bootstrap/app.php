<?php

use Respect\Validation\Validator as v;

session_start();

require __DIR__ . '/../vendor/autoload.php';


$app = new \Slim\App([
	'settings'=>[
			'displayErrorDetails'=>true,
			// 'addContentLengthHeader' => false, //this line added to make error work
			'db' => [
				'driver' => 'mysql',
				'host' => 'localhost',
				'database' => 'codecourse',
				'username' => 'root',
				'password' => 'baba',
				'charset' => 'utf8',
				'collation' => 'utf8_unicode_ci',
				'prefix' => ''
				]
		]
	
	]);

$container = $app->getContainer();


$capsule = new \Illuminate\Database\Capsule\Manager;
$capsule->addConnection($container['settings']['db']);
$capsule->setAsGlobal();
$capsule->bootEloquent();


$container['db'] = function ($container) use ($capsule){

	return $capsule;

};

$container['auth'] = function($container){

	return new \App\Auth\Auth;

};

$container['flash'] = function ($container) {

    return new \Slim\Flash\Messages;

};



$container['view'] = function($container){
	$view = new \Slim\Views\Twig(__DIR__ . '/../resources/views', [
			'cache' =>false,
		]);
	$view->addExtension(new \Slim\Views\TwigExtension(
			$container->router,
			$container->request->getUri()
		));

	$view->getEnvironment()->addGlobal('auth', [
			'check' => $container->auth->check(),
			'user' => $container->auth->user(), //creates a user and uses single sql query for this.

		]);
	
	$view->getEnvironment()->addGlobal('flash', $container->flash);


	return $view;
};

$container['validator'] = function ($container){ //bind validator on

	return new \App\Validation\Validator;

};

$container['HomeController'] = function ($container){

	return new \App\Controllers\HomeController($container);

};

$container['AuthController'] = function ($container){

	return new \App\Controllers\Auth\AuthController($container);

};

$container['PasswordController'] = function ($container){

	return new \App\Controllers\Auth\PasswordController($container);

};

// $container['csrf'] = function($container){

// 	return new \Slim\Csrf\Guard;

// };

$container['ProductController'] = function ($container){

	return new \App\Controllers\Product\ProductController($container);

};

$container['CheckController'] = function ($container){

	return new \App\Controllers\Check\CheckController($container);

};

$container['OrderController'] = function ($container){

	return new \App\Controllers\Order\OrderController($container);

};

//Since you extend from base Middleware, pass $container in
$app->add(new \App\Middleware\ValidationErrorsMiddleware($container));
$app->add(new \App\Middleware\OldInputMiddleware($container));
// $app->add(new \App\Middleware\CsrfViewMiddleware($container));


// $app->add($container->csrf);


v::with('App\\Validation\\Rules\\');

require __DIR__ . '/../app/routes.php';


// $app->get('/', function ($request, $response){

// 	return 'Home';

// });

