<?php

namespace App\Controllers\Check;

use App\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Models\Check;
use App\Models\Order;
use App\Controllers\Auth;
use Respect\Validation\Validator as v;


class CheckController extends Controller {


	public function controlCheck($request, $response) {

		$allChecks = Check :: where('user_id', $_SESSION['user'])->get();
	
		if ($allChecks->count() == 0){
			
			$newCheck = Check :: create([
					'user_id' => $_SESSION['user'],
					'closed' => false,
				]);

			return $response->withRedirect('/check/'. $newCheck['id']);

		}else{

			$lastCheck = Check :: whereRaw('id = (select max(`id`) from checks)')->get();
			$checkIdForUrl = $lastCheck->toArray();

			return $response->withRedirect('/check/'. $checkIdForUrl[0]['id']);

		}

	}

	public function getCheckId($request, $response, $args){
		
		$checkInfo = Check :: where('id', $args['id'])->get()->toArray()[0];

		return $this->view->render($response, 'check/check.id.twig', $checkInfo);
		
	}

	public function postSingleOrder($request, $response) {

		$singleOrder = Order::create([

				'user_id' => $_SESSION['user'],
				'check_id' => $request->getParam('check_id'),
				'product_id' => $request->getParam('product_id'),
				'product_name' => $request->getParam('product_name'),
				'product_price' => $request->getParam('product_price'),
				'quantity' => $request->getParam('quantity'),

			]);

	}

	public function updateCheckName($request, $response, $args){

		$check = Check::where('id', $args['id']);
		$check->update([
				'name' => $request->getParam('check_name'),
			]);
	}

	public function updateCheckClosed($request, $response, $args){

		$check = Check::where('id', $args['id']);
		$check->update([
				'closed' => $request->getParam('closed'),
			]);
	}

	public function updateCheckTotal($request, $response, $args){

		$updatedTotal = $request->getParam('total');
		
		// $updatedTotal = (float)$updatedTotal;
		$check = Check::where('id', $args['id']);
		$check->update([
				'total' => $updatedTotal,
			]);
	}

	public function newCheck ($request, $response, $args){

		$newCheck = Check :: create([
					'user_id' => $_SESSION['user'],
					'closed' => false,
				]);

		$checkInfo = $newCheck->get()->toArray()[0];

		return $this->view->render($response, 'check/check.id.twig', $checkInfo);

	}



	// public function postCheck($request, $response) {

	// 	$validation = $this->validator->validate($request, [

	// 		// 'products[id]' => v::notEmpty(),
	// 		// 'products[name]' => v::notEmpty(),
	// 		// 'products[price]' => v::notEmpty(),

	// 		]);

	// 	if($validation->failed()) {

	// 		return $response->withRedirect($this->router->pathFor('check.add'));


	// 	}
	// 	// $check = Check::create([

	// 	// 	'user_id' => $_SESSION['user'],
	// 	// 	'pid' =>$request->getParam('products[0]["id"]'),
	// 	// 	'product_name' =>$request->getParam('products[0]["name"]'),
	// 	// 	'product_price' =>$request->getParam('products[0]["price"]'),

	// 	// 	]);
	// 	// $products_post = $request->getParam('products');

	// 	// foreach ($products_post as $product){
	// 	// $checks = Check::create([

	// 	// 	]);
	// 	// }

	// 	//create usercheck and take ID of the check to connect id to the orders
	// 	$user_check = Usercheck::create([

	// 		'user_id' => $_SESSION['user'],

	// 		]);

	// 	$product_post = $request->getParam('product');
	// 	// echo "<pre>";
	// 	// print_r($product_post);
	// 	// die("</pre>");
	// 	// $this->flash->addMessage('info', 'Check added!');

		
	// 	return $response->withRedirect($this->router->pathFor('check.add'));


	// }

}