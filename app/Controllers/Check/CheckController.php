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

	public function checkList () {
		$allChecks = Check :: where('user_id', $_SESSION['user'])->get();
		return json_encode($allChecks);
	}

	public function controlCheck($request, $response) {

		$allChecks = Check :: where('user_id', $_SESSION['user'])->get();
	
		if ($allChecks->count() == 0){
			
			$newCheck = Check :: create([
					'user_id' => $_SESSION['user'],
					'closed' => false,
				]);

			return $response->withRedirect('/check/'. $newCheck['id']);

		}else{
			$user = $_SESSION['user'];
			$lastCheck = Check :: where('user_id', $_SESSION['user'])->get()->toArray();

			$checkIdForUrl = max($lastCheck);
			$key = array_search($checkIdForUrl, $lastCheck);

			return $response->withRedirect('/check/'. $lastCheck[$key]['id']);

		}

	}

	public function getCheckId($request, $response, $args){	//returns empty array if the user and check id doesn't match
		
		$checkInfo = Check :: where('id', $args['id'])
		->where('user_id', $_SESSION['user'])
		->get()->toArray()[0];

		return $this->view->render($response, 'check/check.id.twig', $checkInfo);
		
	}

	public function postSingleOrder($request, $response, $args) {

		$singleOrder = Order::create([

				'user_id' => $_SESSION['user'],
				'check_id' => $request->getParam('check_id'),
				'check_name' => $request->getParam('check_name'),
				'product_id' => $request->getParam('product_id'),
				'product_name' => $request->getParam('product_name'),
				'product_price' => $request->getParam('product_price'),
				'quantity' => $request->getParam('quantity'),

			]);

	}

	public function updateCheckName($request, $response, $args){
		//Update check name on Checks table
		$check = Check::where('id', $args['id']);
		$check->update([
				'name' => $request->getParam('check_name'),
			]);
		//Update check name on Orders table
		$orderCheckName = Order::where('check_id', $args['id']);
		$orderCheckName->update([
				'check_name' => $request->getParam('check_name'),
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

		$check = Check::where('id', $args['id']);
		$check->update([
				'total' => $updatedTotal,
			]);

	}

	public function updateOtherTotals($request, $response, $args){

		$paidTotal = $request->getParam('total_paid');
		$remainingTotal = $request->getParam('total_remaining');
		
		$totals = Check::where('id', $args['id']);
		$totals->update([
				'total_paid' => $paidTotal,
				'total_remaining' => $remainingTotal,
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

}