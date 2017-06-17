<?php

namespace App\Controllers\Report;

use App\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Controllers\Auth;
use Respect\Validation\Validator as v;

class ReportController extends Controller {
	public function getReport($request, $response){
		return $this->view->render($response, 'reports/chartjs.twig');
	}
}
	// public function getProducts($request, $response) {
	// 	$products = Product::where('user_id', $_SESSION['user'])->get();
	// 	return json_encode($products);	
	// }

	// public function getAddProduct($request, $response) {
	// 	return $this->view->render($response, 'product/addProduct.twig');
	// }

	// public function postAddProduct($request, $response) {
	// 	$validation = $this->validator->validate($request, [
	// 		'name' => v::notEmpty(),
	// 		'price' => v::notEmpty(),
	// 		]);

	// 	if($validation->failed()) {
	// 		return $response->withRedirect($this->router->pathFor('product.add'));

	// 	}

	// 	$product = Product::create([
	// 		'user_id' => $_SESSION['user'],
	// 		'name' => $request->getParam('name'),
	// 		'price' => $request->getParam('price')
	// 		]);

	// 	$this->flash->addMessage('info', 'Product added!');

	// 	return $response->withRedirect($this->router->pathFor('product.add'));
	// }

	// public function updateProductGet($request, $response, $args){
	// 	//Since the product list is getting products wrt user id, there is no need to add user id control here.
	// 	//However the error should be handled later.
	// 	return $this->view->render($response, 'product/updateProduct.twig');
	// }

	// public function updateProductPost($request, $response, $args){
	// 	$requestID = $request->getParam('id');

	// 	$prdct = Product::where('user_id', $_SESSION['user'])
	// 	->where('id', $requestID)->first();

	// 	$prdct->update([
	// 		'name' => $request->getParam('name'),
	// 		'price' => $request->getParam('price'),
	// 	 ]);

	// 	$prdct->save();

	// 	$this->flash->addMessage('info', 'Product updated!');

	// 	return $response->withRedirect($this->router->pathFor('product.add'));
	// }

	// public function deleteProduct ($request, $response, $args){		
	// 	Product::where('user_id', $_SESSION['user'])
	// 	->where('id', $args['id'])->delete();

	// 	$this->flash->addMessage('info', 'Product deleted!');

	// 	return $response->withRedirect($this->router->pathFor('product.add'));
	// }