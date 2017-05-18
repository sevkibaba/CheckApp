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

// gets the orders of a check, if the user and check doen't match,returns empty array. 
	public function orderList ($request, $response, $args) {
		$allOrders = Order :: where('check_id', $args['id'])
		->where('user_id', $_SESSION['user'])
		->get();

		return json_encode($allOrders);
	}


}