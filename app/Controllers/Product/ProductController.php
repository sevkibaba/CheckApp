<?php

namespace App\Controllers\Product;

use App\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Controllers\Auth;
use Respect\Validation\Validator as v;

class ProductController extends Controller {

	public function getProducts($request, $response) {

		$products = Product::where('user_id', $_SESSION['user'])->get();
		return json_encode($products);
	
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
		var_dump($request->getParam('price'));
		$product = Product::create([

			'user_id' => $_SESSION['user'],
			'name' => $request->getParam('name'),
			'price' => $request->getParam('price')
			]);
	

		$this->flash->addMessage('info', 'Product added!');
		

		return $response->withRedirect($this->router->pathFor('product.add'));

	}

	public function updateProductGet($request, $response, $args){


		return $this->view->render($response, 'product/updateProduct.twig');

	}

	// public function updateProductGet($request, $response, $args){

	// 	$productToUpdate = Product::where('id', $args['id'])->get();
	// 	return json_encode($productToUpdate);
	// 	// return $this->view->render($response, 'auth/signin.twig');

	// }

	public function updateProductPost($request, $response, $args){

		$requestID = $request->getParam('id');
		$prdct = Product::where('id', $requestID)->first();
		// print ($prdct);
		// die();
		$prdct->update([
			'name' => $request->getParam('name'),
			'price' => $request->getParam('price'),
		 ]);
		$prdct->save();

		$this->flash->addMessage('info', 'Product updated!');

		return $response->withRedirect($this->router->pathFor('product.add'));

	}


	public function deleteProduct ($request, $response, $args){
		
		Product::where('id', $args['id'])->delete();

		$this->flash->addMessage('info', 'Product deleted!');

		return $response->withRedirect($this->router->pathFor('product.add'));


	}

}