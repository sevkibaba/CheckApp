<?php

namespace App\Controllers\Order;

use App\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Models\Check;
use App\Models\Order;
use App\Controllers\Auth;
use Respect\Validation\Validator as v;


class OrderController extends Controller { 

	public function allOrders($request, $response, $args) {
		$allOrders = Order :: where('user_id', $_SESSION['user'])
		->get();

		return json_encode($allOrders);
	}
	
// gets the orders of a check, if the user and check doen't match,returns empty array. 
	public function orderList ($request, $response, $args) {
		$allOrders = Order :: where('check_id', $args['id'])
		->where('user_id', $_SESSION['user'])
		->get();

		return json_encode($allOrders);
	}

	public function deleteOrder ($request, $response, $args) {
		$deleteOrder = Order :: where('id', $args['id'])
		->where('user_id', $_SESSION['user'])
		->delete();

		return $response->withRedirect('/check/'. $args['checkId']);

	}
}