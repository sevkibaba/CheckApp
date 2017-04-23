<?php

namespace App\Controllers\Product;

use App\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Controllers\Auth;
use Respect\Validation\Validator as v;

class ProductController extends Controller {

	public function getProductUpdate($request, $response){

		// return $this->view->render($response, 'auth/signin.twig');

	}

	public function postProductUpdate($request, $response){

		// $auth = $this->auth->attempt(
		// 		$request->getParam('email'),
		// 		$request->getParam('password')
		// 	);


		// if (!$auth){

		// 	$this->flash->addMessage('error', 'Could not sign you in with those details.');

		// 	return $response->withRedirect($this->router->pathFor('auth.signin'));
		
		// }
		// return $response->withRedirect($this->router->pathFor('home'));
	}

	public function getAddProduct($request, $response) {

		

		return $this->view->render($response, 'product/addProduct.twig');

	}

	public function postAddProduct($request, $response) {

		$validation = $this->validator->validate($request, [

			'name' => v::notEmpty(),
			'price' => v::notEmpty(),

			]);

		if($validation->failed()) {

			return $response->withRedirect($this->router->pathFor('product.add'));


		}

		$product = Product::create([

			'user_id' => $_SESSION['user'],
			'name' => $request->getParam('name'),
			'price' => $request->getParam('price'),

			]);


		$this->flash->addMessage('info', 'Product added!');
		


		return $response->withRedirect($this->router->pathFor('product.add'));


	}

}