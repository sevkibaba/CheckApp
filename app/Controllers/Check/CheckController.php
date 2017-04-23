<?php

namespace App\Controllers\Check;

use App\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Models\Check;
use App\Models\Usercheck;
use App\Controllers\Auth;
use Respect\Validation\Validator as v;


class CheckController extends Controller {

	public function getCheck($request, $response) {




		return $this->view->render($response, 'check/check.twig');

	}

	public function getProducts() {
		$products = Product::where('user_id', $_SESSION['user'])->get();
		return json_encode($products);
	}

	public function postOrder(){

		echo 'Hello';
	}

	public function postCheck($request, $response) {

		$validation = $this->validator->validate($request, [

			// 'products[id]' => v::notEmpty(),
			// 'products[name]' => v::notEmpty(),
			// 'products[price]' => v::notEmpty(),

			]);

		if($validation->failed()) {

			return $response->withRedirect($this->router->pathFor('check.add'));


		}
		// $check = Check::create([

		// 	'user_id' => $_SESSION['user'],
		// 	'product_id' =>$request->getParam('products[0]["id"]'),
		// 	'product_name' =>$request->getParam('products[0]["name"]'),
		// 	'product_price' =>$request->getParam('products[0]["price"]'),

		// 	]);
		// $products_post = $request->getParam('products');

		// foreach ($products_post as $product){
		// $checks = Check::create([

		// 	]);
		// }

		//create usercheck and take ID of the check to connect id to the orders
		$user_check = Usercheck::create([

			'user_id' => $_SESSION['user'],

			]);

		$product_post = $request->getParam('product');
		// echo "<pre>";
		// print_r($product_post);
		// die("</pre>");
		// $this->flash->addMessage('info', 'Check added!');

		
		return $response->withRedirect($this->router->pathFor('check.add'));


	}

}